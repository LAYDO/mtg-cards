async function getCard() {
    var results = document.getElementById("results");
    if (results.hasChildNodes()) {
        results.innerHTML = "";
    }
    let name = document.getElementById('cardName').value.trim();
    fetch('card?name=' + name)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach(card => {
                setCard(card);
            })
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });    
}

async function getSet() {
    var results = document.getElementById("results");
    if (results.hasChildNodes()) {
        results.innerHTML = "";
    }
    let code = document.getElementById('code').value.trim();
    fetch('set?code=' + code)
        .then(response => response.json())
        .then(data => {
            data.forEach(card => {
                setCard(card);
            });
        });    
}

function setCard(card) {
    var cardResult = new MTGCard(card);
    var mtgCard = document.createElement("div");
    mtgCard.id = cardResult.id;
    mtgCard.className = "card";
    if (cardResult.imgUrl != null) {
        mtgCard.style.backgroundImage = `url('${cardResult.imgUrl}')`;
        mtgCard.style.backgroundSize = `100% 100%`;
    } else {
        return;
        // formatCard(cardResult, mtgCard);
    }
    document.getElementById("results").append(mtgCard);
}

function formatCard(data, cardDiv) {
    // Main background - black
    cardDiv.style.backgroundColor = "black";
    // Card background color
    var colorBackground = document.createElement("div");
    colorBackground.className = "color-background";
    colorBackground.style.backgroundColor = data.colorId;
    // Title bar
    var titleBar = document.createElement("div");
    titleBar.className = "title-bar";
    titleBar.style.border = `0.125rem solid ${data.colorId}`;
    // Create title & append
    var title = document.createElement("div");
    title.className = "title";
    title.innerText = data.name;
    titleBar.append(title);
    // Create mana cost & append
    var manaCost = document.createElement("div");
    manaCost.className = "mana-cost";
    manaCost.innerText = data.manaCost;
    titleBar.append(manaCost);

    colorBackground.append(titleBar);
    cardDiv.append(colorBackground);
}

class MTGCard {
    constructor(_card) {
        this.id = _card.id;
        this.name = _card.name;
        this.imgUrl = _card.imgUrl;
        this.colorId = _card.colors;
    }
}