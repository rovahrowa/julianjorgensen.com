let getTogglWorkspaceData = function(wId) {
  let promise = new Promise(function(resolve, reject){
    toggl.getWorkspaceData(wId, (err, data) => {
      if (err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
  return promise;
};

module.exports = getTogglWorkspaceData;
