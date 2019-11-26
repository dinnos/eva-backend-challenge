const getDateFields = element => {
  const fields = Object.keys(element);

  return fields.filter(field => field.includes('date'));
};

const transformToDate = (element, fields) => {
  fields.forEach(field => element[field] = new Date(element[field]));

  return element;
};

exports.getDateFields = getDateFields;
exports.transformToDate = transformToDate;
