export default async function* loadCursorBatch(asyncIterable, batchSize) {
    let items = [];
    for await (const item of asyncIterable) {
        items.push(item);
        if (items.length === batchSize) {
            yield items;
            items = [];
        }
    }
    if (items.length > 0) {
        yield items;
    }
}