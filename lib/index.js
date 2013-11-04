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
  EventEmitter2 = require('eventemitter2').EventEmitter2;

//the object 
var joolaio = global.joolaio = exports;


//base options
var options = joolaio.options = {
  isBrowser: false,
  debug: {
    enabled: true,
    eventDebugger: true,
    eventTrace: true
  }
};

//libraries
var config = joolaio.config = require('./common/config');
var logger = joolaio.logger = require('./common/logger');
var common = joolaio.common = require('./common/common');
var events = joolaio.events = new EventEmitter2({wildcard: true, newListener: true});

//init procedure
joolaio.init = function (options, callback) {
  joolaio.options = joolaio.common.extend(joolaio.options, options);


  joolaio.events.emit('core-init-start');
  joolaio.logger.info('Starting joola.io client SDK, version ' + require('../package.json').version);


  joolaio.events.emit('core-init-done');
  if (callback)
    return callback(joolaio);
};

//global event catcher (for debug)
joolaio.events.onAny(function () {
  if (!joolaio.options.debug.enabled)
    return;
  
  if (joolaio.options.debug.eventDebugger)
    console.log(this.event);
  if (joolaio.options.debug.eventDebugger && joolaio.options.debug.eventTrace)
    console.trace();
});