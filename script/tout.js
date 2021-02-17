import { createTache } from './main.js';

let ComplatedTacheList = [];
let ImportantList = [];
let removeTachesList = [];
let tout = [];

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

// Check table if empty
let EmptyTable = document.querySelector(".EmptyTable");
const checkTableVide = () => {
    // EmptyTable taches
    if(tout.length == 0) EmptyTable.removeAttribute("hidden");
    else EmptyTable.setAttribute("hidden" , true);
}
checkTableVide();

// Crete all taches
let tachesParent = document.querySelector(".taches ul");
const createAllTaches = () => {
    tout.forEach((tache , index) => {
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
createAllTaches();