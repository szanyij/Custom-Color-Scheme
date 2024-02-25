/*Copyright 2024 szanyij@gmail.com

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


// for debugging if the add=on is connected 
// document.body.style.border = "5px solid red"

//let STATE_KEY = "STATE_KEY"

function dark() {
  function returnColors(result) {
    let ColorsList = result.Colors.split("|");
    try {
      ltxtColor = ColorsList[0];
      lbackgroundColor = ColorsList[1];
      ltestColor = ColorsList[2];
      ldarkBlueColor = ColorsList[3];
      lcodeBackground = ColorsList[4];
      llinkColor = ColorsList[5];
    } catch (error) {
      ltxtColor = "#8F99A5";
      lbackgroundColor = "#2A2C37";
      ltestColor = "#1FED18";
      ldarkBlueColor = "#000022";
      lcodeBackground = "#1c1c1c";
      llinkColor = "#687b9a";
    }
    changeColors(
    {
      txtColor: ltxtColor,
      backgroundColor: lbackgroundColor,
      testColor: ltestColor,
      darkBlueColor: ldarkBlueColor,
      codeBackground: lcodeBackground,
      linkColor: llinkColor
    })
  }
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  let Colors = browser.storage.sync.get("Colors");
  Colors.then(returnColors, onError);
  /*  return {
     txtColor: localStorage.getItem('txtColor') || '#8F99A5',
     backgroundColor: localStorage.getItem('backgroundColor') || "#2A2C37",
     testColor: localStorage.getItem('testColor') || '#1FED18',
     darkBlueColor: localStorage.getItem('darkBlueColor') || '#000022',
     codeBackground: localStorage.getItem('codeBackground') || '#1c1c1c',
     linkColor: localStorage.getItem('linkColor') || '#687b9a'
   } */
}

function pink() {
  return {
    txtColor: '#444',
    backgroundColor: "#ddffff",  // pink
    testColor: '#1FED18',  // green 
    darkBlueColor: '#000022',
    codeBackground: '#bcbcbc',
    linkColor: '#4b7cf0'
  }
}

function changeColors(colors) {
  const txtColor = colors.txtColor
  const backgroundColor = colors.backgroundColor
  const testColor = colors.testColor
  const darkBlueColor = colors.darkBlueColor
  const codeBackground = colors.codeBackground
  const linkColor = colors.linkColor

  document.body.style.background = backgroundColor

  function colorTextByTagName(elementType, textColor = txtColor) {
    const elements = document.getElementsByTagName(elementType)
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.color = textColor
    }
  }

  function colorTextByClass(name, textColor = txtColor) {
    const elements = document.getElementsByClassName(name)
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.color = textColor
    }
  }

  colorTextByTagName("p")
  colorTextByTagName("a", linkColor)
  colorTextByTagName("li")
  colorTextByTagName("ul")
  colorTextByTagName("b")
  colorTextByTagName("table")
  colorTextByTagName("th")
  colorTextByTagName("td")
  colorTextByTagName("h1")
  colorTextByTagName("h2")
  colorTextByTagName("h3")
  colorTextByTagName("h4")
  colorTextByTagName("h5")
  colorTextByTagName("h6")
  colorTextByTagName("input")
  colorTextByTagName("input id")
  colorTextByTagName("div")
  colorTextByTagName("class")
  colorTextByClass("result__snippet")
  colorTextByTagName("span")
  colorTextByTagName("label")
  colorTextByTagName("figcaption")
  colorTextByTagName("pre")
  colorTextByTagName("code")

  function colorBackground(elementType, bgColor = backgroundColor, id) {
    const elements = document.getElementsByTagName(elementType);
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.background = bgColor;
    }
  }

  colorBackground("section")
  colorBackground("li")
  colorBackground("ul")
  colorBackground("div")
  colorBackground("form")
  colorBackground("article")
  colorBackground("table")
  colorBackground("td")
  colorBackground("tr")
  colorBackground("h3")
  colorBackground("pre", codeBackground)
  colorBackground("code", codeBackground)
  colorBackground("textarea", codeBackground)
  colorTextByTagName("textarea", txtColor)
}

function doIfKey(e) {
  // console.log(e.code)
  //console.log(STATE);
  if (!e.ctrlKey || !e.shiftKey || e.code !== "KeyU") {
    //console.log("not ctrl + shift + u");
    return
  }
  //console.log("ctrl + shift + u")
  let lbackgroundColor = localStorage.getItem('backgroundColor');
  // console.log('backgroundColor: ', lbackgroundColor);
  let STATE = localStorage.getItem('STATE_KEY');
  // console.log("Current State:", STATE);
  if (STATE === "0") {
    STATE = "1"
    localStorage.setItem('STATE_KEY', STATE);
    changeColors(pink())
  }
  else if (STATE === "1") {
    STATE = "2"
    localStorage.setItem('STATE_KEY', STATE);
    document.location.reload();
  }
  else if (STATE === "2") {
    STATE = "0"
    localStorage.setItem('STATE_KEY', STATE);
    dark()
  }
  // console.log("New State:", STATE);
}

document.addEventListener('keydown', doIfKey);

/*const asyncLocalStorage = {
  setItem(key, value) {
      return Promise.resolve().then(function () {
          localStorage.setItem(key, value);
      });
  },
  getItem(key) {
      return Promise.resolve().then(function () {
          return localStorage.getItem(key);
      });
  }
};*/
//const asyncLocalStorage = {   setItem: (key, val) => Promise.resolve(localStorage.setItem(key, val)),   getItem: key => Promise.resolve(localStorage.getItem(key)), }

// start is called when the page is loaded or reloaded
function start() {
  if (typeof (Storage) === "undefined") {
    console.log("Sorry! No Web Storage support..");
    return
  }
  // console.log("Code for localStorage/sessionStorage.")

  // Retrieve from Store
  let STATE = localStorage.getItem('STATE_KEY');
  // console.log(">>>STATE IS: ", STATE);
  //let lbackgroundColor = localStorage.getItem('backgroundColor');
  // console.log('backgroundColor: ', lbackgroundColor);
  /*   chrome.storage.sync.get("backgroundColor", function (obj) {
      console.log(obj);
    }); */
  if (STATE === null || STATE == "" || STATE == "0") {
    // First time. We want the dark theme. It has STATE 0.
    STATE = "0";
    localStorage.setItem('STATE_KEY', STATE);
    dark()
    return
  }
  else if (STATE === "1")
  {
    changeColors(pink())
  }
  else if (STATE === "2") {
    // this is the original page so do nothing
    return
  }

  // const color = STATE === "0" ? dark() : pink()
  // changeColors(color)
}
//document.addEventListener("DOMContentLoaded", start);
start()
