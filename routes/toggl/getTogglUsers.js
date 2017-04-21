let getTogglUsers = function(passedData) {
  let promise = new Promise(function(resolve, reject){
    let wId = passedData.workspace.id;
    toggl.getWorkspaceUsers(wId, false, (err, data) => {
      if (err){
        reject('error', err);
      }else{
        resolve({
          timeEntries: passedData.timeEntries,
          workspace: passedData.workspace,
          clients: passedData.clients,
          projects: passedData.projects,
          users: data
        });
      }
    });
  });
  return promise;
};

module.exports = getTogglUsers;
