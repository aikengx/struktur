// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();

// User model
const User = require("../models/user");
const Manufacturer = require("../models/manufacturer");
const System = require("../models/system");
const Product = require("../models/product");
// Cloudinary
const uploadCloud = require('../config/cloudinary.js');
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
//
const passport = require("passport");
//
const ensureLogin = require("connect-ensure-login");
//
function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.render('forbidden', { 
        title: 'Struktur - Forbidden', 
        user: req.user
      });
    }
  }
}
//
authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup", {
    title: 'Struktur - Register' 
  });
});

authRoutes.post("/signup", (req, res, next) => {
  //console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const name  = req.body.name;
  const lname = req.body.lname;
  const email = req.body.email;
  const phone = req.body.phone;
  const company = req.body.company;
  //const role = req.body.role;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      name,
      lname,
      email,
      phone,
      company
      //role
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        //console.log(`=> ${req.body.username}`);
        res.render("user-created", {
          user: req.user,
          title: 'Struktur - User Created' 
        });
      }
    });
  })
  .catch(error => {
    next(error)
  })
});
//
authRoutes.get("/login", (req, res, next) => {
  //console.log(req.user);
  //res.render("auth/login");
  res.render("auth/login", {
    user: req.user,
    title: 'Struktur - Login / Logout',
    "message": req.flash("error") 
  });
});
//
authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));
//
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
//
authRoutes.get("/home", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("home", { 
    user: req.user,
    title: 'Struktur - User Home' 
  });
});
//
authRoutes.get("/users", ensureLogin.ensureLoggedIn(), checkRoles('ADMIN'), (req, res) => {
  User.find()
  .then(dbUsers => {
    //console.log(dbUsers);
    res.render("users", { 
      user: req.user,
      title: 'Struktur - Users',
      hbsUsers: dbUsers
    });
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.get("/user/delete/:id", ensureLogin.ensureLoggedIn(), checkRoles('ADMIN'), (req, res) => {
  User.deleteOne({'_id': req.params.id})
  .then(() => {
    //console.log(dbUser);
    res.render("resource-deleted", { 
      message: "User succesfully removed",
      title: 'Struktur - User Deleted',
      user: req.user
    });
    /*
    res.render("users", { 
      user: req.user,
      title: 'Struktur - Users',
      hbsUsers: dbUsers
    });
    */
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.get("/user/update/:id", ensureLogin.ensureLoggedIn(), checkRoles('ADMIN'), (req, res) => {
  User.findOne({'_id': req.params.id})
  .then(dbUser => {
    //console.log(dbUser);
    //console.log(dbUser);
    res.render("edit-user", {
      hbsUser: dbUser, 
      title: 'Struktur - Edit User' 
    });
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.post("/user/update/:id", ensureLogin.ensureLoggedIn(), checkRoles('ADMIN'), (req, res) => {
  //console.log(req.body, req.params, req.query);i
  //const body = req.body;
  //console.log(req.params, req.body);
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hashPass;
  //console.log(req.body);
  User.update({'_id': req.params.id}, { $set: req.body })
  .then((User) => {
    //console.log(dbUser);
    //console.log(dbUser);
    res.render("user-edited", {
      user: req.user,
      title: 'Struktur - User Edited' 
    });
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.get("/user/password/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("edit-password", {
    user: req.user,
    title: 'Struktur - Update Password' 
  })
});
  //console.log(req.body, req.params, req.query);
    //console.log(dbUser);
    
//
authRoutes.post("/user/password/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  //console.log(req.body);
  if (req.body.password1 === req.body.password2) {
    //console.log(req.body);
    //console.log(req.user);
    //console.log(req.body.password1);
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password1, salt);
    //req.body.password1 = hashPass;
    User.update({'_id': req.user._id}, { $set: {'password': hashPass}})
    .then((User) => {
      //console.log(dbUser);
      //console.log(dbUser);
      res.render("password-updated", {
        user: req.user,
        title: 'Struktur - Password Updated' 
      });
    })
    .catch(err => {
      console.log(err);
    })
  } else {
    //console.log(req.params.query);
    res.render('edit-password', {
      title: 'Struktur - Update Password', 
      message: "Passwords DO NOT match",
      user: req.user
    })
  }
});
  /*
  User.findOne({'_id': req.params.id})
  .then(dbUser => {
    //console.log(dbUser);
    res.render("edit-password", {
      user: dbUser,
      title: 'Struktur - Password Updated' 
    })
  })
  */
//
authRoutes.get("/manufacturer/add", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("add-manufacturer", { 
    user: req.user,
    title: 'Struktur - Add Manufacturer' 
  });
});
//
authRoutes.post("/manufacturer/add", ensureLogin.ensureLoggedIn(), uploadCloud.single('logo'), (req,res) => {
  //console.log(req.body);
  //console.log(req.user);
  //const { name, website } = req.body;
  const name = req.body.name;
  const website = req.body.website;
  const created_by = `${req.user.name} ${req.user.lname}`;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newManufacturer = new Manufacturer({name, website, created_by, imgPath, imgName})
  if (name === "" || website === "") {
    res.render("add-manufacturer", {
      user: req.user,
      title: 'Struktur - Add Manufacturer',
      message: "Indicate name and url" 
    });
  }
  Manufacturer.findOne({ 'name': name })
  .then(manufacturer => {
    //console.log(`=> ${manufacturer}`)
    if (manufacturer !== null) {
      //console.log("NOT NULL");
      res.render("add-manufacturer", {
        message: "The manufacturer already exists",
        user: req.user,
        title: 'Struktur - Add Manufacturer'
      });
      return;
    }
    newManufacturer.save((err) => {
      if (err) {
        res.render("add-manufacturer", {
          user: req.user,
          title: 'Struktur - Add Manufacturer',
          message: err
        });
      } else {
        //console.log(`=> ${req.body.username}`);
        res.render("add-manufacturer", {
          message: "Manufacturer succesfully created",
          user: req.user,
          title: 'Struktur - Add Manufacturer'
        });
      }
    });
  })
  .catch(error => {
    console.log(error)
  })
});
//
authRoutes.get("/system/add", ensureLogin.ensureLoggedIn(), (req, res) => {
  Manufacturer.find({}, { 'name': 1, '_id': 0 })
  .then(manufacturerList => {
    //console.log(`=> ${manufacturerList}`);
    res.render("add-system", { 
      user: req.user,
      title: 'Struktur - Add System',
      list: manufacturerList
    });
  })
});
//
authRoutes.post("/system/add", ensureLogin.ensureLoggedIn(), (req,res) => {
  //console.log(req.body);
  //console.log(req.user);
  //const { name, website } = req.body;
  const name = req.body.name;
  const description = req.body.description;
  const manufacturer = req.body.manufacturer;
  const created_by = `${req.user.name} ${req.user.lname}`;
  //const imgPath = req.file.url;
  //const imgName = req.file.originalname;
  const newSystem = new System({name, description, manufacturer, created_by})
  if (name === "" || description === "" || manufacturer === "") {
    res.render("add-system", {
      user: req.user,
      title: 'Struktur - Add System',
      message: "Indicate name and url" 
    });
  }
  System.findOne({ 'name': name })
  .then(system => {
    //console.log(`=> ${manufacturer}`)
    if (system !== null) {
      //console.log("NOT NULL");
      Manufacturer.find({}, { 'name': 1, '_id': 0 })
      .then(manufacturerList => {
        res.render("add-system", {
          message: "The system already exists",
          user: req.user,
          title: 'Struktur - Add System',
          list: manufacturerList
        });
      })  
      return;
    }
    newSystem.save((err) => {
      if (err) {
        res.render("add-system", {
          user: req.user,
          title: 'Struktur - Add System',
          message: err
        });
      } else {
        //console.log(`=> ${req.body.username}`);
        Manufacturer.find({}, { 'name': 1, '_id': 0 })
        .then(manufacturerList => {
          res.render("add-system", {
            message: "System succesfully created",
            user: req.user,
            title: 'Struktur - Add System',
            list: manufacturerList
          });
        })
      //res.redirect('/system/add');
      }
    });
  })
  .catch(error => {
    console.log(error)
  })
});
//
authRoutes.get("/systems", ensureLogin.ensureLoggedIn(), (req, res) => {
  System.find()
  .then(dbSystems => {
    //console.log(dbUsers);
    res.render("systems", { 
      user: req.user,
      title: 'Struktur - Systems',
      hbsSystems: dbSystems
    });
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.get("/manufacturers", ensureLogin.ensureLoggedIn(), (req, res) => {
  Manufacturer.find()
  .then(dbManufacturers => {
    //console.log(dbUsers);
    res.render("manufacturers", { 
      user: req.user,
      title: 'Struktur - Manufacturers',
      hbsManufacturers: dbManufacturers
    });
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.get("/manufacturer/update/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  Manufacturer.findOne({'_id': req.params.id})
  .then(dbManufacturer => {
    //console.log(dbUser);
    //console.log(dbUser);
    res.render("edit-manufacturer", {
      hbsManufacturer: dbManufacturer, 
      title: 'Struktur - Edit Manufacturer',
      user: req.user
    });
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.post("/manufacturer/update/:id", ensureLogin.ensureLoggedIn(), uploadCloud.single('logo'), (req, res) => {
  //console.log(`iewewewewe=> ${req.body}, ${req.params}, ${req.query}`);
  let body = req.body
  if (req.file !== undefined) {
     body.imgPath = req.file.url;
     body.imgName = req.file.originalname;
  }
  // console.log("PICTURE ADDED!!!");
  // console.log(req.body, req.params, req.query, req.file);
  // const name = req.body.name;
  // const website = req.body.website;
  // const created_by = `${req.user.name} ${req.user.lname}`;
  // const imgPath = req.file.url;
  // const imgName = req.file.originalname;
  // //console.log(req.file.url);
  
  //console.log(req.file.originalname);
  //const body = req.body;
  //console.log(req.params, req.body);
  //const salt = bcrypt.genSaltSync(bcryptSalt);
  //const hashPass = bcrypt.hashSync(req.body.password, salt);
  //req.body.password = hashPass;
  //console.log(req.body);
  Manufacturer.updateOne({'_id': req.params.id}, { $set: body } )
  .then((Manufacturer) => {
    //console.log(dbUser);
    //console.log(dbUser);
    res.render("resource-deleted", { 
      message: "Manufacturer succesfully edited",
      title: 'Struktur - Manufacturer Edited',
      user: req.user
    });
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.get("/manufacturer/delete/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  Manufacturer.deleteOne({'_id': req.params.id})
  .then(() => {
    //console.log(dbUser);
    res.render("resource-deleted", { 
      message: "Manufacturer succesfully removed",
      title: 'Struktur - Manufacturer Deleted',
      user: req.user
    });
    /*
    res.render("users", { 
      user: req.user,
      title: 'Struktur - Users',
      hbsUsers: dbUsers
    });
    */
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.get("/system/update/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  let dbList = "";
  Manufacturer.find({}, { 'name': 1, '_id': 0 })
  .then(manufacturerList => {
    dbList = manufacturerList;
  })
  .catch(err => {
    console.log(err);
  })
  System.findOne({'_id': req.params.id})
  .then(dbSystem => {
    //console.log(dbSystem);
    //console.log(dbList);
    res.render("edit-system", {
      hbsSystem: dbSystem, 
      title: 'Struktur - Edit System',
      user: req.user,
      list: dbList
    });
  })
  .catch(err => {
    console.log(err);
  })
})
//
authRoutes.post("/system/update/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  //console.log(req.body, req.params, req.query);
  System.updateOne({'_id': req.params.id}, { $set: req.body } )
  .then((dbSystem) => {
    //console.log(dbUser);
    //console.log(dbUser);
    res.render("resource-deleted", { 
      message: "System succesfully edited",
      title: 'Struktur - System Edited',
      user: req.user
    });
  })
  .catch(err => {
    console.log(err);
  })
})
//
authRoutes.get("/system/delete/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  System.deleteOne({'_id': req.params.id})
  .then(() => {
    //console.log(dbUser);
    res.render("resource-deleted", { 
      message: "Manufacturer succesfully removed",
      title: 'Struktur - System Deleted',
      user: req.user
    });
    /*
    res.render("users", { 
      user: req.user,
      title: 'Struktur - Users',
      hbsUsers: dbUsers
    });
    */
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.get("/product/add", ensureLogin.ensureLoggedIn(), (req,res) => {
  let dbList = "";
  let dbList2 = "";
  Manufacturer.find({}, { 'name': 1, '_id': 0 })
  .then(manufacturerList => {
    dbList = manufacturerList;
    System.find({}, { 'name': 1, 'manufacturer': 1, '_id': 0 }) //
    .then(dbSystems => {
      dbList2 = dbSystems;
      //console.log(dbList2);
      res.render("add-product", { 
        //message: "Manufacturer succesfully removed",
        title: 'Struktur - Add Product',
        user: req.user,
        list: dbList,
        list2: dbList2
      });
    })
    .catch(err => {
      console.log(err);
    })
      
    //console.log(dbList);
  })
  .catch(err => {
    console.log(err);
  })
})
//
authRoutes.post("/product/add", ensureLogin.ensureLoggedIn(), (req,res) => {
  console.log(req.body, req.params, req.query);
  const name = req.body.name;
  const manufacturer = req.body.manufacturer;
  const system = req.body.system;
  const url = req.body.url;
  const imgUrl = req.body.imgUrl;
  const part_number = req.body.partNum;
  const description = req.body.description;
  const created_by =`${req.user.name} ${req.user.lname}`;
  const newProduct = new Product({name, manufacturer, system, url, imgUrl, part_number, description, created_by})
  Product.findOne({ 'part_number': part_number })
  .then(product => {
    if (product !== null) {
      res.render("add-product", {
        message: "The product already exists",
        user: req.user,
        title: 'Struktur - Add Product'
      });
    } else {
      newProduct.save(err => {
        if (err) {
          res.render("add-product", {
            message: err,
            user: req.user,
            title: 'Struktur - Add Product'
          });  
        } else {  
          let dbList = "";
          let dbList2 = "";
          Manufacturer.find({}, { 'name': 1, '_id': 0 })
          .then(manufacturerList => {
            dbList = manufacturerList;
            System.find({}, { 'name': 1, 'manufacturer': 1, '_id': 0 }) //
            .then(dbSystems => {
              dbList2 = dbSystems;
              //console.log(dbList2);
              res.render("add-product", { 
              //message: "Manufacturer succesfully removed",
              title: 'Struktur - Add Product',
              message: "System succesfully created",
              user: req.user,
              list: dbList,
              list2: dbList2
              });  
            })
            .catch(err => {
              console.log(err);
            })
          })
          .catch(err => {
            console.log(err);
          })
        }
      })
    }
  })
  .catch(err => {
    console.log(err);
  })
  return;
})
//
authRoutes.get("/products", ensureLogin.ensureLoggedIn(), (req, res) => {
  Product.find()
  .then(dbProducts => {
    //console.log(dbUsers);
    res.render("products", { 
      user: req.user,
      title: 'Struktur - Products',
      hbsProducts: dbProducts
    });
  })
  .catch(err => {
    console.log(err);
  })
})
//
authRoutes.get("/product/delete/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  Product.deleteOne({'_id': req.params.id})
  .then(() => {
    //console.log(dbUser);
    res.render("resource-deleted", { 
      message: "Product succesfully removed",
      title: 'Struktur - Product Deleted',
      user: req.user
    });
    /*
    res.render("users", { 
      user: req.user,
      title: 'Struktur - Users',
      hbsUsers: dbUsers
    });
    */
  })
  .catch(err => {
    console.log(err);
  })
});
//
authRoutes.get("/product/update/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  let dbList = "";
  let dbList2 = "";
  Manufacturer.find({}, { 'name': 1, '_id': 0 })
  .then(manufacturerList => {
    dbList = manufacturerList;
    System.find({}, { 'name': 1, 'manufacturer': 1, '_id': 0 }) //
    .then(dbSystems => {
      dbList2 = dbSystems;
      //console.log(dbList2);
      Product.findOne({'_id': req.params.id})
      .then(dbProduct => {
      //console.log(dbSystem);
      //console.log(dbList);
        res.render("edit-product", {
          hbsProduct: dbProduct, 
          title: 'Struktur - Edit Product',
          user: req.user,
          list: dbList,
          list2: dbList2
        });
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  })
})
//
module.exports = authRoutes;