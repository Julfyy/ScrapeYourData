const { getTxt } = require('../Parser');
const {
  domino_pizza_config,
  pizzaujana_config,
  restauracjarosso_config,
} = require('./configs');

describe('.txt tests', () => {
  beforeEach(() => {
    jest.setTimeout(15000);
  });

  test("Glovo Domino's Pizza test has passed", async () => {
    const data = await getTxt(domino_pizza_config);
    expect(data === '').toBeFalsy();
  });

  test('Pizza U Jana test has passed', async () => {
    const data = await getTxt(pizzaujana_config);
    expect(data === '').toBeFalsy();
  });

  test('Jarosso test has passed', async () => {
    const data = await getTxt(restauracjarosso_config);
    expect(data === '').toBeFalsy();
  });
});
3;
