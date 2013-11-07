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
      enabled: false
    }
  }
};

joolaio.init(options, function (err) {
  if (err)
    throw err;
  console.log('Init complete on browser.js');

  joolaio.viz.stam(function (err, html) {
    if (err)
      throw err;
    console.log('Finished running stam ', html);
  });
});