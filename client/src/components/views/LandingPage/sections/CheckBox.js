
import React,{useState} from 'react';
import { Checkbox,Collapse } from 'antd';
const {Panel}= Collapse;


const CheckBox=(props)=>{

    const [checked, setChecked]= useState([]);



    const handleToggle=(value)=>{
        //누른 것의 index를 구하고 
        //전체 checked된 state된 현재 누른 checkbox가 있다면 빼주고
        //없다면 state에 넣어준다.

        const currentIndex=checked.indexOf(value);

        const newChecked=[...checked]
        if(currentIndex===-1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1);
        }
        setChecked(newChecked);
        props.handelFilters(newChecked);

    }

    const renderCheckboxLits = () => props.list && props.list.map((value, index)=>(
        <React.Fragment key={index} >
            <Checkbox onChange={()=>handleToggle(value._id)}
            checked={checked.indexOf(value._id)===-1?false:true}/><span>{value.name}</span>
        </React.Fragment>
    ));


    return (
      <div>
        <Collapse defaultActiveKey={['1']} >
          <Panel header="Continents" key="1">
                {renderCheckboxLits()}
                
          </Panel>
        </Collapse>
      </div>
    );
}

export default CheckBox;