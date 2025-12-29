import { body } from "express-validator";
import { EChatSchema } from "~/schemas/chat.schema.ts";

export const chatValidatorMiddleware = [
  body(EChatSchema.role)
    .notEmpty()
    .withMessage("role field should not be empty!")
    .isString()
    .withMessage("role field should be string!")
    .escape(),
  body(EChatSchema.content)
    .notEmpty()
    .withMessage("content field should not be empty!")
    .isString()
    .withMessage("message field must be string!")
    .escape(),
];
