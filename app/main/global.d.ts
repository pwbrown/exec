/** DEPENDENCIES */
import { Window } from './utils/window';
import { ApplicationMenu } from './utils/applicationMenu';

/** GLOBAL NAMESPACE EXPANSION */
declare global {
    namespace NodeJS {
        interface Global {
            mainWindow : Window;
            applicationMenu: ApplicationMenu;
        }
    }
}