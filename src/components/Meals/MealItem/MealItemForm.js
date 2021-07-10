import React, { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";

import Input from "../../UI/Input";
import CartContext from "../../../store/cart-context";

function MealItemForm(props){

    const inputQuantityRef = useRef();
    const [quantityIsValid, setQuantityIsValid] = useState(true);

    function submitHandler(event){
        event.preventDefault();
        const enteredQuantity = inputQuantityRef.current.value;
        const enteredQuantityNumber = +enteredQuantity;

        if( enteredQuantity.trim().length === 0 || 
            enteredQuantityNumber < 1 || 
            enteredQuantityNumber > 5     ){
            setQuantityIsValid(false);
            return;
        }

        props.onAddToCart(enteredQuantityNumber);
    }

    return(
        <form onSubmit={submitHandler} className={styles.form}>
            <Input 
                ref={inputQuantityRef}
                label="Amount" 
                input={ {
                    id: 'amount_'+ props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                } } 
            />
            <button>+ Add</button>
            { !quantityIsValid && <p>Please select a valid quantity [1-5].</p>}
        </form>
    );
}

export default MealItemForm;