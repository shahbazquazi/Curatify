import createBlogger from "../../../models/bloggerModel";
import connectMongo from "../../../utils/connectDb";
import sendToken from "../../../utils/jwtToken";


export default async function register(req, res) {
  
  await connectMongo();

  const {method} = req;

  try {
    if (method !== "POST") {
      return res.status(400).json({ error: "Only POST requests are allowed." });
    }
    // console.log(req.body);
    if (req.body.adminKey === process.env.ADMIN_KEY) {
      const { name, email, password } = req.body;

      //create blogger
      const blogger = await createBlogger.create({
        name,
        email,
        password,
      });

      // Once the blogger is created send him the jwt token
      sendToken(blogger, 201, res);

    } else {
        res.status(401).json({error: "Admin-Key is not valid"});
    }
  } catch (error) {
      console.log(error);
  }
}
