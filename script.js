const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("resultsContainer");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value;
    if (searchTerm !== "") {
        fetchCocktails(searchTerm);
    }
    
});

async function fetchCocktails(searchTerm) {
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
   
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayResults(data.drinks);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayResults(cocktails) {
    resultsContainer.innerHTML = "";

    cocktails.forEach(cocktail => {
        const cocktailBox = document.createElement("div");
        cocktailBox.classList.add("cocktail-box");
        
cocktailBox.innerHTML = `
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}"  width="400px">
            <p>${cocktail.strDrink}</p>
        `;

        cocktailBox.addEventListener("click", () => {
            displayModal(cocktail);
        });

        resultsContainer.appendChild(cocktailBox);
    });
}

function displayModal(cocktail) {
    modalContent.innerHTML = `
        <h2>${cocktail.strDrink}</h2>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" width="300px">
        <h3>Ingredients:</h3>
        <ul>
            ${getIngredientList(cocktail).join("")}
        </ul>
        <h3>Instructions:</h3>
        <p>${cocktail.strInstructions}</p>
    `;

    modal.style.display = "block";
}

function getIngredientList(cocktail) {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];

        if (ingredient) {
            ingredients.push(`<li>${measure} ${ingredient}</li>`);
        }
    }

    return ingredients;
}

modal.addEventListener("click", () => {
    modal.style.display = "none";
});