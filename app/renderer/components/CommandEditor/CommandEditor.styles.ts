/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    },
    editor: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
        width: '100%',
    },
}));
