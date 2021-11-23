import postData from './requests.js'
console.log('dentro')
const confirmarPassword = document.getElementById('confirmarPasswordRegistro')
const password = document.getElementById('passwordRegistro')
const codigo = document.getElementById('codigoRegistro')
const email = document.getElementById('emailRegistro')
const botonRegistro = document.getElementById('botonRegistro')
const ingreso = document.getElementById('botonIrIngreso')
const nombre = document.getElementById('nombre');


botonRegistro.addEventListener('click', async (event) => {
    event.preventDefault()
    const data = await postData('/registrate', {
        email: email.value,
        codigo: codigo.value,
        password: password.value,
        confirmarPassword: confirmarPassword.value,
        nombre : nombre.value
    })
    console.log(data)
})

ingreso.onclick = () => {
    location.href = "http://localhost:3000/login"
}
