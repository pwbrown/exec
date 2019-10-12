/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    bottom: {
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: 40,
    },
    container: {
        backgroundColor: theme.palette.divider,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: 40,
    },
    icon: {
        transition: 'transform 200ms ease-in-out',
    },
    tilt: {
        transform: 'rotate(45deg)',
    },
    updateContainer: {
        position: 'relative',
    },
    updateProgress: {
        position: 'absolute',
        top: 5.4,
        left: 4.5,
        zIndex: -1,
    },
}));
