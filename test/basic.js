/**
 *  joola.io
 *
 *  Copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 *
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 */

var joolaio = require('../lib/index');

joolaio.init({
  isBrowser: false,
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
}, function () {
 
});

joolaio.events.on('core.init.finish', function () {
  new joolaio.viz.Timeline({}, function (err, viz) {
    console.log('done', viz)
  });
});