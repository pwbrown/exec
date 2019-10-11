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
    },
    focused: {}, // DON'T REMOVE: referred in container['&$focused .DraftEditor-root'],
    line: {
        position: 'relative',
    },
    decorator: {
        position: 'absolute',
        left: 0,
        top: 0,
        color: theme.palette.text.disabled,
    },
    lineContent: {
        marginLeft: 15,
    },
}));
