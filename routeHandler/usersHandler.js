const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const usersSchema = require("../schemas/usersSchema");
const User = new mongoose.model("User", usersSchema);
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const admin = require("firebase-admin");
// jwt  token
async function verifyToken(req, res, next) {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    try {
      const decodedUser = await admin.auth().verifyIdToken(token);
      console.log(decodedUser);
      req.decodedEmail = decodedUser.email;
      console.log(decodedUser.email);
    } catch { }
  }
  next();
}
// POST A Employees
router.post("/", async (req, res) => {
  const newUsers = new User(req.body);
  console.log(newUsers);
  await newUsers.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Employee was inserted successfully!",
      });
    }
  });
});

router.put("/admin", verifyToken, async (req, res) => {
    console.log(req.body.email);
  // console.log("put", req.decodedEmail);
  const requester = req.decodedEmail;
  if (requester) {
    const requesterAccount = await User.findOne({ email: requester });
    if (requesterAccount.role === "admin") {
      const user = await User.findOneAndUpdate(
        { email: req.body.email },
        // { upsert: true },
        {
          $set: {
            role: "admin",
          },
        }
      );
      res.status(200).json({
        result: user,
        message: "Success",
      });
    }
  } else {
    res.status(404).send({ error: "admin is not found!" });
  }
});

//update user
router.put("/", async (req, res) => {
  console.log("put", req.headers.authorization);
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { name: req.body.name, email: req.body.email },
      { upsert: true }
    );
    res.status(200).json({
      result: user,
      message: "Success",
    });
  } catch {
    res.status(404).send({ error: "user is not found!" });
  }
});

//find admin
router.get("/:email", async (req, res) => {
  console.log("users handler");
  try {
    const admin = await User.find({ email: req.params.email });
    res.status(200).json({
      result: admin,
      message: "Success",
    });
  } catch {
    res.status(404).send({ error: "admin is not found!" });
  }
});
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({
      data: allUsers,
      message: "allUsers Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There was an error on the server side",
    });
  }
});

module.exports = router;
