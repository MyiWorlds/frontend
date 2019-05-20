const makePropertyHumanReadable = (property: string) => {
  property = property.charAt(0).toUpperCase() + property.substr(1);
  property = property.replace(/([A-Z])/g, ' $1').trim();

  return property;
};

export default makePropertyHumanReadable;
