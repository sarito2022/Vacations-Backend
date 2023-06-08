import { OkPacket } from "mysql2/promise";
import { execute } from "../2-utils/dal";
import { UserModel, UserRole } from "../4-models/UserModel";
import { hash  } from "../3-middleware/hash";

export async function register(firstName: string, lastName: string, email: string, password: string, role:number) {

    password=hash(password);

    // check if email exist
    const query_select = `SELECT * FROM mydb.users2 WHERE email=?`;
    const [rows] = await execute<UserModel[]>(query_select, [email]);

    if(rows[0]==null || rows[0]==undefined) {

        const query = `INSERT INTO mydb.users2(firstName, lastName, email, password, role) VALUES(?,?,?,?,?)`;
        const [result] = await execute<OkPacket>(query, [firstName, lastName, email, password, role]);
        const userID = result.insertId;
        
        return {
            userID ,firstName, lastName, email, password, role
        }
    }else{
        return {
            msg:'email allready exist'
        }
    }
}

export async function login(email: string, password: string  ): Promise<UserModel> {
    password=hash(password);
    const query = `SELECT * FROM mydb.users2 WHERE email=? and password=?`;
  
    const [rows] = await execute<UserModel[]>(query, [email, password]);
    return rows[0];
}

  
  