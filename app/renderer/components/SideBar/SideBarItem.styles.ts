/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    bar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 2,
        height: '100%',
        display: 'none',
        background: theme.palette.text.primary,
    },
    container: {
        '&:hover': {
            color: theme.palette.text.primary,
        },
        '&$active $bar': {
            display: 'block',
        },
        alignItems: 'center',
        color: theme.palette.text.disabled,
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        width: 40,
        position: 'relative',
    },
    active: {
        color: theme.palette.text.primary,
    }, // Used by container['&.$active'] to toggle active color
    highlight: {
        color: theme.palette.secondary.main,
        '&:hover': {
            color: theme.palette.secondary.light,
        },
    },
}));
