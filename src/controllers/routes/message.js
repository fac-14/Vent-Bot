const request = require("request");
if (!process.env.TRAVIS) {
  const env = require("env2")("config.env");
}

exports.post = (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.dialogflow.com/v1/query",
    qs: { v: "20150910" },
    headers: {
      "cache-control": "no-cache",
      "content-type": "application/json",
      authorization: "Bearer " + process.env.CLIENT_TOKEN
    },
    body: {
      lang: "en",
      query: req.body.message || "I'm sad",
      sessionId: process.env.SESSION_ID
    },
    json: true
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    if (body.result.fulfillment.speech) {
      const message = body.result.fulfillment.speech;
      res.end(JSON.stringify(message));
    } 
    res.end(JSON.stringify("no response"));
  });
};
