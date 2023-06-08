import { z, ZodError } from 'zod';
import {NextFunction, Request, Response } from "express";

export interface VacationModel {
    vacationID: number;
    destination:string;
    description:string;
    startDate: Date;
    endDate:Date;
    price:number;
    image?:number;
    count?:number;
    user_checked?: string
}

export interface MulterRequest extends Request {
    file: any;
}

export const vacationchema = z.object({
    price: z.number().min(0, { message: "Price should be positive"}).
    max(10000, { message: "Price should be maximum 10000" }),
    startDate: z.date(),
    EndDate: z.date(),
    destination: z.string({
        required_error: "Destination is required",
      }),
    description: z.string({
        required_error: "Description is required",
    })
  }).refine((data) => data.startDate <= data.EndDate, {
    message: "EndDate not bigger then startDate "
  }).refine((data) => data.startDate > new Date(), {
    message: "StartDate cant be in the past "
  });

  export const vacationchemaedit = z.object({
    price: z.number().min(0, { message: "Price should be positive"}).
    max(10000, { message: "Price should be maximum 10000" }),
    startDate: z.date(),
    EndDate: z.date(),
    destination: z.string({
        required_error: "Destination is required",
      }),
    description: z.string({
        required_error: "Description is required",
    })
  }).refine((data) => data.startDate <= data.EndDate, {
    message: "EndDate not bigger then startDate "
  });


export const vacationValidation = (req: Request, res: Response, next: NextFunction) => {

    const vacation = req.body;
    vacation.EndDate = new Date(vacation.EndDate); 
    vacation.startDate = new Date(vacation.startDate);
    vacation.price = parseInt(vacation.price);
    
    try {
        if (req.route.path=='/vacations') {
            let res = vacationchema.parse(vacation);
        } else {
            let res = vacationchemaedit.parse(vacation);
        }
        next();
    } catch (err) {
        res.json(err);
    }
}


