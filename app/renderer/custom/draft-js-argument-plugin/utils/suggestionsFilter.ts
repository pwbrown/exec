/** TYPES */
import { IArgument } from '../../../types';

export const suggestionsFilter = (
    searchValue: string,
    suggestions: IArgument[],
) => {
    const value = searchValue.toUpperCase();
    const filtered = suggestions.filter((suggestion) =>
        !value || suggestion.id.indexOf(value) > -1);
    const length = filtered.length < 5 ? filtered.length : 5;
    return filtered.slice(0, length);
};
