export const checkIfLoading = (store, ...actionsToCheck) =>
  store?.loader.loader.actions.some((action) => actionsToCheck.includes(action.name));

export const checkIfRefreshing = (store, actionToCheck) =>
  store?.loader.loader.refreshing.some((action) => action === actionToCheck);
