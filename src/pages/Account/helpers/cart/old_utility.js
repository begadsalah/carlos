export const ___calculateTotal = (cartData, applied_coupon, props, storeId) => {
    if (cartData.length != undefined) {
        let { products, cart, addons } = props;
        let product;
        let sum = 0;
        let addon = 0;
        let temp_sum = 0;
        cart = cartData.filter(data => data.storeId == storeId);
        for (let item in cart) {
            let product = products.find(data => data.id == cart[item].itemId);
            if (cart[item].addon != null) {
                let temp = addons.find(data => data.id == cart[item].addon);
                if (temp) {
                    sum = sum + Number(temp.price) * cart[item].count;
                } else {
                    sum = sum + product.price * cart[item].count;
                }
            } else if (cart[item].extra) {
                temp_sum = 0;
                for (let ext in cart[item].extra) {
                    let temp = addons.find(
                        data => data.id == cart[item].extra[ext].addon_id
                    );
                    temp_sum =
                        temp_sum +
                        temp.price * cart[item].extra[ext].calculationcount;
                }
                sum = sum + product.price * cart[item].count + temp_sum;
            } else sum = sum + product.price * cart[item].count;
        }
        // apply coupon if exist

        return sum;
    }
};
