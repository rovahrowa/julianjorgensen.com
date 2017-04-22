let markEntriesAsBilled = function(teIds) {
  let promise = new Promise(function(resolve, reject){
    if (teIds.length > 0){
      toggl.updateTimeEntriesTags(teIds, ['billed'], 'add', (err, timeEntries) => {
        if (err){
          reject('error', err);
        }else{
          console.log(timeEntries);
          resolve();
        }
      });
    }else{
      resolve('Nothing to update. Everything is synced.');
    }
  });
  return promise;
}

module.exports = markEntriesAsBilled;
