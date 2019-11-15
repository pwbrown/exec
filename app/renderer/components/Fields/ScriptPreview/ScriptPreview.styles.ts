/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    required: {
        color: theme.palette.secondary.light,
        fontWeight: 'bold',
    },
    optional: {
        color: theme.palette.text.disabled,
        fontWeight: 'bold',
    },
    divider: {
        margin: '10px 0px',
    },
    colors: {
        display: 'flex',
        flexDirection: 'column',
        '& li': {
            margin: '0px 10px',
        },
    },
}));
