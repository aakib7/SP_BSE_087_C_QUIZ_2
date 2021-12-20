const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const usersSchema = mongoose.Schema({
  user_name: String,
  email: String,
  password: String,
});


function validateUserRegistration(data){
  const schema = Joi.object({
    user_name: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().min(8).required(),
    password: Joi.number().min(8).required(),
  });
  return schema.validate(data, { abortEarly: true });
}
function validateUserLogIn(data){
  const schema = Joi.object({
    email: Joi.string().email().min(8).required(),
    password: Joi.number().min(8).required(),
  });
  return schema.validate(data, { abortEarly: true });
}

const User = mongoose.model("User", usersSchema);

module.exports.User = User;
module.exports.validateUserRegistration = validateUserRegistration;
module.exports.validateUserLogIn = validateUserLogIn;