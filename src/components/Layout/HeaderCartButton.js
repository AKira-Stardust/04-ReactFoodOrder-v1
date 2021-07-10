import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props){

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    useEffect(() => {
        if (cartCtx.items.length === 0){
            return;
        } else{
            setBtnIsHighlighted(true);
        }

        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false);  
        },300);

        return() => {
            clearTimeout(timer);
        };
    }, [cartCtx.items]);


    const numOfCartItems = cartCtx.items.reduce(
        (currentVal, item) => { return currentVal + item.quantity },
        0
    );

    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

    return(
        <button className={btnClasses} onClick={props.onClick} >
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {numOfCartItems}
            </span>
        </button>
    );
}

export default HeaderCartButton;