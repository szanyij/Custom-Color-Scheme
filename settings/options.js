/*
    // version: 1 //
    backgroundColor: "#ddffff",  // pink
    enableTextColoring: "1",
    txtColor: '#444',
    codeBackground: '#bcbcbc',
    linkColor: '#4b7cf0'
#D4D4D4
*/

let gVersion = "1";

function saveOptions(e) {
    e.preventDefault();
    let Colors = document.querySelector("#version").value + '|' +
        document.querySelector("#backgroundColor").value + '|' +
        ( document.querySelector("#enableTextColoring").checked ? "1" : "0" ) + '|' +
        document.querySelector("#txtColor").value + '|' +
        document.querySelector("#codeBackground").value + '|' +
        document.querySelector("#linkColor").value;
    browser.storage.sync.set({
        Colors: Colors,
    });
}

function restoreOptions() {
    function setCurrentColors(result) {
        let lVersion; 
        let lBackgroundColor;
        let lEnableTextColoring;
        let lTxtColor;
        let lCodeBackground;
        let lLinkColor;
        try {
            let ColorsList = result.Colors.split("|");
            lVersion = ColorsList[0];
            if (gVersion !== lVersion)
                throw new Error("Version difference -> reset settings.");
            lBackgroundColor = ColorsList[1];
            lEnableTextColoring = ColorsList[2];
            lTxtColor = ColorsList[3];
            lCodeBackground = ColorsList[4];
            lLinkColor = ColorsList[5];
        } catch (error) {
            console.log(error);
            lVersion = gVersion;
            lBackgroundColor = "#2A2C37";
            lEnableTextColoring = "1";
            lTxtColor = "#8F99A5";
            lCodeBackground = "#1c1c1c";
            lLinkColor = "#687b9a";
        }
        document.querySelector("#version").value = lVersion;
        document.querySelector("#backgroundColor").value = lBackgroundColor;
        if (lEnableTextColoring==="1")
            document.querySelector("#enableTextColoring").checked = true;
        document.querySelector("#txtColor").value = lTxtColor;
        document.querySelector("#codeBackground").value = lCodeBackground;
        document.querySelector("#linkColor").value = lLinkColor;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let Colors = browser.storage.sync.get("Colors");
    Colors.then(setCurrentColors, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
