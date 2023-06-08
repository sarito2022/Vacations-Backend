import { OkPacket } from "mysql2/promise";
import { execute } from "../2-utils/dal";
import { VacationModel } from "../4-models/VacationModel";

export async function getAllVacations(limit:number, offset:number, userID:number): Promise<VacationModel[] | any> {
   
       const query = "SELECT  mydb.vacations.*, t1.count, if(t2.userID=?, 'yes', 'no') 'user_checked' FROM mydb.vacations left join (select count(*) as count ,vacationID from mydb.likes group by vacationID) t1 ON (vacations.vacationID=t1.vacationID) left join  mydb.likes t2 on(vacations.vacationID=t2.vacationID and userID=?) order by mydb.vacations.startDate limit ? , ?";
       const [rows] = await execute<VacationModel[]>(query, [userID ,userID ,limit, offset]);
   
       const query_all = "select count(*) as count_all , vacationID from  mydb.vacations";
       const [rows_all] = await execute<VacationModel[]>(query_all);
   
       let res_final={'rows_all':rows_all[0]['count_all'], rows:rows};
       
       return res_final;
   }

export async function getVacationById(vacationID: number): Promise<VacationModel> {
    const query = `SELECT * FROM mydb.vacations WHERE vacationID=?`;
    const [rows] = await execute<VacationModel[]>(query, [vacationID]);
    if (rows.length === 0) return null;
    return rows[0];
}

export async function createNewVacation(destination: string, description: number, startDate: Date, endDate: Date, price: number,image_path:string ) {
console.log(destination, description, startDate, endDate, price, image_path);
    const query = `INSERT INTO mydb.vacations(destination, description, startDate, endDate, price , image) VALUES (?,?,?,?,?,?);`;
    const [result] = await execute<OkPacket>(query, [destination, description, startDate, endDate, price, image_path]);
    const vacationID = result.insertId;
    
    return {
        vacationID,
        destination,
        description,
        startDate,
        endDate,
        price,
    }
}

export async function updateVacation(destination: string, description: number, startDate: Date, endDate: Date, price: number, vacationID:number , image_path: string) {

    if (image_path) {
        const query = `UPDATE mydb.vacations SET destination=?, description=?, startDate=?, endDate=?, price=?, image=?  WHERE vacationID=?`;
        const [result] = await execute<OkPacket>(query, [destination, description, startDate, endDate, price, image_path, vacationID ]);
    } else {
            const query = `UPDATE mydb.vacations SET destination=?, description=?, startDate=?, endDate=?, price=? WHERE vacationID=?`;
            const [result] = await execute<OkPacket>(query, [destination, description, startDate, endDate, price, vacationID ]);
    }
    
    return {
        vacationID,
        destination,
        description,
        startDate,
        endDate,
        price
    }
}

export async function deleteVacation(vacationID:number){
    const query = "DELETE FROM mydb.vacations WHERE vacationID=?";
    await execute(query, [vacationID]);
}





