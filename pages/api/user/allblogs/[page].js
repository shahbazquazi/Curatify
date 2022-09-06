import nextConnect from "next-connect";
import Blog from "../../../../models/blogModel";
import connectMongo from "../../../../utils/connectDb";

const allblogs = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get(async (req, res) => {
  await connectMongo();

  try {
    const resultPerPage = 10;

    let page = req.query.page >= 1 ? req.query.page : 1;

    page = page - 1;

    const blogs = await Blog.find().sort({createdAt:-1})
      .skip(resultPerPage * page)
      .limit(resultPerPage);

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

export default allblogs;
