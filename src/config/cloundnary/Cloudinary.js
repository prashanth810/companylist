import cloudinary from 'cloudinary';
import Envs from '../../envs/Envs.js';

cloudinary.config({
    cloud_name: Envs.CLOUDINARY_CLOUD_NAME,
    api_key: Envs.CLOUDINARY_API_KEY,
    api_secret: Envs.CLOUDINARY_API_SECRET,
});

export default cloudinary;
