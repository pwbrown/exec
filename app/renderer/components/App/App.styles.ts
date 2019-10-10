/** MATERIAL */
import makeStyles from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles({
    appContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
    },
    mainContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        position: 'relative',
    },
});
