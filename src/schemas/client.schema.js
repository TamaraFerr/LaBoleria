import joi from "joi";

const clientsSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().trim().min(10).max(11).pattern(/^\d+$/).required()
});

export default clientsSchema;