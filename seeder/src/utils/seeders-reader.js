const fs = require('fs');
const parser = require('./parser');

const seedersPath = `${ __dirname }/../seeds`;
const files = fs.readdirSync(seedersPath);

const getJsonData = filename => {
  const rawData = fs.readFileSync(`${ seedersPath }/${ filename }`);

  return JSON.parse(rawData.toString());
};

const getCollectionName = filename => filename.split('.')[0];

const collections = {};

files.forEach(file => {
  const fileData = getJsonData(file);
  const collection = getCollectionName(file);
  const dateFields = parser.getDateFields(fileData[0]);

  collections[collection] = fileData.map(element => parser.transformToDate(element, dateFields));
});

exports.collections = collections;
