/** TYPES */
import { Strategy } from './types';

/* tslint:disable:curly */
const argumentSuggestionStrategy: Strategy = (block, cb) => {
    /** Regular expression to match arguments */
    const rgx = /\$(?:[A-Z]+(?:\_+[A-Z]+)*)?/g;
    /** Get the current block text */
    const blockText = block.getText();
    /** Search within non entity ("ne") parts of the content block */
    block.findEntityRanges((char) => !char.getEntity(), (neStart, neEnd) => {
        const text = blockText.slice(neStart, neEnd);
        let prevLastIndex = rgx.lastIndex;
        let start: number;
        let match = rgx.exec(text);
        while (match !== null) {
            if (rgx.lastIndex === prevLastIndex)
                break;
            prevLastIndex = rgx.lastIndex;
            start = neStart + match.index;
            cb(start, start + match[0].length);
            match = rgx.exec(text);
        }
    });
};

export default argumentSuggestionStrategy;
