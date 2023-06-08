import crypto from"crypto";

 export function hash(password:string){
    return crypto.createHash('sha512').update(password).digest('hex');
}






