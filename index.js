const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const employeesHandler = require("./routeHandler/employeesHandler");
const announcementHandler = require("./routeHandler/announcementHandler");
const attendanceHandler = require("./routeHandler/attendanceHandler");
const AddCourseHandler = require("./routeHandler/AddCourseHandler");
const leaveHandler = require("./routeHandler/leaveHandler");
const holidayHandler = require("./routeHandler/holidayHandler");
const taskHandler = require("./routeHandler/taskAssignHandler");
const userHandler = require("./routeHandler/usersHandler");
const fileUpload = require("express-fileupload");
const enrollHandler = require("./routeHandler/enrollHandler");
const port = process.env.PORT || 5000;

// jwt token
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.o0i8x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "hr-care",
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

//jwt verify
async function verifyToken(req, res, next) {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log(token);

    try {
      const decodedUser = await admin.auth().verifyIdToken(token);
      console.log(decodedUser);
      req.decodedEmail = decodedUser.email;
    } catch { }
  }
  next();
}

// application routes
app.use("/employees", verifyToken, employeesHandler);
app.use("/announcement", announcementHandler);
app.use("/attendance", attendanceHandler);
app.use("/courses", AddCourseHandler);
app.use("/leave", leaveHandler);
app.use("/holidays", holidayHandler);
app.use("/enrolls", enrollHandler);
app.use("/taskAssign", taskHandler);
app.use("/user", userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);
// app.put("/",async (req,res)=>{
//     console.log("send data")
// })

app.get("/", (req, res) => {
  res.send("HR Care Server Running....");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
