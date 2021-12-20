var express = require("express");
var router = express.Router();
var { Mobile } = require("../../../models/Mobile");
const validateMobile = require("../../../middlewares/validateMobile");
const auth = require("../../../middlewares/auth");


// get all Mobiles
router.get("/", auth ,async function (req, res, next) {
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
router.put('/:id', validateMobile ,async (req,res)=>{
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
router.delete("/:id", async function (req, res, next) {
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
router.post("/", validateMobile ,async function (req, res, next) {
    let mobile = new Mobile(req.body);
    console.log(req.body);
    await mobile.save();
    res.send(mobile);
});

module.exports = router;

