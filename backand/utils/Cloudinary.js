  import { v2 as cloudinary } from 'cloudinary';
  import dotenv from 'dotenv';
  dotenv.config();


  cloudinary.config({
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY,        
    api_secret:process.env.API_SECRET,  
  });

  console.log(process.env.CLOUD_NAME, " ",process.env.API_KEY, " ",process.env.API_SECRET)
  export const uploadFileToCloudinary = async (files) => {
    try {
      console.log("files in cloudinary", files);
      const fileArray = Array.isArray(files) ? files : [files];
  
      const uploadPromises = fileArray.map((file) =>
        cloudinary.uploader.upload(file.path)
      );
  
      const uploadResults = await Promise.all(uploadPromises);
  
      return uploadResults.map((result) => ({
        secure_url: result.secure_url,
        public_id: result.public_id,
      }));
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  };
  
  const uploadImage = async (imageUrl, publicId) => {
    try {  
      cloudinary.config({
          cloud_name: process.env.CLOUD_NAME, 
          api_key: process.env.API_KEY,        
          api_secret: process.env.API_SECRET,  
        });
      const uploadResult = await cloudinary.uploader.upload(imageUrl, {
        public_id: publicId,  
      });

      console.log('Upload successful:', uploadResult);
      return uploadResult;  
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;  
    }
  };
  export default { cloudinary, uploadImage };
