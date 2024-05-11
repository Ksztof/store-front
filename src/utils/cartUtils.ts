import { AboutCart, CheckCart, NewProductsForApi } from "../types/cartTypes";
import { ProductDetails } from "../types/productTypes";
import { ModifyProductInCartQuantityPayload } from "../types/cartTypes";

export const mapProductDetailsToCheckCart = (productDetails: ProductDetails): CheckCart => ({
    productId: productDetails.id,
    productName: productDetails.name,
    productUnitPrice: productDetails.price,
    description: productDetails.description,
    manufacturer: productDetails.manufacturer,
    quantity: 1,
    productTotalPrice: 0,
});

export const modifyProductInCartQuantity = (payload: ModifyProductInCartQuantityPayload): AboutCart => {
    const cartContent: AboutCart = payload.aboutCart;
    const product = cartContent.aboutProductsInCart.find((p: CheckCart) => p.productId === payload.productId);
    if (product) {
        product.quantity = payload.productQuantity;
        product.productTotalPrice = product.quantity * product.productUnitPrice;
        cartContent.totalCartValue = calculateTotalCartValue(cartContent.aboutProductsInCart);
    }

    return cartContent;
};

export const calculateTotalCartValue = (cartContentLocStore: CheckCart[]): number => {
    if (!cartContentLocStore || cartContentLocStore.length === 0) return 0;

    const total = cartContentLocStore.reduce((total: number, product: CheckCart) => {
        return total + product.quantity * product.productUnitPrice;
    }, 0);

    return total;
};

export const mapAboutCartToNewProductsForApi = (aboutCart: AboutCart): NewProductsForApi => {
    return {
        products: aboutCart.aboutProductsInCart.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
        }))
    };
};