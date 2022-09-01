import nextConnect from "next-connect";
import Protected from "../../../../../middleware/Protected";
import Blog from "../../../../../models/blogModel";

const fetchDetails = nextConnect({
    onError: (err, req, res, next) => {
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    },
  }).get(async (req, res) => {
    try {
      const query = req.query;
      const { id } = query;

      const blog = await Blog.findById(id);

      res.status(200).json({
          success: true,
          blog
      })
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  });
  
  export default Protected(fetchDetails);