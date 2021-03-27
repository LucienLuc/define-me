const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const vision = require('@google-cloud/vision');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
  });
});

exports.getTerms = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const client = new vision.ImageAnnotatorClient();

    functions.logger.info("Making vision request!", {structuredData: true});
    response.send("Hello from Firebase!");
  });
});

// exports.handleUpload = functions.https.onRequest((request, response) => {
//   cors(request, response, () => {
//     // code here
//   });
// });