export function errorAlert(city){
  
  if(!city){ // When the text field is empty
    Swal.fire({
        title: "Não foi possível localizar",
        text: "Por favor, digite novamente.",
        icon: "error",
        background: "#E7E6FB"
      })
  }
  else{ // When the city doesn't exist
    Swal.fire({
        title: `Não foi possível localizar: ${city}`,
        text: "Não conseguimos encontrar a cidade.",
        icon: "error",
        background: "#E7E6FB"
      })
  }
}