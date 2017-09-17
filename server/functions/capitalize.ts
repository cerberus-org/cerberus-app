export const capitalize = function (field: string): string {
  return field
    ? field.replace(/\b[\w']+\b/g, (txt => txt.charAt(0).toUpperCase() + txt.substr(1)))
    : null;
};

export const capitalizeWithNameCase = function (field: string): string {
  return field
    ? field.replace(/\b[\w']+\b/g, (txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()))
    : null;
};
