import nextConnect from "next-connect";
import upload from "../../../../../middleware/multer";
import cloudinary from "cloudinary";
import Protected from "../../../../../middleware/Protected";
import Blog from "../../../../../models/blogModel";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(upload.single("image"))
  .put(async (req, res) => {
    try {
      const query = req.query;
      const { id } = query;

      let blog = await Blog.findById({_id : id});

      //Delete image from cloudinary
      if (blog && blog.image[0] !== undefined) {
        const image = blog.image[0].public_id;
        await cloudinary.v2.uploader.destroy(image);
      }

      const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "blogImages",
      });
      let imageLink = [];
      imageLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });

      //Add links to request
      req.body.image = imageLink;
      //Add user id in req.body
      req.body.blogger = {
        id: req.user._id,
        name: req.user.name,
      };
      //create new blog
      blog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(201).json({
        success: true,
        blog,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default Protected(handler);
