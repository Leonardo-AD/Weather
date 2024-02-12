// Listening the Enter keypress to get the city on search field and call the search function
export function getEnterClick(searchInput, searchButton){

    searchInput.addEventListener("keypress", enterKey);
    
    function enterKey(event) {
        if(event.code === "Enter" || event.code === "NumpadEnter"){
            searchButton.click()
        }
    }
}