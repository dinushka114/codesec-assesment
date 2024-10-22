import UserModel from "../models/user.model.js";
import generateToken from "../utils/gen.token.js";

const registerService = async(userInputs, res)=>{

    const { firstName, lastName, email, phone, password } = userInputs;

    const userExistsEmail = await UserModel.findOne({ email });
    const userExistsPhone = await UserModel.findOne({ phone });

    if(userExistsEmail){
        return {message:"User already exists with this email", status:400}
    }

    if(userExistsPhone){
        return {message:"User already exists with this phone no", status:400}
    }

    const user = await UserModel.create({
        firstName,
        lastName,
        email,
        phone,
        password
    });

    if (user) {
        generateToken(res, user._id);
        return {"message":{
            _id: user._id,
            name: user.firstName,
            email: user.email
        }, status:201}
    } else {
        return {message:"Invalid user data", status:500}
    }
}

const loginService = async(userInputs, res)=>{
    const {email, password } = userInputs;

    const user = await UserModel.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);

        return {message:{
            _id:user._id,
            name:user.firstName,
            email:user.email
        }, status:201}
        
    }else{
        return {message:"Your password or username is incorrect", status:400}
    }
}

export {registerService, loginService}