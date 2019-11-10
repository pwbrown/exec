/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        background: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText,
        padding: '0px 2px',
    },
}));
