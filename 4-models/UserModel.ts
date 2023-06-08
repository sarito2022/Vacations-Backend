import { z, ZodError } from 'zod';
import {NextFunction, Request, Response } from "express";


export enum UserRole {
    Admin, User
}

export interface UserModel{
    userID?:number;
    firstName?: string; 
    lastName?: string;
    email?: string;
    password?: string;
    role?: UserRole
}

export const userschema = z.object({
    password: z.string().min(4, { message: "Password 4 tags min"}),
    firstName: z.string({
        required_error: "FirstName is required",
      }),
    lastName: z.string({
        required_error: "LastName is required",
    }),
    email:z.string({
        required_error: "Email is required",
      }),
})
.refine((data) => data.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/), {
    message: "email not valid "
  });


export const userValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        let userobj = req.body;
        let res = userschema.parse(userobj);
        next();
    } catch (err) {
        res.json(err);
    }
}
