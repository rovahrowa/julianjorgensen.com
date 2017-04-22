let markEntriesAsBilled = function(teIds) {
  let promise = new Promise(function(resolve, reject){
    toggl.updateTimeEntriesTags(teIds, ['billed'], 'add', (err, timeEntries) => {
      if (err){
        reject('error', err);
      }else{
        console.log(timeEntries);
        resolve();
      }
    });
  });
  return promise;
}

module.exports = markEntriesAsBilled;
