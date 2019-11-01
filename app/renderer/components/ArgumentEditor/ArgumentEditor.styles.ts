/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    value: {
        background: theme.palette.background.default,
        color: theme.palette.secondary.main,
        padding: 2,
        borderRadius: 2,
    },
}));
