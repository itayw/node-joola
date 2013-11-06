var joolaio = require('./index');

var options = {
  isBrowser: true,
  debug: {
    enabled: true,
    events: {
      enabled: true,
      trace: false
    },
    functions: {
      enabled: true
    }
  }
};

joolaio.init(options, function () {
  console.log('Init complete on browser.js');

  joolaio.viz.stam(function () {
    console.log('Finished running stam');
  });

});