
import mongoose from "mongoose";

import validator from "validator";


//To use "User.age" as it does not exists in schema, so using Interface
interface IUser extends Document{
    _id:string;
    name:string;
    email:string;
    photo:string;
    role:"admin" | "user";
    dob:Date;
    gender:"male" | "female";
    createdAt:Date;
    updatedAt:Date;
    age:number //Virtual attribute

}


const schema = new mongoose.Schema({

    //usually mongodb automatically generates id,
    //as we are using "Firebase" in frontend for authentication 
    //google auth has some id that starts with 'U', so we will be sendong our own id
    _id: {
        type: String,
        required: [true, "Please enter ID"]
    },
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter email"],
        validate: validator.default.isEmail
    },
    photo: {
        type: String,
        required: [true, "Please add photo"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    dob: {
        type: Date,
        required: [true, "Please enter date of birth"]
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please select gender"]
    },


},
    {
        timestamps: true
    }
);


//To calculate age whenever dob changes, we will use virtual
schema.virtual("age").get(function () {
    const today = new Date();
    const userDob = this.dob; //this indicates specific user/ current user
    let age = today.getFullYear() - userDob.getFullYear();

    //if today is Feb and dob is Oct month
    //or if both today and dob is Oct,
    // reduce age
    if (today.getMonth() < userDob.getMonth() ||
        today.getMonth() === userDob.getMonth() &&
        today.getDate() < userDob.getDate()) {
        age--;
    }
    return age;
})


export const User = mongoose.model<IUser>("User", schema);


// To use validator:
//     install validator = npm i validator
//     to add dependency for typescript = npm i --save-dev @types/validator