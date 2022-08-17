import connectMongo from "../../utils/connectDb";
import createBlog from "../../models/blogModel";

export default async function getblogs(req, res) {
    await connectMongo();
    
    try {
        const Blogs = await createBlog.find();

        res.status(200).json({
            Blogs,
        })
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
   
}