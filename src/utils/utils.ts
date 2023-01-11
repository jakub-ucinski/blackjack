export const getNameWithApostrophe = (name: string) => {
  return name + "'" + (name[name.length - 1] !== "s" ? "s" : "");
};
