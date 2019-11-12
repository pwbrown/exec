/** TYPES */
import { CustomEntities, Strategy } from '../../../../types';

const LinkedArgumentStrategy: Strategy = (
    contentBlock,
    callback,
    contentState,
) => {
    contentBlock.findEntityRanges((char) => {
        const key = char.getEntity();
        return key !== null && contentState.getEntity(key).getType() === CustomEntities.ARGUMENT;
    }, callback);
};

export default LinkedArgumentStrategy;
