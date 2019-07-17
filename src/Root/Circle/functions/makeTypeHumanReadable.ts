const makeTypeHumanReadable = (type: string) => {
  if (type) {
    if (type !== '') {
      type = type.toLowerCase();
      type = type.charAt(0).toUpperCase() + type.slice(1);
    }

    return type;
  } else return '';
};

export default makeTypeHumanReadable;
