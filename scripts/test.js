const DAY = 86400000;
const DAY_AGO = Date.now() - DAY;

// db.updates.find({
//   type: 'NEW',
//   $where() {
//     return this.time > DAY_AGO;
//   },
//         // time: {
//         //     $gte: DAY_AGO
//         // }
// }, (err, docs) => {
//   docs.map((doc) => {
//     console.log(doc.time);
//   });
// });

const twitter = require('../src/twitter.js');
const Update = require('../src/models/update.js');
const Tweet = require('../src/models/tweet.js');
