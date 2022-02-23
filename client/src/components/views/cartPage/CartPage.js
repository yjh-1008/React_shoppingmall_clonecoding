import React,{useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {getCartItems,removeCartItem} from'../../../_actions/user_actions'  
import UserCardBlock from './sections/UserCardBlock';
const CartPage=(props)=>{
    const dispatch=useDispatch();
    const [total, setTotal]= useState(0);
    const[showTotal, setShowTotal]= useState(false);
    useEffect(()=>{
        let cartItems=[]
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length>0){
                props.user.userData.cart.forEach(item=>{
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems,props.user.userData.cart))
                .then(response=>{calculateTotal(response.payload)})
            }
        } 
    },[props.user.userData])

    let removeFromCart=(productId)=>{
        console.log(productId)
        dispatch(removeCartItem(productId))
        .then(response=>{
            if(response.payload.productInfo.length<=0){
                setShowTotal(true);
            }
        })

    }

    let calculateTotal=(caltDetail)=>{
        console.log("here click");
        let t=0;
        caltDetail.map(item=>{
            t +=parseInt(item.price,10)*item.quantity
        })
        setTotal(t);
    }

    return(
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h1>My Cart</h1>
            <div>
                <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
            </div>
           <div style={{marginTop:'3rem'}}>
                <h2>Total Amount: ${total}</h2>
           </div>

        </div>
    );
}

export default CartPage;