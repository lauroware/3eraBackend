const socketClient = io()

const userName = document.getElementById("userName")
const form = document.getElementById("form")
const message = document.getElementById("message")
const chat = document.getElementById("chat")

let userN = null

if(userN == null){
    Swal.fire({
        title: "Bienvenido",
        text: "Ingresa tu usuario",
        input: "text",
        inputValidator: (value)=>{
            if(!value){
                return "Necesitas ingresar un usuario"
            }
        },})
    .then(username=>{
        userN = username.value
        userName.innerText = userN
        socketClient.emit("newUser",userN)
    })
}


socketClient.on("chat", messages=>{
    const chatRender = messages.map(el=>{
        return `<p><strong>${el.user}:</strong>${el.message}</p>`
    }).join (" ")
    chat.innerHTML = chatRender
})

form.onsubmit = (e) =>{
    e.preventDefault()
    const info = {
        user: userN,
        message: message.value
    }
    socketClient.emit("message", info)
    message.value = ""
}