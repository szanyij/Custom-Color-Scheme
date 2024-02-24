/*
txtColor: '#8F99A5',
backgroundColor: "#2A2C37",
testColor: '#1FED18',
darkBlueColor: '#000022',
codeBackground: '#1c1c1c',
linkColor: '#687b9a' 
*/
function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        txtColor: document.querySelector("#txtColor").value,
    });
    browser.storage.sync.set({
        backgroundColor: document.querySelector("#backgroundColor").value,
    });
    browser.storage.sync.set({
        testColor: document.querySelector("#testColor").value,
    });
    browser.storage.sync.set({
        darkBlueColor: document.querySelector("#darkBlueColor").value,
    });
    browser.storage.sync.set({
        codeBackground: document.querySelector("#codeBackground").value,
    });
    browser.storage.sync.set({
        linkColor: document.querySelector("#linkColor").value,
    });
    }
  
  function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#txtColor").value = result.color || "#8F99A5";
        document.querySelector("#backgroundColor").value = result.color || "#2A2C37";
        document.querySelector("#testColor").value = result.color || "1FED18";
        document.querySelector("#darkBlueColor").value = result.color || "#000022";
        document.querySelector("#codeBackground").value = result.color || "#1c1c1c";
        document.querySelector("#linkColor").value = result.color || "#687b9a";
    }
  
    function onError(error) {
      console.log(`Error: ${error}`);
    }
  
    let getting = browser.storage.sync.get("txtColor");
    getting.then(setCurrentChoice, onError);
    getting = browser.storage.sync.get("backgroundColor");
    getting.then(setCurrentChoice, onError);
    getting = browser.storage.sync.get("testColor");
    getting.then(setCurrentChoice, onError);
    getting = browser.storage.sync.get("darkBlueColor");
    getting.then(setCurrentChoice, onError);
    getting = browser.storage.sync.get("codeBackground");
    getting.then(setCurrentChoice, onError);
    getting = browser.storage.sync.get("linkColor");
    getting.then(setCurrentChoice, onError);    
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);
  