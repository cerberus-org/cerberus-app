export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export const upperAllFirst = (field: string): string => (
  field
    ? field.replace(/\b[\w']+\b/g, (txt => txt.charAt(0).toUpperCase() + txt.substr(1)))
    : null
);

export const titleCase = (field: string): string => (
  field
    ? field.replace(
    /\b[\w']+\b/g,
    (txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
    )
    : null
);
