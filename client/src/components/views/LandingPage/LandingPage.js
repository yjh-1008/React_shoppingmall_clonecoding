import React ,{useEffect, useState}from 'react';
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Icon, Col, Card, Row, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../utils/ImageSlider.js';
import CheckBox  from './sections/CheckBox.js';
import {continents,price} from './sections/Datas.js';
import RadioBox from './sections/RadioBox.js';
function LandingPage() {
    const [Products, setProducts]= useState([]);
    const [Skip, setSkip]= useState(0);
    const [Limit, setLimit]=useState(8);
    const [PostSize, setPostSize]= useState(0);
    const [Filters, setFilters] = useState({
        continents:[],
        price:[]
    })

    useEffect(()=>{

        let body={
            skip:Skip,
            limit:Limit
        }
        getProducts(body);
        
    },[]);

    const getProducts=(body)=>{
        axios.post('/api/product/products',body)
        .then(response=>{
            if(response.data.success){
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productsInfo]);
                }else{
                    setProducts(response.data.productsInfo);
                }
                console.log('postSize', response.data.postSize);
                setPostSize(response.data.postSize);
            }else{
                alert('상품들을 불러오는데 실패했습니다');
            } 
        })
    }

    const renderCards=Products.map((product, index) =>{
        console.log('product',product)
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card 
                cover={<ImageSlider images={product.images}/>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />

            </Card>
        </Col>
    })

    const loadMoreHandler=()=>{
        let skip = Skip+Limit;
        let body={
            skip:skip,
            limit:Limit,
            loadMore:true
        }
        getProducts(body);
        setSkip(skip);
    }

    const showFilterResult=(filters)=>{
        let body={
            skip:0,
            limit:Limit,
            filters:filters
        }
        getProducts(body)
        setSkip(0)
    }


    const handelPrice=(value)=>{
        const data= price;
        let array=[];
        console.log('data',data)
        console.log(value)
        for(let key in data){
            if(data[key]._id === parseInt(value,10)){
                array=data[key].array;
            }
        }
        return array
    }

    const handelFilters=(filters,category)=>{
        const newFilters ={...Filters}
        newFilters[category] = filters
        console.log('filter', filters)
        console.log(category)
        if(category==="price"){
            let priceValues=handelPrice(filters);
            newFilters[category] = priceValues;
            console.log(priceValues)    
        }
        showFilterResult(newFilters)
        setFilters(newFilters)
    }

    return (
      <div style={{ width: "75%", margin: "3rem auto" }}>
        {/*Filte*/}
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            {/*CheckBox*/}
            <CheckBox
              list={continents}
              handelFilters={(filters) => handelFilters(filters, "continents")}
            />
          </Col>
          <Col lg={12} xs={24}>
              <RadioBox list={price} handelFilters={(filters) => handelFilters(filters, "price")}/>
            {/*RadioBox*/}  
          </Col>
          
        </Row>

        {/*Search*/}
        {/*Cards*/}
        <div style={{ textAlign: "center" }}>
          <h2>
            Let's Travel Anywhere <Icon type="rocket" />
          </h2>
        </div>
        <Row gutter={[16, 16]}>{renderCards}</Row>

        <br />
        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
        )}
      </div>
    );
}

export default LandingPage
