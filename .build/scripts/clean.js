/**
 * Takes care of removing all build artifacts
 */

/** DEPENDENCIES */
const { removeSync } = require('fs-extra');
const { join } = require('path');

/** HELPERS */
const rm = path => removeSync(join(__dirname, '../../', path));

/** REMOVES */
rm('app/build');
rm('artifacts');
rm('app/assets/js/exec.js');
rm('app/assets/js/exec.js.map');
