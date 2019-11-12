/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        '& .DraftEditor-root': {
            '&:hover': {
                borderColor: theme.palette.text.primary,
            },
            borderColor: theme.palette.type === 'light' ?
                'rgba(0, 0, 0, 0.23)' :
                'rgba(255, 255, 255, 0.23)',
            borderRadius: 4,
            borderStyle: 'solid',
            borderWidth: 1,
            boxSizing: 'border-box',
            fontFamily: 'Roboto Mono',
            padding: 10,
            transition: `
                border-color 200ms cubic-bezier(0, 0, 0.2, 1),
                border-width 200ms cubic-bezier(0, 0, 0.2, 1),
                padding 200ms cubic-bezier(0, 0, 0.2, 1)
            `,
            outline: 0,
        },
        '&$focused .DraftEditor-root': {
            '&:hover': {
                borderColor: theme.palette.primary.main,
            },
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
            padding: 9,
        },
        '&$error .DraftEditor-root': {
            '&:hover': {
                borderColor: theme.palette.error.main,
            },
            borderColor: theme.palette.error.main,
        },
        '&$focused$error .DraftEditor-root': {
            '&:hover': {
                borderColor: theme.palette.error.main,
            },
            borderColor: theme.palette.error.main,
            borderWidth: 2,
            padding: 9,
        },
    },
    focused: {}, // DON'T REMOVE
    error: {}, // DON'T REMOVE
    listOuter: {
        padding: '0px 10px',
    },
    list: {
        background: theme.palette.divider,
    },
    listItem: {
        color: theme.palette.text.secondary,
        cursor: 'pointer',
        padding: '2px 5px',
        '&$focused': {
            color: theme.palette.secondary.light,
            fontWeight: 'bold',
        },
    },
}));
