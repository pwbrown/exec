/** TYPES */
import { Strategy } from '../../../../types';

export const UnlinkedArgumentStrategy: Strategy = (
    contentBlock,
    callback,
) => {
    const rgx = /\$(?:[A-Z]+(?:\_+[A-Z]+)*)?/g;
    const blockText = contentBlock.getText();
    contentBlock.findEntityRanges(
        /** Filter out Entities */
        (char) => !char.getEntity(),
        /** Search "non-entity" blocks for arguments */
        (nonEntityStart, nonEntityEnd) => {
            const text = blockText.slice(nonEntityStart, nonEntityEnd);
            let prevLastIndex = rgx.lastIndex;
            let start: number;
            let match = rgx.exec(text);
            while (match !== null) {
                if (rgx.lastIndex === prevLastIndex) {
                    break;
                }
                prevLastIndex = rgx.lastIndex;
                start = nonEntityStart + match.index;
                callback(start, start + match[0].length);
                match = rgx.exec(text);
            }
        },
    );
};
