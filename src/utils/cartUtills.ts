import { AboutCart, AboutCartApi, CheckCart } from "../types/cartTypes";
import { ProductDetails } from "../types/productTypes";


export const getProductsFromLocStor = (): CheckCart[] => {
    const productsInCartLocStorJson = localStorage.getItem('productsInCart');
    const productsInCartLocStor = productsInCartLocStorJson ? JSON.parse(productsInCartLocStorJson) : [];

    return productsInCartLocStor;
}

export const addProductToLocStor = (product: ProductDetails, quantity: number) => {
    const productsInCartLocStor: CheckCart[] = getProductsFromLocStor();
    const productCartFormat: CheckCart = mapProductDetailsToCheckCart(product);
    const productExistInLocalStorage: CheckCart | undefined = productsInCartLocStor.find(
        (p: CheckCart) => p.productId === productCartFormat.productId
    );

    if (productExistInLocalStorage) {
        productExistInLocalStorage.quantity += quantity;

        productExistInLocalStorage.productTotalPrice =
            productExistInLocalStorage.quantity * productExistInLocalStorage.productUnitPrice;
    } else {
        productCartFormat.quantity = quantity;

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

export const calculateTotalLocStore = (cartContentLocStore: CheckCart[]): number => {
    let totalFromLocStor: number = 0;

    if(!cartContentLocStore || cartContentLocStore.length === 0) return 0;

    cartContentLocStore.forEach((product: CheckCart) => {
        totalFromLocStor += product.quantity * product.productUnitPrice; 
    });

    return totalFromLocStor;
};

export const getCombinedCartContent = (cartContApi: AboutCartApi, cartContLocStor: CheckCart[]): AboutCart => {
    const totalFromLocStor = calculateTotalLocStore(cartContLocStor);

    const newCartContent: AboutCart = {
        totalCartValue: cartContApi.totalCartValue + totalFromLocStor,
        aboutProductsInCart: [...cartContApi.aboutProductsInCart, ...cartContLocStor]
    };

    return newCartContent;
};