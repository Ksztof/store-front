import { AboutCart, CheckCart, NewProductsForApi } from "../types/cartTypes";
import { ProductDetails } from "../types/productTypes";


export const getProductsFromLocStor = (): AboutCart | null => {
    const cartContentJson = localStorage.getItem('productsInCartLocStor');
    const cartContent: AboutCart | null = cartContentJson
        ? JSON.parse(cartContentJson) : null;

    return cartContent;
}

export const addProductToLocStor = (product: ProductDetails, quantity: number) => {
    const productCartFormat: CheckCart = mapProductDetailsToCheckCart(product);

    const productsInCartLocStor: AboutCart | null = getProductsFromLocStor();
    if(productsInCartLocStor === null){
        const newCart: AboutCart = {
            totalCartValue: product.price * quantity,
            aboutProductsInCart: [productCartFormat],
            createdAt: product.dateAdded
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
            if (productsInCartLocStor?.createdAt) {
                productsInCartLocStor.createdAt = product.dateAdded;
            }

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

            if (productsInCartLocStor?.createdAt) {
                productsInCartLocStor.createdAt = product.dateAdded;
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

export const mapProductDetailsToCheckCart = (productDetails: ProductDetails): CheckCart => ({
    productId: productDetails.id,
    productName: productDetails.name,
    productUnitPrice: productDetails.price,
    description: productDetails.description,
    manufacturer: productDetails.manufacturer,
    quantity: 1,
    productTotalPrice: 0,
});

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

export const isCartExistLocStor = (): boolean => {
    const cartContent = localStorage.getItem('productsInCartLocStor');

    if (cartContent === null) {
        return false;
    } else {
        return true;
    }
}


export const changeProductInCartQuantityLs = (productId: number, quantity: number) => {
    const cartContentJson = localStorage.getItem('productsInCartLocStor');
    const cartContent: AboutCart | null = cartContentJson
        ? JSON.parse(cartContentJson) : null;

    if (cartContent) {
        const product = cartContent.aboutProductsInCart.find((p: CheckCart) => p.productId === productId);
        if (product) {
            product.quantity = quantity;
            product.productTotalPrice = product.quantity * product.productUnitPrice;
            cartContent.totalCartValue = calculateTotalCartValue(cartContent.aboutProductsInCart);
        }
    }

    localStorage.setItem('productsInCartLocStor', JSON.stringify(cartContent));
};

export const calculateTotalCartValue = (cartContentLocStore: CheckCart[]): number => {
    if (!cartContentLocStore || cartContentLocStore.length === 0) return 0;

    const total = cartContentLocStore.reduce((total: number, product: CheckCart) => {
        return total + product.quantity * product.productUnitPrice;
    }, 0);

    return total;
};

export const mapAboutCartToNewProductsForApi = (aboutCart: AboutCart): NewProductsForApi => {
    return {
        products: aboutCart.aboutProductsInCart.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
        }))
    };
};