//This file contains all the aparameters that we need to pass in requet body for API.
//In typescript, it is required to pass datatype also.
//So we will ceate all request body parameters here and acll it in controller file api

export interface newUserRequestBody{
    name:string,
    email:string,
    photo:string,
    gender:string,
    role:string,
    dob:Date,
    _id:string,

}