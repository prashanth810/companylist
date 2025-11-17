import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import ConnectionDB from "./config/Db.js";
import Envs from "./envs/Envs.js";
import companyroute from "./routes/CompanyRoutes.js";
import fileUpload from "express-fileupload";


const app = express();
const PORT = Envs.PORT || 8000;

// middle wars section 
app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan());
app.use(helmet());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/"
    })
);


// company routes 
app.use('/api/auth', companyroute);


app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "company data getimg from backend !!!" })
})


// db connection 
ConnectionDB().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch (error) {
        console.log("eroor while connecting server !!!")
    }
})



