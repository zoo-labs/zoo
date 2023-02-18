// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import MoonPayBtn from "components/Moonpaybtn/MoonpayBtn";

export default async function moonpay(req, res) {
  const { address } = await req.body;

  const MonComp = `  <iframe
                    allow="accelerometer; autoplay; camera; gyroscope; payment"
                    height="100%"
                    src="https://buy-sandbox.moonpay.com?apiKey=pk_test_gmMP8EXajK6LPecrHyUOyvvksZNrPbG&currencyCode=bnb"
                    width="100%"
                  >
                    <p>Your browser does not support iframes.</p>
                  </iframe>s`;

  //   console.log(email);

  //   console.log("MAKING REQUEST NOW");
  //   console.log("___________-----------_______");
  //if (req.method === "POST") {
  // Process a POST request

  // } else {
  // Handle any other HTTP method
  //}

  res.send(MonComp);
}
