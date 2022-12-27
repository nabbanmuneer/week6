

const { constants } = require('buffer');
const mongoose=require('mongoose');
const myDbs=require("../models/db");
const router = require('../routes/routes');

//const admin={email:"admin@123.com",password:"12345"};
let showUser=" ";
let showData="";
let msg=" "

//-----------index get------------------
const indexGet=(req,res)=>{
  res.render("index",{msg:msg});
  console.log("index Started")
};

exports.indexGet=indexGet;

//-----register Create
const register =(req,res)=>{
    res.render("register",{message:msg})
    console.log("register")
}
exports.register=register;



//-----------register Post-----------------
const registerData=(req, res) => {
    let myData = new myDbs(req.body);
    myData.save()
      .then(item => {
        msg="successful"
        res.redirect('/users')
        console.log("successful")
      })
      .catch(err => {
        res.redirect('/users/register')
        msg="Registeration is unsuccessful";
      });

};
exports.registerData=registerData;




//----------home created-----------------
const userHome=async(req,res)=>{
  res.render("home")
}
exports.userHome=userHome;

// const userView=(req,res)=>{
//   res.redirect('/users/home')
// }
// exports.userView=userView;
//changes

//-------------admin-------------------
// const viewUser= (req,res)=>{
//   res.redirect('/users/admin')
// }
// exports.viewUser=viewUser;




//-----------admin created----------
const useradmin=async (req,res)=>{
  showUser=await myDbs.find();
  console.log("admin")
  res.render("admin",{data:showUser})
}
exports.useradmin=useradmin;



//----------login form-------------
const indexPost = async (req, res, next) => {
    const { email, password } = req.body;
    message=" ";
    let user;
    try {
        user = await myDbs.findOne({ email });
        if (email == user.email && password == user.password) {
            const id = user._id;
            const userType = user.userType;
            req.session.user = { id: id, userType: userType };
            if (user.userType == 'admin') {
                res.redirect('/users/admin')
            }
            else {
                
                res.redirect('/users/home')
            }

        }
        else{
          msg="INAVLID user"
          res.redirect('/users')
        }

    } catch (error) {
        msg ="invalid user"
        res.redirect('/users')
        return msg
    }


}

exports.indexPost=indexPost;

// //--------------------------------------
// const addUser=(req,res)=>{
//   res.render('addUser')
// }
//-----------admin-------------------------

//-----delete----
const deleteUser = async (req,res)=>{
  const userId=req.params.id;
  try
  {
    await myDbs.findByIdAndDelete(userId);
    res.redirect("/users/admin")
  }catch(error){}
};
exports.deleteUser=deleteUser;

//---------edit get------
const adminEdit=async (req,res)=>{
  const { id } =req.params;
  const userEdit= await myDbs.findById(id);

  res.render('edit',{userEdit})
}
exports.adminEdit=adminEdit

//----------edit put------
const adminPutEdit=async(req,res)=>{
  const  id  = req.params.id;
   console.log(id);
   console.log(req.body);
  await myDbs.findByIdAndUpdate(id,{$set:req.body});
  res.redirect("/users/admin");
  
}

exports.adminPutEdit=adminPutEdit
//---------------add new
const adminAdd=(req,res)=>{
  res.render('adminadd')
}
exports.adminAdd=adminAdd;

const newData=(req, res) => {
  let myData = new myDbs(req.body);
    myData.save()
    .then(item => {
      res.redirect('/users/admin')
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });

};

exports.newData=newData;

//--------------search-------------------
const search=async(req,res)=>{
  showUser=" "
  const searchUser=req.body.search;
  showUser=await myDbs.find({
    $or:[{ fname: { $regex: ".*" + searchUser + ".*" } },
    { lname: { $regex: ".*" + searchUser + ".*" }},
    {userType:{$regex:".*"+searchUser+".*"}}]
  }).sort({fname:1});
  console.log(showUser)
  res.render("admin",{data:showUser})
  
}
exports.search=search;


//--------------------------------------------
const logout = (req, res, next) => {
  // console.log("inside logout")
 
  req.session.destroy((err)=> {
      res.redirect('/users');
  });
  res.clearCookie("session-1");
}

exports.logout=logout;










