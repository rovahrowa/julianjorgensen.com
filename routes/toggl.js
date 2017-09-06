let express = require('express');
let router = express.Router();
let togglSync = require('../admin/toggl/init');
let fs = require('fs');
let PDFParser = require("pdf2json");

let TogglClient = require('./lib/toggl-api/lib/client');
const togglApiToken = process.env.TOGGL_API_TOKEN;
const toggl_workspace = process.env.TOGGL_WORKSPACE_ID;
toggl = new TogglClient({apiToken: togglApiToken });


// Toggl and QuickBooks sync route
router.route('/sync-qbo/recent')
  .post(function (req, res) {
    togglSync.init().then(() => {
      res.status(200).send('Success!');
    }).catch((err) => {
      res.status(500).send('Error in syncing Toggl with QBO...');
    });
  });

// Get toggl report
router.route('/get-report')
  .get(function (req, res) {
    let options = {
      workspace_id: toggl_workspace,
      // pdf: true,
      // since:2016-05-19,
      // until:2017-05-20
    }
    toggl.summaryReport(options, (err, response) => {
      // let pdfData = response;
      // res.contentType("application/pdf");
      // res.send(pdfData);

      let testPdf = "./app/assets/pdfs/Toggl_projects_2017-09-04_to_2017-09-10.pdf";
      fs.readFile(testPdf, function (err,data){
        console.log('==data', data);
        res.contentType("application/pdf");
        res.send(data);
      });
    });
  });

module.exports = router;
