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