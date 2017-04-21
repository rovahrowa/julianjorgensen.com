let getTogglWorkspaceClients = function(passedData) {
  let workspaceId = passedData.workspace.id;
  let promise = new Promise(function(resolve, reject) {
    toggl.getWorkspaceClients(workspaceId, (err, data) => {
      if (err){
        reject('error', err);
      }else{
        resolve({
          timeEntries: passedData.timeEntries,
          workspace: passedData.workspace,
          clients: data
        });
      }
    });
  });
  return promise;
};

module.exports = getTogglWorkspaceClients;
