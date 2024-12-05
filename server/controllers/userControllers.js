const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password is too short!",
    });
  } else {
    User.find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "FAILED",
            message: "User with the provided email already exist!",
          });
        } else {
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds).then((hashedPassword) => {
            const newUser = new User({
              email,
              password: hashedPassword,
            });

            newUser
              .save()
              .then((result) => {
                res.json({
                  status: "SUCCESS",
                  message: "Signup successfully",
                  data: result,
                });
              })
              .catch((err) => {
                res.json({
                  status: "FAILED",
                  message: "An error occurred while saving user account!",
                });
              })
              .catch((err) => {
                res.json({
                  status: "FAILED",
                  message: "An error occurred while hashing password!",
                });
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user!",
        });
      });
  }
};

exports.signin = async (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied!",
    });
  } else {
    User.findOne({ email })
      .then((data) => {
        if (data.length > 0) {
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                res.json({
                  status: "SUCCESS",
                  message: "Signin successfully!",
                  data: data,
                  token: jwt.sign(
                    {
                      _id: data._id,
                      email: data.email,
                      role: data.role,
                    },
                    "OnceUponATimeInHollywoodElGatoComeEverythingHeFind",
                    {
                      expiresIn: "1h",
                    }
                  ),
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password entered!",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: `An error occurred while comparing passwords!`,
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials entered!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user!",
        });
      });
  }
};
