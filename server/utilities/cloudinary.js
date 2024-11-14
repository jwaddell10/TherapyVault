const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}


// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_SECRET
//     });
//     //CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dak6py2ng

//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();

// cloudinary.v2.api
//   .create_folder('TherapyVault')
//   .then(console.log);