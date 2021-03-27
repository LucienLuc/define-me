import React from 'react';

function GCVision() {
    return(
        <p>Hello World</p>
    )
    
}

async function quickstart() {
    // // Imports the Google Cloud client library
    console.log('in function')
  
    // // Creates a client
    // const client = new vision.ImageAnnotatorClient();
  
    // // Performs label detection on the image file
    // // const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
    // // const labels = result.labelAnnotations;
    // console.log('Labels:');
    // // labels.forEach(label => console.log(label.description));
    console.log('here')
}
quickstart();

export default GCVision