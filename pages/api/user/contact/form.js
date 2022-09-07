import nextConnect from "next-connect";
import contactEmail from "../../../../utils/contactEmail";

const contactForm = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post(async (req, res) => {
  try {

    const { name, email, message } = req.body;
    await contactEmail({
      email,
      subject: `Sent by ${name} and Email: ${email}`,
      message,
    });
    //Send response
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

export default contactForm;
