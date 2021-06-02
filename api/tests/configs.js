const domino_pizza_config = {
    url: 'https://glovoapp.com/pl/pl/warszawa/domino-s-pizza-waw1/pizze_50302694/',
    selectors: [
        { title: 'title', tag: 'h4.title' },
        { title: 'description', tag: 'div.description' },
        { title: 'price', tag: 'div.product-price' }
    ]
};

const pizzaujana_config = {
    url: 'https://www.pizzaujana.pl/restauracja/pizza-u-jana/',
    selectors: [
        { title: 'title', tag: 'h4.m-item__title.restaurant-menu__dish-name' },
        { title: 'description', tag: 'span.muted' },
        { title: 'price', tag: 'span.m-item__price' },
        { title: 'price2', tag: 'button.btn.add-button.js-add-to-cart-button' }
    ]
};

const restauracjarosso_config = {
    url: 'https://www.restauracjarosso.pl/restauracja/restauracja-rosso/',
    selectors: [
        { title: 'title', tag: 'h4.m-item__title.restaurant-menu__dish-name' },
        { title: 'description', tag: 'div.m-item__description' },
        { title: 'price', tag: 'span.m-item__price' }
    ]
};

module.exports = {
    domino_pizza_config,
    pizzaujana_config,
    restauracjarosso_config
}
