/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    actionButton: {
        flex: 1,
        margin: '0px 2px',
    },
    actionsContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
    },
    container: {
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    },
    editor: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    fieldsInner: {
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
        '& .MuiTextField-root': {
            margin: 0,
        },
        bottom: 0,
        left: 0,
        overflow: 'auto',
        padding: 5,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    fieldsOuter: {
        flex: 1,
        position: 'relative',
    },
    header: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        margin: '5px 10px',
    },
}));
