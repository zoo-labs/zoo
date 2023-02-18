// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: "2b3731e0fce301485c1f563c4463c0d8-us14",
  // process.env.MAILCHIMP_API_KEY,
  server: "us14",
  //process.env.MAILCHIMP_API_SERVER,
  // e.g. us1
});

export default async function subscribe(req, res) {
  const { email } = await req.body;

  //   console.log(email);

  //   console.log("MAKING REQUEST NOW");
  //   console.log("___________-----------_______");

  //if (req.method === "POST") {
  // Process a POST request
  try {
    const SignUp = await mailchimp.lists.addListMember("b1c7c8ee1b", {
      email_address: email,
      status: "subscribed",
    });
    res.status(200).json({ SignUp });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
  // } else {
  // Handle any other HTTP method
  //}
}
