import { CheckCart } from "../types/cartTypes";
import { ProductDetails } from "../types/productTypes";

export const getProductsFromLocStor = (): CheckCart[] => {
    const productsInCartLocStorJson = localStorage.getItem('productsInCart');
    const productsInCartLocStor = productsInCartLocStorJson ? JSON.parse(productsInCartLocStorJson) : [];

    return productsInCartLocStor;
}

export const addProductToLocStor = (product: ProductDetails) => {
    const productsInCartLocStor: CheckCart[] = getProductsFromLocStor();

    //zrobic rzutowanie na CheckCart,  podczas którego każdy dodany produkt, będzie zwiększał ilość produkt w local storage
    
    productsInCartLocStor.push(product);

    localStorage.setItem('productsInCart', JSON.stringify(productsInCartLocStor))
};
