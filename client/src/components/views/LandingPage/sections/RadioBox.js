import React,{useState} from 'react';
import { Checkbox,Collapse } from 'antd';
import { Radio } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
const {Panel}= Collapse;
const RadioBox=(props)=>{

    const[value, setValue]= useState(0)

    const renderRadiobox=()=>(
        props.list && props.list.map(value=>(
            <Radio key={value._id} value={value._id}>
                {value.name}
            </Radio>
        ))
    )

    const handleChange=(event)=>{
        setValue(event.target.value)
        props.handelFilters(event.target.value)
    }
    return(
        <div>
        <Collapse defaultActiveKey={['1']} >
            <Panel header="price" key="1">
                    <RadioGroup onChange={handleChange} value={value}>
                        {renderRadiobox()}
                    </RadioGroup>
            </Panel>
        </Collapse>
      </div>
    );
}

export default RadioBox;