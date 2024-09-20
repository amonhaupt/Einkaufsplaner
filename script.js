const pageContainer = document.querySelector(".pageContainer");
const headerContainer = document.querySelector(".headerContainer");
const footerContainer = document.querySelector(".footerContainer");
const contentAdder = document.querySelector(".contentAdder");
let currentPage = 0;
let currentPageID = 0;
let currentParentID = 0;
let currentPreviousParentID = 0;

let page0Content = [{
        entry: "Einkaufslisten",
        ID: 0,
    },
    {
        entry: "Menüplanung",
        ID: 1,
    },
];

function renderPage0(pageID, parentID, previousParentID) {

    loadContent(0);

    // does not work properly

    // saveContent(page0Content, 0);
    // saveContent(page1Content, 1);
    // saveContent(page2Content, 2);

    let header = `<h1 class="heading">Mein Einkaufsplaner</h1>`;
    let output = "";

    page0Content.forEach(
        ({
            entry,
            ID
        }) =>
        (output += `<div href="" onclick="return renderPage1(${ID}, ${ID}, ${ID})"><p class="pageEntries">${entry}</p></div>
            <div class="removeButton" onclick="removeContent(${ID}, ${ID}, ${ID})"><p>Entfernen</p></div>
            <div class="editButton" onclick="editContent(${ID}, ${parentID}, ${previousParentID})"><p>Bearbeiten</p></div>
            `)
    )

    pageContainer.innerHTML = output;
    headerContainer.innerHTML = header;
    footerContainer.innerHTML = "";
    currentPage = 0;
    currentPageID = 0;
    currentParentID = 0;
    currentPreviousParentID = 0;
}

let page1Content = [{
        entry: "Wocheneinkauf",
        ID: 0,
        parentID: 0,
    },
    {
        entry: "WG-Party",
        ID: 1,
        parentID: 0,
    },
];

function renderPage1(pageID, parentID, previousParentID) {

    loadContent(1);

    let footer = `<p class="backButton" href="" onclick="return renderPage0(${parentID}, ${previousParentID}, ${previousParentID})">Zurück</p>`;
    let output = "";

    page1Content.forEach(
        ({
            entry,
            ID,
            parentID
        }) => {
            if (parentID == pageID) {
                (output += `
                <div ID=link1 href="" onclick="return renderPage2(${ID}, ${parentID}, ${previousParentID})"><p class="pageEntries">${entry}</p></div>
                <div class="removeButton" onclick="removeContent(${ID}, ${parentID}, ${previousParentID})"><p>Entfernen</p></div>
                <div class="editButton" onclick="editContent(${ID}, ${parentID}, ${previousParentID})"><p>Bearbeiten</p></div>
            `)
            }
        }
    )
    pageContainer.innerHTML = output;
    footerContainer.innerHTML = footer;
    currentPage = 1;
    currentPageID = pageID;
    currentParentID = parentID;
    currentPreviousParentID = previousParentID;

    loadHeaderContent(1, pageID);

}

let page2Content = [{
        entry: "Tomaten",
        ID: 0,
        parentID: 0,
        contentClass: "pageEntries",
    },
    {
        entry: "Mehl",
        ID: 1,
        parentID: 0,
        contentClass: "pageEntries",
    },
    {
        entry: "Käse",
        ID: 2,
        parentID: 0,
        contentClass: "pageEntries",
    },
    {
        entry: "Hefe",
        ID: 3,
        parentID: 0,
        contentClass: "pageEntries",
    },
];

function renderPage2(pageID, parentID, previousParentID) {

    loadContent(2);

    let footer = `<p class="backButton" href="" onclick="return renderPage1(${parentID}, ${previousParentID}, ${previousParentID})">Zurück</p>`;
    let output = "";

    page2Content.forEach(
        ({
            entry,
            ID,
            parentID,
            contentClass
        }) => {
            if (parentID == pageID) {
                (output += `
                <div href="" onclick="return changeClass(${ID})"><p ID=entry${ID} class=${contentClass}>${entry}</p></div>
                <div class="removeButton" onclick="removeContent(${ID}, ${parentID}, ${previousParentID})"><p>Entfernen</p></div>
                
            `)
            }
        }
    )
    pageContainer.innerHTML = output;
    footerContainer.innerHTML = footer;
    currentPage = 2;
    currentPageID = pageID;
    currentParentID = parentID;
    currentPreviousParentID = previousParentID;

    loadHeaderContent(2, pageID);

}

function changeClass(inputID) {
    let elementToChangeClass = page2Content.findIndex(x => x.ID === inputID);
    let pageEntry = document.querySelector(`#entry${inputID}`)
    if (pageEntry.classList.contains("pageEntries")) {
        pageEntry.classList.remove("pageEntries");
        pageEntry.classList.add("checked");
        page2Content[elementToChangeClass].contentClass = "checked";
    } else {
        pageEntry.classList.add("pageEntries");
        pageEntry.classList.remove("checked");
        page2Content[elementToChangeClass].contentClass = "pageEntries";
    }
    saveContent(page2Content, 2);
}

function loadHeaderContent(ID, pageID) {
    let headerContent = "";

    if (ID == 1) {
        page0Content.forEach(
            ({
                entry,
                ID
            }) => {
                if (ID == pageID) {
                    headerContent = entry;
                }
            }
        )
    }
    if (ID == 2) {
        page1Content.forEach(
            ({
                entry,
                ID
            }) => {
                if (ID == pageID) {
                    headerContent = entry;
                }
            }
        )
    }

    let header = `<h1 class="heading">${headerContent}</h1>`;
    headerContainer.innerHTML = header;
}


function addContentAdder() {
    let output = `<form id="frm1" action="javascript: addContent()">
                Neuer Eintrag: <input type="text" name="fname" id="entryInput">
                <input type="button" onclick="addContent()" value="Hinzufügen">
                Einträge Bearbeiten:
                <input id="showEditButton "type="button" onclick="showEditContent()" value="Bearbeiten">
                </form>`;
    contentAdder.innerHTML = output;
}
document.addEventListener("DOMContentLoaded", addContentAdder);

function addContent() {

    let contentInput = document.getElementById("entryInput").value;

    if (contentInput == "") {
        return;
    }
    if (currentPage == 0) {
        let newID = 0;
        page0Content.forEach(
            ({
                ID
            }) => {
                if (ID >= newID) {
                    newID = ID + 1;
                }
            }
        );
        page0Content.push({
            entry: contentInput,
            ID: newID,
        });
        saveContent(page0Content, 0);
        renderPage0(currentPageID, currentParentID, currentPreviousParentID);
    }
    if (currentPage == 1) {
        let newID = 0;
        page1Content.forEach(
            ({
                ID
            }) => {
                if (ID >= newID) {
                    newID = ID + 1;
                }
            }
        );
        page1Content.push({
            entry: contentInput,
            ID: newID,
            parentID: currentPageID,
        });
        saveContent(page1Content, 1);
        renderPage1(currentPageID, currentParentID, currentPreviousParentID);
    }
    if (currentPage == 2) {
        let newID = 0;
        page2Content.forEach(
            ({
                ID
            }) => {
                if (ID >= newID) {
                    newID = ID + 1;
                }
            }
        );
        page2Content.push({
            entry: contentInput,
            ID: newID,
            parentID: currentPageID,
            contentClass: "pageEntries",
        });
        saveContent(page2Content, 2);
        renderPage2(currentPageID, currentParentID, currentPreviousParentID);
    }
    document.getElementById("entryInput").value = "";
}

function saveContent(content, ID) {

    localStorage.setItem(`page${ID}Dictonary`, JSON.stringify(content));

}

function loadContent(ID) {
    if (localStorage.getItem(`page${ID}Dictonary`) === null) {
        return;
    }
    if (ID == 0) {
        page0Content = JSON.parse(localStorage.getItem(`page${ID}Dictonary`));
    }
    if (ID == 1) {
        page1Content = JSON.parse(localStorage.getItem(`page${ID}Dictonary`));
    }
    if (ID == 2) {
        page2Content = JSON.parse(localStorage.getItem(`page${ID}Dictonary`));
    }
}

function showEditContent() {
    document.querySelectorAll(".removeButton").forEach(element => element.style.display = "block");
    document.querySelectorAll(".editButton").forEach(element => element.style.display = "block");
}

function removeContent(inputID, inputParentID, inputPreviousParentID) {
    if (currentPage == 0) {
        let elementToRemove = page0Content.findIndex(x => x.ID === inputID);
        page0Content.splice(elementToRemove, 1);

        page1Content.forEach(
            ({
                ID,
                parentID
            }) => {
                if (parentID == inputParentID) {
                    page1Content.splice(parentID, 1);
                    let page1ID = ID
                    for (let i = 0; i < page2Content.length; i++) {
                        if (page2Content[i].parentID == page1ID) {
                            page2Content.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
        );

        saveContent(page0Content, 0);
        saveContent(page1Content, 1);
        saveContent(page2Content, 2);


        renderPage0(inputID, inputParentID, inputPreviousParentID);
    }
    if (currentPage == 1) {
        let elementToRemove = page1Content.findIndex(x => x.ID === inputID);
        page1Content.splice(elementToRemove, 1);
        saveContent(page1Content, 1);
        renderPage1(inputID, inputParentID, inputPreviousParentID);
    }
    if (currentPage == 2) {
        let elementToRemove = page2Content.findIndex(x => x.ID === inputID);
        page2Content.splice(elementToRemove, 1);
        saveContent(page2Content, 2);
        renderPage2(inputParentID, inputParentID, inputPreviousParentID);
    }
}

function editContent(inputID, inputParentID, inputPreviousParentID) {
    var editInput = prompt("Neuen Namen eintragen:", "Neuer Name");

    if (currentPage == 0) {
        page0Content[inputID].entry = editInput;
        saveContent(page0Content, 0);
        renderPage0(inputID, inputParentID, inputPreviousParentID);
    }

    if (currentPage == 1) {
        page1Content[inputID].entry = editInput;
        saveContent(page1Content, 1);
        renderPage1(inputParentID, inputParentID, inputPreviousParentID);
    }
}