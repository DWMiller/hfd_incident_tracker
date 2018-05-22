exports.KEYS = {
  RECENT_INCIDENTS: 'RECENT_INCIDENTS',
};

let dataStore = {};

exports.clearAll = () => (dataStore = {});

exports.setData = (key, data) => (dataStore[key] = data);

exports.getData = key => dataStore[key];
