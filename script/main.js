// ---------- Export ----------

export { createTache , createContextMenu , createTacheSuggestion};

// ---------- Variables ----------



// ---------- Functions----------

// Create new tache
const createTache = (parent , data_table , data_index , data_id ,  important , completed , tache_desc , data_date) => {
    let li = document.createElement('li');
    let iconeCompleted = document.createElement('i');
    let iconeImportant = document.createElement('i');
    let span = document.createElement('span');
    let description_tache = document.createTextNode(tache_desc);

    li.setAttribute("data-table" , data_table);
    li.setAttribute("data-index" , data_index);
    li.setAttribute("data-date" , data_date);
    li.setAttribute("data-id" , data_id);
    li.classList.add("rounded");

    span.appendChild(description_tache);

    if(important) iconeImportant.classList.add("fas" , "fa-star");
    else iconeImportant.classList.add("far" , "fa-star");

    if(completed){
        li.classList.add("effectuees");
        iconeCompleted.classList.add("fas" , "fa-check-circle");
        span.classList.add("complated");
    }
    else iconeCompleted.classList.add("far" , "fa-circle");

    li.appendChild(iconeCompleted);
    li.appendChild(span);
    li.appendChild(iconeImportant);
    parent.appendChild(li);
}


// Create context menu 

const createContextMenu = (li_complted , li_Important , important , completed) => {
    // icons
    let icone_li_completed = li_complted.children[0];
    let icone_li_important = li_Important.children[0];
    // texts
    let text_li_completed = li_complted.children[1];
    let text_li_important = li_Important.children[1];
    // Icons list
    let list_completedIcone = ["fas" , "fa-check-circle"];
    let list_importantIcone = ["fas" , "fa-star"];
    let list_notComplatedIcone = ["far" , "fa-check-circle"];
    let list_notImportantIcone = ["far" , "fa-star"];
    // conditions
    if(important){
        icone_li_important.classList.remove(...list_notImportantIcone);
        icone_li_important.classList.add(...list_importantIcone);
        text_li_important.textContent = "";
        text_li_important.textContent = "Marquer comme pas important";
    }else{
        icone_li_important.classList.remove(...list_importantIcone);
        icone_li_important.classList.add(...list_notImportantIcone);
        text_li_important.textContent = "";
        text_li_important.textContent = "Marquer comme important";
    }

    if(completed){
        icone_li_completed.classList.remove(...list_notComplatedIcone);
        icone_li_completed.classList.add(...list_completedIcone);
        text_li_completed.textContent = "";
        text_li_completed.textContent = "Marquer comme non terminé";
    }else{
        icone_li_completed.classList.remove(...list_completedIcone);
        icone_li_completed.classList.add(...list_notComplatedIcone);
        text_li_completed.textContent = "";
        text_li_completed.textContent = "Marquer comme terminé";
    }

}


// Create suggestions tache 

const createTacheSuggestion = (parentClassQuery , data_table , data_index , data_date , data_id , tache_desc ) => {

    let parent = document.querySelector(`.${parentClassQuery}`);

    let div = document.createElement("div");
    div.setAttribute("data-table" , data_table);
    div.setAttribute("data-index" , data_index);
    div.setAttribute("data-date" , data_date);
    div.setAttribute("data-id" , data_id);
    div.classList.add("tache");

    let li = document.createElement("li");

    let completedIcone = document.createElement("i");
    completedIcone.classList.add("far" , "fa-circle");

    let p = document.createElement("p");
    p.textContent = tache_desc;

    let addTache = document.createElement("i");
    addTache.classList.add("fas" , "fa-plus");
    
    let descTache = document.createElement("p");
    descTache.classList.add("desc_tache");


    li.appendChild(completedIcone);
    li.appendChild(p);
    li.appendChild(addTache);
    div.appendChild(li);
    div.appendChild(descTache);

    parent.appendChild(div);

}


// Show Aside 
let showAside = document.querySelectorAll(".showAside");
let Aside = document.querySelector(".app aside");
showAside.forEach(btn => [
    btn.addEventListener('click' , () => {
        Aside.classList.toggle("hideAndShow");
    })
])