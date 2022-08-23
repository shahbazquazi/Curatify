import connectMongo from "../../../../utils/connectDb";
import Blogger from "../../../../models/bloggerModel";
import sendEmail from "../../../../utils/sendEmail";

export default async function forgotPassword(req, res) {
  await connectMongo();

  const { email } = req.body;

  const blogger = await Blogger.findOne({ email });

  if (!blogger) {
    res.status(404).json({ error: "Blogger not found" });
    return ;
  }

  //Get reset password token
  const resetToken = blogger.getResetPasswordToken();

  //Save the blogger
  await blogger.save({ validateBeforeSave: false });
  //Url for reset password
  const resetPasswordUrl = `${process.env.LOCAL_HOST}/admin/password/reset/${resetToken}`;

  //Message to user of reset password
  const message = `Hi ${blogger.name}, \n\nYour password reset token is : \n\n ${resetPasswordUrl} \n\n This token is only valid for 15 minutes.`;
  
  try {
    //Send Email to blogger
    await sendEmail({
      bloggeremail: blogger.email,
      subject: "Curatify Password Recovery",
      message,
    });
    //Send response
    res.status(200).json({
      success: true,
      message: `Email sent to ${blogger.email} successfully`,
    });
  } catch (error) {
    blogger.resetPasswordToken = undefined;
    blogger.resetPasswordExpire = undefined;
    //Save the blogger again
    await blogger.save({ validateBeforeSave: false });
    // Send Error
    res.status(501).json({ error: "Something went very wrong" });
  }
}
