class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}
class Cart {
  items = [];
  addProduct (product) {
    console.log(this);
    console.log(product);
    this.items.push(product)
    this.totalOutput.innerHTML = `<h2>Total \$${1}</h2>`
  }
  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total \$${0}</h2>
      <button> Order Now! </button>
    `
    cartEl.className= 'cart';
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}
class ProductItem {
  constructor(product) {
    this.product = product;
  }
  addToCart() {
    // below code, not utilizing objs but on class itself. That means we only utilize one class solely.
    Shop.addProductToCart(this.product)    // important change
  }
  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}
class ProductList {
  products = [
    new Product(
      'A Pillow',
      'https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg',
      'A soft pillow!',
      19.99
    ),
    new Product(
      'A Carpet',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
      'A carpet which you might like - or not.',
      89.99
    )
  ];
  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}
// class Shop {
//   static cart;
//   render() {
//     const renderHook = document.getElementById('app');
//     this.cart = new Cart();                         // important change
//     const cartEl = this.cart.render();              // important change
//     const productList = new ProductList();
//     const prodListEl = productList.render();
//     renderHook.append(cartEl);
//     renderHook.append(prodListEl);

//   }
// }
// class App {                       // helper class, all static methods for dynamic classes to form one app.
//   static init() {
//     const shop = new Shop();
//     shop.render();
//     this.cart = shop.cart;        // lifting property up by one class, arriving now at static class.
//   }
//   static addProductToCart(product) {
//     this.cart.addProduct(product)
//     // despite addProduct is dyn_mthd, it is static now since cart is pointing to the static cart (written in shop)
//     // addProductToCart can't be duplicated/ instanced.
//   }
// }
// App.init();

// alternatively and easier to imagine.
class Shop {
  static cart;
  static init() {
    const renderHook = document.getElementById('app');
    this.cart = new Cart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
  static addProductToCart(product) {
    this.cart.addProduct(product)
  }
}
Shop.init();