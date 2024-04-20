import { AboutCart, CheckCart } from "../types/cartTypes";
import { ProductPayloadCart, ProductPayloadLocStor } from "../types/productTypes";

export const prepareProductForCart = (payload: ProductPayloadCart): ProductPayloadLocStor | undefined => {
    let parsedQuant: number = parseFloat(payload.quantity);
    const inputIsNumber = !isNaN(parsedQuant);
    const productExists = payload.product;
    const inputIsPositive = parsedQuant > 0;
    const isEmptyString = payload.quantity === '';
    const valueIsInScope = parsedQuant < 100;

    if (
        (inputIsNumber && productExists && inputIsPositive && valueIsInScope) ||
        (productExists && isEmptyString)) {
        if (payload.quantity === '') {
            parsedQuant = 1;
        }

        let productPayload: ProductPayloadLocStor = {
            product: payload.product,
            quantity: parsedQuant,
        }

        return productPayload;
    }
    
    return undefined;
};

export const decreaseQuantity = (productId: number) => {
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

        localStorage.setItem('productsInCartLocStor', JSON.stringify(cartContent));
    }
};

export const increaseQuantity = (productId: number) => {
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