const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const e = require('express');
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
  let userwithsameusername=users.filter((user)=>{
    return(user.username===username);
  })
  if(userwithsameusername>0){
    return true
  }
  else{
    return false
  }
}

const authenticatedUser = (username,password)=>{ 
  let userisvalid=users.filter((user)=>{
    return (user.username===username&&user.password===password);
  })
  if(userisvalid>0){
    return true
  }
  else{
    return false
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
 let username=req.body.username;
 let password=req.body.password;
 if(!username||!password){
    res.status(404).json({message:"User Not Found!!!"});
  }
  else if(authenticatedUser(username,password)){
    let accessToken=jwt.sign({data:password},'access',{expiresIn:60*60});
    req.session.authorization={accessToken,username}
    return res.status(200).json({message:"User logged in"})
  }
  else{
    return res.status(404).json({message:"Invalid username and password!!!"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
