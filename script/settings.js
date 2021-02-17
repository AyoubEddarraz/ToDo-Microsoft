let maJournee = [];
let ComplatedTacheList = [];
let ImportantList = [];
let removeTachesList = [];
let tout = [];

let AppSettings = {
    MainBackground: null
}


// Get data from local storage TO ma journee table 
try{
    maJournee = [...JSON.parse(localStorage.getItem("maJournee"))];
}catch{}

try{
    suggestionList = [...JSON.parse(localStorage.getItem("suggestions"))];
}catch{}

try{
    ComplatedTacheList = [...JSON.parse(localStorage.getItem("complatedTaches"))];
}catch{}

try{
    ImportantList = [...JSON.parse(localStorage.getItem("ImportantList"))];
}catch{}

try{
    removeTachesList = [...JSON.parse(localStorage.getItem("removeTachesList"))];
}catch{}

tout = [...ComplatedTacheList , ...ImportantList , ...removeTachesList];


let majourneeDataElement = document.querySelectorAll("[data-name='majournee']");
let toutDataElement = document.querySelectorAll("[data-name='tout']");
let importantDataElement = document.querySelectorAll("[data-name='important']");
let effectueesDataElement = document.querySelectorAll("[data-name='effectuees']");
let removeDataElement = document.querySelectorAll("[data-name='remove']");

majourneeDataElement.forEach(item => {
    item.textContent = `${maJournee.length} taches`;
})

toutDataElement.forEach(item => {
    item.textContent = `${tout.length} taches`;
})


importantDataElement.forEach(item => {
    item.textContent = `${ImportantList.length} taches`;
})

effectueesDataElement.forEach(item => {
    item.textContent = `${ComplatedTacheList.length} taches`;
})

removeDataElement.forEach(item => {
    item.textContent = `${removeTachesList.length} taches`;
})

// Remove list
let removemajournee = document.querySelector(".removemajournee");
let removeImportant = document.querySelector(".removeImportant");
let removeEffectues = document.querySelector(".removeEffectues");
let removeRemoveList = document.querySelector(".removeRemoveList");
let removeAllLists = document.querySelector(".removeAllLists");

let settings = {
    removemajournee: false,
    removeImportant: false,
    removeEffectues: false,
    removeRemoveList: false,
    removeAllLists: false,
    backgroundImage: false
}

removemajournee.addEventListener('click' , () => {
    settings.removemajournee = true;
})

removeImportant.addEventListener('click' , () => {
    settings.removeImportant = true;
})

removeEffectues.addEventListener('click' , () => {
    settings.removeEffectues = true;
})

removeRemoveList.addEventListener('click' , () => {
    settings.removeRemoveList = true;
})

removeAllLists.addEventListener('click' , () => {
    settings.removeAllLists = true;
})

// Change back 
let galleryBackground = document.querySelectorAll(".galleryBackground img");

// add event every image to change 
galleryBackground.forEach(image => {
    image.addEventListener('click' , _ => {
        let imageUrl = image.getAttribute("data-name");
        // change the value of Mainbackground
        AppSettings.MainBackground = imageUrl;
        settings.backgroundImage = true;
    })
})

// save settings 
const saveSettings = () => {
    if(settings.removemajournee) localStorage.removeItem("maJournee");
    if(settings.removeImportant) localStorage.removeItem("ImportantList");
    if(settings.removeEffectues) localStorage.removeItem("complatedTaches");
    if(settings.removeRemoveList) localStorage.removeItem("removeTachesList");
    if(settings.removeAllLists) localStorage.clear();
    if(settings.backgroundImage) localStorage.setItem("settingApp" , JSON.stringify(AppSettings));

    // location 
    let hostname = window.location.host;
    window.location.href = (`http://${hostname}/index.html`);
}



// Reset Btn
let ResetBtn = document.querySelector(".ResetBtn");
ResetBtn.addEventListener('click' , () => {
    settings = {
        removemajournee: false,
        removeImportant: false,
        removeEffectues: false,
        removeRemoveList: false,
        removeAllLists: false,
        backgroundImage: false
    }
})


// saveAllButton 
let saveAllButton = document.querySelector(".saveAllButton");
saveAllButton.addEventListener('click' , () => {
    saveSettings();
})