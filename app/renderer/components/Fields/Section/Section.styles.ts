/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: 5,
        margin: '10px 0px',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        transition: 'transform 200ms ease-in-out',
    },
    flipped: {
        transform: 'rotate(180deg)',
    },
    fields: {
        padding: '10px 0px',
    },
}));
