import connectMongo from "../../utils/connectDb";
import createBlog from "../../models/blogModel";
import cloudinary from "cloudinary";

export default async function createblog(req, res) {
  await connectMongo();

  //cloudinary configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  
  
  const blogData = req.body;

  const newBlog = await createBlog.create(blogData);

  res.status(200).send({
    newBlog,
  });
}
