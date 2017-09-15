
export const capitalize = function(field: string): string {
  return field.replace(/\b[\w']+\b/g, (txt => txt.charAt(0).toUpperCase() + txt.substr(1)));
};

export const capitalizeWithNameCase = function(field: string): string {
  return field.replace(/\b[\w']+\b/g, (txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
};
