// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

// Aapi route for Edamam

app.get("/api/food/:food/:diet", (req, res) => {
  let food = req.params.food;
  let diet = req.params.diet;
  let apiID = process.env.API;

  if (req.params.diet) {
    axios
      .get(
        `https://api.edamam.com/search?q=${food}&app_id=${apiID}&app_key=${apiKey}&health=${diet}`
      )
      .then(function(res) {
        res.json(food);
      });
    res.json(food);
  } else {
    axios
      .get(
        `https://api.edamam.com/search?q=${food}&app_id=${apiID}&app_key=${apiKey}`
      )
      .then(function(res) {
        res.json(food);
      });
    res.json(food);
  }
});

// Api get routes for database

app.get("/api/meals/breakfast", function(req, res) {
  var query = {};
  if (req.query.users_id) {
    query.UserId = req.query.users_id;
  }  
  db.Breakfast.findAll({
    where: query,
    include: [db.User]
}).then(function(dbMeal) {
    console.log(dbMeal);
    res.render("view-all", dbMeal);
  });
});

app.get("/api/meals/lunch", function(req, res) {
  var query = {};
  if (req.query.users_id) {
    query.UserId = req.query.users_id;
  }  
  db.Lunch.findAll({
    where: query,
    include: [db.User]
}).then(function(dbMeal) {
    console.log(dbMeal);
    res.render("view-all", dbMeal);
  });
});

app.get("/api/meals/dinner", function(req, res) {
  var query = {};
  if (req.query.users_id) {
    query.UserId = req.query.users_id;
  }  
  db.Dinner.findAll({
    where: query,
    include: [db.User]
}).then(function(dbMeal) {
    console.log(dbMeal);
    res.render("view-all", dbMeal);
  });
});

app.get("/api/meals/snack", function(req, res) {
  var query = {};
  if (req.query.users_id) {
    query.UserId = req.query.users_id;
  }  
  db.Snack.findAll({
    where: query,
    include: [db.User]
}).then(function(dbMeal) {
    console.log(dbMeal);
    res.render("view-all", dbMeal);
  });
});

  // Api post routes for database

  app.post("/api/breakfast", function(req, res) {
     db.Breakfast.create({
      name: req.body.name,
      img: req.body.img,
      ingredients: req.body.ingredients,
      UserId: req.user.id,
    }).then(function(dbMeal) {
      res.json(dbMeal);
    });
  });

  app.post("/api/lunch", function(req, res) {
    db.Lunch.create({
      name: req.body.name,
      img: req.body.img,
      ingredients: req.body.ingredients,
      UserId: req.user.id
    })
      .then(function(dbMeal) {
        res.json(dbMeal);
      });
  });

  app.post("/api/dinner", function(req, res) {
    db.Dinner.create({
      name: req.body.name,
      img: req.body.img,
      ingredients: req.body.ingredients,
      UserId: req.user.id
    })
      .then(function(dbMeal) {
        res.json(dbMeal);
      });
  });

  app.post("/api/snack", function(req, res) {
    db.Snack.create({
      name: req.body.name,
      img: req.body.img,
      ingredients: req.body.ingredients,
      UserId: req.user.id
    })
      .then(function(dbMeal) {
        res.json(dbMeal);
      });
  });
};
