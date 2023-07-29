const searchBox = document.querySelector(".input-box");
const button = document.querySelector(".btn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-closeB-btn");

const fetchRecipes = async(query) =>{
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>"
    try {
    const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal=>{
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>This is <span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View recipe"
        recipeDiv.appendChild(button);
        recipeContainer.appendChild(recipeDiv);

        //Adding evenListener to recipe button
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })
       
    });} catch (error) {
        recipeContainer.innerHTML = "<h2>Recipes Not Found☹️☹️☹️...</h2>"
    }
    
} 

  // Function for fetch Ingredients and measurment

    const fetchIngredients =(meal)=>{
        let ingredientsList = "";
        for(let i=1;i<=20;i++){
            const ingredient = meal[`strIngredient${i}`];
            if(ingredient){
                const measure =meal[`strMeasure${i}`];
                ingredientsList += `<li>${measure} ${ingredient }</li>`
            }else{
                break;
            }
        }
            return ingredientsList;
    }

    const openRecipePopup = (meal)=> {
        recipeDetailsContent.innerHTML  =`
        <h2 class="recipeName">${meal.strMeal}<h2>
        <h3 >Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="instructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
        </div>
        `

         recipeDetailsContent.parentElement.style.display ="block";
    }

    // Close Recipe Pop
    recipeCloseBtn.addEventListener('click',()=>{
        recipeDetailsContent.parentElement.style.display="none";
    }) 

    

button.addEventListener('click', (e)=>{
    e.preventDefault();
    const searhInput = searchBox.value.trim();
    if(!searhInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box...</h2>`;
        return;
    }
fetchRecipes(searhInput);
   
});