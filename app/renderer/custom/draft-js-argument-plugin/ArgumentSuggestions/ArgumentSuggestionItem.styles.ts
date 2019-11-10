/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: 10,
        background: theme.palette.background.paper,
        color: theme.palette.text.disabled,
        '&$focused': {
            color: theme.palette.secondary.main,
        },
    },
    focused: {},
}));
