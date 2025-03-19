import cloudinary, { uploadFileToCloudinary } from '../utils/Cloudinary.js';  // Cloudinary instance
import Product from '../model/servicesModel.js';


// This is the controller for handling product uploads
export const uploadProduct = async (req, res) => {
  try {
    const { title, price, type, description, offerings, top } = req.body;

    console.log("req", req.files);

    const bannerImage = req.files.bannerImage[0] 
    

    const bannerImageUpload = await uploadFileToCloudinary(bannerImage)
    console.log("bannerImageUpload", bannerImageUpload);
    const imagesUpload = await uploadFileToCloudinary(req.files.images)
  
    // Create new product with Cloudinary URLs and other form data
    const newProduct = new Product({
      title,
      price,
      type,
      description,
      offerings: JSON.parse(offerings),  // Assuming offerings is a JSON string
      bannerImage: bannerImageUpload[0],
      images: imagesUpload,  // Cloudinary URL for the banner image
      top: top === 'true',  // Convert 'top' to boolean
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with success message and product data
    res.json({ message: 'Product created successfully', product: newProduct });

  } catch (error) {
    console.log('Error dursdfsdfing upload and save:', error);
    res.status(500).json({ message: 'Error uploading image and saving product data' });
  }
};

export default uploadProduct;
