import joi from "joi";

const cakesSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().required(),
    image: joi.string().uri().required(),
    description: joi.string().empty('')
});

export default cakesSchema;