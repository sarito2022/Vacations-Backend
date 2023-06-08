import { Router } from "express";
import { createNewLike, deleteLike  } from "../5-logic/like-logic";
import { createNewVacation, getAllVacations, getVacationById, updateVacation, deleteVacation } from "../5-logic/vacation-logic";

export const likeRouter = Router();

likeRouter.post('/likes', async (req, res, next) => {
    try{
        let userID=req.body.userID as any;
        let vacationID=req.body.vacationID as any; 
       
        const like = await createNewLike(userID, vacationID);
        res.json(like);
    }catch(e){
        next(e);
    }
})

likeRouter.delete('/likes', async (req, res, next) => {
    try{
     await deleteLike(req.body.userID, req.body.vacationID );
    res.sendStatus(204);
    }catch(e){
        next(e);
    }
})








