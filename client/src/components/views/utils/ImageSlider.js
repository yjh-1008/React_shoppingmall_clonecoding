import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Carousel} from 'antd';
const ImageSlider=(props)=>{
    return(
        <Carousel>
            {props.images.map((image,index)=>(
                <div key={index}>
                    {console.log(image)}
                    <img style={{width:'100%', maxHeight:'150px'}}
                     src={`http://localhost:5000/${image}`}/>
                </div>
            ))}
          </Carousel>
    );
}
export default ImageSlider;