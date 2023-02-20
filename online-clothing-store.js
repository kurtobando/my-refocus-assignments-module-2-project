const OnlineClothingStore = {
    name: "Online Clothing Store",
    address: "1234 Main Street, Philippines",
    zipCode: "12345",
    users: [],
    usersSignedIn: [],
    usersCart: [],
    usersReceipt: [],
    products: [],
    getUsers: function () {
        return this.users;
    },
    getUserFullNameById: function (id) {
        const user = this.users.find((user) => user.id === id);
        return `${user.name_first} ${user.name_last}`;
    },
    getUsersSignedIn: function () {
        return this.usersSignedIn;
    },
    getUsersCart: function () {
        return this.usersCart;
    },
    getUsersReceipt: function () {
        return this.usersReceipt;
    },
    getProducts: function () {
        return this.products;
    },
    getProductNameById: function (id) {
        return this.products.find((product) => product.id === id).name;
    },
    getProductPriceById: function (id) {
        return this.products.find((product) => product.id === id).price;
    },
    getProductCartTotalByUserId: function (user) {
        return this.usersCart.reduce((total, item) => {
            if (item.user_id === user.id) {
                this.products.forEach((product) => {
                    if (product.id === item.product_id) {
                        total += product.price * item.quantity;
                    }
                });
            }
            return total;
        }, 0);
    },
    getProductCartTotalQuantityByUserId: function (user) {
        return this.usersCart.reduce((total, item) => {
            if (item.user_id === user.id) {
                total += item.quantity;
            }
            return total;
        }, 0);
    },
    getUsersReceiptByUserId: function (user) {
        const receipt = this.usersReceipt.filter(
            (item) => item.user_id === user.id
        );

        console.log(`Receipt #${receipt[0].id}`);
        console.log(`Name: ${this.getUserFullNameById(receipt[0].user_id)}`);
        console.log("-----------------------------------------------");
        console.log(`Items`);
        receipt[0].products.forEach((item) =>
            console.log(
                `- ${this.getProductNameById(item.product_id)}, x${
                    item.quantity
                }, ${this.getProductPriceById(item.product_id)}`
            )
        );
        console.log("-----------------------------------------------");
        console.log(`Total Quantity: x${receipt[0].total_quantity}`);
        console.log(`Total Amount: ${receipt[0].total_amount}`);
        console.log(`Given Amount: ${receipt[0].given_amount}`);
        console.log(`Change: ${receipt[0].change}`);
    },
    addUser: function (user) {
        this.users.push({
            ...user,
            id: this.users.length + 1,
        });
    },
    addProduct: function (product) {
        this.products.push({
            ...product,
            id: this.products.length + 1,
        });
    },
    addProductStockById: function (id, stock) {
        this.products.forEach((product) => {
            if (product.id === id) {
                product.stock += stock;
            }
        });
    },
    addProductToCartById: function (id, quantity, user) {
        this.usersSignedIn.forEach((userSignIn) => {
            if (userSignIn.id !== user.id) {
                return `User with an id#${user.id} is not signed in. Cannot add product to cart.`;
            }
        });
        this.products.forEach((product) => {
            if (product.id === id) {
                this.usersCart.push({
                    product_id: product.id,
                    user_id: user.id,
                    quantity: quantity,
                    can_proceed_to_checkout: false,
                });
            }
        });
    },
    removeUserById: function (id) {
        this.users.forEach((user, index) => {
            if (user.id === id) {
                this.users.splice(index, 1);
            }
        });
    },
    removeProductToCartById: function (id, user) {
        this.usersCart.forEach((product, index) => {
            if (product.id === id && product.user_id === user.id) {
                this.usersCart.splice(index, 1);
            }
        });
    },
    signedInUserById: function (id) {
        this.users.forEach((user) => {
            if (user.id === id) {
                this.usersSignedIn.push({
                    id: user.id,
                });
            }
        });
    },
    signedOutUserById: function (id) {
        this.usersSignedIn.forEach((user, index) => {
            if (user.id === id) {
                this.usersSignedIn.splice(index, 1);
            }
        });
    },
    confirmCheckout: function (yes = false, user) {
        if (!yes) return;
        this.usersCart.forEach((product, index) => {
            if (product.user_id === user.id) {
                product.can_proceed_to_checkout = true;
            }
        });
    },
    proceedCheckOutCart: function (user, givenAmount = 0) {
        const totalAmount = this.getProductCartTotalByUserId(user);
        const totalQuantity = this.getProductCartTotalQuantityByUserId(user);

        if (givenAmount < totalAmount) {
            return `User with an id#${user.id} cannot proceed to checkout. Given amount is less than total amount.`;
        }

        // add receipt
        this.usersReceipt.push({
            id: this.usersReceipt.length + 1,
            user_id: user.id,
            total_amount: totalAmount,
            total_quantity: totalQuantity,
            given_amount: givenAmount,
            change: givenAmount - totalAmount,
            products: this.usersCart.map((item) => {
                if (item.user_id === user.id) {
                    return {
                        product_id: item.product_id,
                        quantity: item.quantity,
                    };
                }
            }),
        });

        // adjust stock
        this.usersCart.forEach((item) => {
            if (item.user_id === user.id) {
                this.products.forEach((product) => {
                    if (product.id === item.product_id) {
                        product.stock -= item.quantity;
                    }
                });
            }
        });

        // adjust cart
        this.usersCart = this.usersCart.filter((item) => {
            if (item.user_id === user.id && item.can_proceed_to_checkout) {
                return false;
            }
            return true;
        });
    },
};

module.exports = OnlineClothingStore;
