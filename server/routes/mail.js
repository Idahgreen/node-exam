const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Because I'm using my own domain to do this, please replace with your own SMTP host before trying to send any e-mails

router.post("/users/password-reset/send-mail", (req, res) => {
  const { email } = req.body;

  var transporter = nodemailer.createTransport({
    host: "send.one.com",
    port: 465,
    secure: true,
    auth: {
      user: "kontakt@idagreen.dk",
      pass: "Kirsebaer",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  var mailOptions = {
    from: "kontakt@idagreen.dk",
    to: email,
    subject: "Password Recovery",
    text:
      "Hello!  You have requested a password reset. Please refer to http://localhost:3000/password-recovery to reset your password.",
    html:
      '<p>Hello!  You have requested a password reset. Please refer to <a href="http://localhost:3000/password-reset">http://localhost:3000/password-reset</a> to reset your password.</p>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return res.redirect("/");
});

router.post("/users/password-reset", (req, res) => {
  const { username, password, repeatPassword } = req.body;

  if (username && password && repeatPassword && password === repeatPassword) {
    if (password.length < 8) {
      return res
        .status(400)
        .send({ response: "Password does not fulfill the requirements" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({ response: "Something went wrong" });
        }
        try {
          const existingUser = await User.query()
            .select()
            .where({ username: username })
            .limit(1);

          if (!existingUser[0]) {
            return res.status(404).send({ response: "user not found" });
          } else {
            const newPassword = await User.query()
              .update({
                password: hashedPassword,
              })
              .where({ username, username });
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

module.exports = router;
