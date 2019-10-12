/** DEPENDENCIES */
import { Window } from './utils/window';

/** GLOBAL NAMESPACE EXPANSION */
declare global {
    namespace NodeJS {
        interface Global {
            mainWindow : Window
        }
    }
}