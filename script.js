const gamesList = [
    {
        title: "Tekken",
        year: 1994,
        imageUrl:
            "https://cdn.dashfight.com/bcf6a9046a9ea4c1070d4aedb2981103c978a704.png",
        id: 1,
    },
    {
        title: "Minecraft",
        year: 2009,
        imageUrl:
            "https://m.media-amazon.com/images/I/61smNbXSW1L._AC_UF1000,1000_QL80_.jpg",
        id: 2,
    },
    {
        title: "Elden Ring",
        year: 2022,
        imageUrl:
            "https://pic.clubic.com/v1/images/1934271/raw?fit=smartCrop&width=1200&height=675&hash=e7519a9577a2b7291fa26880bb22bed6740836be",
        id: 3,
    },
    {
        title: "Street Fighter V",
        year: 2015,
        imageUrl:
            "https://gaming-cdn.com/images/products/671/orig/street-fighter-v-pc-jeu-steam-cover.jpg?v=1662539255",
        id: 4,
    },
    {
        title: "Half Life 2",
        year: 2004,
        imageUrl:
            "https://gaming-cdn.com/images/products/2284/orig/half-life-2-pc-mac-game-steam-cover.jpg?v=1650555068",
        id: 5,
    },
    {
        title: "Skyrim",
        year: 2011,
        imageUrl:
            "https://gaming-cdn.com/images/products/146/orig/the-elder-scrolls-v-skyrim-pc-jeu-steam-europe-cover.jpg?v=1661270991",
        id: 6,
    },
]
function writeDOM() {
    gamesList.forEach(game=>{
        const articleContainer = document.querySelector('.row')
        articleContainer.innerHTML += `<article class="col">
                            <div class="card shadow-sm">
                                <img src="${game.imageUrl}" alt="${game.title}" class="card-img-top" />
                                <div class="card-body">
                                <h3>${game.title}</h3>
                                    <p class="card-text">${game.year}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-outline-secondary view"
                                                    data-bs-toggle="modal" data-bs-target="#modal"
                                                    data-id="${game.id}"
                                                    >View</button>
                                            <button type="button" class="btn btn-sm btn-outline-secondary edit"
                                                    data-bs-toggle="modal" data-bs-target="#modal"
                                                    data-id="${game.id}"
                                                    >Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>`
    })
}

writeDOM()

let editButtons = document.querySelectorAll(".edit")
editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        editModal(e.target.getAttribute("data-id"))
    })
})

let viewButtons = document.querySelectorAll(".view")
viewButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        viewModal(e.target.getAttribute("data-id"))
    })
})

function viewModal(gameId) {
    const result = gamesList.findIndex((game) => game.id === parseInt(gameId))
    const modalBody = `<img src="${gamesList[result].imageUrl}" alt="${gamesList[result].title}" class="img-fluid" />`
    modifyModal(gamesList[result].title, modalBody)

    document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
</form>`
}

function editModal(gameId) {
    const result = gamesList.findIndex((game) => game.id === parseInt(gameId))
    fetch("./form.html").then((data) => {
        data.text().then((form) => {
            const selectedGame = gamesList[result]
            modifyModal("Mode Edition", form)
            modifyForm({
                title: selectedGame.title,
                year: selectedGame.year,
                imageUrl: selectedGame.imageUrl,
            })
            document
                .querySelector('button[type="submit"]')
                .addEventListener("click", () => {
                    const title = document.querySelector('#gameTitle').value
                    const year = document.querySelector('#gameYear').value
                    const imageUrl = document.querySelector('#gameImageUrl').value
                    updateGames(title, year, imageUrl, gameId)
                })
        })
    })
}

function modifyModal(modalTitle, modalBody) {
    document.querySelector(".modal-title").textContent = modalTitle
    document.querySelector(".modal-body").innerHTML = modalBody
    document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
		<button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
</form>`
}

function modifyForm(gameData) {
    const form = document.querySelector("form")
    form.gameTitle.value = gameData.title
    form.gameYear.value = gameData.year
    form.gameImageUrl.value = gameData.imageUrl
}

function updateGames(title, year, imageUrl, gameId) {
    const index = gamesList.findIndex((game) => game.id === parseInt(gameId))

    gamesList[index].title = title
    gamesList[index].year = year
    gamesList[index].imageUrl = imageUrl

    document.querySelector(".row").innerHTML = ""
    writeDOM()

    editButtons = document.querySelectorAll(".edit")
    editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            editModal(e.target.getAttribute("data-id"))
        })
    })

    viewButtons = document.querySelectorAll(".view")
    viewButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            viewModal(e.target.getAttribute("data-id"))
        })
    })
}