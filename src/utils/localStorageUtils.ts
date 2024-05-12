import { AboutCart, CheckCart, addProductToReduxStorePayload, increaseProductInCartQuantityStorePayload } from "../types/cartTypes";
import { mapProductDetailsToCheckCart } from "./cartUtils";
import { produce } from 'immer';

export const getProductsFromLocStor = (): AboutCart | null => {
    const cartContentJson = localStorage.getItem('productsInCartLocStor');
    const cartContent: AboutCart | null = cartContentJson
        ? JSON.parse(cartContentJson) : null;

    return cartContent;
}

export const getCartWithNewProduct = (payload: addProductToReduxStorePayload): AboutCart => {
    const newProduct: CheckCart = mapProductDetailsToCheckCart(payload.newProduct, payload.newProductQuantity);

    return produce(payload.cartContent, (draft: AboutCart) => {
        const product: CheckCart | undefined = draft.aboutProductsInCart
            .find((p: CheckCart) => p.productId === newProduct.productId);
        const newProductTotalPrice = payload.newProductQuantity * payload.newProduct.price;

        if (product) {
            product.quantity += payload.newProductQuantity;
            product.productTotalPrice += newProductTotalPrice;
            draft.totalCartValue += newProductTotalPrice;
        } else {
            draft.aboutProductsInCart.push(newProduct);
            draft.totalCartValue += newProductTotalPrice;
        }
    });
};

export const addCartContentToLocStor = (cartContent: AboutCart) => {
    localStorage.setItem('productsInCartLocStor', JSON.stringify(cartContent));
};

export const clearCartContentInLocStor = () => {
    localStorage.removeItem('productsInCartLocStor');
};

export const decreaseProductInCartQuantity = (payload: increaseProductInCartQuantityStorePayload): AboutCart => {
    return produce(payload.cartContent, (draft: AboutCart) => {
        const productIndex: number | undefined = draft.aboutProductsInCart.findIndex((p: CheckCart) => p.productId === payload.productId);
        if (productIndex !== -1) {
            const product = draft.aboutProductsInCart[productIndex];
            if (product.quantity > 1) {
                product.quantity -= 1;
                product.productTotalPrice -= product.productUnitPrice;
                draft.totalCartValue -= product.productUnitPrice;
            } else if (product.quantity === 1) {
                draft.aboutProductsInCart.splice(productIndex, 1);
                draft.totalCartValue -= product.productUnitPrice;
            }

            if(draft.aboutProductsInCart.length === 0){
                draft.totalCartValue = 0;
            }
        }
    });
};

export const increaseProductInCartQuantity = (payload: increaseProductInCartQuantityStorePayload): AboutCart => {
    return produce(payload.cartContent, (draft: AboutCart) => {
        const product = draft.aboutProductsInCart.find((p: CheckCart) => p.productId === payload.productId);
        if (product) {
            product.quantity += 1;
            product.productTotalPrice += product.productUnitPrice;
            draft.totalCartValue += product.productUnitPrice;
        }
    });
};

export const isCartExistLocStor = (): boolean =>
    !!localStorage.getItem('productsInCartLocStor');