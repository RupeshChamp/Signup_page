const express = require("express");
const request = require("request")
const bodypraser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodypraser.urlencoded({extended:true}));

app.use(express.static("public"))
app.listen(3000,function(){
    console.log("Server is running on port 3000.")
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res) {


    const firstName =req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.Email;
    
    const data = {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/49a934afc0"
    const options={
        method:"POST",
        auth:"Rupesh07:6b4f1c4d1f6d3ecc1b0131541e8ea567-us9"
    }
    const request = https.request(url,options,function(response){
       if (response.statusCode === 200){
        res.sendFile(__dirname+"/success.html")
       }else{
        res.sendFile(__dirname+"/failure.html");
       }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

// Mailchimp API key - 6b4f1c4d1f6d3ecc1b0131541e8ea567-us9
// audience id -  49a934afc0