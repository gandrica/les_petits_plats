export function deleteTextButtonAppearance(element,searchInput){
    if(searchInput.value.length > 2) {
        element.style.visibility = "visible";
        element.style.zIndex = "3";
    }else {
        element.style.visibility = "hidden";
        element.style.zIndex = "1";
    }
}