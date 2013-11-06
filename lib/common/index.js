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
  util = require('util');

var common = exports;

common = util._extend(common, util);
common._id = 'common';
common.extend = common._extend;

common.mixin = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || typeof add !== 'object') return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    if (origin.hasOwnProperty(keys[i]))
      common.extend(origin[keys[i]], add[keys[i]]);
    else
      origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

common.hookEvents = function (obj, modifier) {
  var name, fn, obj_id;

  if (obj._id)
    obj_id = obj._id;

  for (name in obj) {
    fn = obj[name];
    if (name.substring(0, 1) == '_')
      continue;
    if (typeof fn === 'function' && name !== 'hookEvents') {
      obj[name] = (function (name, fn) {
        var args = arguments;
        return function () {
          var timeID = 'Function ' + (obj_id ? obj_id + '.' : '') + name;

          modifier.apply(this, args);
          if (joolaio.options.debug.functions.enabled)
            console.time(timeID);
          var result = fn.apply(this, arguments);
          if (joolaio.options.debug.functions.enabled)
            console.timeEnd(timeID);
          return result;
        }
      })(name, fn);
    }
  }
};