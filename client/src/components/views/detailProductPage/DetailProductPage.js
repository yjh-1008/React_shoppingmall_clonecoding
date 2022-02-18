import React,{useState, useEffect} from 'react';
import axios from 'axios';
import ProductImage from './sections/ProductImage.js';
import ProductInfo from './sections/ProductInfo.js';
import {Row, Col} from 'antd';
const DetailProductPage=(props)=>{
    const productId=props.match.params.productId
    const [product, setProduct] =useState({})
    useEffect(()=>{
        axios.get(`/api/product/product_by_id?id=${productId}&type=single`)
        .then(response=>{
            if(response.data.success){
                console.log('reaponse.data',response.data)
                setProduct(response.data.product[0])
            }else{
                alert('상세정보 가져오기를 실패했습니다.')
            }
        })
    },[])
    return(
        <div style={{width:'100%', paddimg:'3rem 4rem'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                <h1>{product.title} </h1>
            </div>
            <br/>
            <Row gutter={16,16}>
                <Col lg={12} sm={24}>
                    {/*productImage*/}
                    <ProductImage detail={product}/>
                </Col>
                <Col lg={12} sm={24}>
                    {/*productInfo*/}
                    <ProductInfo detail={product}/>  
                </Col>
            </Row>
        </div>
    );
}

export default DetailProductPage;