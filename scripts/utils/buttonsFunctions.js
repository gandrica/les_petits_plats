//Functions utilisées par les buttons

//Rend visible ou invisible le button qui supprime le texte du searchInput si searchInput.value.length < 3
export function deleteTextButtonAppearance(element,searchInput){
    if(searchInput.value.length > 2) {
        element.style.visibility = "visible";
        element.style.zIndex = "3";
    }else {
        element.style.visibility = "hidden";
        element.style.zIndex = "1";
    }
}