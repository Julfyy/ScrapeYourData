const data = require('./data');

const { initWorkBook, setColumns, formatData, createRowFromArray } = require('../utils/workbookUtils');

describe('Workbook data input test', () => {
    test('Workbook created', () => {
        const workbook = initWorkBook();
        expect(workbook.creator === 'Julfy').not.toBeFalsy();
    });

    test('Worksheet\'s columns have been set', async () => {
        const workbook = initWorkBook();
        const worksheet = setColumns(data, workbook.addWorksheet('Sheet1'));
        expect(worksheet.columns === []).toBeFalsy();
    });

    test('Data is formatted', async () => {
        const result = formatData(data);
        expect(result === []).toBeFalsy();
    });

    test('Finally rows are ready', async () => {
        const row = formatData(data)[0];
        const endRow = createRowFromArray(row);
        expect(endRow === {}).toBeFalsy();
    });
})