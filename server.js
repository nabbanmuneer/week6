require("dotenv").config
const express=require("express");
const app=express();
const ejs=require("ejs");
const path=require("path");
//-------mongo db---------------
const { default: mongoose } = require("mongoose");
const { stringify } = require("querystring");

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

//-----body-parser--------
const bodyParser=require("body-parser");
const { Session } = require("inspector");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//----path creating and setting view engine------
app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.static("views"));

//------cookies-----
const cookieParser=require('cookie-parser');

//-----------session
const session = require('express-session');
const filestore = require("session-file-store")(session);
app.use(
    session({
        name: "session-1",
        secret: "thisIsOurSecret",
        saveUninitialized: false,
        resave: false,
        store: new filestore(),
    })
);
app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});


app.use(cookieParser());
//const filestore=require("express-file-store");

app.use((req, res, next) => {
    res.setHeader("Access-Contol-Allow-Orgin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
})

//routers
// let msg=" "
const userRouter=require("./routes/routes")

app.use('/users',userRouter)

app.get('/', (req, res) => {
    res.redirect('/users');
})

//----index object------
// app.get("/users",(req,res)=>{
//     res.render("index",{msg:msg});
//     console.log("index Started")
// });


//-----listening server-----
//------linking db------
mongoose.connect("mongodb://127.0.0.1:27017/nyown").then(()=>{
    app.listen(8080,()=>{
        console.log("listing port 8080")
    });
});
