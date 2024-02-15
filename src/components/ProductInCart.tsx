import { ProductInCartDetails } from "../types/productTypes"

export const ProductInCart = ({ product } : { product : ProductInCartDetails }) => {
    
    
    return(
        <div>
            <p>{product.quantity} x {product.name}</p>
            <p>{product.price * product.quantity} </p>
        </div>
    )
}