
import postData from "./requests.js";
const solicitudText = document.getElementById('solicitudTexto')
const aula = document.getElementById('seleccionarAula')
const computador = document.getElementById('seleccionarComputador')
const botonEnviar = document.getElementById('botonEnviar')
const seleccionar = document.getElementById('seleccionar')

botonEnviar.addEventListener('click', async (event) => {
    event.preventDefault();
    const info = await postData('/solicitar', {
        idComputador: computador.value,
        aula: aula.value,
        solicitud: solicitudText.value,
    })
    console.log(info)

    aula.value = ""
    solicitudText.value = ""
    computador.value = ""

})

aula.addEventListener('change',(eve)=>{
    eve.preventDefault()
    computador.innerHTML = ``
})

seleccionar.addEventListener('click', async (event) => {

   
    event.preventDefault();
    const computadores = await postData('/getComputadores', {
        aula: aula.value
    })
    for (var i = 0; i < computadores.length; i++) {
        var opt = document.createElement('option');
        opt.value = computadores[i];
        opt.innerHTML = computadores[i];
        computador.appendChild(opt);
    }

})