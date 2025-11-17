import cloudinary from '../config/cloundnary/Cloudinary.js';
import CompanyModel from '../model/CompanyModel.js';


const createcompanydata = async (req, res) => {
    try {
        const {
            companyName,
            description,
            industry,
            companyType,
            foundedYear,
            employeesCount,
            address,
            city,
            status,
            country,
            website,
            email,
            phone,
            reviews,
            rating,
            facebook,
            instagram,
            linkedin,
            twitter,
            createdBy
        } = req.body;

        let uploadedImages = [];
        let coverImageUrl = "";

        // ============ 1. Upload Images to Cloudinary ============
        if (req.files && req.files.companyImages) {
            const images = Array.isArray(req.files.companyImages)
                ? req.files.companyImages
                : [req.files.companyImages];

            for (let img of images) {
                const upload = await cloudinary.v2.uploader.upload(img.tempFilePath, {
                    folder: "company_images",
                });

                uploadedImages.push(upload.secure_url);
            }
        }

        // ============ Upload Cover Image ============
        if (req.files && req.files.coverImage) {
            const uploadCover = await cloudinary.v2.uploader.upload(
                req.files.coverImage.tempFilePath,
                {
                    folder: "company_cover_images",
                }
            );

            coverImageUrl = uploadCover.secure_url;
        }

        // ============ 2. Create New Company Document ============
        const newCompany = new CompanyModel({
            companyName,
            description,
            industry,
            coverImage: coverImageUrl,
            companyType,
            foundedYear,
            employeesCount,
            address,
            city,
            status,
            country,
            website,
            email,
            phone,
            reviews,
            rating,
            socialLinks: {
                facebook,
                instagram,
                linkedin,
                twitter,
            },
            companyImages: uploadedImages,
            createdBy,
        });

        await newCompany.save();

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            data: newCompany,
        });
    } catch (error) {
        console.log("CREATE COMPANY ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const getallcomapnydata = async (req, res) => {
    try {
        const response = await CompanyModel.find({});
        if (!response) {
            return res.status(404).json({ success: false, message: "No Company data found !!!" });
        }
        return res.status(200).json({ success: true, data: response });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


const getsinglecompanydata = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await CompanyModel.findById(id);

        if (!response) {
            return res.status(404).json({ success: false, message: "Company data not fund !!!" });
        }
        res.status(200).json({ success: true, data: response });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const deletecompanydata = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await CompanyModel.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ success: false, message: "Comapny is not found !!!" });
        }

        return res.status(200).json({ success: true, message: "Compant data deleted successfullly !!!" });

    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


const searchCompany = async (req, res) => {
    try {
        const { name, city, status, country } = req.query;
        let query = {};
        if (name) {
            query.companyName = { $regex: name, $options: "i" };
        }
        if (city) query.city = { $regex: city, $options: "i" };
        if (status) query.status = { $regex: status, $options: "i" };
        if (country) query.country = { $regex: country, $options: "i" };
        if (industry) query.industry = { $regex: industry, $options: "i" };

        const results = await CompanyModel.find(query);

        if (!results || results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No companies found for given search filters",
            });
        }

        return res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });

    } catch (error) {
        console.error("SEARCH COMPANY ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getCompaniesByIndustry = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Industry name is required"
            });
        }

        const companies = await CompanyModel.find({
            industry: { $regex: name, $options: "i" }
        });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No companies found for this industry"
            });
        }

        return res.status(200).json({
            success: true,
            count: companies.length,
            data: companies
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export { getallcomapnydata, getsinglecompanydata, deletecompanydata, createcompanydata, searchCompany, getCompaniesByIndustry };