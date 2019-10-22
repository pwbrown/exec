/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles({
    container: {
        '& .MuiTableRow-root:last-child': {
            whiteSpace: 'nowrap',
        },
        '& .MuiTableCell-root': {
            padding: 5,
        },
    },
});
