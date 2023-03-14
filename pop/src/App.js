import {useState, useEffect} from 'react';
import './App.css';
import List from './list';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ImportExport from './importexport';
import { Button } from 'react-bootstrap';
function App() {
  
  const [showImportExport, setShowImportExport] = useState(false);
  const [items, setItems] = useState([]);


  async function loadLocalStorage() {
     // eslint-disable-next-line no-undef
    const i = await chrome.storage.local.get(["appStorage"]);
    console.log("i",i);
    if(Array.isArray(i.appStorage)) {
      setItems(i.appStorage);
    }
  }

  useEffect( () => {
    loadLocalStorage();
   
  },[]);

  const addItem = async (name,value) => {
    try 
    {
      console.log(name,value);
      // eslint-disable-next-line no-undef
      const i = await chrome.storage.local.get(["appStorage"]);
      console.log("addItem i",i)
      let newItems = [];
      if(Array.isArray(i.appStorage)) {
        newItems = [...i.appStorage];
      }
        newItems.push({ name,value});
    
        // eslint-disable-next-line no-undef
        await chrome.storage.local.set({appStorage: newItems});
        setItems(newItems);
        console.log(name,value,i);
      }
    catch(e) {
      console.log(e);
    }
  }

  const addItems = async (newItems) => {
    try 
    {
      // eslint-disable-next-line no-undef
      const i = await chrome.storage.local.get(["appStorage"]);
      let allNewItems = newItems;
      if(Array.isArray(i.appStorage)) {
        allNewItems = [...i.appStorage,...newItems];
      }
        // eslint-disable-next-line no-undef
      await chrome.storage.local.set({appStorage: allNewItems});
      setItems(allNewItems);
      console.log(allNewItems);
      
    }
    catch(e) {
      console.log(e);
    }
  }

  const deleteItem = (name,value) => {
    const newItems = items.filter((item) => !(item.name === name && item.value === value));
    setItems(newItems);
     // eslint-disable-next-line no-undef
    chrome.storage.local.set({appStorage: newItems});
  }

  const editItem = (name,value,newName,newValue) => {
    const newItems = items.map((item) => {
      if(item.name === name && item.value === value) {
        return {name: newName, value: newValue};
      }
      return item;
    });
    setItems(newItems);
      // eslint-disable-next-line no-undef
    chrome.storage.local.set({appStorage: newItems});
  }

  const clearItems = () => {
    setItems([]);
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({appStorage: []});
  }
  




  return (
    <div className="App">

<div className="container">
  <div className="row">
    <div className="col">
      <h1 style={{textAlign:"left"}}>My List</h1>
    </div>
    <div className="col" style={{textAlign: "right"}}>
    <Button onClick={() => setShowImportExport(!showImportExport)}>{showImportExport ? "List" : "Import/Export"}</Button>
    

    </div>
    </div>
    </div>
{ !showImportExport &&  <List addItem={addItem} deleteItem={deleteItem} items={items} editItem={editItem} /> }
    { showImportExport && <ImportExport addItems={addItems} deleteItem={deleteItem} items={items} clearItems={clearItems} /> }
     
    </div>
  );
}

export default App;
