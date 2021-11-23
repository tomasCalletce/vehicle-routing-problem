import postData from './requests.js'

const seleccionar = document.getElementById('seleccionarAula')
const aula = document.getElementById('aula')
const cartaTecnico = document.getElementById('cardText')
const titleAsistente = document.getElementById('nameAsistente')

seleccionar.addEventListener('click', async (event) => {
    event.preventDefault()
    const infoTecnico = await postData('/getAsistente', { aula: aula.value })
  
    titleAsistente.innerHTML = infoTecnico.Nombre;
    cartaTecnico.innerHTML = infoTecnico.text;

})