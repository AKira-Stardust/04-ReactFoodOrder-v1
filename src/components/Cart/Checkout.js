import React from "react";
import classes from "./Checkout.module.css";
import useInput from "../hooks/useInput";

function Checkout(props){

    function isNotEmpty(value){
        return(value.trim() !== "");  
    }

    function isFiveChar(value){
        return(value.trim().length === 5);
    }

    const {
      value: enteredName,
      isValid: nameIsValid,
      hasError: nameHasError,
      valueChangeHandler: nameValueChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: nameReset
    } = useInput(isNotEmpty);

    const {
        value: enteredStreet,
        isValid: streetIsValid,
        hasError: streetHasError,
        valueChangeHandler: streetValueChangeHandler,
        inputBlurHandler: streetBlurHandler,
        reset: streetReset
      } = useInput(isNotEmpty);

    const {
      value: enteredPostal,
      isValid: postalIsValid,
      hasError: postalHasError,
      valueChangeHandler: postalValueChangeHandler,
      inputBlurHandler: postalBlurHandler,
      reset: postalReset
    } = useInput(isFiveChar);

    const {
        value: enteredCity,
        isValid: cityIsValid,
        hasError: cityHasError,
        valueChangeHandler: cityValueChangeHandler,
        inputBlurHandler: cityBlurHandler,
        reset: cityReset
    } = useInput(isNotEmpty);
    
    let formIsValid = false;
    if (nameIsValid && streetIsValid && postalIsValid && cityIsValid){
        formIsValid = true;
    }

    function formSubmitHandler(event){
        event.preventDefault();
        
        if (!formIsValid) {return;}

        const userData= {
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        }

        props.onConfirm(userData);

        nameReset();
        streetReset();
        postalReset();
        cityReset();
    }

    const nameStyleClass = `${classes.control} ${!nameHasError ? " " : classes.invalid}`;
    const streetStyleClass = `${classes.control} ${!streetHasError ? " " : classes.invalid}`
    const postalStyleClass = `${classes.control} ${!postalHasError ? " " : classes.invalid}`
    const cityStyleClass = `${classes.control} ${!cityHasError ? " " : classes.invalid}`

    console.log("formIsValid: "+ formIsValid);
    return(
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={nameStyleClass}>
                <label htmlFor='name'>Your Name</label>
                <input 
                    type='text' 
                    id='name'
                    onChange={nameValueChangeHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                />
                {nameHasError && <p className={classes.errorText}>Please check Name value!</p>}
            </div>
            
            <div className={streetStyleClass}>
                <label htmlFor='street'>Street</label>
                <input
                    type='text' 
                    id='street'
                    onChange={streetValueChangeHandler}
                    onBlur={streetBlurHandler}
                    value={enteredStreet}
                />
                {streetHasError && <p className={classes.errorText}>Please check Street value!</p>}
            </div>

            <div className={postalStyleClass}>
                <label htmlFor='postal'>Postal Code</label>
                <input 
                    type='text' 
                    id='postal'
                    onChange={postalValueChangeHandler}
                    onBlur={postalBlurHandler}
                    value={enteredPostal}
                />
                {postalHasError && <p className={classes.errorText}>Please check Postal Code! (5 digits only)</p>}
            </div>

            <div className={cityStyleClass}>
                <label htmlFor='city'>City</label>
                <input 
                    type='text' 
                    id='city'
                    onChange={cityValueChangeHandler}
                    onBlur={cityBlurHandler}
                    value={enteredCity}
                />
                {cityHasError && <p className={classes.errorText}>Please check City value!</p>}
            </div>

            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button disabled={!formIsValid} className={classes.submit}>Confirm</button>
            </div>
        </form>

    );
}

export default Checkout;