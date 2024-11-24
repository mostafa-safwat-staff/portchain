import loadCursorBatch from './loadCursorBatch';

describe('loadCursorBatch', () => {
    it('should batch items into the correct sizes', async () => {
        const items = [1, 2, 3, 4, 5, 6, 7];
        const batchSize = 3;

        const result = [];
        for await (const batch of loadCursorBatch(items, batchSize)) {
            result.push(batch);
        }

        expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    it('should handle an empty iterable', async () => {
        const items = [];
        const batchSize = 3;

        const result = [];
        for await (const batch of loadCursorBatch(items, batchSize)) {
            result.push(batch);
        }

        expect(result).toEqual([]);
    });

    it('should handle a batch size larger than the total number of items', async () => {
        const items = [1, 2];
        const batchSize = 5;

        const result = [];
        for await (const batch of loadCursorBatch(items, batchSize)) {
            result.push(batch);
        }

        expect(result).toEqual([[1, 2]]);
    });

    it('should handle a batch size of 1', async () => {
        const items = [1, 2, 3];
        const batchSize = 1;

        const result = [];
        for await (const batch of loadCursorBatch(items, batchSize)) {
            result.push(batch);
        }

        expect(result).toEqual([[1], [2], [3]]);
    });
});
