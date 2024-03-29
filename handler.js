'use strict';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<admin>@cluster0-gnn8n.mongodb.net/test?retryWrites=true&w=majority"

module.exports.connect = (event, context, callback) => {
  MongoClient.connect(uri, function (err, client) {
    if (err) {
			console.log('error occurred while connecting to mongodb atlas.', err);
		}
		console.log('connected...');

    const click = {clickTime: new Date()};
    console.log(click);

    try {
			const collection = client.db("test").collection('clicks').save(click, (err, result) => {
				if (err) {
					return console.log(err);
					console.log(err);
				}
				console.log('click added to db');
				res.sendStatus(201);
			 });
		} catch (error) {
			console.log('error executing save record on database', error);
		}

    client.close();
    console.log('conection closed...');
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'MongoDB operation executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  callback(null, response);
};