chrome.runtime.onInstalled.addListener(() => {
  /*chrome.action.setBadgeText({
    text: "OFF",
  });*/
});

chrome.action.onClicked.addListener(async (tab) => {
  console.log(tab);
  chrome.action.openPopup(
    
  )
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files : [ "add.js"],
    //function: toggle,
  }).then(() => { console.log("complete")});
    


  
});