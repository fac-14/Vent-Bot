if (!process.env.TRAVIS) {
  const env = require("env2")("config.env");
}

exports.post = (req, res) => {
  const query = req.body.message;
  const projectId = process.env.PROJECT_ID;
  const sessionId = process.env.SESSION_ID;
  const languageCode = "en-US";

  const dialogflow = require("dialogflow");
  const sessionClient = new dialogflow.SessionsClient();

  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode
      }
    }
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      // console.log(responses);
      const result = responses[0].queryResult;
      res.end(JSON.stringify(result));
    })
    .catch(err => {
      console.error("ERROR:", err);
      res.end(JSON.stringify(err));
    });
};
