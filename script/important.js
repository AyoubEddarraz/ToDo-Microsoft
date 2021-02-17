import { createTache } from './main.js';

let ImportantList = [];

try{
    ImportantList = [...JSON.parse(localStorage.getItem("ImportantList"))];
}catch{}

// Check table if empty
let EmptyTable = document.querySelector(".EmptyTable");
const checkTableVide = () => {
    // EmptyTable taches
    if(ImportantList.length === 0) EmptyTable.removeAttribute("hidden");
    else EmptyTable.setAttribute("hidden" , true);
}
checkTableVide();

// Crete all taches
let tachesParent = document.querySelector(".taches ul");
const createAllTaches = () => {
    ImportantList.forEach((tache , index) => {
        let tacheIndex = index;
        let tacheImportant = tache.important;
        let tacheCompleted = tache.completed;
        let tache_desc = tache.tache_desc;
        let date = tache.date_add;
        let tache_id = tache.tache_id;
        createTache(tachesParent , "maJournee" , tacheIndex , tache_id , true , tacheCompleted , tache_desc , date);
    })
    checkTableVide();
}
createAllTaches();