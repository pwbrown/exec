/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        '-webkit-app-region': 'drag',
        'alignItems': 'center',
        'backgroundColor': theme.palette.divider,
        'display': 'flex',
        'flexDirection': 'row',
        'height': 22,
        'justifyContent': 'center',
        'width': '100%',
    },
}));
