/**
 * Method to return all string occurences within a
 * string using a regular expression and a
 * grouping index
 */
export const FindAllMatches = (
    str: string,
    reg: RegExp,
    grouping: number = 0,
    exclude?: string[],
): string[] => {
    const matches = [];
    let match: RegExpExecArray | null = reg.exec(str);
    while (match !== null) {
        if (grouping < match.length && (!exclude || exclude.indexOf(match[grouping]) === -1)) {
            matches.push(match[grouping]);
        }
        match = reg.exec(str);
    }
    return matches;
};

/** Converts bytes to a readable size */
export const bts = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
        return 'n/a';
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
    if (i === 0) {
        return `${bytes} ${sizes[i]})`;
    }
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
};
