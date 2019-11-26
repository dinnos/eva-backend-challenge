const MongoClient = require('mongodb').MongoClient;
const collections = require('./utils/seeders-reader.js').collections;

const {
  MONGO_URI: MONGO_PATH,
  MONGO_INITDB_ROOT_USERNAME: MONGO_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD: MONGO_PASS,
  MONGO_DBNAME
} = process.env;

const countDocuments = (db, collectionName, callback) => {
  const collection = db.collection(collectionName);

  collection.countDocuments({}, (err, total) => err ? callback(1) : callback(total));
};

const insertDocuments = (db, collectionName, data, callback) => {
  const collection = db.collection(collectionName);
  collection.count({}, (err, total) => {
    if (total === 0) {
      collection.insertMany(data, (err, result) => {
        err ? callback(err) : callback(result.length);
      });
    } else {
      callback(total);
    }
  });
};

MongoClient.connect(`mongodb://${ MONGO_USERNAME }:${ MONGO_PASS }@${ MONGO_PATH }?authSource=admin`,  {
  poolSize: 5
}, (err, client) => {
  for (const collection in collections) {
    const db = client.db(MONGO_DBNAME);

    countDocuments(db, collection, (total) => {
      if (total === 0) {
        insertDocuments(db, collection, collections[collection], inserted => console.log(inserted));
      }
    });
  }
});
