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

joolaio.init({debug: {enabled: true, eventDebugger: false}}, function () {
  // console.log(joolaio);
})

//joolaio.logger.info('test');