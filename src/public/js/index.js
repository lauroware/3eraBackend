const socketClient = io()

const form = document.getElementById("form")
const pid = document.getElementById("pid")


form.onsubmit = (e)=>{
    e.preventDefault()
    let prod = {
        id:pid.innerHTML
    }
    socketClient.emit("prodToCart", prod)
}