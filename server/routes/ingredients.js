const router = require("express").Router();
const Ingredient = require("../models/Ingredient");

router.post("/fridge/add-ingredient", async (req, res) => {
  req.session.reload(function () {
    // session updated
  });

  const { ingredient, expiration_date } = req.body;
  console.log(req.session.user_id);
  if (ingredient && expiration_date !== "") {
    const existingIngredient = await Ingredient.query()
      .select()
      .where({ user_id: req.session.id, ingredient: ingredient })
      .limit(1);

    if (existingIngredient[0]) {
      return res.status(404).send({ response: "ingredient already exists" });
    } else {
      const newIngredient = await Ingredient.query().insert({
        ingredient,
        user_id: req.session.user_id,
        expiration_date: expiration_date,
      });

      console.log({ ingredient: ingredient });
      return res.status(200).send({ response: "ingredient Added" });
    }
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});

router.post("/fridge/update-ingredient", async (req, res) => {
  req.session.reload(function () {
    // session updated
  });

  const { id, ingredient, expiration_date } = req.body;
  const idInt = Number(id);
  console.log(req.session.user_id);
  console.log(req.body);

  if (ingredient) {
    const existingIngredient = await Ingredient.query()
      .select()
      .where({ user_id: req.session.user_id, id: idInt })
      .limit(1);

    if (!existingIngredient[0]) {
      return res.status(400).send({ response: "ingredient doesn't exist" });
    } else {
      const updatedIngredient = await Ingredient.query()
        .select()
        .where({ user_id: req.session.user_id, id: idInt })
        .update({ ingredient, expiration_date });

      console.log({ ingredient: ingredient });
      return res.status(200).send({ response: "ingredient updated" });
    }
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});

router.post("/fridge/delete-ingredient", async (req, res) => {
  const { id } = req.body;
  console.log(req.session.user_id);
  if (id) {
    const existingIngredient = await Ingredient.query()
      .select()
      .where({ id: id, user_id: req.session.user_id })
      .limit(1);

    if (!existingIngredient[0]) {
      return res.status(404).send({ response: "ingredient doesn't exist" });
    } else {
      const deleteIngredient = await Ingredient.query()
        .where({ id: id, user_id: req.session.user_id })
        .del();

      return res.redirect("/fridge/ingredients");
    }
  } else {
    return res.status(403).send({ response: "User Not authorized" });
  }
});

module.exports = router;
