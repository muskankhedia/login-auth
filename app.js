var app=require('express')(),
    express = require('express'),
    port  = process.env.PORT || 3000,
    path= require('path')
    url = '0.0.0.0';       
var bodyParser = require('body-parser');

var database = require('./database.js');

database.connection.connect(function(err) {
  console.log("Database is now connected!");
});
console.log(database.tablename);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static(__dirname + "/public"));

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.get('/',function(req,res){
    // res.sendfile('index.html');
    res.render('loginSignup.ejs');
});


app.post('/login', function(req,res){
    // console.log("req",req.body);
    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);

    database.connection.query('SELECT * FROM' + database.tablename + 'WHERE name = "' + user_name + '";', function(errors,results, fields){
        var stream = results;
        console.log(stream);
        if (errors){
            throw (errors);
        //   res.status(500).send(err.toString());
        }else{
          console.log()
          if (results.length === 0){
            res.status(403).send('Username/Password is invalid\n');
          }else{
            if (password === results[0].password){
              //req.session.auth = {stu_id : result[0].stu_id};
              var username = JSON.stringify(results[0].username);
              res.writeHead(200, {'Content-Type':'application/json'});
              res.write(user_name);
              res.send("done");
            }else{
              res.status(403).send('Username/Password is wrong\n');
            }
          }
        } 
    });
    

});

app.post('/signup', function(req,res){
    var user_name = req.body.user;
    var password = req.body.password;
    var emailid = req.body.emailid;
    var cnfpass = req.body.cnfpass;
    console.log("User name =" + user_name + ", password is" +password);

    if(password == cnfpass){
        database.connection.query('INSERT INTO'+ database.tablename + '(name, email, password) VALUES ("' + user_name + '" , "' + emailid + '" , "' + password +'");', function(errors, results, fields){
            var stream = results;
            console.log(stream);
            if(errors){
                throw (errors);
            }else{
                res.send("done")
            }
            
        });
        // res.render('loginSignup.ejs')
    }
    else{
        res.send("Passwords did not match")
    }

    

});

const server = app.listen(port, url, e => {
    if(e) throw e;
    else {
        console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
    }
})
    