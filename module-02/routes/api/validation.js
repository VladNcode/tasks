const Joi = require('joi');

exports.contactValidationSchema = Joi.object({
	name: Joi.string().alphanum().min(3).max(30),
	email: Joi.string().email(),
	phone: Joi.string().alphanum().min(8).max(20),
});
