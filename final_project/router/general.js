const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let bookCode=req.params.isbn;
  res.send(JSON.stringify(books[bookCode],null,4))
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author=req.params.author;
  const authorsBook=Object.values(books).filter((book)=>book.author===author)
  if(authorsBook.length>0){
      res.send(JSON.stringify(authorsBook,null,4))
  }
  else{
      res.send("Unable to find the author");
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title=req.params.title;
  let titleBook=Object.values(books).filter((book)=>book.title===title)
  if(titleBook.length>0){
     res.send(JSON.stringify(titleBook,null,4))
  }
  else{
     res.send("Unable to find the title");
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbncode=req.params.isbn;
    let filter_book=books[isbncode]
    const reviewOfbook=filter_book.reviews
    if(reviewOfbook){
        res.send(reviewOfbook)
    }
    else{
        res.send("Unable to find the title");
    }
});

module.exports.general = public_users;
