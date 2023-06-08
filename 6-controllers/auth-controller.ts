import express from 'express';
import {  login, register } from '../5-logic/User-logic';
import { generateToken } from '../2-utils/jwt';
import { NextFunction, Request, Response } from "express";
import { userValidation } from "../4-models/UserModel";

export const authRouter = express.Router();

authRouter.post('/register', userValidation, async (req, res, next) => {
  try{
    const user = req.body;
    user.role=1;

    const res_register= await register(user.firstName, user.lastName, user.email, user.password, user.role);

    if (res_register.msg==undefined) {
      const token = generateToken(res_register);
      let userObj={
        token: token,
      }
      res.json(userObj);
  } else {
      res.json(res_register);
  }

  res.json(res_register);
  
  }catch(e){
      next(e);
  }
});


authRouter.post("/login" , async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await login(email, password);

  if (!user) {
    res.json("The email or password not correct");
    return ;
  }

  const token = generateToken(user);
  let userObj={
    token: token,
  }
  res.json(userObj);
});


