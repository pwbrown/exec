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
rm('.tests');
rm('app/assets/app.html');
rm('app/assets/executor.html');
rm('app/assets/app.js');
rm('app/assets/app.js.map');
rm('app/assets/executor.js');
rm('app/assets/executor.js.map');
rm('app/assets/app~executor.js');
rm('app/assets/app~executor.js.map');
rm('app/assets/vendors~app.js');
rm('app/assets/vendors~app.js.map');
rm('app/assets/vendors~app~executor.js');
rm('app/assets/vendors~app~executor.js.map');