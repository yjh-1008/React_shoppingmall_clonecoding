import React, { useState } from 'react';
import {Typography, Button, Form ,Input} from 'antd';
import FileUpload from '../utils/FileUpload';
import Axios from 'axios';

const {Title}= Typography;
const {TextArea} =Input;
const UploadProductPage =(props)=>{
    const continents = [
      { key: 1, value: "Africa" },
      { key: 2, value: "Europe" },
      { key: 3, value: "Asia" },
      { key: 4, value: "North America" },
      { key: 5, value: "South America" },
      { key: 6, value: "Australia" },
      { key: 7, value: "Antractica" },
    ];

    const [title, setTitle]= useState("");
    const [description, setDescription]= useState("");
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(2);

    const [images, setImages]= useState([]);
    const titleChangeHandler=(event)=>{
        setTitle(event.currentTarget.value);
    }
    const descriptionChangeHandler=(e)=>{
        setDescription(e.currentTarget.value);
    }

    const priceChangeHandler=(e)=>{
        setPrice(e.currentTarget.value);
    }

    const continentsChangeHandler=(e)=>{
        setContinent(Number(e.currentTarget.value));
        console.log(continent);
    }

    const updateImages=(newImages)=>{
      setImages(newImages);
    }

    const submitHandler=(e)=>{
      e.preventDefault();

      if(!title|| !price|| !images|| !description|| !continent){
        return alert('모든 값을 넣어주세요');
      }
      //서버에 채운 값을 request로 보낸다.
      const body={
        //로그인 된 사람의 아이디
        writer:"aa",
        title:title,
        description:description,
        price:price,
        images:images,
        continent:continent
      }
      Axios.post("/api/product",body)
      .then(response=>{
        if(response.data.success){
          alert("사진 업로드에 성공 했습니다.!");
          console.log("성공");
          props.history.push("/");
        }else{
          alert("사진 업로드에 실패 했습니다.");
          console.log("실패!");
        }
        
      })
    }
    return (
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title level={2}>여행 상품 업로드</Title>
          <Form onSubmit={submitHandler}>
            <FileUpload refreshfunction={updateImages}/>
            <br />
            <br />
            <label>이름</label>
            <Input onChange={titleChangeHandler} value={title} />
            <br />
            <br />
            <TextArea onChange={descriptionChangeHandler} value={description} />
            <br />
            <br />
            <label>가격($)</label>
            <Input type="number" onChange={priceChangeHandler} value={price} />
            <br />
            <br />
            <select onChange={continentsChangeHandler} value={continent}>
              {continents.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            <br />
            <br />
            <Button htmlType="submit">확인</Button>
          </Form>
        </div>
      </div>
    );
}

export default UploadProductPage;