import postData from "./requests.js"

// import postData from "./requests"
const aula = document.getElementById('aulaDropDown')
const seleccionar = document.getElementById('seleccionar')
const hora = document.getElementById('seleccionarHorario')
const reservar = document.getElementById('reservar')
const dropDownComputadores = document.getElementById('dropDownComputadores');

const subtitulo = document.getElementById('subtitulo');
seleccionar.addEventListener('click', async (event) => {
    
    event.preventDefault()
    if (aula.value != "" && hora.value != "") {
        console.log(aula.value)
        console.log(hora.value)

        const dispon = await postData('/getDisponibles', {
            aula: aula.value,
            hora: hora.value
        })


        for (var i = 0; i < dispon.length; i++) {
            var opt = document.createElement('option');
            opt.value = dispon[i];
            opt.innerHTML = dispon[i];
            dropDownComputadores.appendChild(opt);
        }

    } else if (aula.value == "" || hora.value == "") {
        {

        }
    }
})

aula.addEventListener('change',async (event)=>{
    event.preventDefault()
    dropDownComputadores.innerHTML = '<option></option>'
})

dropDownComputadores.addEventListener('change',async (event)=>{
    event.preventDefault()
    const SPECS = await postData('/getSPECS', { id: dropDownComputadores.value, aula : aula.value})

    const textSpecs = document.getElementById('specs')
    textSpecs.innerHTML = SPECS.text
    subtitulo.innerHTML = "computador " + dropDownComputadores.value
})

reservar.addEventListener('click', async (event) => {
    event.preventDefault()

    const info =  postData('/reservar', {
        id: dropDownComputadores.value,
        aula: aula.value,
        hora: hora.value

    })

    const textSpecs = document.getElementById('specs')
    dropDownComputadores.innerHTML = '<option></option>'
    aula.value = '';
    hora.value = '';
    textSpecs.innerHTML = '';
    subtitulo.innerHTML = '';

})

hora.addEventListener('change',async (event)=>{
    event.preventDefault()
    dropDownComputadores.innerHTML = '<option></option>'
})