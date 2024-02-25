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

let gVersion = "2";

function dark() {
  function returnColors(result) {
    try {
      let ColorsList = result.Colors.split("|");
      let lVersion = ColorsList[0];
      if (gVersion !== lVersion)
        throw new Error("Version difference -> reset settings.");
      lBackgroundColor = ColorsList[1];
      lEnableTextColoring = ColorsList[2];
      lTxtColor = ColorsList[3];
      lCodeBackground = ColorsList[4];
      lLinkColor = ColorsList[5];
    } catch (error) {
      console.log(error);
      lBackgroundColor = "#2A2C37";
      lEnableTextColoring = "1";
      lTxtColor = "#8F99A5";
      lCodeBackground = "#1c1c1c";
      lLinkColor = "#687b9a";
    }
    changeColors(
      {
        backgroundColor: lBackgroundColor,
        enableTextColoring: lEnableTextColoring,
        txtColor: lTxtColor,
        codeBackground: lCodeBackground,
        linkColor: lLinkColor
      })
  }
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  let Colors = browser.storage.sync.get("Colors");
  Colors.then(returnColors, onError);
}

function pink() {
  return {
    backgroundColor: "#ddffff",  // pink
    enableTextColoring: "1",
    txtColor: '#444',
    codeBackground: '#bcbcbc',
    linkColor: '#4b7cf0'
  }
}

function changeColors(colors) {
  const backgroundColor = colors.backgroundColor
  const lEnableTextColoring = colors.enableTextColoring
  const txtColor = colors.txtColor
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

  if (lEnableTextColoring === "1") {
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
  }

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
  if (!e.ctrlKey || !e.shiftKey || e.code !== "KeyU") {
    return
  }


  let STATE = browser.storage.sync.get('STATE_KEY');
  STATE.then(doIfKey_receiver, doIfKey_onError);

  function doIfKey_receiver(result) {
    let lSTATE = result.STATE_KEY;
    if (lSTATE === "0") {
      lSTATE = "1"
      browser.storage.sync.set({ STATE_KEY: lSTATE, });
      changeColors(pink())
    }
    else if (lSTATE === "1") {
      lSTATE = "2"
      browser.storage.sync.set({ STATE_KEY: lSTATE, });
      document.location.reload();
    }
    else if (lSTATE === "2") {
      lSTATE = "0"
      browser.storage.sync.set({ STATE_KEY: lSTATE, });
      dark()
    }
  }

  function doIfKey_onError(error) {
    console.log(`Error: ${error}`);
  }

}

document.addEventListener('keydown', doIfKey);

// start is called when the page is loaded or reloaded
function start() {
  if (typeof (Storage) === "undefined") {
    console.log("Sorry! No Web Storage support..");
    return
  }

  let STATE = browser.storage.sync.get('STATE_KEY');
  STATE.then(start_receiver, start_onError);

  function start_receiver(result) {
    let lSTATE = result.STATE_KEY;
    if (lSTATE === null || lSTATE === undefined || lSTATE == "" || lSTATE == "0") {
      if (lSTATE !== "0") {
        lSTATE = "0";
        browser.storage.sync.set({ STATE_KEY: lSTATE, });
      }
      dark()
      return
    }
    else if (lSTATE === "1") {
      changeColors(pink())
    }
    else if (lSTATE === "2") {
      // this is the original page so do nothing
      return
    }
  }

  function start_onError(error) {
    console.log(`Error: ${error}`);
  }

}
//document.addEventListener("DOMContentLoaded", start);
start()
