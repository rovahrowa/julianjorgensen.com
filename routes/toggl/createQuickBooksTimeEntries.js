let createQuickbooksTimeEntries = function(processedTimeEntries) {
  let timeEntriesPromises = processedTimeEntries.map((timeEntry) => {
    return new Promise(function(resolve, reject){
      console.log('creating time entry matching client QBO id: ', timeEntry.QboId);
      qbo.createTimeActivity({
        "TxnDate": timeEntry.date,
        "NameOf": "Employee",
        "EmployeeRef": {
          "value": "68"
        },
        "CustomerRef": {
          "value": timeEntry.clientQboId
        },
        "ItemRef": {
          "value": "1" // General services: development (could be re-categorized as Front-End: Development, or be more dynamic based on Toggls description/tags)
        },
        // "BillableStatus": "Billable",
        "Taxable": true,
        "HourlyRate": timeEntry.rate,
        "Hours": timeEntry.hours,
        "Minutes": timeEntry.minutes,
        "Description": timeEntry.description
      }, function(err, entry) {
        if (err){
          console.log('error: ', err);
        }else{
          console.log('created time entry in QBO', entry);
          resolve(timeEntry.id);
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
