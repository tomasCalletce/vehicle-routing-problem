
import postData from './requests.js'


const loginButon = document.getElementById('botonLogin')
const username = document.getElementById('loginUsername')
const password = document.getElementById('loginPassword')
const registro = document.getElementById('botonIrRegistro')
loginButon.addEventListener('click', async (event) => {
    event.preventDefault();
    const data =  postData('/auth', { username: username.value, password: password.value })
  
    data.then(info => {
        if(info == true){
            location.href = "/admin"
        }else if(info == false){
            location.href = "/Main"
        }else{
            location.href = "/registro"
        }
    }).catch((err)=>{
        console.log(err)
    });

   
    username.value = ""
    password.value = ""
})
registro.onclick = () => {
    location.href = "/registro"
}

