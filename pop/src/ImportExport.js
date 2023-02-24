import { useState } from 'react';
import { IoMdAdd ,IoMdArrowBack, IoIosDownload, IoIosTrash } from 'react-icons/io';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
export default function ImportExport(props) {

  const [data,setData] = useState('');
  
  const ex = () => {
    if(Array.isArray(props.items)) {

      let d = '';
      props.items.forEach((item) => {
        d += item.name + ',' + item.value + '\n';

    });
    setData(d);


  }
}

const im = () => {  
  
  if(Array.isArray(props.items)) {

    let newItems = [];
    const lines = data.split('\n');
    console.log("lines",lines);
    lines.forEach((line) => {
      const item = line.split(',');
      if(item[0] && item[1]) {
       newItems.push({name: item[0].trim(), value: item[1].trim()});
    }
    });
    props.addItems(newItems);
    alert("imported");
  }

  

};



  return (
    <div className="import-export">
      <h1>Import/Export</h1>
      <Form.Control 
        as="textarea" 
        rows={8} 
        multiple="true" 
        placeholder="paste your items here, comma seperated. Line is one item" 
        value={data} 
        onChange={ (e) => { setData(e.target.value) }} />

      {/* eslint-disable-next-line no-restricted-globals */}
      <Button onClick={ () => { confirm('Are you sure you want to import this list?') && im() } } >Import</Button>
      <Button onClick={ex}>Export</Button>
    </div>
  )

}