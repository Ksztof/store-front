import { AboutCart, addProductToReduxStorePayload, CheckCart, deleteProductPayload, increaseProductInCartQuantityStorePayload, NewProductsForApi } from "./cartTypes";
import { ModifyProductInCartQuantityPayload } from "./cartTypes";
import { produce } from 'immer';
import { isGuestUser } from "../shared/cookies/cookiesUtils";
import { ProductDetails } from "../product/productTypes";

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

export const deleteProduct = (payload: deleteProductPayload): AboutCart => {
    return produce(payload.cartContent, (draft: AboutCart) => {
        const productTotalPrice: number = draft.aboutProductsInCart.find((p: CheckCart) => p.productId === payload.productId)?.productTotalPrice || 0;
       
        draft.aboutProductsInCart = draft.aboutProductsInCart.filter((p: CheckCart) => p.productId !== payload.productId);
        
        draft.totalCartValue -= productTotalPrice;
        
        if (draft.aboutProductsInCart.length < 1) {
            draft.totalCartValue = 0;
        }
    });
}

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

export const getCartWithNewProduct = (payload: addProductToReduxStorePayload): AboutCart => {
    const newProduct: CheckCart = mapProductDetailsToCheckCart(payload.newProduct, payload.newProductQuantity);

    return produce(payload.cartContent ?? {
        totalCartValue: 0,
        aboutProductsInCart: [],
        createdAt: ""
    }, (draft: AboutCart) => {
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

            if (draft.aboutProductsInCart.length === 0) {
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