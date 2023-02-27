chrome.runtime.onInstalled.addListener(() => {
  /*chrome.action.setBadgeText({
    text: "OFF",
  });*/
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("request",request);
  if(request.text === "getTab") {
    sendResponse({tab: sender.tab, message: "success"})
  }
}
);

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