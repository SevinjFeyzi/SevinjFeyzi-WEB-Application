/*************************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Sevinj Feyziyeva 
Student ID: 154057194 
Date: Feb-00-23
*
*  Online (Cyclic) Link: ________________________________________________________
************************************************************************************/
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const express = require("express");
const path = require("path");
const upload = multer();
const {
  initialize,
  getPublishedPosts,
  getAllPosts,
  getCategories,
  addPost,
  getPostByID,
  getPostByCategory,
  getPostsByMinDate,
} = require("./blog-service.js");

const HTTP_PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static("public"));
cloudinary.config({
  cloud_name: "kodacloud",
  api_key: "795546542562831",
  api_secret: "JzP_EWXZ4q6-cvvV-GwIKuPa3wk",
  secure: true,
});

app.get("/", (req, res) => {
  res.redirect("/about");
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/posts", (req, res) => {
  getAllPosts()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/post", (req, res) => {
  if (req.query.category) {
    getPostsByCategory(req.query.category)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } else if (req.query.minDate) {
    getPostsByMinDate(req.query.minDate)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    getAllPosts()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

app.get("/blog", (req, res) => {
  getPublishedPosts()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/categories", (req, res) => {
  getCategories()
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.send(err);
    });
});

app.get("/posts", (req, res) => {
  if (req.query.category) {
    getPostsByCategory(req.query.category)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } else if (req.query.mindate) {
    getPostsByMinDate(req.query.mindate)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    getAllPosts()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

app.get("/posts/add", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "addPost.html"));
});

app.post("/posts/add", upload.single("featureImage"), (req, res) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };
  async function upload(req) {
    let result = await streamUpload(req);
    return result;
    // console.log(result);
  }

  upload(req)
    .then((uploaded) => {
      req.body.featureImage = uploaded.url;
      let postObject = {};

      postObject.postDate = Date.now();
      postObject.category = req.body.category;
      postObject.featureImage = req.body.featureImage;
      postObject.body = req.body.body;
      postObject.title = req.body.title;
      postObject.published = req.body.published;

      console.log(postObject);

      if (postObject.title) {
        addPost(postObject);
      }
      res.redirect("/posts");
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get("/post/:value", (req, res) => {
  getPostById(req.params.value)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get("/categories", (req, res) => {
  getCategories()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Using app.use towards the end to ensure all the other routes are taken care of
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notFoundPage.html"));
});

// Listening at the end after everything is initialized
initialize().then(() => {
  app.listen(HTTP_PORT, () => {
    console.log("Express http server listening on: " + HTTP_PORT);
  });
});
