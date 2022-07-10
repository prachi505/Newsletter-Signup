const express=require("express");

const request=require("request");

const bodyParser=require("body-parser");
const { json } = require("body-parser");

const app=express();

const https=require("https");
const { url } = require("inspector");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);

    const url="https://us8.api.mailchimp.com/3.0/lists/3cc1e799c1";
    const options={
        method: "POST",
        auth: "prachi1:7b9009cbb271cd694a427c5cbd3a37e2-us8"
    }


    const request=https.request(url,options,function(response){
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");

        }
        else
        {
            res.sendFile(__dirname + "/failure.html");

        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });

    });
    request.write(jsonData);
    request.end();


});

app.post("/failure",function(req,res)
{
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("server started at port 3000");
});


//a0729a2e1e10c30eb89c147090e47992-us8
//3cc1e799c1
