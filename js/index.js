//get monster data
pageValue = 1 //this value is how we increment the page value
function displayMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageValue.toString()}`)
    .then((response)=> response.json())
    .then((monsters) => monsters.forEach((monster) => displayMonster(monster)))
}
displayMonsters() //initializes our monsters
populateForm() //populates form

let monsterContainer = document.getElementById("monster-container")


//this is what creates and populates the divs for our monster info
function displayMonster(monster){
    let createDiv = document.createElement("div")
    let createHeader = document.createElement("h2")
    let createSubhead = document.createElement("h4")
    let createBio = document.createElement("p")
    createBio.innerText =`Bio: ${monster.description}`
    createSubhead.innerText = `Age: ${monster.age}`
    createHeader.innerText = `${monster.name}`
    monsterContainer.appendChild(createDiv)
    createDiv.append(createHeader, createSubhead, createBio)
}

let monsterForm = document.getElementById("monster-form")
monsterForm.addEventListener('submit', createNewMonster)

//gets our input data in form into form JSON accepts
function createNewMonster(e){
    e.preventDefault()
    let monsterData = {
        name:e.target.name.value,
        age:e.target.age.value,
        description:e.target.description.value,
    }
    adoptMonster(monsterData)
}

//adds our new monster to the JSON data
function adoptMonster(monster){
    fetch("http://localhost:3000/monsters",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(monster)
    })
    .then((response) => response.json())
}

function populateForm(){
    let monsterFormDiv = document.getElementById("create-monster")
    let createMonsterForm = document.createElement("form")
    let createNameInput = document.createElement("input")
    let createAgeInput = document.createElement("input")
    let createDescriptionInput = document.createElement("input")
    let createButton = document.createElement("button")
    createButton.innerText = "Create"
    createMonsterForm.setAttribute('id', 'monster-form')
    createNameInput.setAttribute('id', 'name')
    createNameInput.setAttribute('placeholder', 'name...')
    createAgeInput.setAttribute('id', 'age')
    createAgeInput.setAttribute('placeholder', 'age...')
    createDescriptionInput.setAttribute('id', 'description')
    createDescriptionInput.setAttribute('placeholder', 'description...')
    monsterFormDiv.appendChild(createMonsterForm)
    createMonsterForm.append(createNameInput, createAgeInput, createDescriptionInput, createButton)
}

document.getElementById("forward").addEventListener('click', () => {
    pageValue ++ 
    while (monsterContainer.lastElementChild){
        monsterContainer.removeChild(monsterContainer.firstChild)
    }
    displayMonsters()
})

document.getElementById("back").addEventListener('click', () => {
    if (pageValue == 1){
        alert("Aint no monsters here")
    }
    else{
        pageValue --
        while (monsterContainer.lastElementChild){
            monsterContainer.removeChild(monsterContainer.firstChild)
        }
        displayMonsters()
    }
})