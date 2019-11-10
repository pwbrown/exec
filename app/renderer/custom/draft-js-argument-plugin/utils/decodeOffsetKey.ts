export const decodeOffsetKey = (offsetKey: string) => {
    const [blockKey, decoratorKey, leafKey] = offsetKey.split('-');
    return {
        blockKey,
        decoratorKey: parseInt(decoratorKey, 10),
        leafKey: parseInt(leafKey, 10),
    };
};
