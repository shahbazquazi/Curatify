import Protected from "../../../../middleware/Protected";
import createBlogger from "../../../../models/bloggerModel";
import connectMongo from "../../../../utils/connectDb";


const details = async (req, res) => {
  await connectMongo();
  
  try {
    const blogger = await createBlogger.findById(req.user.id);

    //Send response
    res.status(200).json({
      success: true,
      blogger,
    });
  } catch (error) {
    return res.status(501).json({error: "Some server issue happened, Please try again later"})
  }
};

export default Protected(details);
