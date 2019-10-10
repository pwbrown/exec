/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        '&:hover, &.active': {
            color: theme.palette.text.primary,
        },
        'alignItems': 'center',
        'color': theme.palette.text.disabled,
        'display': 'flex',
        'height': 40,
        'justifyContent': 'center',
        'width': 40,
    },
}));
