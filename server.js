import express from 'express'
import FileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import session from 'express-session'
import sequelizeStore from 'connect-session-sequelize'
import cors from 'cors'
import db from './config/DatabaseConnection.js'
import UserRoute from './routes/UserRoute.js'
import LoginRoute from './routes/LoginRoute.js'
import ProductRoute from './routes/ProductRoute.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import DeleteSession from './DeleteSession.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()
const app = express();


const sessionStore = sequelizeStore(session.Store)
const store = new sessionStore({
    db: db
});

// (async () => {
//     await db.sync()
// })();


app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin:
        ['http://localhost:3668'],
    // 'http://localhost:4433'

}))

app.use(express.static("public"));
app.use(express.json())
app.use(FileUpload());
app.use(UserRoute)
app.use(LoginRoute)
app.use(ProductRoute)
app.use(DeleteSession)
// store.sync();



const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
    console.log(`Server connected Successfully\nand it is running on\nhttp://localhost:${PORT}`);
});


export default app




