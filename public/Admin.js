
import postData from "./requests.js";

//computador
const botoncrearcomputador = document.getElementById('crearComputador')
const codigoAula = document.getElementById('codigoAula')
const CPU = document.getElementById('tipoCPU')
const GPU = document.getElementById('GPU')
const RAM = document.getElementById('GBRAM')
const idComputador = document.getElementById('idComputador')


//aula
const crearAula = document.getElementById('crearAula')
const codigo = document.getElementById('codigoCrearAula')
const cupoMaximo = document.getElementById('cupoMaximo')
const idAsistente = document.getElementById('idAsistente')

//Asistente Tecnico
const crearAsistenteTecnico = document.getElementById('crearAsistenteTecnico')
const asistente = document.getElementById('asistente')
const nombreAsistente = document.getElementById('nombreAsistente')
const correoAsistente = document.getElementById('correoAsistente')
const celularAsistente = document.getElementById('celularAsistente')

botoncrearcomputador.addEventListener('click', async (event) => {
    event.preventDefault();
    const respuesta = await postData('/crearComputador', {
        CPU: CPU.value,
        GPU: GPU.value,
        RAM: RAM.value,
        aula: codigoAula.value,
        id : idComputador.value
    })
    console.log(respuesta)
    CPU.value = ""
    GPU.value = ""
    RAM.value = ""
    codigoAula.value = ""
})

crearAula.addEventListener('click', async (event) => {
    event.preventDefault();
    const respuesta = await postData('/crearAula', {
        aula: codigo.value,
        idAsistente: idAsistente.value,
        cupoMaximo: cupoMaximo.value
    })
    console.log(respuesta)
    codigo.value = ""
    idAsistente.value = ""
    cupoMaximo.value = ""
})

crearAsistenteTecnico.addEventListener('click', async (event) => {
    event.preventDefault();
    const respuesta = await postData('/crearAsistenteTecnico', {
        nombre: nombreAsistente.value,
        idAsistente: asistente.value,
        correo: correoAsistente.value,
        celular: celularAsistente.value
    })

    nombreAsistente.value = ""
    asistente.value = ""
    correoAsistente.value = ""
    celularAsistente.value = ""
})
