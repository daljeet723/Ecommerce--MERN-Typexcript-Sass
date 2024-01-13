//This file contains all the aparameters that we need to pass in requet body for API.
//In typescript, it is required to pass datatype also.
//So we will ceate all request body parameters here and acll it in controller file api

import { NextFunction, Request, Response } from "express";

export interface newUserRequestBody {
    name: string,
    email: string,
    photo: string,
    gender: string,
    dob: Date,
    _id: string,

}

//controllerType is a function that takes req, res, and next, 
//and returns a Promise that resolves to either void or a Response with some data.
export type controllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>