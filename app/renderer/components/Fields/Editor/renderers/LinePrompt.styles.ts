/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'relative',
        '&::before': {
            content: '">"',
            position: 'absolute',
            left: 0,
            top: 0,
            color: theme.palette.text.disabled,
        },
    },
    content: {
        marginLeft: 15,
    },
}));
