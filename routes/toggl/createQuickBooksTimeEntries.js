let createQuickbooksTimeEntries = function(processedTimeEntries) {
  let timeEntriesPromises = processedTimeEntries.map((timeEntry) => {
    return new Promise(function(resolve, reject){
      qbo.createTimeActivity({
        "TxnDate": timeEntry.date,
        "NameOf": "Employee",
        "EmployeeRef": {
          "value": "68"
        },
        "CustomerRef": {
          "value": timeEntry.clientId
        },
        "ItemRef": {
          "value": "1" // General services: development (could be re-categorized as Front-End: Development, or be more dynamic based on Toggls description/tags)
        },
        "BillableStatus": "Billable",
        "Taxable": false,
        "HourlyRate": timeEntry.rate,
        "Hours": timeEntry.hours,
        "Minutes": timeEntry.minutes,
        "Description": timeEntry.description
      }, function(err, entry) {
        if (err){
          reject('error: ', err);
        }else{
          console.log('created time entry in QBO');
          resolve();
        }
      });
    }).catch((err) => {
      reject(err);
    });
  });


  var results = Promise.all(timeEntriesPromises);
  results.then((data) => {
    // resolve(data);
  }).catch((err) => {
    console.log('Error in createQuickbooksTimeEntries: ', err);
  });

  return results;
};

module.exports = createQuickbooksTimeEntries;
