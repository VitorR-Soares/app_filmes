// 1) Funcionalidade de Exibir filmes em Alta no catálogo
const conteudoLista = document.getElementById("conteudoLista");
const endpointTop = "https://api.themoviedb.org/3/movie/now_playing?api_key=c71df1778169113250156fbfd84adb4b&language=pt-br"
fetch(endpointTop)
    .then(res => res.json())
    .then(res => {

        console.log(res)
        const emCartaz = res.results.slice(0, 10)
        emCartaz.map((el, i) => {

            // Criação dos elementos dos Filmes de Top 10
            const menuItem = document.createElement("div")
            menuItem.classList.add("itemCatalogo")
            const divPoster = document.createElement("div")
            divPoster.classList.add("posterItem")
            const poster = document.createElement("img")
            poster.classList.add("posterItemAdapta")
            const divInfos = document.createElement("div")
            divInfos.classList.add("infoItem")
            const tituloItem = document.createElement("h1")
            const detalheInfo = document.createElement("div")
            detalheInfo.classList.add("infoPrincipalItem")
            const dataLanc = document.createElement("div")
            const nota = document.createElement("div")
            const sinopseContainer = document.createElement("div")
            sinopseContainer.classList.add("sinopseItem")
            const btnAddFav = document.createElement("button")
            btnAddFav.classList.add("btnAddFav")
            btnAddFav.setAttribute("title", "Adicionar aos 'Favoritos'")
            const btnAddAss = document.createElement("button")
            btnAddAss.setAttribute("title", "Adicionar ao 'Quero Assistir'")
            // 6) Funcionalidade botões "Quero Assitir"
            /*
            - Acessar o título original do filme
            - Enviar filme para Banco de Dados
            */
            btnAddAss.addEventListener("click", () => {
                const filmeNovo = el.original_title
                const novoFav = {
                    "filmeFav": filmeNovo
                }
                const cabecalhoAssitir = {
                    method: "POST",
                    body: JSON.stringify(novoFav)
                }
                const endpointPostAssitir = "http://127.0.0.1:1880/queroAssitir";
                fetch(endpointPostAssitir, cabecalhoAssitir)
                    .then(res => {
                        if (res.status == 200) {
                            console.log(`Adcionado ao Quero Assitir`)
                        } else {
                            console.log("Erro ao acessar servidor")
                        }
                    })
            })
            btnAddAss.classList.add("btnAddAss")
            const imgOlho = document.createElement("img")
            imgOlho.setAttribute("src", "assets/assistir.svg")

            // Adição dos elementos na página
            conteudoLista.appendChild(menuItem)
            menuItem.appendChild(divPoster)
            divPoster.appendChild(poster)
            menuItem.appendChild(divInfos)
            menuItem.appendChild(btnAddFav)
            menuItem.appendChild(btnAddAss)
            divInfos.appendChild(tituloItem)
            divInfos.appendChild(detalheInfo)
            detalheInfo.appendChild(dataLanc)
            detalheInfo.appendChild(nota)
            divInfos.appendChild(sinopseContainer)
            btnAddAss.appendChild(imgOlho)

            // Captura dos dados necessários na api
            const posterPath = `https://image.tmdb.org/t/p/w500/${el.poster_path}`
            const titulo = el.title
            const data = el.release_date
            const notaMedia = el.vote_average
            const sinopse = el.overview

            // Exibição das informações na tela
            poster.setAttribute("src", posterPath)
            tituloItem.innerHTML = titulo
            dataLanc.innerHTML = data
            nota.innerHTML = notaMedia
            sinopseContainer.innerHTML = sinopse
            btnAddFav.innerHTML = "+"
        })
    })

// 2) Funcionalidade de Busca
const btnPesquisa = document.getElementById("btnPesquisa")
const txtPesquisa = document.getElementById("txtPesquisa")
btnPesquisa.addEventListener("click", () => {
    const valorPesquisa = txtPesquisa.value
    if (valorPesquisa == "") {
        alert("Insira um valor para pesquisar")
    } else {
        const endpointBusca = `https://api.themoviedb.org/3/search/movie?query=${valorPesquisa}&api_key=c71df1778169113250156fbfd84adb4b&language=pt-br`
        fetch(endpointBusca)
            .then(res => res.json())
            .then(res => {
                // Removendo itens da lista do Top 10
                const conteudo = document.querySelector("#conteudoLista")
                const itens = [...document.querySelectorAll(".itemCatalogo")]
                console.log(itens)
                itens.map((el, i) => {
                    conteudo.removeChild(el)
                })
                // Adição dos elementos da busca
                const resultadoBusca = res.results.slice(0, 10)
                resultadoBusca.map((el, i) => {
                    // Criação dos elementos dos Filmes de Top 10
                    const menuItem = document.createElement("div")
                    menuItem.classList.add("itemCatalogo")
                    const divPoster = document.createElement("div")
                    divPoster.classList.add("posterItem")
                    const poster = document.createElement("img")
                    poster.classList.add("posterItemAdapta")
                    poster.setAttribute("title", "Adicionar ao Quero Assistir")
                    const divInfos = document.createElement("div")
                    divInfos.classList.add("infoItem")
                    const tituloItem = document.createElement("div")
                    tituloItem.classList.add("tituloItem")
                    const detalheInfo = document.createElement("div")
                    detalheInfo.classList.add("infoPrincipalItem")
                    const dataLanc = document.createElement("div")
                    const nota = document.createElement("div")
                    const sinopseContainer = document.createElement("div")
                    sinopseContainer.classList.add("sinopseItem")
                    const btnAddFav = document.createElement("button")
                    btnAddFav.classList.add("btnAddFav")
                    btnAddFav.setAttribute("title", "Adicionar aos Favoritos")
                    const btnAddAss = document.createElement("button")
                    btnAddAss.classList.add("btnAddAss")
                    btnAddAss.setAttribute("title", "Adicionar ao Quero Assistir")
                    btnAddAss.addEventListener("click", () => {
                        const filmeNovo = el.original_title
                        const novoFav = {
                            "filmeFav": filmeNovo
                        }
                        const cabecalhoAssitir = {
                            method: "POST",
                            body: JSON.stringify(novoFav)
                        }
                        const endpointPostAssitir = "http://127.0.0.1:1880/queroAssitir";
                        fetch(endpointPostAssitir, cabecalhoAssitir)
                            .then(res => {
                                if (res.status == 200) {
                                    console.log(`Adcionado ao Quero Assitir`)
                                } else {
                                    console.log("Erro ao acessar servidor")
                                }
                            })
                    })
                    const imgOlho = document.createElement("img")
                    imgOlho.setAttribute("src", "assets/assistir.svg")

                    // Adição dos elementos na página
                    conteudo.appendChild(menuItem)
                    menuItem.appendChild(divPoster)
                    divPoster.appendChild(poster)
                    menuItem.appendChild(divInfos)
                    menuItem.appendChild(btnAddFav)
                    menuItem.appendChild(btnAddAss)
                    divInfos.appendChild(tituloItem)
                    divInfos.appendChild(detalheInfo)
                    detalheInfo.appendChild(dataLanc)
                    detalheInfo.appendChild(nota)
                    divInfos.appendChild(sinopseContainer)
                    btnAddAss.appendChild(imgOlho)

                    // Captura dos dados necessários na api
                    const posterPath = `https://image.tmdb.org/t/p/w500/${el.poster_path}`
                    const titulo = el.title
                    const data = el.release_date
                    const notaMedia = el.vote_average
                    const sinopse = el.overview

                    // Exibição das informações na tela
                    poster.setAttribute("src", posterPath)
                    tituloItem.innerHTML = titulo
                    dataLanc.innerHTML = data
                    nota.innerHTML = notaMedia
                    sinopseContainer.innerHTML = sinopse
                    btnAddFav.innerHTML = "+"
                })
            })
    }
    txtPesquisa.value = ""
})

// 3) Acessar página 'Quero Assistir'
const btnAss = document.querySelector(".btnAss")
btnAss.addEventListener("click", () => {
    console.log('clique')
    window.location = "assistir.html"
})
// 4) Acessar página 'Favoritos'
const btnFav = document.querySelector(".btnFav")
btnFav.addEventListener("click", () => {
    window.location = "favoritos.html"
})
// 5) Recarregar página
const btnIndex = document.querySelector("#logo")
btnIndex.addEventListener("click", () => {
    window.location = "index.html"
})

