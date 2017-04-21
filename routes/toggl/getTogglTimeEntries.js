let getTogglTimeEntries = function(passedData) {
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
