var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var User = require('./models/User');
var db = require('./mysetup/myurl').myurl;
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cors = require('cors');
var bcrypt = require("bcrypt");
var saltRounds = 10;
const { json } = require('body-parser');
var nodemailer = require("nodemailer");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors())

mongoose
  .connect(db)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Error is ", err.message);
  });

app.get('/user', async (req, res) => {
    let data = await User.find();
    res.send(data)   
})

app.get("/user/:id", async (req, res) => {
  let data = await User.findOne({_id: req.params.id });
  res.send(data);
});


   
app.post("/image-upload", upload.single("profile_pic"), (req, res, next) => {
  console.log(req.image);
  // const image = req.image;
  res.send({ message: "File uploaded successfully." });
});


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gupta.ankit@fxbytes.com",
    pass: "bbcqzwqhygzstndz",
  },
});

app.post('/text-mail', (req, res) => {
    const {to, subject, text} = req.body
    var mailOptions = {
      from: "gupta.ankit@fxbytes.com",
      to: "ankit.guptamic@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
      html: "<b>Hey There !</b> This is our first message",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } 
      else {
        console.log("Email sent: " + info.response);
        res.status(200).send({message: "Mail Send", message_id: "info.messageId"})
      }
    });
})



app.put("/user/:id", async (req, res) => {

  // json(req.body);
  // return 'stope';
  // try {
  //   const id = req.params.id;
  //   const updates = req.body;
  //   const options = { new: true };
  //   const result = await Product.findByIdAndUpdate(id, updates);
  //   res.send(result);
  // } catch (error) {
  //   console.log(error.message);
  // }
  try {
    const post = await User.findOne({ _id: req.params.id });

    if (req.body.firstname) {
      post.firstname = req.body.firstname;
    }

    if (req.body.lastname) {
      post.lastname = req.body.lastname;
    }

    if (req.body.email) {
      post.email = req.body.email;
    }

    if (req.body.password) {
      post.password = req.body.password;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
  
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findByIdAndDelete(id);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
}),



  app.post("/login", async (req, res) => {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

     await User.findOne({ email: newUser.email })
       .then((profile) => {
         if (!profile) {
           res.send({
             message: "Invalid username or password",
             status: 0,
           });
         } else {
           bcrypt.compare(
             newUser.password,
             profile.password,
             async (err, result) => {
               if (err) {
                 console.log("Error is", err.message);
               } else if (result == true) {
                 res.send({
                   newUser,
                   message: "Login Successfully",
                   status: 1,
                 });
               } else {
                 res.send("User Unauthorized Access");
               }
             }
           );
         }
       })
       .catch((err) => {
         console.log("Error is ", err.message);
       });

    // await User.findOne({ email: newUser.email })
    //   .then(async (profile) => {
    //     if (!profile) {
    //       res.send({
    //         message: "Invalid username or password",
    //         status: 0,
    //       });
    //     } else {
    //       res.send({
    //         message: "Login Successfully",
    //         status: 1,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error is", err.message);
    //   });
  });

app.post("/signup", async (req, res) => {
  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  await User.findOne({ firstname: newUser.firstname })
    .then(async profile => {
      if (!profile) {
        bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
          if (err) {
            console.log("Error is", err.message);
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => {
                res.status(200).send({
                  newUser,
                  message: "Register Successfully",
                });
              })
              .catch(err => {
                console.log("Error is ", err.message);
              });
          }
        });
      } else {
        res.send("User already exists...");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
  });

//   await User.findOne({ firstname: newUser.firstname })
//     .then(async (profile) => {
//       if (!profile) {
//         await newUser
//           .save()
//           .then(() => {
//             res.status(200).send(newUser);
//           })
//           .catch((err) => {
//             console.log("Error is ", err.message);
//           });
//       } else {
//         res.send("User already exists...");
//       }
//     })
//     .catch((err) => {
//       console.log("Error is", err.message);
//     });
// });





app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})  