/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles({
    container: {
        position: 'absolute',
        overflow: 'hidden',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    innerContainer: {
        width: '100%',
        height: '100%',
    },
});
