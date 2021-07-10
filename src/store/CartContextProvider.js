import React, { useReducer } from 'react';

import CartContext from './cart-context';


const TASK = {
    ADD: "add",
    REMOVE: "remove"
};

const defCartState = {
    items: [],
    totalAmount: 0
}

function cartReducer(state, action){
    switch (action.type) {
        case TASK.ADD:
            {
                const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.quantity);
                
                //Logic to check for already existing items in Cart
                const existingCartItemIndex = state.items.findIndex(
                    (item) => item.id === action.item.id
                );

                const existingCartItem = state.items[existingCartItemIndex];
                let updatedItems;

                // If item already exists
                let updatedItem;
                
                if (existingCartItem){
                    updatedItem = {...existingCartItem};
                    updatedItem.quantity = existingCartItem.quantity + action.item.quantity;
                    // updatedItem = {
                    //     ...existingCartItem,
                    //     quantity: existingCartItem.quantity + action.item.quantity;
                    // };
                    updatedItems = [...state.items];
                    updatedItems[existingCartItemIndex] = updatedItem;
                } else {
                    updatedItems = state.items.concat(action.item);   
                }

                return({
                    items: updatedItems,
                    totalAmount: updatedTotalAmount
                });
            }
        case TASK.REMOVE:
            {
                let updatedItems;

                const existingCartItemIndex = state.items.findIndex(
                    (item) => item.id === action.id
                );

                const existingCartItem = state.items[existingCartItemIndex];

                const updatedTotalAmount = state.totalAmount - existingCartItem.price;

                if(existingCartItem.quantity === 1){
                    updatedItems = state.items.filter(
                        (item) => item.id !== action.id
                    );
                } else{
                    const updatedItem = {...existingCartItem, quantity: existingCartItem.quantity - 1}
                    updatedItems = [...state.items];
                    updatedItems[existingCartItemIndex] = updatedItem;
                }

                return({
                    items: updatedItems,
                    totalAmount: updatedTotalAmount
                });

                ////MAX CODE

                //   const existingCartItemIndex = state.items.findIndex(
                //     (item) => item.id === action.id
                //   );
                //   const existingItem = state.items[existingCartItemIndex];
                //   const updatedTotalAmount = state.totalAmount - existingItem.price;
                //   let updatedItems;
                //   if (existingItem.quantity === 1) {
                //     updatedItems = state.items.filter(item => item.id !== action.id);
                //   } else {
                //     const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
                //     updatedItems = [...state.items];
                //     updatedItems[existingCartItemIndex] = updatedItem;
                //   }
              
                //   return {
                //     items: updatedItems,
                //     totalAmount: updatedTotalAmount
                //   };

            }
        default:
            return(state);
    }
    
}


function CartContextProvider(props){

    const [cartState, cartStateDispatch] = useReducer( cartReducer, defCartState);

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };

    function addItemHandler(item){
        cartStateDispatch( {type: TASK.ADD, item: item} );
    }

    function removeItemHandler(id){
        cartStateDispatch( {type: TASK.REMOVE, id: id} );
    }

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;