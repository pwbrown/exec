/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerButton: {
        marginRight: 10,
    },
    listInner: {
        '&::-webkit-scrollbar': {
            width: 10,
        },
        '&::-webkit-scrollbar-thumb': {
            '&:hover': {
                background: theme.palette.text.disabled,
            },
            'background': theme.palette.divider,
            'borderRadius': 5,
        },
        '&::-webkit-scrollbar-track': {
            background: theme.palette.background.default,
        },
        bottom: 0,
        left: 0,
        overflow: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
    },
    listOuter: {
        flex: 1,
        position: 'relative',
    },
    title: {
        margin: '5px 10px',
    },
}));
