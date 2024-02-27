import { CheckCart } from "../types/cartTypes";
import { ProductDetails } from "../types/productTypes";

export const getProductsFromLocStor = (): CheckCart[] => {
    const productsInCartLocStorJson = localStorage.getItem('productsInCart');
    const productsInCartLocStor = productsInCartLocStorJson ? JSON.parse(productsInCartLocStorJson) : [];

    return productsInCartLocStor;
}

export const addProductToLocStor = (product: ProductDetails) => {
    const productsInCartLocStor: CheckCart[] = getProductsFromLocStor();
    const productCartFormat: CheckCart = mapProductDetailsToCheckCart(product);

    const productExistInLocalStorage: CheckCart | undefined = productsInCartLocStor.find(
        (p: CheckCart) => p.productId === productCartFormat.productId
    );

    if (productExistInLocalStorage) {
        productExistInLocalStorage.quantity += 1;

        productExistInLocalStorage.productTotalPrice =
            productExistInLocalStorage.quantity * productExistInLocalStorage.productUnitPrice;
    } else {
        productCartFormat.quantity = 1;

        productCartFormat.productTotalPrice =
            productCartFormat.quantity * productCartFormat.productUnitPrice;

        productsInCartLocStor.push(productCartFormat);
    }

    localStorage.setItem('productsInCart', JSON.stringify(productsInCartLocStor));
};

const mapProductDetailsToCheckCart = (product: ProductDetails): CheckCart => ({
    productId: product.id,
    productName: product.name,
    productUnitPrice: product.price,
    description: product.description,
    manufacturer: product.manufacturer,
    quantity: 1,
    productTotalPrice: 0,
});
