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

var datepicker = exports;
var proto = require('./_proto');

datepicker = joolaio.common.mixin(datepicker, proto);
datepicker._base = joolaio.common.extend({}, joolaio.common.mixin(datepicker, proto));
datepicker._id = 'datepicker';


datepicker.baseHTML = function (callback) {
  var html = '<html></html>';
  this._base.baseHTML(function (err, _html) {
    html += _html;
    return callback(null, html);
  });
};

datepicker.init = function (callback) {
  return this.baseHTML(callback);
};