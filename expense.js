var express = require('express');
var app = express();

var bodyParser=require('body-parser');

app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({limit: "5mb",extended:true}));

var sql = require("mssql");
const { connect } = require('http2');

const sendmail = require('sendmail')();
var otpGenerator = require('otp-generator')
var nodemailer = require('nodemailer');

var config = {
    user: 'harsha',
    password: 'harsha@123',
    server: 'LAPTOP-NIRGEL45\\SQLEXPRESS', 
    database: 'ExpenseManager',
    "options":{
        "encrypt": true,
        "enableArithAbort": true
    }
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/users', function (req, res,next) {

    sql.connect(config, function (err) {
     if (err) console.log(err);
      
        console.log(req.body);

        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var phone = req.body.phone;

        var request = new sql.Request();
        request.query("insert into dbo.users(username,password,email,phone) values ('"+username+"','"+password+"','"+email+"','"+phone+"')", function (err, recordset) {
            
            if (err) console.log(err)

            res.send(recordset);
        });
    });
});

app.post('/resetpass', function (req, res,next) {

    sql.connect(config, function (err) {
     if (err) console.log(err);
      
        console.log(req.body);

        var newpassword = req.body.newpass;
        var email = req.body.email;

        var request = new sql.Request();
        request.query("update users set password='"+newpassword+"'where email='"+email+"'", function (err, recordset) {
            
            if (err) console.log(err)

            res.send(recordset);
        });
    });
});

app.post('/sendotp', function(req,res,next){
    console.log(req.body,'this is sendotp');

    otp = otpGenerator.generate(4, {digits:true,alphabets:false, upperCase: false, specialChars: false });

    var email = req.body.regemail;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'expensemanager690@gmail.com',
          pass: 'expensemanager@123'
        }
      });

      var mailOptions = {
        from: 'Expensemanager690@gmail.com',
        to: email,
        subject: 'Expense Manager Password reset',
        text: 'The OTP for resetting the password is '+otp+'.\n Move back to the application for resetting the password.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});

app.post('/expense', function (req, res,next) {

    sql.connect(config, function (err) {
     if (err) console.log(err);
      
        console.log(req.body);

        var expdate = req.body.expdate;
        var expcat = req.body.expcat;
        var expamt = req.body.expamt;
        var expsrc = req.body.expsrc;
        var bill = req.body.bill;
        var userid = req.body.userid;
        var username = req.body.username;

        var request = new sql.Request();
        request.query("insert into dbo.expense(expdate,expcat,expamt,expsrc,bill,userid,username) values ('"+expdate+"','"+expcat+"','"+expamt+"','"+expsrc+"','"+bill+"','"+userid+"','"+username+"')", function (err, recordset) {
            
            if (err) console.log(err)

            res.send(recordset);
        });
    });
});

app.post('/expense-category', function (req, res,next) {

    sql.connect(config, function (err) {
     if (err) console.log(err);
      
        console.log(req.body);

        var expcat = req.body.expcat;
        var expdesc = req.body.expdesc;
        var userid = req.body.userid;
        var username = req.body.username;

        var request = new sql.Request();
        request.query("insert into dbo.exp_cat(expcat,expdesc,userid,username) values ('"+expcat+"','"+expdesc+"','"+userid+"','"+username+"')", function (err, recordset) {
            
            if (err) console.log(err)

            res.send(recordset);
        });
    });
});

app.post('/income', function (req, res,next) {

    sql.connect(config, function (err) {
     if (err) console.log(err);
      
        console.log(req.body);

        var incdate = req.body.incdate;
        var inccat = req.body.inccat;
        var incamt = req.body.incamt;
        var incsrc = req.body.incsrc;
        var userid = req.body.userid;
        var username = req.body.username;

        var request = new sql.Request();
        request.query("insert into dbo.income(incdate,inccat,incamt,incsrc,userid,username) values ('"+incdate+"','"+inccat+"','"+incamt+"','"+incsrc+"','"+userid+"','"+username+"')", function (err, recordset) {
            
            if (err) console.log(err)

            res.send(recordset);
        });
    });
});

app.post('/income-category', function (req, res,next) {

    sql.connect(config, function (err) {
     if (err) console.log(err);
      
        console.log(req.body);

        var inccat = req.body.inccat;
        var incdesc = req.body.incdesc;
        var userid = req.body.userid;
        var username = req.body.username;

        var request = new sql.Request();
        request.query("insert into dbo.inc_cat(inccat,incdesc,userid,username) values ('"+inccat+"','"+incdesc+"','"+userid+"','"+username+"')", function (err, recordset) {
            
            if (err) console.log(err)

            res.send(recordset);
        });
    });
});

app.get('/users', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) 
            console.log(err);

        var request = new sql.Request();
        request.query('select * from dbo.users', function (err, recordset) {
            if (err) 
                console.log(err)

            res.send(recordset.recordset);
        });
    });
});

app.get('/sendotp', function (req,res){
    res.send(otp);
})

app.get('/expense/:userid', function (req, res) {

    sql.connect(config, function (err) {
        if (err) 
            console.log(err);

        var request = new sql.Request();
        request.query("select expdate,expcat,expamt,expsrc,bill,userid from dbo.expense where userid="+req.params.userid+"", function (err, recordset) {
            if (err) 
                console.log(err)

            res.send(recordset.recordset);
        });
    });
});

app.get('/expcat/:userid', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) 
            console.log(err);

        var request = new sql.Request();
        request.query("select expcat,expdesc,userid from dbo.exp_cat where userid="+req.params.userid+"", function (err, recordset) {
            if (err) 
                console.log(err)

            res.send(recordset.recordset);
        });
    });
});

app.get('/income/:userid', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) 
            console.log(err);

        var request = new sql.Request();
        request.query("select incdate,inccat,incamt,incsrc,userid from dbo.income where userid="+req.params.userid+"", function (err, recordset) {
            if (err) 
                console.log(err)

            res.send(recordset.recordset);
        });
    });
});

app.get('/inccat/:userid', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) 
            console.log(err);

        var request = new sql.Request();
        request.query("select inccat,incdesc,userid from dbo.inc_cat where userid="+req.params.userid+"", function (err, recordset) {
            if (err) 
                console.log(err)

            res.send(recordset.recordset);
        });
    });
});


var server = app.listen(8000, function () {
    console.log('Server is running in the port 8000');
});