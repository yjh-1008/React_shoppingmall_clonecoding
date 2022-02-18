import React,{useState, useEffect} from 'react';
import axios from 'axios';
const DetailProductPage=(props)=>{
    const productId=props.match.params.productId
    useEffect(()=>{
        axios.get(`/api/product/product_by_id?id=${productId}&type=single`)
        .then(response=>{
            if(response.data.success){
                console.log('reaponse.data',response.data)
            }else{
                alert('상세정보 가져오기를 실패했습니다.')
            }
        })
    },[])
    return(
        <div>
            DetailProductPage

        </div>
    );
}

export default DetailProductPage;