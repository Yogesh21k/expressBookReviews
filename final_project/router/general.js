const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Code to be written
  const username=req.body.username;
  const password=req.body.password;

  if(username && password){
    if(!isValid(username)){
      users.push({"username":username,"password":password});
      return res.status(200).json({
        message:"User Added Successfully!!!Now you can log in"
      });
    }
    else{
      return res.status(404).json({message:"User already exists!!!"})
    }
  }
  res.status(404).json({message:"Unable to register User!!!"});
});

/*
// Task 1-4 without promise/async 

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let bookCode=req.params.isbn;
  res.send(JSON.stringify(books[bookCode],null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let booksbyauthor = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if (books[isbn]["author"] === req.params.author) {
      booksbyauthor.push({
        "isbn": isbn,
        "title": books[isbn]["title"],
        "reviews": books[isbn]["reviews"]
      });
    }
  });
  res.send(JSON.stringify({ booksbyauthor }, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title=req.params.title;
  let titleBook=Object.values(books).filter((book)=>book.title===title);
  if(titleBook.length>0){
     res.send(JSON.stringify(titleBook,null,4));
  }
  else{
     res.send("Unable to find the title");
  }
});

*/

// Task 1-4 using Promises

// Get all books
const listBooks = async () => {
	try{
		const getBooks = await Promise.resolve (books)
		if (getBooks) {
			return getBooks
		} else {
			return Promise.reject (new error('Books not found'))
		}
	} catch (error) {
		console.log (error)
	}
}

public_users.get('/',async (req, res)=> {
  //Write your code here
  const listBook = await listBooks()
  res.json (listBook)
});

// Get books based on isbn
const getByISBN=async(isbn)=>{
  try{
    const getISBN=await Promise.resolve(isbn);
    if(getISBN){
      return Promise.resolve(isbn)
    }
    else{
      return Promise.reject(new error("Book with the isbn not found!"));
    }
  }
  catch(error){
    console.log(error);
  }
}

public_users.get('/isbn/:isbn',async(req,res)=>{
  const isbn=req.params.isbn;
  const returnedIsbn=await getByISBN(isbn);
  res.send(books[returnedIsbn]);
})

  // Get books based on author
const getByAuthor=async(author)=>{
  try{
    
    if(author){
      const authBook=[];
      Object.values(books).map((book)=>{
      if(book.author===author){
        authBook.push(book);
      }})
      return Promise.resolve(authBook);
    }
    else{
      return Promise.reject(new error("Book with the author name not found!!!"));
    }
    
  }
  catch(error){
    console.log(error);
  }
}


  public_users.get('/author/:author',async(req,res)=>{
    const author=req.params.author;
    const data=await getByAuthor(author);
    res.send(data);
  })

  // Get books based on title
const getByTitle=async(title)=>{
  try{
    
    if(title){
      const titleBook=[];
      Object.values(books).map((book)=>{
      if(book.title===title){
        titleBook.push(book);
      }})
      return Promise.resolve(titleBook);
    }
    else{
      return Promise.reject(new error("Book with the author name not found!!!"));
    }
    
  }
  catch(error){
    console.log(error);
  }
}


  public_users.get('/title/:title',async(req,res)=>{
    const title=req.params.title;
    const data=await getByAuthor(title);
    res.send(data);
  })

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbncode=req.params.isbn;
    let filter_book=books[isbncode];
    const reviewOfbook=filter_book.reviews;
    if(reviewOfbook){
        res.send(reviewOfbook);
    }
    else{
        res.send("Unable to find the title");
    }
});

module.exports.general = public_users;
