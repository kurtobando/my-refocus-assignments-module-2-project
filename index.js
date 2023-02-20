const ocs = require("./online-clothing-store");

// add new product
ocs.addProduct({
    name: "T-Shirt",
    category: "Clothing",
    price: 250.0,
    stock: 100,
    description:
        "A t-shirt is a style of unisex fabric shirt named after the T shape of its body and sleeves. Traditionally it has short sleeves and a round neckline, known as a crew neck, which lacks a collar. T-shirts are generally made of a stretchy, light and inexpensive fabric and are easy to clean.",
});
ocs.addProduct({
    name: "Ladies Shoes",
    category: "Shoes",
    price: 99.0,
    stock: 0,
    description:
        "A shoe is an item of footwear intended to protect and comfort the human foot while the wearer is doing various activities. Shoes are also used as an item of decoration and fashion. The design of shoes has varied enormously through time and from culture to culture, with appearance originally being tied to function.",
});

// add new user
ocs.addUser({
    name_first: "John",
    name_last: "Doe",
    age: 25,
    birthday: "1995-01-01",
});
ocs.addUser({
    name_first: "Jane",
    name_last: "Doe",
    age: 24,
    birthday: "1996-01-01",
});
ocs.addUser({
    name_first: "Juan",
    name_last: "Dela Cruz",
    age: 18,
    birthday: "2000-01-01",
});

// remove user
ocs.removeUserById(3);

// sign in user
ocs.signedInUserById(1);
ocs.signedInUserById(2);

// sign out user
ocs.signedOutUserById(2);

// add product stock
ocs.addProductStockById(2, 99);

// add product to cart
ocs.addProductToCartById(1, 2, ocs.getUsersSignedIn()[0]);
ocs.addProductToCartById(2, 3, ocs.getUsersSignedIn()[0]);

// remove product to cart
ocs.removeProductToCartById(1, ocs.getUsersSignedIn()[0]);

// confirm checkout
ocs.confirmCheckout(true, ocs.getUsersSignedIn()[0]);

// proceed to checkout
ocs.proceedCheckOutCart(ocs.getUsersSignedIn()[0], 1000);

// current users, users sign-in, products and cart
// console.log('All Users:', ocs.getUsers());
// console.log('All Signed-in Users', ocs.getUsersSignedIn());
// console.log('All Products', ocs.getProducts());
// console.log('All Carts', ocs.getUsersCart());
// console.log('All Receipts', ocs.getUsersReceipt());

ocs.getUsersReceiptByUserId(ocs.getUsersSignedIn()[0]);
