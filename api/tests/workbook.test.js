const data = require('./data');
const columns = require('./columns');
const formattedData = require('./formatData');

const {
  initWorkBook,
  setColumns,
  formatData,
  createRowFromArray,
} = require('../utils/workbookUtils');

describe('Workbook data input test', () => {
  test('Workbook created', () => {
    const workbook = initWorkBook();
    expect(workbook.creator).toEqual('Julfy');
  });

  test("Worksheet's columns have been set", async () => {
    const workbook = initWorkBook();
    const worksheet = setColumns(data, workbook.addWorksheet('Sheet1'));
    const testingFields = worksheet.columns.map((x) => {
      return {
        header: x._header,
        key: x._key,
        width: x.width,
      };
    });

    expect(testingFields).toEqual(columns);
  });

  test('Data is formatted', async () => {
    const result = formatData(data);
    expect(result).toEqual(formattedData);
  });

  test('Finally rows are ready', async () => {
    const row = formatData(data)[0];
    const endRow = createRowFromArray(row);
    const expectedRow = {
      0: 'Pizza Quarto Cheese Duża',
      1: 'Z sosem śmietanowym oraz wyśmienitymi serami: mozzarella, cheddar, ementalski i aromatycznym serem pleśniowym Lazur',
      2: '49,98 zł',
    };
    expect(endRow).toEqual(expectedRow);
  });
});
