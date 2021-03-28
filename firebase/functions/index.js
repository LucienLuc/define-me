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

exports.ocr = functions.https.onRequest((request, response) => {
  cors(request, response, () => {

    async function start(req) {
      const client = new vision.ImageAnnotatorClient();
      // Bucket where the file resides
      const bucketName = 'define-me-308905.appspot.com';
      // Path to PDF file within bucket
      const fileName = req.body.file;
      // The folder to store the results
      const outputPrefix = 'results'
      const gcsSourceUri = `gs://${bucketName}/${fileName}`;
      const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/${fileName}`;

      const inputConfig = {
        // Supported mime_types are: 'application/pdf' and 'image/tiff'
        mimeType: 'application/pdf',
        gcsSource: {
          uri: gcsSourceUri,
        },
      };
      const outputConfig = {
        gcsDestination: {
          uri: gcsDestinationUri,
        },
      };
      const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
      const request = {
      requests: [
          {
            inputConfig: inputConfig,
            features: features,
            outputConfig: outputConfig,
          },
        ],
      };

      const [operation] = await client.asyncBatchAnnotateFiles(request);
      // console.log(operation);
      const [filesResponse] = await operation.promise();
      // console.log(filesResponse.responses[0]);
      const destinationUri = filesResponse.responses[0].outputConfig.gcsDestination.uri;
      console.log('Json saved to: ' + destinationUri);
      return;
    }

    start(request).then(() => {
      functions.logger.info("Making ocr request!", {structuredData: true});
      response.send("Made request to ocr!").end();
    });
  });
});
