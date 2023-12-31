// we will create 2 function in this first to encrypt and 2 to decrypt

import bcrypt from 'bcrypt'


export const hashPassword = async(password) =>{
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        return hashedPassword;
    }catch(error){
        
    }
};
export const comparePassword = async(password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword);
}