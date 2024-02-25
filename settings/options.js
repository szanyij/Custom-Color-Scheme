/*
txtColor: '#8F99A5',
backgroundColor: "#2A2C37",
testColor: '#1FED18',
darkBlueColor: '#000022',
codeBackground: '#1c1c1c',
linkColor: '#687b9a' 
#D4D4D4
*/
function saveOptions(e) {
    e.preventDefault();
    let Colors = document.querySelector("#txtColor").value + '|' +
        document.querySelector("#backgroundColor").value + '|' +
        document.querySelector("#testColor").value + '|' +
        document.querySelector("#darkBlueColor").value + '|' +
        document.querySelector("#codeBackground").value + '|' +
        document.querySelector("#linkColor").value;
    browser.storage.sync.set({
        Colors: Colors,
    });
    /*     browser.storage.sync.set({
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
        }); */
}

function restoreOptions() {
    function setCurrentColors(result) {
        let ColorsList = result.split("|");
        try {
            ltxtColor = ColorsList[0];
            lbackgroundColor = ColorsList[1];
            ltestColor = ColorsList[2];
            ldarkBlueColor = ColorsList[3];
            lcodeBackground = ColorsList[4];
            linkColor = ColorsList[5];
        } catch (error) {
            ltxtColor = "#8F99A5";
            lbackgroundColor = "#2A2C37";
            ltestColor = "#1FED18";
            ldarkBlueColor = "#000022";
            lcodeBackground = "#1c1c1c";
            linkColor = "#687b9a";
        }
        document.querySelector("#txtColor").value = ltxtColor;
        document.querySelector("#backgroundColor").value = lbackgroundColor;
        document.querySelector("#testColor").value = ltestColor;
        document.querySelector("#darkBlueColor").value = ldarkBlueColor;
        document.querySelector("#codeBackground").value = lcodeBackground;
        document.querySelector("#linkColor").value = llinkColor;
        /*         document.querySelector("#txtColor").value = result.txtColor || "#8F99A5";
                document.querySelector("#backgroundColor").value = result.backgroundColor || "#2A2C37";
                document.querySelector("#testColor").value = result.testColor || "#1FED18";
                document.querySelector("#darkBlueColor").value = result.darkBlueColor || "#000022";
                document.querySelector("#codeBackground").value = result.codeBackground || "#1c1c1c";
                document.querySelector("#linkColor").value = result.linkColor || "#687b9a";
         */
    }
    function setCurrentChoicetxtColor(result) {
        document.querySelector("#txtColor").value = result.txtColor || "#8F99A5";
    }
    function setCurrentChoicebackgroundColor(result) {
        document.querySelector("#backgroundColor").value = result.backgroundColor || "#2A2C37";
    }
    function setCurrentChoicetestColor(result) {
        document.querySelector("#testColor").value = result.testColor || "#1FED18";
    }
    function setCurrentChoicedarkBlueColor(result) {
        document.querySelector("#darkBlueColor").value = result.darkBlueColor || "#000022";
    }
    function setCurrentChoicecodeBackground(result) {
        document.querySelector("#codeBackground").value = result.codeBackground || "#1c1c1c";
    }
    function setCurrentChoicelinkColor(result) {
        document.querySelector("#linkColor").value = result.linkColor || "#687b9a";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let Colors = browser.storage.sync.get("Colors");
    Colors.then(setCurrentColors, onError);
    /*     let gettingtxtColor = browser.storage.sync.get("txtColor");
        gettingtxtColor.then(setCurrentChoicetxtColor, onError);
        let gettingbackgroundColor = browser.storage.sync.get("backgroundColor");
        gettingbackgroundColor.then(setCurrentChoicebackgroundColor, onError);
        let gettingtestColor = browser.storage.sync.get("testColor");
        gettingtestColor.then(setCurrentChoicetestColor, onError);
        let gettingdarkBlueColor = browser.storage.sync.get("darkBlueColor");
        gettingdarkBlueColor.then(setCurrentChoicedarkBlueColor, onError);
        let gettingcodeBackground = browser.storage.sync.get("codeBackground");
        gettingcodeBackground.then(setCurrentChoicecodeBackground, onError);
        let gettinglinkColor = browser.storage.sync.get("linkColor");
        gettinglinkColor.then(setCurrentChoicelinkColor, onError);    
     */
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
