const MongoClient = require('mongodb').MongoClient;
const collections = require('./utils/seeders-reader.js').collections;

const MONGO_DBNAME = 'eva';

const countDocuments = (db, collectionName, callback) => {
  const collection = db.collection(collectionName);

  collection.countDocuments({}, (err, total) => err ? callback(1) : callback(total));
};

const insertDocuments = (db, collectionName, data, callback) => {
  const collection = db.collection(collectionName);

  collection.insertMany(data, (err, data) => {
    err ? callback(0) : callback(data.insertedCount);
  });
};

(async () => {
  const client = await MongoClient.connect(`mongodb://mongoadmin:mongoadmin@localhost:27017?authSource=admin`);

  for (const collection in collections) {
    const db = client.db(MONGO_DBNAME);

    countDocuments(db, collection, (total) => {
      if (!total) {
        insertDocuments(db, collection, collections[collection], inserted => console.log(inserted));
      }
    });
  }
})();
