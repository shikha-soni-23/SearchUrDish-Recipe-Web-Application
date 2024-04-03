const searchBtn = document.getElementById('search-btn');
const foodList = document.getElementById('food');
const foodDetailsContent = document.querySelector('.food-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listner
searchBtn.addEventListener('click', getFoodList);
foodList.addEventListener('click', getFoodRecipe);
recipeCloseBtn.addEventListener('click', () => {
    foodDetailsContent.parentElement.classList.remove('showRecipe');
});

//get food can be made list that matches with ingridients inputed
function getFoodList() {
    let searchInput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(food => {
                html += `
                <div class="food-item" data-id = "${food.idMeal}">
                        <div class="food-img">
                            <img src="${food.strMealThumb}" alt="food">
                        </div>
                        <div class="food-name">
                            <h3>${food.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                </div>
                `;          
            });
            foodList.classList.remove('notFound')
        } else{
            html = "Sorry, we didn't find any meal!";
            foodList.classList.add('notFound');
        }
        foodList.innerHTML = html;
    });
}

//for recipe
function getFoodRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => foodRecipeModal(data.meals));
    }
}

function foodRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruction">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-food-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;
    foodDetailsContent.innerHTML = html;
    foodDetailsContent.parentElement.classList.add('showRecipe');

}