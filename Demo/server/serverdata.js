const ex =require('express');
const sql=require('mysql2');
var cor=require('cors');
var bdp=require('body-parser');


var app=ex();

app.use(cor());
app.use(bdp.json());

var con = sql.createConnection(
    {

            host:"localhost",
            user:"root",
            password:"root",
            database:"demoproject"
    }    
)

con.connect(function(err){
    if(!err)
    console.log("connected")
    else
    console.log("Fail")
});


app.listen(9001,function(){

    console.log(" 9001 Server Start")

})


app.post('/insertLogin',function(req,res){

     
    var email = req.body.pemail;
    var password = req.body.passw;
    
    var qu="SELECT * FROM passenger WHERE passenger_email = ? AND passenger_password = ?"

    con.query(qu,[email,password],function(err,result){

        if (!err) {
            if (result.length > 0) {
              // Valid credentials
              res.send('Login successful');
            } else {
              // Invalid credentials
              res.send('Invalid email or password');
            }
          }
          else {
            console.error('Error:', err);
            res.status(500).send('Internal server error');
          }

    })


})


