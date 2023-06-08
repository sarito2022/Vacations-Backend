import { sign } from "jsonwebtoken";
import { UserModel } from "../4-models/UserModel";

export function generateToken(user: UserModel) {
    return sign({
        "sub": user.userID,
        "role": user.role,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email
    }, user.password, { expiresIn: '2h' });
}