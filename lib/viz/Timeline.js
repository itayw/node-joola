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

var Timeline = module.exports = function (options, callback) {
  joolaio.events.emit('timeline.init.start');

  //mixin
  for (var x in require('./_proto'))
    this[x] = require('./_proto')[x];

  var self = this;

  this._id = '_timeline';
  this.options = {
    legend: true,
    container: '#test'
  };

  if (typeof this.options.container === 'string') {
    this.options.container = $($(this.options.container)[0]);
  }

  this.verify = function (options, callback) {
    if (options.container) {
      return callback(null);
    }
    else {
      return callback(new Error('cannot find container for the timeline'));
    }
  };

  //here we go
  try {
    joolaio.common.mixin(this, options, options);

    self.verify(this.options, function (err) {
      if (err)
        throw err;

      joolaio.events.emit('timeline.init.finish', self);
      return callback(null);
    });
  }
  catch (err) {
    self.onError(err, callback)
  }

  self.options.container.Timeline = function () {
    return self.find(this);
  };

  return self;
};
