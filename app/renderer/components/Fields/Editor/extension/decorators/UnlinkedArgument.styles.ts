/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        borderBottomStyle: 'dotted',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.secondary.light,
        fontWeight: 'bold',
    },
}));
