const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const mobileSchema = mongoose.Schema({
  company: String,
  model: String,
  color: String,
  price: Number,
});

function validateMobile(data){
  const schema = Joi.object({
    company: Joi.string().min(3).max(10).required(),
    model: Joi.string().min(3).max(10).required(),
    color: Joi.string().min(3).max(10).required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

const Mobile = mongoose.model("Mobiles", mobileSchema);
module.exports.Mobile = Mobile;
module.exports.validate = validateMobile;






// install npm i @hapi/joi   for validation
// and than make an midle where