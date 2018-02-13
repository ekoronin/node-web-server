const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log+'\n', (err)=>{
    if(err) {
      console.log("Unable to append to the server log");
    }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render("maintenance.hbs", {
//     pageTitle: "Maintenance",
//     welcomeMessage: "The site is currently under maintenance"
//   });
//   //next();
// });

app.use(express.static(__dirname + "/public"));


hbs.registerHelper("getCurrentYear", ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", (text)=>{
  return text.toUpperCase();
});

app.get("/", (req, res)=>{
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome, my friend, to my new web site!"
  });
});


app.get("/projects", (req, res)=>{
  res.render("projects.hbs", {
    pageTitle: "Projects Page",
    welcomeMessage: "Here you will find the list of my projects!"
  });
});

app.get("/about", (req, res)=>{
  res.render("about.hbs", {
    pageTitle: "About Page",
  });
});

app.get("/Bad", (req, res)=>{
  res.send({
    errorMessage: "Unable to fulfill your request."
  });
});

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
