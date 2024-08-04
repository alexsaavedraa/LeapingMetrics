const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

const { body, validationResult } = require('express-validator');

const { v4: uuidv4 } = require('uuid'); // Import uuidv4 from the uuid package
const { authSheets } = require("./authSheets"); // Adjust the path as needed


const save_to_file = true;


// Middleware for parsing requests
router.use(bodyParser.json({ limit: '.01mb' }));
router.use(bodyParser.urlencoded({ limit: '.01mb', extended: true }));
router.use(express.urlencoded({ extended: true }));

// Error handling middleware
router.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 413 && 'body' in err) {
        res.status(400).send('Request too large');
    } else {
        next();
    }
});

// POST route handler
router.get("/", (req, res) => {
    // Generate a UUIDv4
    const uuid = uuidv4();
    
    // Optionally, you can send other data back
    const responseData = {
        cookie: uuid,
    };
  
    // Send response as JSON
    res.json(responseData);
});

router.post("/",
    body('userId').isLength({ max: 100 }).withMessage('userID too long (max 100 characters)'),
    body('input').isLength({ max: 100 }).withMessage('userID too long (max 100 characters)'),
    body('timeSpent').isLength({ max: 25 }).withMessage('userID too long (max 100 characters)'),
    async (req, res) => {
      // Check if there are any validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.sendStatus(501)
      }
        
      
  
      
  
      // Extract name, email, and message from the request body
      let { input, userId, timeSpent} = req.body;
      let adjtimeSpent = 0;
      if (typeof timeSpent === 'number'){
        adjtimeSpent = timeSpent/1000;
      } 

      
      if (userId === undefined || userId === 'unknown'){
        const uuid = uuidv4();
        userId = uuid;
    
    // Optionally, you can send other data back
    const responseData = {
        userId: uuid,
    };
  
  
    // Send response as JSON
    res.json(responseData);
        
      } else {
        
        res.sendStatus(200)
      }
      let resultString = 'unknown'
      let userID = 'unknown'
      try{ 
        resultString = input.replace(/=/g, '');
        userID = userId.replace(/=/g, '');

      } 
      catch {

      }
      

      
      console.log("the input is ", userID, resultString)


      


      const {sheets} = await authSheets();
      const id = "1ng1Zze_QgCgp27FC3ixoFQA12b8Fk9kPB-AixRzYBBA"
      await sheets.spreadsheets.values.append({
        spreadsheetId: id,
        range: "Portfolio_Metrics",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[userID, resultString, adjtimeSpent]],
        },
  })


      
      

  
});

module.exports = router;
