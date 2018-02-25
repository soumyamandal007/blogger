var express = require("express");
var app     = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");


    mongoose.connect("mongodb://localhost/soumya_blog");
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(expressSanitizer());
    app.use(methodOverride("_method"));



var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   author: String,
   body: String
});



var blogSoumya = mongoose.model("blogSoumya",blogSchema);


app.get("/",function(req, res) {
   res.redirect("/blogs"); 
});



app.get("/blogs",function(req,res){
   blogSoumya.find({},function(err,blog){
       if(err)
       {
           console.log("It has error");
       }else{
           res.render("index.ejs",{blog: blog});
       }
   }) ;
});



app.get("/blogs/new",function(req, res) {
   res.render("new.ejs"); 
});



app.post("/blogs",function(req,res){
   blogSoumya.create(req.body.blog,function(err,newblog){
       if(err)
       {
           console.log("There has been an error");
       }else{
           res.redirect("/blogs");
       }
   }) ;
});



app.get("/blogs/:id",function(req, res) {
  blogSoumya.findById(req.params.id,function(err,foundblog){
     if(err){
         console.log("Error");
     } else{
         res.render("show.ejs",{blog: foundblog});
     }
  });
});



app.get("/blogs/:id/edit",function(req, res) {
    blogSoumya.findById(req.params.id,function(err,foundblog){
       if(err){
           console.log("Error");
       } else{
           res.render("edit.ejs",{blog: foundblog});
       }
    });
});



app.put("/blogs/:id",function(req,res){
   blogSoumya.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedblog){
       if(err){
           console.log("Error");
       }else{
           res.redirect("/blogs/"+req.params.id);
       }
   }) ;
});



app.delete("/blogs/:id",function(req,res){
   blogSoumya.findByIdAndRemove(req.params.id , function(err){
      if(err){
          res.redirect("/blogs");
      } else{
          res.redirect("/blogs");
      }
   });
});




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started");
});