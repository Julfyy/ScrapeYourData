const { getXlsx } = require('../Parser');
const { domino_pizza_config, pizzaujana_config, restauracjarosso_config } = require('./configs');

describe('.xlsx tests', () => {
    beforeEach(() => {
        jest.setTimeout(15000);
    });
  
    test('Glovo Domino\'s Pizza test on rows count was passed', async () => {
        const workbook = await getXlsx(domino_pizza_config);
        expect(workbook.worksheets[0].rowCount).toBeGreaterThan(0);
    });
  
    test('Pizza U Jana test on rows count was passed', async () => {
        const workbook = await getXlsx(pizzaujana_config);
        expect(workbook.worksheets[0].rowCount).toBeGreaterThan(0);
    });
  
    test('Jarosso test on rows count was passed', async () => {
        const workbook = await getXlsx(restauracjarosso_config);
        expect(workbook.worksheets[0].rowCount).toBeGreaterThan(0);
    });
});
