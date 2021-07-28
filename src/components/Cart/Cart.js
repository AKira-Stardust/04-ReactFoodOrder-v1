import React, { useContext, useState } from "react";

import styles from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { func } from "prop-types";
import Checkout from "./Checkout";


function Cart(props){

    const cartCtx = useContext(CartContext);

    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isOrdering, setIsOrdering] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    // const [postError, setPostError] = useState(null);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const cartHasItems = cartCtx.items.length > 0;

    function cartItemAddHandler(item){
        cartCtx.addItem({...item, quantity: 1});
    }

    function cartItemRemoveHandler(id){
        cartCtx.removeItem(id);
    }

    function orderClickHandler(event){
        setIsCheckedOut(true);
    }

    async function submitOrderHandler(userData){
        setIsOrdering(true);

           const response = await 
            fetch("https://react-http-start-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json",{
                method:"POST",
                body:JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items
                })
            });

            setIsOrdered(true);
            setIsOrdering(false);
            cartCtx.clearCart();
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
 
    const checkOutButtons = 
    <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onHideCart} >Close</button>
    {cartHasItems && <button onClick={orderClickHandler} className={styles.button}>Order</button>}
    </div> ;

    const modalCartItems = 
    <React.Fragment>
        {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>          
            </div>
            {isCheckedOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
            {!isCheckedOut && checkOutButtons}
    </React.Fragment>;
    
    const modalIsOrdering =
    <p> Ordering... </p>

    const modalIsOrdered = 
    <React.Fragment>
        <p> Order Successful! </p>
        <div className={styles.actions}>
          <button className={styles.button} onClick={props.onHideCart} >Close</button>
        </div>
    </React.Fragment>

    // const modalError = 
    // <React.Fragment>
    //     <p>{postError} Please try again later! </p>
    //     <button className={styles.button} onClick={props.onHideCart} >Close</button>
    // </React.Fragment>

    return(
        <Modal onBGClick={props.onHideCart}>
        {!isOrdering && !isOrdered && modalCartItems} 
        {isOrdering && modalIsOrdering} 
        {!isOrdering && isOrdered && modalIsOrdered} 
        </Modal>
    );
}

export default Cart;