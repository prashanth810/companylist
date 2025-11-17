import "dotenv/config";

const Envs = {
    // server port number 
    PORT: process.env.PORT,
    // mongo url to connect db 
    MONGO_URL: process.env.MONGO_URL,

    // # cloundnary 
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}


export default Envs;