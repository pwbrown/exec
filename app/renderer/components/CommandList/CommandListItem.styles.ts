/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    actionsContainer: {
        borderLeft: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 5,
    },
    container: {
        margin: 5,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        '&:hover': {
            backgroundColor: theme.palette.divider,
        },
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        textAlign: 'left',
        width: '100%',
    },
}));
