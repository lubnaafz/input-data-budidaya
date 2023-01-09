const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('../config/auth');
require("dotenv").config();

exports.register = async(req, res) => {
    try {
    const { username, email, noHp, password, confirmPassword } = req.body;
    if(password !== confirmPassword) {
        return res.status(400)
            .json({message: "Password dan Confirm Password tidak cocok"});
    }

    User.findOne({
        where: {
          username: username
        }
      }).then(user => {
        if (user) {
            res.status(400).send({
            message: "Username sudah terdaftar"
          });
          return;
        }
        User.findOne({
            where: {
              email: email
            }
          }).then(user => {
            if (user) {
                return res.status(400).send({
                message: "Email sudah terdaftar"
              });
            }
        })
    })

    const user = {
        username: username,
        email: email,
        noHp: noHp,
        password: bcrypt.hashSync(password, 8)
    };

    await User.create(user)
        .then(data => {
            res.json({
                message: "User berhasil dibuat",
                data: data,
              });
        })
        .catch((err) => {
            res.status(500).json({
              message: err.message || "Terdapat kesalahan pada pembuatan user",
              data: null,
            });
          });
    } catch (error) {
        console.log(error);
    }
}

exports.login = async(req, res) => {
    await User.findOne({
        where:{
            username: req.body.username
        }
    })
    .then(data => {
        if(!data) {
            return res.status(404)
            .json({message: "User belum terdaftar"});
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
        if(!passwordIsValid) {
            return res.status(400)
            .json({message: "Password salah"});
        }
        const userId = data.id;
        const username = data.username;
        const token = jwt.sign({userId, username}, auth.secret, {
            expiresIn: 86400
          });
        res.json({ token });
    })
}

exports.logout = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    jwt.sign(token, auth.secret, { expiresIn: 1 } , (logout, err) => {
      if (logout) {
        return res.json({ message: 'Logged out successfully' });
      } else {
        return res.json({ message: 'Error' });
      }
    });
  }

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
res.status(200).send("User Content.");
};