import { AboutCart, CheckCart, NewProductsForApi } from "../types/cartTypes";
import { ProductDetails } from "../types/productTypes";
import { ModifyProductInCartQuantityPayload } from "../types/cartTypes";
import { produce } from 'immer';
import { isGuestUser } from "./cookiesUtils";

export const mapProductDetailsToCheckCart = (productDetails: ProductDetails, quantity: number): CheckCart => ({
    productId: productDetails.id,
    productName: productDetails.name,
    productUnitPrice: productDetails.price,
    description: productDetails.description,
    manufacturer: productDetails.manufacturer,
    quantity: quantity,
    productTotalPrice: quantity * productDetails.price,
});

export const modifyProductInCartQuantity = (payload: ModifyProductInCartQuantityPayload): AboutCart => {
    return produce(payload.aboutCart, (draft: AboutCart) => {
        const productIndex: number = draft.aboutProductsInCart.findIndex(p => p.productId === payload.productId);

        if (productIndex !== -1) {
            const product: CheckCart = draft.aboutProductsInCart[productIndex];

            product.quantity = payload.productQuantity;
            product.productTotalPrice = product.quantity * product.productUnitPrice;

            draft.totalCartValue = calculateTotalCartValue(draft.aboutProductsInCart);
        }
    });
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

export const needToSetCurrentCart = (isCartEmpty: boolean, isLoggedIn: boolean): boolean => {
    return (isLoggedIn) || (isGuestUser());
}

export const needSynchronization = (isLoggedIn: boolean, cartContent: AboutCart): boolean => {
    return (cartContent.createdAt.trim() === "" && isLoggedIn)
        || (cartContent.createdAt.trim() === "" && isGuestUser());
}

export const needToClearCart = (isCartEmpty: boolean, isLoggedIn: boolean, cartContent: AboutCart): boolean => {
    return (isCartEmpty && isGuestUser() && cartContent.createdAt.trim() !== "") || (isCartEmpty && isLoggedIn && cartContent.createdAt.trim() !== "");
}