const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname + "/date")
const app = express();

const inputNames = ["buy food", "cook food", "eat food"];
const workItems=[];

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
  
  const day= date.getDate();
  res.render("list", { listTitle: day, newListItems: inputNames });
});

app.post("/", bodyParser.urlencoded({ extended: true }), (req, res) => { 
  const input = req.body.newItem;
  if (req.body.list=="Work") {
   workItems.push(input) ;
    res.redirect("/work");
  }
  else{
    inputNames.push(input);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work List", newListItems:workItems });
});

app.post("/work", function(req,res){
  const item= req.body.newItem;
  workItems.push(item);
res.render("/work");
});

app.get("/about",function (req,res) {
  res.render("about");
})

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});