const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const PORT = process.env.PORT || 3001;
const app = express();
const url = "mongodb://127.0.0.1:27017/NoteDB";

app.use(express.static("./client/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(
//   session({
//     secret: "Our little secret.",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

mongoose.connect(url);

const userSchema = new mongoose.Schema({
  // username: String,
  // password: String,

  title: String,
  content: String,
});

// userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

app
  .route("/api")
  .get((req, res) => {
    User.find({}, function (err, foundNotes) {
      if (err) {
        console.log(err);
      } else {
        if (foundNotes) {
          res.json(foundNotes);
          // console.log(foundNotes[0]._id.toString());
        }
      }
    });
  })
  .post((req, res) => {
    const note = new User({
      title: req.body.title,
      content: req.body.content,
    });
    note.save();
    res.status(201);
    res.send("Success");
  })
  .delete((req, res) => {
    const id = req.body.id;
    User.findByIdAndRemove(id, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201);
        res.send("Success");
      }
    });
  });

// app.post("/login", (req, res) => {
//   console.log("connection");
//   User.findOne({ username: req.body.name }, function (err, foundUser) {
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         const user = new User({
//           username: req.body.username,
//           password: req.body.password,
//         });

//         req.login(user, (err) => {
//           if (err) {
//             console.log("greshka ot login: " + err);
//           } else {
//             passport.authenticate("local")(req, res, () => {
//               console.log("logged in");
//               res.json({ answer: true });
//             });
//           }
//         });
//         // console.log(foundNotes[0]._id.toString());
//       } else {
//         User.register(
//           { username: req.body.username },
//           req.body.password,
//           function (err, user) {
//             if (err) {
//               console.log("greshka ot register: " + err);
//             } else {
//               passport.authenticate("local")(req, res, function () {
//                 res.json({ answer: true });
//               });
//             }
//           }
//         );
//       }
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// User.register(
//   { username: req.body.username },
//   req.body.password,
//   (err, usr) => {
//     if(err){    console.log(err);} else{
//       passport.authenticate('local')(req,res,()=>{
//         res.json({answer:true})
//       })
//     }
// );

// const user = new User({
//   username:req.body.username,
//   password:req.body.password
// })

// req.login(user,(err)=>{
//   if(err){
//     console.log(err)
//   }else{
//     passport.authenticate('local')(req,res,()=>{
//       res.json({answer:true})
//     })
//   }
// })
///
