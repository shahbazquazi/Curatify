import Blogger from "../../../models/bloggerModel";
import connectMongo from "../../../utils/connectDb";
import sendToken from "../../../utils/jwtToken";



export default async function login (req, res) {
    
    await connectMongo();
   
    const {method} = req;
    const {email, password} = req.body;

    try {
        if (method !== "POST") {
            return res.status(400).json({ error: "Only POST requests are allowed." });
          }
        
        if(!email || !password) {
            res.status(400).json({
                error: "Enter Your Credentials"
            });
            return ;
        }

        const blogger = await Blogger.findOne({email}).select('+password');

        if(!blogger) {
            res.status(401).json({
                error: "Invalid Email and Password"
            });
            return ;
        }

        //Compare password
        const passwordMatched = await blogger.comparePassword(password);

        if(!passwordMatched) {
            res.status(401).json({
                error: "Invalid Email and Password"
            });
            return ;
        }

        // Once the blogger credentials is matched send him the jwt token
      sendToken(blogger, 200, res);

    } catch (error) {
        res.status(400).json({
            error: "Something went wrong"
        })
    }


}