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
      // eslint-disable-next-line no-undef
      const i = await chrome.storage.local.get(["appStorage"]);
      if(Array.isArray(i.appStorage)) {
        const newItems = [...i.appStorage];
        newItems.push({ name,value});
    
        // eslint-disable-next-line no-undef
        await chrome.storage.local.set({appStorage: newItems});
        setItems(newItems);
        console.log(name,value,i);
      }
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
      if(Array.isArray(i.appStorage)) {
        const allNewItems = [...i.appStorage,...newItems];
    
        // eslint-disable-next-line no-undef
        await chrome.storage.local.set({appStorage: allNewItems});
        setItems(allNewItems);
        //console.log(name,value,i);
      }
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
{ !showImportExport &&  <List addItem={addItem} deleteItem={deleteItem} items={items} /> }
    { showImportExport && <ImportExport addItems={addItems} deleteItem={deleteItem} items={items} /> }
     
    </div>
  );
}

export default App;
