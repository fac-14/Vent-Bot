const env = require('env2')('/home/emily/founders/projects/Vent-Bot/config.env');

exports.post = (req, res) => {
  const message = req.body.message;
  console.log(message);
  // send message to Dialog Flow API
  

// You can find your project ID in your Dialogflow agent settings
const projectId = process.env.PROJECT_ID; 
const sessionId = process.env.SESSION_ID;

const query = message;
const languageCode = "en-US";

// Instantiate a DialogFlow client.
const dialogflow = require("dialogflow");
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode
    }
  }
};

// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log("Detected intent");
    const result = responses[0].queryResult;
    // console.log(`  Query: ${result.queryText}`);
    // console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
    res.end(JSON.stringify(result))
  })
  .catch(err => {
    console.error("ERROR:", err);
    res.end(JSON.stringify(err))
  });

  
  // res.redirect(302, "/chat");
  // res.end();
};
