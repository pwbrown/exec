/**
 * For Expanding the global namespace
 * @copyright 2019 Philip Brown
 */

/** DEPENDENCIES */
import { Window } from './services/window';

/** GLOBAL NAMESPACE EXPANSION */
declare global {
    namespace NodeJS {
        interface Global {
            mainWindow : Window
        }
    }
}