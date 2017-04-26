var PREFIX = 'data_';  

(function initData() {
  var fakeData = {
    '1': {
      id: '1',
      owner: 'alex',
      title: 'Title 1',
      desc: 'Desc 1',
      dueAt: '2017-04-30'
    },
    '2': {
      id: '2',
      owner: 'peter',
      title: 'Title 2',
      desc: 'Desc 2',
      dueAt: '2017-04-30'
    },
    '3': {
      id: '3',
      owner: 'alex',
      title: 'Title 3',
      desc: 'Desc 3',
      dueAt: '2017-04-30'
    },
    '4': {
      id: '4',
      owner: 'peter',
      title: 'Title 4',
      desc: 'Desc 4',
      dueAt: '2017-04-30'
    }
  };
  var nextId = 5;

  if (!window.localStorage.initData) {
    window.localStorage[PREFIX + 'reminders'] = JSON.stringify(fakeData);
    window.localStorage[PREFIX + 'reminders_nextId'] = nextId;
    window.localStorage.initData = true;
  }
})();

function DBFactory() {

  

  class Database {
    constructor(opt) {
      this.opt = opt;
      this.timeout = opt.timeout || 1; // fake delay to simulate the AJAX call
    }

    save(collection, doc, opt) {
      var self = this;
      var timeout = opt && opt.timeout
        ? opt.timeout
        : self.timeout;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var data = JSON.parse(window.localStorage[PREFIX + collection]);

            // check id exists
            if (doc.id && data[doc.id]) {
              // update
              doc.alteredAt = new Date();
              data[doc.id] = doc;
            } else {
              doc.createdAt = new Date();
              doc.alteredAt = new Date();
              var nextId = parseInt(window.localStorage[PREFIX + collection + '_nextId']);
              doc.id = doc.id || (nextId++).toString(); // generate a new id if not exists
              data[doc.id] = doc;

              window.localStorage[PREFIX + collection + '_nextId'] = nextId;
            }

            window.localStorage[PREFIX + collection] = JSON.stringify(data);

            resolve(doc);

          } catch (err) {
            reject(err);
          }
        }, timeout);
      });
    }

    delete(collection, doc, opt) {
      var self = this;
      var timeout = opt && opt.timeout
        ? opt.timeout
        : self.timeout;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var data = JSON.parse(window.localStorage[PREFIX + collection]);
            var deleted = false;

            if (data[doc.id]) {
              delete data[doc.id];
              deleted = true;
            }

            if (deleted) {
              window.localStorage[PREFIX + collection] = JSON.stringify(data);
            }
            resolve(deleted);
          } catch (err) {
            reject(err);
          }
        }, timeout);
      });
    }

    find(collection, queryFn, opt) {
      var self = this;
      var timeout = opt && opt.timeout
        ? opt.timeout
        : self.timeout;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var data = JSON.parse(window.localStorage[PREFIX + collection]);
            var result = [];
            for (var id in data) {
              var record = data[id];
              if (queryFn(record)) {
                result.push(record);
              }
            }
            resolve(result);
          } catch (err) {
            reject(err);
          }

        }, timeout);
      });
    }

    findOne(collection, queryFn, opt) {
      var self = this;
      var timeout = opt && opt.timeout
        ? opt.timeout
        : self.timeout;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var data = JSON.parse(window.localStorage[PREFIX + collection]);
            for (var id in data) {
              var record = data[id];
              if (queryFn(record)) {
                resolve(record);
                break;
              }
            }
            resolve(null);
          } catch (err) {
            reject(err);
          }

        }, timeout);
      });
    }

  } // end class Database

  return function (opt) {
    window.__po = window.__po || {};
    window.__po.db = new Database(opt);
    return window.__po.db;
  }

};
