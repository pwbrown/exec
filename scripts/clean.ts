/**
 * Takes care of removing all build artifacts
 */

/** DEPENDENCIES */
import { removeSync } from 'fs-extra';
import { join } from 'path';

/** HELPERS */
const rm = (appPath: string) => removeSync(join(__dirname, '../app', appPath));

/** REMOVES */
rm('build');
rm('assets/js/exec.js');
rm('assets/js/exec.js.map');