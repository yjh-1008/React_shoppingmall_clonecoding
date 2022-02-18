import React from 'react';
import { Descriptions,Button } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addToCart} from '../../../../_actions/user_actions.js';
const ProductInfo=(props)=>{
    const dispatch=useDispatch()    

    const clickHandler=()=>{
        
        //필요한 정보를 cart 필드에 저장.
        dispatch(addToCart(props.detail._id))

        
    }
    return (
      <div>
        <Descriptions title="Product Info">
          <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
          <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
          <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
          <Descriptions.Item label="Description">{props.detail.Descriptions}</Descriptions.Item>
        </Descriptions>
        <br/>
        <br/>
        <br/>
        <div style={{justifyContent:'center' ,display:'flex'}}>
            <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                Add to Cart
            </Button>
        </div>
      </div>
    );
}

export default ProductInfo;