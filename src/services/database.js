const MongoClient = require('mongodb').MongoClient;

var databaseConnection;

function connect(callback) {
    MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {

        if (err) {
            console.error('Could not connect to MongoDb...');
            console.error(err);
            return;
        }

        console.log('Successfully connected to MongoDb!');
        databaseConnection = db;
        return callback(err);
    });
}

function connection() {
    return databaseConnection;
}

module.exports = {
    connect: connect,
    connection: connection
};