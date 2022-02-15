import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import {Icon} from 'antd';
import axios from 'axios';

const FileUpload=(props)=>{
    const [images, setImages]= useState([])
    const deleteHandler=(image)=>{
        const currentIndex=images.indexOf(image)
        let newImages = [...images];
        newImages.splice(currentIndex,1);
        setImages(newImages);
        console.log(currentIndex);

        props.refreshfunction(newImages);
        
    }
    const dropHandler=(files)=>{
        let formData = new FormData();
        const config={
            header:{'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0]);
        axios.post('/api/product/image', formData ,config)
        .then(response=>{
            if(response.data.success){
                console.log(response.data);
                setImages([...images, response.data.filePath])
                
                props.refreshfunction([...images, response.data.filePath]);

            }else{
                alert('파일을 저장하는데 실패힜습니다.');
            }
        })
    }

    return (
      <div style={{ display: "flex", justifyContent: "space-btween" }}>
        <Dropzone onDrop={dropHandler}>
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                display: "flex",
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon
                type="plus"
                style={{
                  fontSize: "3rem",
                }}
              />
            </div>
          )}
        </Dropzone>
        <div
          style={{
            display: "flex",
            width: "350px",
            height: "240px",
            overflowX: "scroll",
          }}
        >
          {images.map((image, index) => (
            <div key={index} onClick={() => deleteHandler(image)}>
              <img
                style={{ minWidth: "300px", width: "300px", height: "240px" }}
                src={`http://localhost:5000/${image}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
}

export default FileUpload;