import { ProductDetails } from "../types/productTypes";

export const getProductsFromLocStor = (): ProductDetails[] => {
    const productsInCartLocStorJson = localStorage.getItem('productsInCart');
    const productsInCartLocStor = productsInCartLocStorJson ? JSON.parse(productsInCartLocStorJson) : [];

    return productsInCartLocStor;
}

export const addProductToLocStor = (product: ProductDetails) => {
    const productsInCartLocStor: ProductDetails[] = getProductsFromLocStor();
    
    productsInCartLocStor.push(product);

    localStorage.setItem('productsInCart', JSON.stringify(productsInCartLocStor))
};
