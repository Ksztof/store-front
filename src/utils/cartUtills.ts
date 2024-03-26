import { AboutCart, AboutCartApi, CheckCart } from "../types/cartTypes";
import { ProductDetails } from "../types/productTypes";


export const getProductsFromLocStor = (): CheckCart[] => {
    const productsInCartLocStorJson = localStorage.getItem('productsInCartLocStor');
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

    localStorage.setItem('productsInCartLocStor', JSON.stringify(productsInCartLocStor));
};

export const addCombinedCartToLocStor = (combinedCart: AboutCart) => {
    localStorage.setItem('combinedCartLocStor', JSON.stringify(combinedCart));
};

export const removeCombinedCartFromLocStor = () => {
    localStorage.removeItem('combinedCartLocStor');
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

    if (!cartContentLocStore || cartContentLocStore.length === 0) return 0;

    cartContentLocStore.forEach((product: CheckCart) => {
        totalFromLocStor += product.quantity * product.productUnitPrice;
    });

    return totalFromLocStor;
};

export const getCombinedCartContent = (cartContApi: AboutCartApi, cartContLocStor: CheckCart[]): AboutCart => {
    const totalFromLocStor = calculateTotalLocStore(cartContLocStor);

    const newCartContentMap: { [productId: number]: CheckCart } = {};
    const newCartContent: AboutCart = {
        totalCartValue: totalFromLocStor + cartContApi.totalCartValue,
        aboutProductsInCart: []
    }

    cartContApi.aboutProductsInCart.forEach(product => getCartContentAsMap(product, newCartContentMap));
    cartContLocStor.forEach(product => getCartContentAsMap(product, newCartContentMap));

    newCartContent.aboutProductsInCart = Object.values(newCartContentMap);

    return newCartContent;
};

const getCartContentAsMap = (obj: CheckCart, map: { [productId: number]: CheckCart }) => {

    if (map[obj.productId]) {
        map[obj.productId].quantity += obj.quantity;
    } else {
        map[obj.productId] = { ...obj };
    }
};

const isCartExist = (): boolean => {
    const cartContent = localStorage.getItem('cartContent');

    if(cartContent === null){
        return true;
    } else {
        return false;
    }
}