const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const DB_NAME = 'Cookmaster';

let db = null;

const connection = async () => {
    if (db) Promise.resolve(db);
    const con = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = await con.db(DB_NAME);
    return db;
};

module.exports = connection;