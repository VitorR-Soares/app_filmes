const divConteudo = document.querySelector("#conteudoQueroAssitir")
const btnFav = document.querySelector(".btnFav")
btnFav.addEventListener("click", () => {
    window.location = "favoritos.html"
})
const btnIndex = document.querySelector("#logo")
btnIndex.addEventListener("click", () => {
    window.location = "index.html"
})
const listaAssistir=()=>{
    const endpointGetAssistir = "http://127.0.0.1:1880/consultaQueroAssitir"
    fetch(endpointGetAssistir)
    .then(res=>res.json())
    .then(res=>{
        res.map((el,i)=>{
            const divCard = document.createElement("div")
            divCard.setAttribute("class","cardAssistir")



            divConteudo.appendChild(divCard)

        })
    })
}
listaAssistir()






