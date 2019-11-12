/** REACT */
import React, {
    FC,
    Fragment,
    KeyboardEvent,
    MouseEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

/** MATERIAL */
import Collapse from '@material-ui/core/Collapse';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

/** DRAFT JS */
import {
    CompositeDecorator,
    DraftHandleValue,
    Editor as DraftJSEditor,
    EditorProps,
    EditorState,
    getDefaultKeyBinding,
} from 'draft-js';

/** IMMUTABLE */
import { Iterable, Map } from 'immutable';

/** BLOCK RENDERERS */
import { renderLinePrompts } from './renderers/LinePrompt';

/** DECORATORS */
import LinkedArgument, { LinkedArgumentStrategy } from './decorators/LinkedArgument';
import UnlinkedArgument, { UnlinkedArgumentStrategy } from './decorators/UnlinkedArgument';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

/** UTILS */
import {
    addArgument,
    filterSuggestions,
    getSearchText,
    getSelectionIsInsideWord,
} from './utils';

/** STYLES */
import clsx from 'clsx';
import { useStyles } from './Editor.styles';

/** TYPES */
import { IArgument } from '../../../types';

/** PROPS */
interface IProps extends EditorProps, ILabelProps {
    label?: string;
    helperText?: string;
    hasError?: boolean;
    errorText?: string;
    prompts?: boolean;
    argumentIds?: string[];
    onLinkArgument?: (id: string) => void;
    onUnlinkArgument?: (id: string) => void;
    onCreateArgument?: (id?: string) => void;
}

const Editor: FC<IProps> = (props) => {
    const classes = useStyles();
    const plainText = props.editorState.getCurrentContent().getPlainText();

    /** STATE/REF */
    const [focused, setFocus] = useState(false);
    const [listOpen, setListOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [focusIndex, setFocusIndex] = useState<number>(0);
    const searches = useRef<Map<string, string>>(Map());
    const activeKey = useRef<string>('');
    const lastSearch = useRef<string | undefined>();
    const lastSelectionIsInsideWord = useRef<Iterable<string, boolean> | undefined>();

    /** TRIGGERING RERENDER */
    const forceRerender = useRef<boolean>(false);
    useEffect(() => {
        if (forceRerender.current) {
            forceRerender.current = false;
            onChange(props.editorState);
        }
    });

    /** RESETTING FOCUS INDEX */
    useEffect(() => {
        const size = suggestions.length;
        if (size > 0 && focusIndex >= size) {
            setFocusIndex(size - 1);
        }
    });

    /** FOCUS/BLUR/CHANGE INTERCEPTORS */
    const onFocus = (e: any) => {
        setFocus(true);
        if (props.onFocus) { props.onFocus(e); }
    };
    const onBlur = (e: any) => {
        setFocus(false);
        if (props.onBlur) { props.onBlur(e); }
    };
    const onChange = (editorState: EditorState) => {
        const cancel = () => {
            hideSuggestions();
            props.onChange(editorState);
        };
        if (!searches.current.size) {
            return cancel();
        }
        const selectionIsInsideWord = getSelectionIsInsideWord(editorState, searches.current);
        if (!selectionIsInsideWord) {
            return cancel();
        }
        /** Update the suggestions and update the active key */
        updateSuggestions(editorState, activeKey.current);
        activeKey.current = selectionIsInsideWord.filter((value) => value === true).keySeq().first();
        if (!listOpen) {
            showSuggestions();
        }
        lastSelectionIsInsideWord.current = selectionIsInsideWord;
        props.onChange(editorState);
    };

    /** INITIALIZING DECORATORS */
    const onRegister = (ok: string) => {
        searches.current = searches.current.set(ok, ok);
        forceRerender.current = true;
    };
    const onUnregister = (ok: string) => {
        searches.current = searches.current.delete(ok);
        forceRerender.current = true;
    };
    const DecoratedUnlinkedArgument: FC<any> = (passThrough) => (
        <UnlinkedArgument
            {...passThrough}
            onRegister={onRegister}
            onUnregister={onUnregister}
        />
    );
    useEffect(() => {
        const decorator = new CompositeDecorator([
            { component: LinkedArgument, strategy: LinkedArgumentStrategy },
            { component: DecoratedUnlinkedArgument, strategy: UnlinkedArgumentStrategy },
        ]);
        props.onChange(EditorState.set(props.editorState, { decorator }));
    }, []);

    /** HANDLING KEYPRESSES */
    const handleReturn = (e: KeyboardEvent): DraftHandleValue => {
        if (listOpen) {
            commitSelection();
            return 'handled';
        }
        return 'not-handled';
    };
    const handleKey = (e: KeyboardEvent) => {
        if (listOpen) {
            switch (e.keyCode) {
                case 40:
                    onDown(e);
                    break;
                case 38:
                    onUp(e);
                    break;
                case 9:
                    onTab(e);
                    break;
            }
        }
        return getDefaultKeyBinding(e);
    };
    const onUp = (e: KeyboardEvent) => {
        e.preventDefault();
        setFocusIndex(!focusIndex ? suggestions.length - 1 : focusIndex - 1);
    };
    const onDown = (e: KeyboardEvent) => {
        e.preventDefault();
        setFocusIndex(suggestions.length ? (focusIndex + 1) % suggestions.length : 0);
    };
    const onTab = (e: KeyboardEvent) => {
        e.preventDefault();
        commitSelection();
    };

    /** ADDITIONAL FUNCTIONS */
    const showSuggestions = () => {
        setListOpen(true);
    };
    const hideSuggestions = () => {
        setListOpen(false);
    };
    const updateSuggestions = (es: EditorState, lastActiveKey: string) => {
        const { searchValue } = getSearchText(es);
        if (lastSearch.current !== searchValue || activeKey.current !== lastActiveKey) {
            lastSearch.current = searchValue;
            const filtered = filterSuggestions(searchValue, props.argumentIds || []);
            setSuggestions(filtered);
        }
    };
    const commitSelection = () => {
        if (suggestions.length) {
            const toAdd = suggestions[focusIndex];
            if (props.onLinkArgument) {
                props.onLinkArgument(toAdd);
            }
            hideSuggestions();
            onChange(addArgument(props.editorState, toAdd));
        }
    };

    /** HANDLE LIST ITEM INTERACTION */
    const itemMouseDown = (e: MouseEvent<HTMLDivElement>) => e.preventDefault();
    const itemMouseEnter = (index: number) => () => setFocusIndex(index);

    /** ADDITIONAL RENDERERS */
    const renderHelperText = () => {
        const text =
            props.hasError ? 'This field is required.' :
            plainText && props.errorText ? props.errorText :
            props.helperText || '';
        return !text ? <Fragment/> : (
            <FormHelperText variant='outlined' margin='dense' error={props.hasError}>
                {text}
            </FormHelperText>
        );
    };

    const renderArgumentSuggestionsList = () => (
        <div className={classes.listOuter}>
            <Collapse in={listOpen}>
                <div className={classes.list}>
                    {suggestions.map(renderListItem)}
                </div>
            </Collapse>
        </div>
    );

    const renderListItem = (text: string, index: number) => (
        <div
            className={clsx(classes.listItem, {[classes.focused]: focusIndex === index})}
            key={`list-${text}`}
            onMouseDown={itemMouseDown}
            onMouseUp={commitSelection}
            onMouseEnter={itemMouseEnter(index)}
        >
            <Typography variant='caption'>{text}</Typography>
        </div>
    );

    return (
        <FormGroup>
            <Label help={props.help} required={props.required}>{props.label}</Label>
            <div className={clsx(classes.container, { [classes.focused]: focused, [classes.error]: props.hasError })}>
                <DraftJSEditor
                    {...props}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    handleReturn={handleReturn}
                    keyBindingFn={handleKey}
                    blockRendererFn={props.prompts ? renderLinePrompts : undefined}
                />
                {renderArgumentSuggestionsList()}
            </div>
            {renderHelperText()}
        </FormGroup>
    );
};

export default Editor;
