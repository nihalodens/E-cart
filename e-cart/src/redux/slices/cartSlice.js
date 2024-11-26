import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:'cartItems',
    initialState:[],
    reducers:{
        // action-name : reducers function
        addToCart:(state,actionByComponent)=>{
            const existingProduct = state.find(item=>item.id==actionByComponent.payload.id)
            if(existingProduct){
                existingProduct.quantity++
                existingProduct.totalPrice = existingProduct.quantity * existingProduct.price
                const remainingProducts = state.filter(item=>item.id!=existingProduct.id)
                state = [...remainingProducts,existingProduct]
            }else{
                state.push({...actionByComponent.payload,quantity:1,totalPrice:actionByComponent.payload.price})
            }
        },
        incrementQuantity : (state,actionByCart)=>{
            const existingProduct = state.find(item=>item.id==actionByCart.payload)
            existingProduct.quantity++
            existingProduct.totalPrice = existingProduct.quantity * existingProduct.price
            const remainingProducts = state.filter(item=>item.id!=existingProduct.id)
            state = [...remainingProducts,existingProduct]
        },
        removeCartItem : (state,actionByCart)=>{
            return state.filter(item=>item.id!=actionByCart.payload)
        },
        decrementQuantity : (state,actionByCart)=>{
            const existingProduct = state.find(item=>item.id==actionByCart.payload)
            existingProduct.quantity--
            existingProduct.totalPrice = existingProduct.quantity * existingProduct.price
            const remainingProducts = state.filter(item=>item.id!=existingProduct.id)
            state = [...remainingProducts,existingProduct]
        },
        emptyCart : (state)=>{
            return state = []
        }
    }
})

export const {addToCart,incrementQuantity,removeCartItem,decrementQuantity,emptyCart} = cartSlice.actions
export default cartSlice.reducer