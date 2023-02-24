import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IoMdAdd ,IoMdArrowBack, IoIosDownload, IoIosTrash } from 'react-icons/io';
export default function List(props) {

  const [itemSearch, setItemSearch] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [searchText, setSearchText] = useState('');
 


async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  // eslint-disable-next-line no-undef
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

const addItem = () => {
    props.addItem(
     name.trim(),
     value.trim()
    );
}

useEffect(() => {
 // console.log("items",items);
  //console.log("items search",itemSearch);
  if(Array.isArray(props.items)) {
    setSearchText('');
    search();
  }
}, [props.items]);

const search = () => {
  if(Array.isArray(props.items)) {
  const searchItems = props.items.filter((item) => {
    return item.name.toLowerCase().includes(searchText.toLowerCase()) || item.value.toLowerCase().includes(searchText.toLowerCase());
  });

  setItemSearch(searchItems);
}

}

useEffect(() => {
  search();
}, [searchText]);

const insertValueToPage = (val) => {
  const field = document.activeElement;
  console.log(field);
  if(field.value.length === 0) {
    field.value += val;
  } else {
    field.value += "," + val ;
  }
}

const removeItem = (name,value) => {
  props.deleteItem(name,value);
}


const insertToPage = async (val) => {
  const currentTab = await getCurrentTab();
  console.log(currentTab);
  // eslint-disable-next-line no-undef
  chrome.scripting.executeScript({
    target: {tabId: currentTab.id},
    func: insertValueToPage,
    args: [ val ],
  });

}

  return (
    <div>
      <div className='input-group mb-3'>
      <Form.Control placeholder='Name' onChange={ (e) => setName(e.target.value)  } />
      <Form.Control placeholder='Value' onChange={ (e) => setValue(e.target.value)}  />
      <Button className='input-group-btn' onClick={() => { addItem() }}>
        <IoMdAdd />
        </Button>
      </div>
      

      <div>
        <Form.Control placeholder='Search' value={searchText} onChange={ (e) => setSearchText(e.target.value)  } />
      </div>
      <table class="table listTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        
        
        {Array.isArray(itemSearch) && itemSearch?.map((item, index) => {
          return <tr key={index}>
            <td>{item.name}</td>
            <td>{item.value}</td>
            <td>
              <Button size="sm" onClick={() => { insertToPage(item.value) }}>
                <IoIosDownload color='#000000' />
              </Button>
              {/* eslint-disable-next-line no-restricted-globals */}
              <Button size="sm" onClick={() => { confirm("Sure you want to remove this?") && removeItem(item.name,item.value) }}>
                <IoIosTrash color="#000000" />
              </Button>
            </td>
            </tr>
        })}
      </table>
    </div>
  )


}