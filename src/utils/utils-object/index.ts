export const checkEmptyFields = (obj: Record<string, any>) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === "") {
      return false;
    }
  }
  return true;
};
