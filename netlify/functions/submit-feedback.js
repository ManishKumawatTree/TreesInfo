// netlify/functions/submit-feedback.js

const fs = require('fs');

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    const body = JSON.parse(event.body);

    // Form fields
    const { name, contact, feedback } = body;

    // Validate required fields
    if (!name || !feedback) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Name and feedback are required!" }),
      };
    }

    // Create the record to write to the file
    const feedbackRecord = `Name: ${name} | Contact: ${contact} | Feedback: ${feedback} | Date: ${new Date().toISOString()}\n`;

    // Specify the file path (ensure that the file is writable)
    const filePath = './feedback.txt';

    // Append the feedback to the file
    fs.appendFileSync(filePath, feedbackRecord);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Feedback submitted successfully!' }),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
