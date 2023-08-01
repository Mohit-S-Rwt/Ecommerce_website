// this helps in registering the user 
// callback function hai islye req and res hai ;

import { hashPassword } from "../helpers/authHelper.js";

export const registerController = async( req, res)=>{
    try {
        // using destructuring 
        const {name, email, password,phone ,address} = req.body

        // validations
        if(!name){
            return res.send({error :"Name is required"})
        }
        if(!email){
            return res.send({error :"email is required"})
        }
        if(!password){
            return res.send({error :"password is required"})
        }
        if(!phone){
            return res.send({error :"phoneNumber is required"})
            
        }
        if(!address){
            return res.send({error :"address is required"})
        }

        // checking the user 
        const exisitngUser = await userModel.findOne({email:email})

         // existing user
         if(exisitngUser){
            return res.status(200).send({
                success : true,
                message : "Already Register please login"
            })

            // register user 
            const hashedPassword  = await hashPassword(password)
            const user = new userModel({name,email,address, password:hashedPassword}).save()

            res.status(201).send({
                success :true,
                message:'User Already Registered',
                user,
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in registration",
            error
        })
    }
};

