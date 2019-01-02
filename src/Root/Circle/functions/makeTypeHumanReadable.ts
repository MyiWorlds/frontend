const makeTypeHumanReadable = (type: string) => {
  if (type !== '') {
    type = type.toLowerCase();
    type = type.charAt(0).toUpperCase() + type.slice(1);
  }

  return type;
};

export default makeTypeHumanReadable;
