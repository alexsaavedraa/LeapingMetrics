
// Import necessary packages and modules
const { google } = require("googleapis");


async function authSheets() {
    //Function for authentication object
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  
    //Create client instance for auth
    const authClient = await auth.getClient();
  
    //Instance of the Sheets API
    const sheets = google.sheets({ version: "v4", auth: authClient });
  
    return {
      auth,
      authClient,
      sheets,
    };
  }

  module.exports = { authSheets };
