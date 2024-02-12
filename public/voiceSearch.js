export function voiceSearch(searchButton, voiceSearchButton, closeVoiceSearch, searchInput) {
    
    let recognition = new webkitSpeechRecognition();
    let selectedCity = searchInput.value
    
    recognition.onstart = () => {
        
        searchInput.value = "Ouvindo..."
        voiceSearchButton.style.display = "none" 
        searchButton.style.display = "none"
        closeVoiceSearch.style.display = "block"

        
        closeVoiceSearch.onclick = () => {
            
            recognition.abort();
            searchInput.value = selectedCity
            voiceSearchButton.style.display = ""
            searchButton.style.display = ""
            closeVoiceSearch.style.display = "none"
        }
    }

    recognition.onresult = (event) => {

        let transcript = event.results[0][0].transcript;
        searchInput.value = transcript
        voiceSearchButton.style.display = ""
        searchButton.style.display = ""
        closeVoiceSearch.style.display = "none"

        searchButton.click()    
    }
    
    recognition.onError = (event) => console.error(`Erro detectado: ${event.message}`)  

    recognition.start();
}