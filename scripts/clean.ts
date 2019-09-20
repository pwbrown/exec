/**
 * Takes care of removing all build artifacts
 */

/** DEPENDENCIES */
import { removeSync } from "fs-extra";
import { join } from "path";

/** HELPERS */
const rm = (path: string) => removeSync(join(__dirname, "../", path));

/** REMOVES */
rm("app/build");
rm("dist");
rm("app/assets/js/exec.js");
rm("app/assets/js/exec.js.map");
