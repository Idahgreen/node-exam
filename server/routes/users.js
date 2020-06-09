const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/User");

router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const users = await User.query()
      .select()
      .where({ username: username })
      .limit(1);
    const user = users[0];

    if (!user) {
      return res.status(404).send({ response: "Wrong username" });
    }

    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res.status(500).send({ response: "Something went wrong" });
      }
      if (!isSame) {
        return res.status(404).send({ response: "Password is incorrect" });
      } else {
        // setting cookies
        req.session.SessionIsAuthenticated = true;
        res.cookie(
          "SessionIsAuthenticated",
          req.session.SessionIsAuthenticated,
          {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: false,
            overwrite: true,
            signed: true,
          }
        );

        req.session.username = user.username;
        req.session.user_id = user.id;

        // return res.status(200).send({ username: user.username });
        req.session.save(function (err) {
          // session saved
        });
        console.log(req.session);
        return res.redirect("/");
      }
    });
  } else {
    return res.status(404).send({ response: "Missing username or password" });
  }
});

router.post("/users/logout", (req, res) => {
  if (!req.session.username) {
    console.log("user not logged in");
    res.redirect("/");
    console.log(req.session);
  } else {
    req.session.destroy(function (err) {
      if (err) return console.log(err);
      res.clearCookie("SessionIsAuthenticated");
      console.log(req.session);
      return res.redirect("/");
    });
  }
});

router.post("/users/register", (req, res) => {
  const {
    username,
    email,
    first_name,
    last_name,
    password,
    repeatPassword,
  } = req.body;

  if (username && password && repeatPassword && password === repeatPassword) {
    if (password.length < 8) {
      return res
        .status(400)
        .send({ response: "Password does not fulfill the requirements" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({});
        }
        try {
          const existingUser = await User.query()
            .select()
            .where({ username: username })
            .limit(1);

          if (existingUser[0]) {
            return res.status(404).send({ response: "User already exists" });
          } else {
            const newUser = await User.query().insert({
              username,
              email,
              first_name: first_name,
              last_name: last_name,
              password: hashedPassword,
            });

            console.log({ username: newUser.username });
            return res.redirect("/");
          }
        } catch (error) {
          return res
            .status(500)
            .send({ response: "Something went wrong with the database" });
        }
      });
    }
  } else if (password !== repeatPassword) {
    return res
      .status(404)
      .send({ response: "Password and repeat password are not the same" });
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});

router.post("users/reset-password", (req, res) => {
  const { username } = req.body;

  if (username) {
    const users = User.query().select().where({ username: username }).limit(1);
    const user = users[0];

    if (!user) {
      return res.status(404).send({ response: "User doesn't exist" });
    }
    return res.status(200).send({ username: username });
  } else {
    return res.status(404).send({ response: "Missing username or password" });
  }
});

router.post("/account/update", async (req, res) => {
  req.session.reload(function () {
    // session updated
  });

  const { first_name, last_name, email } = req.body;
  console.log(req.session.user_id);
  console.log(req.body);
  if (req.body) {
    const existingIngredient = await User.query()
      .select()
      .where({ id: req.session.user_id })
      .limit(1);

    if (!existingIngredient[0]) {
      return res.status(404).send({ response: "ingredient doesn't exist" });
    } else {
      const updatedIngredient = await User.query()
        .select()
        .where({ id: req.session.user_id })
        .update({
          first_name,
          last_name,
          email,
        });

      console.log({ first_name, last_name });
      return res.redirect("/account");
    }
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});

router.post("/account/delete", async (req, res) => {
  const { id } = req.body;
  console.log(req.session.user_id);
  if (id) {
    const existingUser = await User.query().select().where({ id: id }).limit(1);

    if (!existingUser[0]) {
      return res.status(404).send({ response: "ingredient doesn't exist" });
    } else {
      const deleteUser = await User.query().where({ id: id }).del();

      req.session.destroy(function (err) {
        if (err) return console.log(err);
        console.log(req.session);
        return res.redirect("/");
      });
    }
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});

module.exports = router;
