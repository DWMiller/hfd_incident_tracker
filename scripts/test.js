var db = require('../src/database.js');
// var twitter = require('../src/twitter.js');

const DAY = 86400000;
const DAY_AGO = (Date.now() - DAY);

db.updates.find({
    type: "NEW",
    $where: function() {
            return this.time > DAY_AGO;
        }
        // time: {
        //     $gte: DAY_AGO
        // }
}, function(err, docs) {
    docs.map((doc) => {
        console.log(doc.time);
    })
});
