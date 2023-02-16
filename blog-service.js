let categories = [];
let posts = [];

const { resolve } = require('path');
const path = require("path");
const fs = require('fs');

function initialize() {
   
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "data", "posts.json"), 'utf8', (err, data) => {
            if (err) {
              reject("Unable to read posts file");
            }
            posts = JSON.parse(data);

     fs.readFile(path.join(__dirname, "data", "categories.json"), 'utf8', (err, data) => {
                if (err) {
                  reject("Unable to read categories file");
                }
                categories = JSON.parse(data);
                resolve();
              });
            });
    })
}
function getPublishedPosts() {
    return new Promise((resolve, reject) => {
        let publishedPosts = [];
        posts.forEach((post) => {
            if (post.published === true) {
                publishedPosts.push(post);
            }
        })

        if (publishedPosts.length > 0) {
            resolve(publishedPosts);
        } else {
            reject("No results returned");
        }
    })    
}

function getAllPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject("No results returned");
        } else {
            resolve(posts);
        }
    })
}
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("No results returned");
        } else {
            resolve(categories);
        }
    })
}

function addPost(postData) {
    return new Promise((resolve, reject) => {
        if (postData.published === undefined) {
            postData.published = false;
        } else {
            postData.published = true;
        }
    postData.id = posts.length + 1; 
    posts.push(postData);
    resolve(postData);
    })
}

function getPostById(id) {
    return new Promise((resolve, reject) => {
        const somePosts = posts.some(post => post.id == id);
        const onePost = somePosts[0];
        try {
            if (onePost) {
                resolve(onePost);
            }
            else {
                throw new Error("no result returned");
            }
        }
        catch(error) {reject(error);
        }
    });
}
function getPostsByCategory(category) {
    return new Promise((resolve, reject) => {
        const somePosts = posts.some(post => post.category == category);

        if (
            somePosts.length > 0) {
            resolve(somePosts);
        } else {
            throw new Error("no results returned");
         
        }
    })
}
function getPostsByMinDate(minDate) {
    return new Promise((resolve, reject) => {
        const somePosts = posts.some(post => new Date(post.postDate) >= new Date(minDate));

        if (somePosts.length > 0) {
            resolve(somePosts);
        } else {
            throw new Error("no results returned");
        }
    })
}
function addPost(postData) {
    return new Promise((resolve, reject) => {
        if (postData.published === undefined) {
            postData.published = false;
        } else {
            postData.published = true;
        }
    
        postData.id = posts.length + 1;
    
        posts.push(postData);
        resolve(postData);
    })
    
}
module.exports = { initialize, getPostById,getPostsByCategory, getPostsByMinDate, getPublishedPosts, getAllPosts, getCategories, addPost };
