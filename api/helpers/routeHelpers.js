const Joi = require('joi');

module.exports = {
    validateBody: (schema)=>{
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                console.log(req.body)
                return res.status(400).json(result.error);
            }
            next();
        }
    },
    schemas: {
        authschema: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    }

}