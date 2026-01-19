import { AppError } from "./appError";
import cloudinary from "./cloudinary";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const uploadToCloudinary = async (file, folder, fieldname) => {

    if (!file || typeof file === "string") return
    // ✅ Validate file
    filter(file, fieldname)

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    if (file.size > MAX_SIZE) {
        throw new AppError("File too large", {
            [fieldname]: "Max file size is 5MB"
        }, 400);
    }

    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder,
                    resource_type: "image",
                    transformation: [
                        { width: 800, height: 600, crop: "limit" },
                        { quality: "auto" },
                        { format: "webp" },
                    ],
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            )
            .end(buffer);
    });
};

const filter = (file, fieldname) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedImageTypes.includes(file.type)) {
        throw new AppError('Invalid file type', { [fieldname]: `${fieldname} must be an image file` }, 400)
    }

}

