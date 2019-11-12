/** REACT */
import React, { FC, MutableRefObject, useEffect } from 'react';

/** DRAFTJS */
import { CompositeDecorator, EditorState } from 'draft-js';

/** IMMUTABLE */
import { Map } from 'immutable';

/** DECORATORS */
import LinkedArgument from './LinkedArgument';
import LinkedArgumentStrategy from './LinkedArgument.strategy';
import UnlinkedArgument from './UnlinkedArgument';
import UnlinkedArgumentStrategy from './UnlinkedArgument.strategy';

/** Types */
import { IProps } from '../Editor.types';

export const useEditorDecorators = (
    props: IProps,
    unlinkedArgs: MutableRefObject<Map<string, string>>,
    shouldRerender: MutableRefObject<boolean>,
) => {
    const onRegister = (offsetKey: string) => {
        unlinkedArgs.current = unlinkedArgs.current.set(offsetKey, offsetKey);
        shouldRerender.current = true;
    };
    const onUnregister = (offsetKey: string) => {
        unlinkedArgs.current = unlinkedArgs.current.delete(offsetKey);
        shouldRerender.current = true;
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
};
