import * as dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import router from './routes/routes.js'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  });

app.get('/', (req,res) => {
    res.send({message: 'Hello World'});
})

app.use('/appdata', router);

app.use('/users', userRouter);

app.use('/auth', authRouter)


const startServer = async () => {
    try{
        connectDB(process.env.MONGO_URL);
        app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
    } catch (error){
        console.log(error);
    }
}

startServer();

