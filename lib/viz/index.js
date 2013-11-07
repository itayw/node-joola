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

var viz = exports;
viz._id = 'viz';

viz.pickers = require('./pickers/index');

viz.stam = function (callback) {
  return viz.pickers.init(callback);
};