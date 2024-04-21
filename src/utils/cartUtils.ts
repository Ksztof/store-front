import { AboutCart, CheckCart } from "../types/cartTypes";
import { ProductDetails } from "../types/productTypes";


export const getProductsFromLocStor = (): AboutCart | null => {
    const cartContentJson = localStorage.getItem('productsInCartLocStor');
    const cartContent:  AboutCart | null = cartContentJson
     ? JSON.parse(cartContentJson) : null;

    return cartContent;
}

export const addProductToLocStor = (product: ProductDetails, quantity: number) => {
    const productsInCartLocStor: AboutCart | null = getProductsFromLocStor();
    const productCartFormat: CheckCart = mapProductDetailsToCheckCart(product);
    const productExistInLocalStorage: CheckCart | undefined = productsInCartLocStor?.aboutProductsInCart
        .find((p: CheckCart) => p.productId === productCartFormat.productId);

    if (productExistInLocalStorage) {
        const newProductsTotalPrice = quantity * productExistInLocalStorage.productUnitPrice;

        productExistInLocalStorage.quantity += quantity;

        productExistInLocalStorage.productTotalPrice = newProductsTotalPrice;
        if (productsInCartLocStor) {
            productsInCartLocStor.totalCartValue += newProductsTotalPrice;
        }

    } else {
        productCartFormat.quantity = quantity;

        productCartFormat.productTotalPrice =
            productCartFormat.quantity * productCartFormat.productUnitPrice;

        if (productsInCartLocStor) {
            productsInCartLocStor.aboutProductsInCart.push(productCartFormat);
            productsInCartLocStor.totalCartValue += productCartFormat.productTotalPrice;
        }
    }

    localStorage.setItem('productsInCartLocStor', JSON.stringify(productsInCartLocStor));
};

export const addCartContentToLocStor = (cartContent: AboutCart) => {
    console.log("cartContent from addCartContentToLocStor: " + JSON.stringify(cartContent));
    localStorage.setItem('productsInCartLocStor', JSON.stringify(cartContent));
};

export const mapProductDetailsToCheckCart = (product: ProductDetails): CheckCart => ({
    productId: product.id,
    productName: product.name,
    productUnitPrice: product.price,
    description: product.description,
    manufacturer: product.manufacturer,
    quantity: 1,
    productTotalPrice: 0,
});

// export const calculateTotalLocStore = (cartContentLocStore: CheckCart[]): number => {
//     let totalFromLocStor: number = 0;

//     if (!cartContentLocStore || cartContentLocStore.length === 0) return 0;

//     cartContentLocStore.forEach((product: CheckCart) => {
//         totalFromLocStor += product.quantity * product.productUnitPrice;
//     });

//     return totalFromLocStor;
// };

// export const getCombinedCartContent = (cartContApi: AboutCart, cartContLocStor: CheckCart[]): AboutCart => {
//     const totalFromLocStor = calculateTotalLocStore(cartContLocStor);

//     const newCartContentMap: { [productId: number]: CheckCart } = {};
//     const newCartContent: AboutCart = {
//         totalCartValue: totalFromLocStor + cartContApi.totalCartValue,
//         aboutProductsInCart: []
//     }

//     cartContApi.aboutProductsInCart.forEach(product => getCartContentAsMap(product, newCartContentMap));
//     cartContLocStor.forEach(product => getCartContentAsMap(product, newCartContentMap));

//     newCartContent.aboutProductsInCart = Object.values(newCartContentMap);

//     return newCartContent;
// };

const getCartContentAsMap = (obj: CheckCart, map: { [productId: number]: CheckCart }) => {

    if (map[obj.productId]) {
        map[obj.productId].quantity += obj.quantity;
    } else {
        map[obj.productId] = { ...obj };
    }
};

export const isCartExistLocStor = (): boolean => {
    const cartContent = localStorage.getItem('productsInCartLocStor');

    if (cartContent === null) {
        return false;
    } else {
        return true;
    }
}