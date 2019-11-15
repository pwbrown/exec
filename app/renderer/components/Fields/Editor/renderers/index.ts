/** TYPES */
import { IProps } from '../Editor.types';

/** COMPONENTS */
import LinePrompt from './LinePrompt';

export const useEditorRenderers = (props: IProps) => {
    const renderLinePrompts = () => ({
        component: LinePrompt,
    });

    return {
        blockRendererFn: !props.prompts ? undefined : renderLinePrompts,
    };
};
