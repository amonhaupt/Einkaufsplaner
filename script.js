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

function renderPage0(pageID, previousParentID) {

    let header = `<h1 class="heading">Mein Einkaufsplaner</h1>`;
    let output = "";

    page0Content.forEach(
        ({
            entry,
            ID
        }) =>
        (output += `<div href="" onclick="return renderPage1(${ID}, ${ID}, ${ID})"><p class="pageEntries">${entry}</p></div>`)
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
    {
        entry: "Menü 1",
        ID: 2,
        parentID: 1,
    },
    {
        entry: "Menü 2",
        ID: 3,
        parentID: 1,
    }
];

function renderPage1(pageID, parentID, previousParentID) {

    let headerContent = "";

    page0Content.forEach(
        ({
            entry,
            ID
        }) => {
            if (ID == pageID) {
                headerContent = entry;
                currentPageID = ID;
            }
        }
    )

    let header = `<h1 class="heading">${headerContent}</h1>`;
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
            `)
            }
        }
    )
    pageContainer.innerHTML = output;
    headerContainer.innerHTML = header;
    footerContainer.innerHTML = footer;
    currentPage = 1;
    currentPageID = pageID;
    currentParentID = parentID;
    currentPreviousParentID = previousParentID;
}

let page2Content = [{
        entry: "Tomaten",
        ID: 0,
        parentID: 0,
    },
    {
        entry: "Mehl",
        ID: 0,
        parentID: 0,
    },
    {
        entry: "Käse",
        ID: 0,
        parentID: 0,
    },
    {
        entry: "Hefe",
        ID: 0,
        parentID: 0,
    },
    {
        entry: "wgparty",
        ID: 1,
        parentID: 1,
    },
    {
        entry: "Menü2Inhalt",
        ID: 2,
        parentID: 3,
    },
];

function renderPage2(pageID, parentID, previousParentID) {

    let headerContent = "";

    page1Content.forEach(
        ({
            entry,
            ID
        }) => {
            if (ID == pageID) {
                headerContent = entry;
                currentPageID = ID;
            }
        }
    )

    let header = `<h1 class="heading">${headerContent}</h1>`;
    let footer = `<p class="backButton" href="" onclick="return renderPage1(${parentID}, ${previousParentID}, ${previousParentID})">Zurück</p>`;
    let output = "";

    page2Content.forEach(
        ({
            entry,
            ID,
            parentID
        }) => {
            if (parentID == pageID) {
                (output += `
                <div ID=link1 href="" onclick="return show_page2(${ID}, ${parentID}, ${previousParentID})"><p class="pageEntries">${entry}</p></div>
            `) // remove link to page
            }
        }
    )
    pageContainer.innerHTML = output;
    headerContainer.innerHTML = header;
    footerContainer.innerHTML = footer;
    currentPage = 2;
    currentPageID = pageID;
    currentParentID = parentID;
    currentPreviousParentID = previousParentID;
}

function addContentAdder() {
    let output = `<form id="frm1" action="javascript: addContent()">
                Neuer Eintrag: <input type="text" name="fname" id="entryInput">
                <input type="button" onclick="addContent()" value="Hinzufügen">
                </form>`
    contentAdder.innerHTML = output
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
        )
        page0Content.push({
            entry: contentInput,
            ID: newID,
        })
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
        )
        page1Content.push({
            entry: contentInput,
            ID: newID,
            parentID: currentPageID,
        })
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
        )
        page2Content.push({
            entry: contentInput,
            ID: newID,
            parentID: currentPageID, //parentID == ID of the last element of previous pages content
        })
        renderPage2(currentPageID, currentParentID, currentPreviousParentID);
    }
    document.getElementById("entryInput").value = "";
}