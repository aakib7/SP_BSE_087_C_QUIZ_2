var express = require("express");
var router = express.Router();
var { Mobile } = require("../../../models/Mobile");
const validateMobile = require("../../../middlewares/validateMobile");
const auth = require("../../../middlewares/auth");
const admin = require("../../../middlewares/admin");



// get all Mobiles
router.get("/",async function (req, res, next) {
  console.log(req.user);
  let mobile = await Mobile.find();
  return res.send(mobile);
});
// get single mobile Mobiles
router.get("/:id", async function (req, res, next) {
  try {
    let mobile = await Mobile.findById(req.params.id);
    if(!mobile) {
      return res.status(400).res.send("Mobile with given id not present")
    }
    return res.send(mobile);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

// update one product
// frist check login (auth)
// then check role is admin (admin)
router.put('/:id', auth, admin, validateMobile ,async (req,res)=>{
  try{
    let mobile = await Mobile.findById(req.params.id);
    if(!mobile) {
      return res.status(400).res.send("Mobile with given id not present")
    }
    mobile.company = req.body.company;
    mobile.model = req.body.model;
    mobile.color = req.body.color;
    mobile.price = req.body.price;
    await mobile.save();
    return res.send(mobile);
  }
  catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
// delete mobile
// frist check login (auth)
// then check role is admin (admin)
router.delete("/:id", auth, admin, async function (req, res, next) {
  try {
    let mobile = await Mobile.findByIdAndDelete(req.params.id);
    if(!mobile) {
      return res.status(400).res.send("Mobile with given id not present")
    }
    return res.send("delete");
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
// insert data
// frist check login (auth)
// then check role is admin (admin)
// then validate mobile 
router.post("/", auth, admin, validateMobile ,async function (req, res, next) {
    let mobile = new Mobile(req.body);
    console.log(req.body);
    await mobile.save();
    res.send(mobile);
});

module.exports = router;

