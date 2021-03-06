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

var
  async = require('async'),
  EventEmitter2 = require('eventemitter2').EventEmitter2;

this._id = 'core';

//THE OBJECT
var joolaio = global.joolaio = exports;

//base options
joolaio.options = {
  isBrowser: false,
  debug: {
    enabled: true,
    events: {
      enabled: true,
      trace: true
    },
    functions: {
      enabled: true
    }
  }
};

//libraries
joolaio.config = require('./common/config');
joolaio.logger = require('./common/logger');
joolaio.common = require('./common/index');
joolaio.events = require('./common/events');
joolaio.api = require('./common/api');
joolaio.objects = require('./objects/index');
joolaio.state = {};
joolaio.viz = require('./viz/index');

joolaio.logger.debug(joolaio.options);

//init procedure
joolaio.init = function (options, callback) {
  joolaio.options = joolaio.common.extend(joolaio.options, options);

  joolaio.events.emit('core.init.start');
  joolaio.logger.info('Starting joola.io client SDK, version ' + require('../package.json').version);

  //jQuery bypass for non-browser execution
  if (!joolaio.options.isBrowser) {
    $ = function () {
      return null;
    };
    $.prototype.fn = function () {
      return null;
    };
  }
  joolaio.config.init(function (err) {
    if (err)
      return callback(err);

    var calls = [];
    [joolaio.objects.dashboards, joolaio.objects.reports].forEach(function (obj) {
      var call = function (callback) {
        obj.list(function (err) {
          return callback(err);
        });
      };
      calls.push(call);
    });
    async.parallel(calls, function (err) {
      if (err)
        return callback(err);

      joolaio.events.emit('core.init.finish');
      if (callback)
        return callback(null, joolaio);
    });
  });
};

//global function hook (for debug)
if (joolaio.options.debug.functions.enabled)
  [joolaio].forEach(function (obj) {
    joolaio.common.hookEvents(obj, function (event) {
    });
  });


//global event catcher (for debug)
if (joolaio.options.debug.enabled)
  joolaio.events.onAny(function () {
    if (joolaio.options.debug.events.enabled)
      joolaio.logger.debug('Event raised: ' + this.event);
    if (joolaio.options.debug.events.enabled && joolaio.options.debug.events.trace)
      console.trace();
  });

