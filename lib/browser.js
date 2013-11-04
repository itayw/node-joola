var joolaio = require('./index');

joolaio.init({isBrowser: true, debug: {enabled: true, eventDebugger: false}}, function () {
  joolaio.logger.debug('debug message');
});