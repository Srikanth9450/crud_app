"use strict";

require("dotenv").config();

var _ = require('lodash');

var express = require("express");

var router = express.Router();

var jwt = require("jsonwebtoken");

var Alien = require("../database/model");

var bcrypt = require("bcrypt");

var refreshTokens = [];
ACCESS_TOKEN = "a9caa30e09a3580f925acdd5ab6dd0f1bf7812a4732f4dcf6b47d40970f85e43c3e9e398cd5233b34f5fab93a2e581fadd9d6c49f38ebf47cc9d2240d7d27aa5";
REFRESH_TOKEN = "cc1ffb5f65cca46ef6f893a33837fcf8bc75f7966bd38ede501315420b43e150c26f7967ce7ec01d1e76f603a0d771af3a8fc10da5279cbe02cefad373b2143d";
FORGET_PASS = "useremailforget123";
router["delete"]("/logout", function (req, res) {
  refreshTokens = refreshTokens.filter(function (token) {
    return token !== REFRESH_TOKEN;
  });
  res.sendStatus(204);
});
/* 
router.post("/forget", (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken,  REFRESH_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessTokens({ name: user })
        res.json({ accessToken: accessToken })
    })
  }) */
// below method will use to take the refresh token and verify with refresh token of .env then provides the new access token

router.post('/token', function (req, res) {
  var refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, REFRESH_TOKEN, function (err, user) {
    if (err) return res.sendStatus(403);
    var accessToken = generateAccessTokens({
      name: user
    });
    res.json({
      accessToken: accessToken
    });
  });
});
router.get("/posts", authenticateToken, function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.user._id);
          _context.next = 3;
          return regeneratorRuntime.awrap(Alien.findOne({
            _id: req.user._id
          }, function (err, user) {
            if (err) {
              res.json(err);
            }

            res.json(user);
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});

function authenticateToken(req, res, next) {
  var authHeader = req.headers["authorization"];
  var token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, ACCESS_TOKEN, function (err, user) {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

console.log(jwt.sign({
  _id: "60caf827f92c027c94037616"
}, "iebdihgbdigbdigbdgidfdjbj"));
router.post("/superuser/login", function (req, res) {
  userName = req.body.username;
  Password = req.body.password;

  if (userName == "admin") {
    if (Password == "nimda@123") {
      var listOfAll = "";
      Alien.find().then(function (user) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = user[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            i = _step.value;
            listOfAll += i.name;
            listOfAll += '<br>';
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        res.json("<html>list of user names </br>".concat(listOfAll, "</html>"));
      });
    } else {
      res.json("wrong credentials");
    }
  } else {
    res.json("wrong credentials");
  }
});
router.post('/login', function (req, res) {
  Alien.findOne({
    email: req.body.email
  }).then(function _callee2(user) {
    var valid, accessToken, refreshtoken;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

          case 2:
            valid = _context2.sent;

            if (valid) {
              console.log(user._id);
              accessToken = generateAccessTokens({
                _id: user._id
              });
              refreshtoken = jwt.sign({
                _id: user._id
              }, REFRESH_TOKEN);
              refreshTokens.push(refreshtoken);
              /* const accessToken = await jwt.sign(user, "shhhhhh"); */
              //console.log(accessToken)
              //res.json({ accessToken: accessToken })

              res.json({
                accessToken: accessToken,
                refreshtoken: refreshtoken
              });
            } else {
              res.send(" wrong credentials");
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  })["catch"](function (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Error Occurred while retriving user information"
    });
  });
  /*  alien = await Alien.find()
   res.json(alien)
  ; */
});

function generateAccessTokens(user) {
  return jwt.sign(user, ACCESS_TOKEN, {
    expiresIn: "60s"
  });
} //authentication
//body limit 
//route gourding =>authinticate
//reddis
//allowing
//error response

/* router.put('/', async(req, res) => {
    try {
        const resp = await Alien.findByIdAndUpdate(req.body.id, { name: req.body.name })
        res.json(resp)

    } catch (err) {
        console.log(err)
        res.send(err)

    }
})
 */
// when you click on forget password, token is stored in database to the particular user we are trying to reset the password
//here iam not sending access token to mail 
// 


router.put("/forgetpassword", function _callee3(req, res) {
  var email, user, token;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Alien.findOne({
            email: email
          }));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 8;
            break;
          }

          res.send("no user with email");
          _context3.next = 12;
          break;

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(jwt.sign({
            _id: user._id
          }, FORGET_PASS, {
            expiresIn: "10m"
          }));

        case 10:
          token = _context3.sent;
          return _context3.abrupt("return", user.updateOne({
            forget_password: token
          }, function (err, success) {
            if (err) {
              return res.json(err);
            }

            res.json(token);
          }));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //need to reset the password after click on forget password

router.put('/reset', function _callee4(req, res) {
  var resettoken, npasword;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          resettoken = req.body.token;
          npasword = req.body.password;
          jwt.verify(resettoken, FORGET_PASS, function (error, decodeddata) {
            if (error) {
              return res.status(401).json({
                error: "Incorrect token or token is expired"
              });
            }

            Alien.findOne({
              forget_password: resettoken
            }, function (err, user) {
              if (err || !user) {
                return res.status(400).json({
                  error: "user with this token doesnot exist"
                });
              }

              var obj = {
                password: npasword
              };
              user = _.extend(user, obj);
              user.save(function (err, result) {
                if (err) {
                  return res.status(400).json({
                    error: "can't save"
                  });
                } else {
                  return res.status(200).json({
                    message: "password is saved"
                  });
                }
              });
            });
          });

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.post("/register", function (req, res) {
  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;
  var password = req.body.password;
  alien = new Alien({
    name: name,
    age: age,
    email: email,
    password: password
  });
  alien.save();
  res.json(alien);
});
module.exports = router;