/** DRAFT */
import { ContentBlock } from 'draft-js';

/** Argument Suggestion Strategy */
export const ArgumentSuggestionStrategy = (
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
) => {
    /** Regular expression to match variations of "$EXAMPLE_ARGUMENT" */
    const rgx = /\$(?:[A-Z]+(?:\_+[A-Z]+)*)?/g;

    /** Get the current block text */
    const contentBlockText = contentBlock.getText();

    /** Search within non-enity parts of the content block */
    contentBlock.findEntityRanges((char) => !char.getEntity(), (
        nonEntityStart,
        nonEntityEnd,
    ) => {
        const text = contentBlockText.slice(nonEntityStart, nonEntityEnd);
        let prevLastIndex = rgx.lastIndex;
        let start: number;
        let match = rgx.exec(text);

        /**
         * Go through all matches in the text and return indices to the callback
         * Break the loop if the lastIndex didn't change
         */
        while (match !== null) {
            if (rgx.lastIndex === prevLastIndex) {
                break;
            }
            prevLastIndex = rgx.lastIndex;
            start = nonEntityStart + match.index;
            callback(start, start + match[0].length);
            match = rgx.exec(text);
        }
    });
};
