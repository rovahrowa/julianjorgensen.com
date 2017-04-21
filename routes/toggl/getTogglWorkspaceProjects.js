let getTogglWorkspaceProjects = function(passedData) {
  let workspaceId = passedData.workspace.id;
  let promise = new Promise(function(resolve, reject){
    toggl.getWorkspaceProjects(workspaceId, {active: true}, (err, data) => {
      if (err){
        reject('error', err);
      }else{
        resolve({
          timeEntries: passedData.timeEntries,
          workspace: passedData.workspace,
          clients: passedData.clients,
          projects: data
        });
      }
    });
  });
  return promise;
};

module.exports = getTogglWorkspaceProjects;
