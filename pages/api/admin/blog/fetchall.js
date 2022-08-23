import nextConnect from "next-connect";
import Protected from "../../../../middleware/Protected";
import Blog from "../../../../models/blogModel";

const fetchAll = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get(async (req, res) => {
  try {
    const id = req.user._id;
    const blogs = await Blog.find({"blogger.id" : id});
    res.status(200).json({
        success: true,
        blogs
    })
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

export default Protected(fetchAll);
