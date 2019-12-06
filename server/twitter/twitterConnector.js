const TwitterApi = require('node-tweet-stream');

exports.connect = (connectionParams, handler) => {
  connection = new TwitterApi(connectionParams);

  //   connection.on('error', err => {
  //     console.log('Oh no', err);
  //   });

  connection.follow('611701456');

  connection.on('tweet', handler);

  return connection;
};
