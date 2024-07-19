const express = require('express');
const app = express();
const Joi = require('joi');



const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    
    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');

    const data = {
        username:"viswajith99",
        password: "Viswajith@2500",
        repeat_password: "Viswajith@2500",
        birth_year: 1999,
        email:"viswajithharidas0077@gmail.com"

    };
    const result = schema.validate(data);

    if(result.error){
        console.error(result.error.details);
    }else{
        console.log("Data is valid");
    }


app.listen(process.env.PORT || 4000,()=>{
    console.log("Running Successfully");
})