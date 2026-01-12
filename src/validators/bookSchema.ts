import Joi from 'joi';

// Validation for book data
export const bookSchema = Joi.object({
  title: Joi.string().trim().min(3).max(30).required(),
  author: Joi.string().trim().min(3).max(30).required(),
  publishedYear: Joi.number().integer().required(),
}).required();

export const updateBookSchema = Joi.object({
  title: Joi.string().trim().min(3).max(30).required(),
  author: Joi.string().trim().min(3).max(30).required(),
  publishedYear: Joi.number().integer().required(),
}).required();