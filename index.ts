import express, { json } from 'express';
import { vacationRouter } from './6-controllers/vacation-controller';
import { authRouter } from './6-controllers/auth-controller';
import { likeRouter } from './6-controllers/like-controller';
import cors from "cors";
var fileupload = require("express-fileupload");
const path = require("path");

const server = express();

server.use(express.static(path.join(__dirname,'public')));
server.use('/static',express.static('public'));

server.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

server.use(json());
server.use(cors());

server.use('/api', vacationRouter);
server.use('/api', likeRouter);
server.use('/api', authRouter);

server.listen(4000, () => {
    console.log('Listening on port 3000...');
})