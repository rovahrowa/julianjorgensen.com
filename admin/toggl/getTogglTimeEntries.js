let getTogglTimeEntries = function(passedData) {
  console.log('getting toggl time entries');
  let promise = new Promise(function(resolve, reject){
    toggl.getTimeEntries((err, data) => {
      if (err){
        reject(err);
      }else{
        resolve({
          timeEntries: data,
          workspace: passedData
        });
      }
    });
  });
  return promise;
};

module.exports = getTogglTimeEntries;
