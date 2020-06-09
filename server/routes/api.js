const router = require("express").Router();
var http = require("https");
const Ingredient = require("../models/Ingredient");
const User = require("../models/User");

router.get("/1/api/ingredients", async (req, res) => {
  req.session.reload(function () {
    // session updated
  });

  const ingredients = await Ingredient.query()
    .select("ingredient")
    .where({ user_id: req.session.user_id })
    .pluck("ingredient");

  let stringIngredients = ingredients.join().toLowerCase();
  let apiArray = [];
  apiArray.push(stringIngredients);
  console.log(apiArray);

  res.send(apiArray);
});

router.get("/1/api/ingredient-info/", async (req, res) => {
  const ingredients = await Ingredient.query()
    .select("id", "ingredient", "expiration_date")
    .where({ user_id: req.session.user_id });
  console.log(ingredients);

  let ingredientObject = { ingredientInfo: ingredients };
  console.log(ingredientObject);
  res.send(ingredientObject);
});

router.get("/1/api/user/", async (req, res) => {
  req.session.reload(function () {
    // session updated
  });

  const ExistingUser = await User.query()
    .select("id", "username", "email", "first_name", "last_name", "created_at")
    .where({ id: req.session.user_id })
    .limit(1);

  console.log(ExistingUser[0]);

  let user = { user: ExistingUser[0] };

  console.log(user.username);
  res.send(user);
});

module.exports = router;
