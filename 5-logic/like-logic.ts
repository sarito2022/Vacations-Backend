import { VacationModel } from './../4-models/VacationModel';
import { OkPacket } from "mysql2/promise";
import { execute } from "../2-utils/dal";
import { LikeModel } from "../4-models/Like";

export async function createNewLike(userID: number, vacationID: number) {
    const query = `INSERT INTO mydb.likes(userID, vacationID) VALUES (?,?);`;
    const [result] = await execute<OkPacket>(query, [userID, vacationID]);
    const likeID = result.insertId;
    
    return {
        likeID,
        userID,
        vacationID        
    }
}

export async function deleteLike(userID: number, vacationID: number ){
    const query = "DELETE FROM mydb.likes WHERE userID=? AND vacationID=? ";
    await execute(query, [userID, vacationID]);
}










