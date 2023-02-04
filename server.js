/*************************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Sevinj Feyziyeva 
Student ID: 154057194 
Date: Jan-31-23
*
*  Online (Cyclic) Link: https://app.cyclic.sh/#/________________________________________________________
************************************************************************************/ 

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
app.use(express.static('public'));
const path = require('path');
const { initialize, getPublishedPosts, getAllPosts, getCategories } = require("./blog-service.js");


app.get("/", (req,res) => {
  res.redirect("/about");
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/posts", (req, res) => {
    getAllPosts()
    .then((data) => {res.send(data)
    })
    .catch((err) => {res.send(err);})
  });

//blog
app.get("/blog", (req, res) => {
  getPublishedPosts()
  .then((data) => { res.send(data) })

  .catch((err) => {res.send(err) })
});

//categories
app.get("/categories", (req, res) => {
  getCategories()
  .then((data) => { res.send(data)})
 
  .catch((err) => { res.send(err);})
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "notFoundPage.html"));
  })

// setup http server to listen on HTTP_PORT
initialize()
.then(() => {
    app.listen(HTTP_PORT, () => {
    console.log("Express http server listening on: " + HTTP_PORT);
});
})
