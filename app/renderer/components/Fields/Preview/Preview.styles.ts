/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: 5,
        background: theme.palette.divider,
        borderRadius: 4,
    },
    divider: {
        color: theme.palette.background.default,
        marginBottom: 5,
    },
}));
