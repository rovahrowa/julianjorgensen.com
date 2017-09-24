let getTogglUsers = function(passedData) {
  let promise = new Promise(function(resolve, reject){
    let wId = passedData.workspace.id;
    console.log('getting toggl users');
    toggl.getWorkspaceUsers(wId, false, (err, data) => {
      if (err){
        console.log('error in getTogglUsers.js');
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
