import { AboutCart, CheckCart } from "../types/cartTypes";
import { ProductDetails } from "../types/productTypes";
import { mapProductDetailsToCheckCart } from "./cartUtils";

export const getProductsFromLocStor = (): AboutCart | null => {
    const cartContentJson = localStorage.getItem('productsInCartLocStor');
    const cartContent: AboutCart | null = cartContentJson
        ? JSON.parse(cartContentJson) : null;

    return cartContent;
}

export const addProductToLocStor = (product: ProductDetails, quantity: number) => {
    const productCartFormat: CheckCart = mapProductDetailsToCheckCart(product);

    const productsInCartLocStor: AboutCart | null = getProductsFromLocStor();
    if (productsInCartLocStor === null) {
        const newCart: AboutCart = {
            totalCartValue: product.price * quantity,
            aboutProductsInCart: [productCartFormat],
            createdAt: ""
        }
        localStorage.setItem('productsInCartLocStor', JSON.stringify(newCart));
    }

    if (productsInCartLocStor !== null) {
        const productExistInLocalStorage: CheckCart | undefined = productsInCartLocStor?.aboutProductsInCart
            .find((p: CheckCart) => p.productId === productCartFormat.productId);

        if (productExistInLocalStorage) {
            const newProductsTotalPrice = quantity * productExistInLocalStorage.productUnitPrice;
            productExistInLocalStorage.quantity += quantity;
            productExistInLocalStorage.productTotalPrice += newProductsTotalPrice;

            if (productsInCartLocStor) {
                productsInCartLocStor.totalCartValue += newProductsTotalPrice;
            }
        } else {
            productCartFormat.quantity = quantity;
            productCartFormat.productTotalPrice = productCartFormat.quantity * productCartFormat.productUnitPrice;
            if (productsInCartLocStor) {
                productsInCartLocStor.aboutProductsInCart.push(productCartFormat);
                productsInCartLocStor.totalCartValue += productCartFormat.productTotalPrice;
            }

        }
        localStorage.setItem('productsInCartLocStor', JSON.stringify(productsInCartLocStor));
    }
};

export const addCartContentToLocStor = (cartContent: AboutCart) => {
    localStorage.setItem('productsInCartLocStor', JSON.stringify(cartContent));
};

export const clearCartContentInLocStor = () => {
    localStorage.removeItem('productsInCartLocStor');
};

export const decreaseProductInCartQuantityLs = (productId: number) => {
    const cartContentJson = localStorage.getItem('productsInCartLocStor');
    const cartContent: AboutCart | null = cartContentJson
        ? JSON.parse(cartContentJson) : null;

    if (cartContent?.aboutProductsInCart) {
        const productIndex: number | undefined = cartContent.aboutProductsInCart.findIndex((p: CheckCart) => p.productId === productId);
        var product = cartContent.aboutProductsInCart[productIndex];

        if (productIndex !== -1 && cartContent?.aboutProductsInCart[productIndex].quantity > 1) {
            product.quantity -= 1;
            product.productTotalPrice -= product.productUnitPrice;
            cartContent.totalCartValue -= product.productUnitPrice;
        } else if (productIndex !== -1 && product.quantity === 1) {
            cartContent?.aboutProductsInCart.splice(productIndex, 1)
            cartContent.totalCartValue -= product.productUnitPrice;
        }

        if (cartContent.aboutProductsInCart.length === 0) {
            cartContent.totalCartValue = 0;
        }

        localStorage.setItem('productsInCartLocStor', JSON.stringify(cartContent));
    }
};

export const increaseProductInCartQuantityLs = (productId: number) => {
    const cartContentJson = localStorage.getItem('productsInCartLocStor');
    const cartContent: AboutCart | null = cartContentJson
        ? JSON.parse(cartContentJson) : null;

    if (cartContent?.aboutProductsInCart) {
        const product: CheckCart | undefined = cartContent.aboutProductsInCart.find((p: CheckCart) => p.productId === productId);

        if (product) {
            product.quantity += 1;
            product.productTotalPrice += product.productUnitPrice;
            cartContent.totalCartValue += product.productUnitPrice;
        }

        localStorage.setItem('productsInCartLocStor', JSON.stringify(cartContent));
    }
};

export const isCartExistLocStor = (): boolean =>
    !!localStorage.getItem('productsInCartLocStor');