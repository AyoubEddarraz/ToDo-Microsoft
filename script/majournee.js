// ---------- Import ----------

// import tache from main
import { createTache , createContextMenu , createTacheSuggestion} from './main.js';

// ---------- Variables ----------

// tache
let tache = {
    tache_id: null,
    tache_desc: "",
    date_add: null,
    completed: false,
    important: false
}

// SettingApp options
let AppSettings = {
    MainBackground: null
}

// date span
let dateNow = document.querySelector('.dateNow'); 

// suggestions
let suggestions = document.querySelector(".suggestions");
let suggestionIcone = document.querySelectorAll(".suggestionIcone");

// change background
let main = document.querySelector("main");
let changeBackIcone = document.querySelector(".changeBackIcone");
let galleryBackground = document.querySelector(".galleryBackground");
let imageGallry = document.querySelectorAll(".galleryBackground img");

// ---------- Functions----------

// Return date now 
export const getDateNow = () => {
    let date = new Date().toString().split("GMT")[0];
    return date;
}

// Add date the Current day
setInterval(() => {
    let date = getDateNow();
    dateNow.textContent = date;
}, 1000);

// show suggestions
const showSuggestion = _ => suggestions.classList.toggle("show");

// suggestions function active
suggestionIcone.forEach(suggestion => suggestion.addEventListener('click' , _ => showSuggestion()));

// change background
const changeback = (backgroundImage) => main.style.backgroundImage = (`url('../images/${backgroundImage}.jpg')`);

// i use try because i waiting error from localStorage
try{
    let backgroundLocalStorage = JSON.parse(localStorage.getItem("settingApp")).MainBackground;
    // change background if page load
    changeback(backgroundLocalStorage);
}catch{
    // Do Samthing
}

// show change back component
const showChangeBack = _ => galleryBackground.classList.toggle("show");

// show change back Component event
changeBackIcone.addEventListener('click' , _ => showChangeBack());

// add event every image to change 
imageGallry.forEach(image => {
    image.addEventListener('click' , _ => {
        let imageUrl = image.getAttribute("data-name");
        changeback(imageUrl);
        // change the value of Mainbackground
        AppSettings.MainBackground = imageUrl;
        // add to local storage
        localStorage.setItem("settingApp" , JSON.stringify(AppSettings));
    })
})

// Add tache variables
let addTacheInput = document.querySelector(".addTacheInput");
let addOption = document.querySelector(".addOption");
let addtacheComponent = document.querySelector(".addTache .add");
let closeAddOption = document.querySelector(".closeAddOption");
let iconeTacheCompletedForm = document.querySelector(".iconeTacheCompletedForm");
let iconeTacheImportantForm = document.querySelector(".iconeTacheImportantForm");
let tacheCompleted = false;
let tacheImportant = false;

// Change tache option 

iconeTacheCompletedForm.addEventListener('click' , () => {
    iconeTacheCompletedForm.classList.toggle("active");
    tacheCompleted = !tacheCompleted;
})

iconeTacheImportantForm.addEventListener('click' , () => {
    iconeTacheImportantForm.classList.toggle("active");
    tacheImportant = !tacheImportant;
})

// Defaul value of iconeTache Option
const defualtValueTacheOption = () => {
    iconeTacheCompletedForm.classList.remove("active");
    tacheCompleted = false;
    iconeTacheImportantForm.classList.remove("active");
    tacheImportant = false;
}

// Show Option tache function
const showOptiontache = () => {
    addOption.classList.add("show");
    addtacheComponent.classList.add("show");
}

// hide Option tache function
const hideOptiontache = () => {
    addOption.classList.remove("show");
    addtacheComponent.classList.remove("show");
}

// actualiser
let actualiser = document.querySelector("i.actualiser");
actualiser.addEventListener('click' , () => {
    location.reload();
})

// Event Show Option tache
addTacheInput.addEventListener('focus' , () => showOptiontache());
closeAddOption.addEventListener('click' , () => hideOptiontache());

let maJournee = [];
let suggestionList = [];
let ComplatedTacheList = [];
let ImportantList = [];
let removeTachesList = [];
let tachesParent = document.querySelector(".taches ul");

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

// add tache en click Enter On keyboard
addTacheInput.addEventListener('keypress' , (event) => {
    if(event.keyCode === 13 && addTacheInput.value) createNewTache(addTacheInput.value);
})


// TESTE
// check date tache et add to suggestion if date not meme date


// Check if table vide 
let EmptyTable = document.querySelector(".EmptyTable");
let suggestionsEmptyTable = document.querySelector(".suggestions .EmptyTable");

const checkTableVide = () => {
    // EmptyTable taches
    if(maJournee.length == 0) EmptyTable.removeAttribute("hidden");
    else EmptyTable.setAttribute("hidden" , true);
    // suggestionsEmptyTable
    if(suggestionList.length == 0) suggestionsEmptyTable.removeAttribute("hidden");
    else suggestionsEmptyTable.setAttribute("hidden" , true);
}
checkTableVide();

// Reset tache 
const resetTache = _ => {
    tache = {
        tache_id: null,
        tache_desc: "",
        date_add: null,
        completed: false,
        important: false
    }   
}

// for the textmenu operation
// TESTE
let CurrentTache = null;
let CurrentTacheIndex = null;
let CurrentTacheId = null;
let CurrentTacheCompleted = null;
let CurrentTacheImportant = null;

// Generate Id 
const generateTacheId = _ => Date.now();

// Save Majournee 
const SaveDataTaches = () => {
    localStorage.setItem("maJournee" , JSON.stringify(maJournee));
    localStorage.setItem("suggestions" , JSON.stringify(suggestionList));
    localStorage.setItem("complatedTaches" , JSON.stringify(ComplatedTacheList));
    localStorage.setItem("ImportantList" , JSON.stringify(ImportantList));
    localStorage.setItem("removeTachesList" , JSON.stringify(removeTachesList));
}

// Create Tache Function
const createNewTache = () => { 
    resetTache();
    let date = getDateNow();
    let tache_id = generateTacheId();
    tache.tache_desc = addTacheInput.value;
    tache.date_add = date;
    tache.completed = tacheCompleted;
    tache.important = tacheImportant;
    tache.tache_id = tache_id;
    let index = maJournee.indexOf(tache);
    createTache(tachesParent , "maJournee" , index , tache_id , tacheImportant , tacheCompleted , addTacheInput.value , date );
    maJournee.push(tache);
    addTacheInput.value = null;
    SaveDataTaches();
    defualtValueTacheOption();
    hideOptiontache();
    addTacheInput.blur();
    collectTaches();
    showContextMenuFun();
    changeStatusCompletedMain();
    changeStatusImportantMain();
    checkTableVide();
    addAmaJournee();
}

// Create ma journee
const createMajourneeTache = () => {
    maJournee.forEach((tache , index) => {
        let tacheIndex = index;
        let tacheImportant = tache.important;
        let tacheCompleted = tache.completed;
        let tache_desc = tache.tache_desc;
        let date = tache.date_add;
        let tache_id = tache.tache_id;
        createTache(tachesParent , "maJournee" , tacheIndex , tache_id , tacheImportant , tacheCompleted , tache_desc , date);
    })
    checkTableVide();
}
createMajourneeTache();

// Collect tache Function 
const collectTaches = () => {
    let taches = document.querySelectorAll(".taches ul li");
    return taches;
}
collectTaches();

// Change status Complated
const changeStatusComplatedOrImportant = (element , complated , important) => {
    let nameTable = element.getAttribute("data-table");
    let idTache = element.getAttribute("data-id");
    if(nameTable === "maJournee"){
        let elementSearch = maJournee.filter((tache) => { return tache.tache_id == idTache });
        let index = maJournee.indexOf(elementSearch[0]);
        // if param completed is true
        if(complated) maJournee[index].completed = !maJournee[index].completed;
        // if param important is true
        if(important) maJournee[index].important = !maJournee[index].important;
        SaveDataTaches();
    }
}

// change status Completed 
const changeStatusCompletedMain = () => {
    collectTaches().forEach(tache => {
        let completed = tache.children[0];
        let tache_desc = tache.children[1];
        completed.addEventListener('click' , () => {
            completed.classList.toggle("fa-circle");
            completed.classList.toggle("fa-check-circle");
            completed.classList.toggle("fas");
            completed.classList.toggle("far");
            tache.classList.toggle("effectuees");
            tache_desc.classList.toggle("complated");
            changeStatusComplatedOrImportant(tache , true , false);
        })
    })
}
changeStatusCompletedMain();

// Chaneg Important 
const changeStatusImportantMain = () => {
    collectTaches().forEach(tache => {
        let important = tache.children[2];
        important.addEventListener('click' , () => {
            important.classList.toggle("far");
            important.classList.toggle("fas");
            changeStatusComplatedOrImportant(tache , false , true);
        })
    })
}
changeStatusImportantMain();



// probleme 2
// -------------------text menu tache--------------------- 

// Create Text menu Function
let contextMenuTacheUl = document.querySelector(".textMenuTache ul");
let li_EffacerAMonJournee = document.querySelector("ul li[data-role='effecerAMonJournee']");
let li_complted = document.querySelector("ul li[data-role='completed']");
let li_Important = document.querySelector("ul li[data-role='important']");
let li_Delete = document.querySelector("ul li[data-role='delete']");

// Add event listener to li
let textMenuTache = document.querySelector(".textMenuTache");

// aide a la creation de textmenu de trouver is que si completed task ou no et aussi est ce que si que si important ou non
const completedAndImportantFounder = (id_tache) => {
    let elementSearch = maJournee.filter((tache) => { return tache.tache_id == id_tache });
    let index = maJournee.indexOf(elementSearch[0]);
    let completed = maJournee[index].completed;
    let important = maJournee[index].important;
    return {
        completed: completed,
        important: important
    }
}

// Show Context Menu Fucntion 
const showContextMenuFun = () => {
    collectTaches().forEach(tache => {
        tache.addEventListener("contextmenu" , (event) => {
            event.preventDefault();
            let maxWidthEcran = window.innerWidth;
            // Show Element
            textMenuTache.classList.add("active");
            textMenuTache.style.top = `${event.clientY}px`;
            textMenuTache.style.left = `${event.clientX}px`;
            // add responsive to element
            if((event.clientX + 200) > maxWidthEcran) textMenuTache.style.left = `${event.clientX - 200}px`;
            if(event.clientY > 400) textMenuTache.style.top = `${event.clientY - 50}px`;

            let li = tache;
            let data_id = li.getAttribute("data-id");
            let data_index = li.getAttribute("data-index");

            let completed = completedAndImportantFounder(data_id).completed;
            let important = completedAndImportantFounder(data_id).important;
            createContextMenu(li_complted , li_Important , important , completed);

            // Element modifier with contextmenu
            CurrentTache = tache;
            CurrentTacheIndex = data_index;
            CurrentTacheId = data_id;
            CurrentTacheCompleted = completed;
            CurrentTacheImportant = important;

            // table vide 
            checkTableVide();

        })
    })
}
showContextMenuFun();


// Collect context menu operation
const collectContextMenuOperation = () => {
    let textMenuOperation = document.querySelectorAll(".textMenuTache ul li");
    return textMenuOperation
}

// getIndexElement by Id 

const getIndexById = (id_tache) => {
    let elementSearch = maJournee.filter((tache) => { return tache.tache_id == id_tache });
    let index = maJournee.indexOf(elementSearch[0]);
    return index
}

// -------------TextMenu operation----------------

const refraicheFunction = () => {
    SaveDataTaches();
    showContextMenuFun();
    changeStatusCompletedMain();
    changeStatusImportantMain();
    checkTableVide();
    collecttacheDesc();
}

// task completed contextmenu
li_complted.addEventListener('click' , () => {
    let index = getIndexById(CurrentTacheId);
    // couté donnée
    maJournee[index].completed = !maJournee[index].completed;
    // couté style 
    let completed = CurrentTache.children[0];
    let tache_desc = CurrentTache.children[1];
        completed.classList.toggle("fa-circle");
        completed.classList.toggle("fa-check-circle");
        completed.classList.toggle("fas");
        completed.classList.toggle("far");
        CurrentTache.classList.toggle("effectuees");
        tache_desc.classList.toggle("complated");
    // refraiche function
    refraicheFunction();
})
// task important contextmenu
li_Important.addEventListener('click' , () => {
    let index = getIndexById(CurrentTacheId);
    // couté donnée
    maJournee[index].important = !maJournee[index].important;
    // couté style 
    let important = CurrentTache.children[2];
        important.classList.toggle("far");
        important.classList.toggle("fas");
    // refraiche function
    refraicheFunction();
})

// remove element in the dom and the data in the array
const removetache = (addToRemoveList) => {
    let dateTacheCurrent = CurrentTache.getAttribute("data-date");
    let descTacheCurrent = CurrentTache.children[1];
    createTacheSuggestion("tachesSuggestions ul" , "maJournee" , CurrentTacheIndex , dateTacheCurrent , CurrentTacheId , descTacheCurrent.textContent);
    // delete data element from majournee
    let index = getIndexById(CurrentTacheId);
    // add to remove list 
    if(addToRemoveList){
        removeTachesList.push(maJournee[index]);
    }
    maJournee.splice(index , 1);
    // Delete dom element
    let listTache = document.querySelector(".taches ul");
    listTache.removeChild(CurrentTache);
    // refraiche function
    refraicheFunction();
}
// task delete contextmenu
li_Delete.addEventListener('click' , () => {
    removetache(true);
})
// Effacer une task A Mon Journee 
li_EffacerAMonJournee.addEventListener('click' , () => {
    let index = getIndexById(CurrentTacheId);
    suggestionList.push(maJournee[index]);
    removetache(false);
    addAmaJournee();
    let SuggestionsDiv = document.querySelector(".suggestions").classList.add("show");
})

// get Element Clicked in textmenu
const getElementClickedInTextmenu = (element) => {
    let id_tache = element.getAttribute("data-id");
    console.log(id_tache);
}

// Reset active from context menu
window.addEventListener('click' , () => {
    textMenuTache.classList.remove("active");
})

// windows context menu click event hide textmenu tache 
window.addEventListener('contextmenu' , (event) => {
    let taches = [...collectTaches()];
    if(taches.indexOf(event.target) === -1) textMenuTache.classList.remove("active");  
})

// hide gallrybackground in blur
window.addEventListener('click' , (event) => {
    if(event.target !== changeBackIcone) galleryBackground.classList.remove("show");
})


// Suggestions list and aside 
let tachesSuggestions = document.querySelectorAll(".tachesSuggestions");
let suggestionsTaches = document.querySelectorAll(".tachesSuggestions ul .tache");
let suggestionsTachesParent = document.querySelectorAll(".tachesSuggestions ul");
let showDesctache = document.querySelectorAll(".tachesSuggestions ul .tache > p");

// Collect taches suggestions
const collecttacheDesc = () => {
    let showDesctache = document.querySelectorAll(".tachesSuggestions ul .tache li p");
    return showDesctache
}

// Hide all tache suggestions
const hiddeAllDescShowing = () => {
    collecttacheDesc().forEach(tache => {
        let parent = tache.parentElement.parentElement.children[1];
        parent.classList.remove("show");
    })
}

// show tache on click
const showDescTacheOnClick = () => {
    collecttacheDesc().forEach(tache => {
        tache.addEventListener("click" , () => {
            hiddeAllDescShowing();
            let tache_desc = tache.parentElement.parentElement.children[1];
            tache_desc.classList.toggle("show");
        })
        tache.addEventListener("dblclick" , () => {
            let tache_desc = tache.parentElement.parentElement.children[1];
            tache_desc.classList.remove("show");
        })
    })
}
showDescTacheOnClick();

// Create tache suggestions
const createTacheSuggestions = () => {
    suggestionList.forEach((tache , index) => {
        createTacheSuggestion("tachesSuggestions ul" , "maJournee" , index , tache.date_add , tache.tache_id , tache.tache_desc);
    })
}
createTacheSuggestions();

// add tache de dernier journee 
const checkDateEquals = (tache) => {
    // check date
    let year = new Date().getFullYear();
    let date = getDateNow().split(year)[0].concat(`${year}`);
    let tacheDateYear = tache.date_add.split(" ")[3];
    let dateTache = tache.date_add.split(tacheDateYear)[0].concat(tacheDateYear);

    // check important
    let tacheCompleted = tache.completed;
    let tacheImportant = tache.important;

    if(date === dateTache){
        return{
            date: true,
            important: false,
            complated: false   
        }
    }else{
        if(tacheCompleted){
            return{
                date: true,
                important: false,
                complated: true
            }
        }
        if(tacheImportant){
            return{
                date: true,
                important: true,
                complated: false
            }
        }
        if(tacheImportant && tacheCompleted){
            return{
                date: true,
                important: true,
                complated: true
            }
        }
        return{
            date: false,
            important: false,
            complated: false
        }
    }
}

// remove ancienne tache
const removeAncienneTache = (tache , index) => {
    if(!checkDateEquals(tache).date){
        if(checkDateEquals(tache).important){
            ImportantList.push(tache);
            maJournee.splice(index , 1);
        }
        if(checkDateEquals(tache).complated){
            ComplatedTacheList.push(tache);
            maJournee.splice(index , 1);
        }
        if(!checkDateEquals(tache).complated && !checkDateEquals(tache).important){
            suggestionList.push(tache);
            maJournee.splice(index , 1);
        }
        let tacheListElement = document.querySelector(".taches ul");
        let tacheElement = document.querySelector(`.taches ul li[data-id="${tache.tache_id}"]`);
        tacheListElement.removeChild(tacheElement);
    }
}

// Excute Function remove tache ancinne
const checkDateElement = () => {
    maJournee.forEach((tache , index) => {
        removeAncienneTache(tache , index);
    })
}
checkDateElement();

const collectSuggestionTache = () => {
    let suggesTaches = document.querySelectorAll(".tachesSuggestions ul .tache li");
    return suggesTaches
}

// add a ma journee 
const addAmaJournee = () => {
    collectSuggestionTache().forEach((tache , index) => {
        let addAmaJourneeIcone = tache.children[2];
        addAmaJourneeIcone.addEventListener('click' , () => {
            let tacheId = tache.parentElement.getAttribute("data-id");
            let tacheDate = tache.parentElement.getAttribute("data-date");
            let tacheDesc = tache.children[1].textContent;
            let Newtache = {
                tache_id: tacheId,
                tache_desc: tacheDesc,
                date_add: tacheDate,
                completed: false,
                important: false
            }
            maJournee.push(Newtache);
            let elementSearch = suggestionList.filter((tache) => { return tache.tache_id == tacheId });
            let indexElement = suggestionList.indexOf(elementSearch[0]);
            suggestionList.splice(indexElement , 1);
            let suggestionListElement = document.querySelector(".tachesSuggestions ul");
            let element = tache.parentElement;
            suggestionListElement.removeChild(element);
            createTache(tachesParent , "maJournee" , index , tacheId , false , false , tacheDesc , tacheDate);
            refraicheFunction();
        })
    })
}
addAmaJournee();

// Add to Complated task 
const addToComplated = () => {
    collectSuggestionTache().forEach((tache , index) => {
        let addCompletedIcone = tache.children[0];
        addCompletedIcone.addEventListener('click' , () => {
            let tacheId = tache.parentElement.getAttribute("data-id");
            let tacheDate = tache.parentElement.getAttribute("data-date");
            let tacheDesc = tache.children[1].textContent;
            let Newtache = {
                tache_id: tacheId,
                tache_desc: tacheDesc,
                date_add: tacheDate,
                completed: true,
                important: false
            }
            ComplatedTacheList.push(Newtache);
            let elementSearch = suggestionList.filter((tache) => { return tache.tache_id == tacheId });
            let indexElement = suggestionList.indexOf(elementSearch[0]);
            suggestionList.splice(indexElement , 1);
            let suggestionListElement = document.querySelector(".tachesSuggestions ul");
            let element = tache.parentElement;
            suggestionListElement.removeChild(element);
            refraicheFunction();
        })
    })
}
addToComplated();

// Actualiser 
let actualiserSuggestions = document.querySelector(".suggestions .head .actualiser");
actualiserSuggestions.addEventListener("click" , () => {
    location.reload();
})

// Refraiche function 
refraicheFunction();