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

export const uniqueId = (value: string, existing: string[]) => {
    let i = 0;
    let uid = value
        .toLowerCase()
        .replace(/[^a-z]|[aeiou]/gi, '')
        .replace(/([a-z])\1+/gi, '$1');
    while (existing.length && existing.indexOf(uid) !== -1) {
        uid += ++i;
    }
    return uid;
};

export const defaultBool = (def: boolean, value?: boolean): boolean => {
    if (typeof value === 'boolean') {
        return value;
    }
    return def;
};
