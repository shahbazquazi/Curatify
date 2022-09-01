import nextConnect from "next-connect";
import Protected from "../../../../../middleware/Protected";
import Blog from "../../../../../models/blogModel";
import cloudinary from "cloudinary";


const handler = nextConnect({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    },
  }).delete(async (req, res) => {
     try {
      const query = req.query;
      const { id } = query;

      let blog = await Blog.findById({_id : id});
      
       //Delete image from cloudinary
       if (blog && blog.image[0] !== undefined) {
        const image = blog.image[0].public_id;
        await cloudinary.v2.uploader.destroy(image);
      }

      await Blog.findByIdAndDelete({_id : id});

      res.status(201).json({
        success: true,
        blog,
      });
      
     } catch (err) {
        res.status(500).json({ error: err.message });
     }
  })

export default Protected(handler);