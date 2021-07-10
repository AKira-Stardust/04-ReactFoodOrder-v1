import React, { useContext } from "react";

import styles from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { func } from "prop-types";


function Cart(props){

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const cartHasItems = cartCtx.items.length > 0;

    function cartItemAddHandler(item){
        cartCtx.addItem({...item, quantity: 1});
    }

    function cartItemRemoveHandler(id){
        cartCtx.removeItem(id);
    }

    const cartItems = 
    <ul className={styles['cart-items']}>
        {
            cartCtx.items.map( 
                (item)=>(
                    <CartItem 
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onAdd={cartItemAddHandler.bind(null, item)}
                        onRemove={cartItemRemoveHandler.bind(null, item.id) }
                    /> 
                )
            )
        }
    </ul>;
 

    return(
        <Modal onBGClick={props.onHideCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>          
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCart} >Close</button>
                {cartHasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;