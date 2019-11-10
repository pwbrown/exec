/** TYPES */
import { Strategy } from './types';

const argumentStrategy: Strategy = (block, cb, state) => {
    block.findEntityRanges((char) => {
        const key = char.getEntity();
        return key !== null && state.getEntity(key).getType() === 'argument';
    }, cb);
};

export default argumentStrategy;
