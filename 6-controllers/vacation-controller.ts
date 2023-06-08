import { Router } from "express";
import { createNewVacation, getAllVacations, getVacationById, updateVacation, deleteVacation } from "../5-logic/vacation-logic";
import { vacationValidation , MulterRequest} from "../4-models/VacationModel";
import path from 'path';

export const vacationRouter = Router();

vacationRouter.get('/vacations', async (req, res, next) => {
    try{
        const vacations = await getAllVacations(req.query.myFormData['limit'],req.query.myFormData['offset'],req.query.myFormData['userID'].sub);
       
        res.json(vacations);
    }catch(e){
        next(e);
    }
})

vacationRouter.get('/vacations/:vacationID([0-9]+)', async (req, res, next) => {
    const vacation = await getVacationById(+req.params.vacationID);
    res.sendFile(path.resolve('1-assets/' + vacation.vacationID + '.png'));

        if (!vacation) {
            res.sendStatus(404);
            return;
        }
        res.json(vacation);
})

vacationRouter.post('/vacations', vacationValidation, async (req: MulterRequest, res, next) => {
    try{
        let destination=req.body.destination as any;
        let description=req.body.description as any;
        let startDate=req.body.startDate as any;
        let endDate=req.body.EndDate as any;
        let price=req.body.price as any;

        var todayDate = new Date(); 
        var dateOne = new Date(startDate);

        var fs = require('fs');

        const tempPath = req.files['file'].tempFilePath;
        let time_now=new Date().getTime();
        let image_type=req.files['file'].mimetype.split('/');
        let image_path=String(time_now+'.'+image_type[1]);
        const targetPath = "./public/1-assets/"+time_now+'.'+image_type[1];
        
        fs.rename(tempPath, targetPath, function (err) {
        if (err) throw err;
        });

        const vacation = await createNewVacation(destination, description, startDate, endDate, price, image_path);

        res.json(vacation);
    }catch(e){
        next(e);
    }
})

vacationRouter.put('/vacations/:vacationID([0-9]+)', vacationValidation, async (req:MulterRequest, res, next) => {
    try{
        let vacationID=req.params.vacationID as any;
        let destination=req.body.destination as any;
        let description=req.body.description as any;
        let startDate=req.body.startDate as any;
        let endDate=req.body.EndDate as any;
        let price=req.body.price as any;
        let image_path="";

        if (req.files) {
            var fs = require('fs');

            const tempPath = req.files['file'].tempFilePath;
            let time_now=new Date().getTime();
            let image_type=req.files['file'].mimetype.split('/');
            image_path=String(time_now+'.'+image_type[1]);
            const targetPath = "./public/1-assets/"+time_now+'.'+image_type[1];
            
            fs.rename(tempPath, targetPath, function (err) {
            if (err) throw err;
            });
        }

        const vacation = await updateVacation(destination, description,startDate, endDate, price, vacationID ,image_path);

        res.json(vacation);
    }catch(e){
        next(e);
    }
})

vacationRouter.delete('/vacations/:ProductID([0-9]+)', async (req, res, next) => {
    try{
    await deleteVacation(+req.params.ProductID);
    res.sendStatus(204);
    }catch(e){
        next(e);
    }
})



