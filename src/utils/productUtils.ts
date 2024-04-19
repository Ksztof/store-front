import { AboutCart, CheckCart } from "../types/cartTypes";
import { ProductDetails, ProductPayload } from "../types/productTypes";
import { AppDispatch } from "../redux/store";
import { addProductToRedStor } from "../redux/actions/cartActions";


export const addProductToCart = (quantity: string, product: ProductDetails | undefined, dispatch: AppDispatch) => {
    let parsedQuant: number = parseFloat(quantity);
    const inputIsntNumber = !isNaN(parsedQuant);
    const productExists = product;
    const inputIsPositive = parsedQuant > 0;
    const isEmptyString = quantity === '';
    const valueIsInScope = parsedQuant < 100;

    if (
        (inputIsntNumber && productExists && inputIsPositive && valueIsInScope) ||
        (productExists && isEmptyString)
    ) {
        if (quantity === '') {
            parsedQuant = 1;
        }

        let productPayload: ProductPayload = {
            product: product,
            quantity: parsedQuant,
        }

        dispatch(addProductToRedStor(productPayload))
    }
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