export const findCurrentVar = (variablesList, currentId) => {
  return variablesList.find(({ variableId }) => Number(variableId) === Number(currentId));
}