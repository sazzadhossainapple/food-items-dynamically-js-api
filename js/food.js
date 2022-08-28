const loadFood = async (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayFood(data.meals);
  } catch (error) {
    console.log(error);
  }
};

const displayFood = (foods) => {
  const foodContainer = document.getElementById("food-container");

  foodContainer.textContent = "";

  foods.forEach((food) => {
    // console.log(food);

    const foodDiv = document.createElement("div");
    foodDiv.classList.add("col");
    foodDiv.innerHTML = `
         <div class="card h-100">
              <img src="${food.strMealThumb}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${food.strMeal}</h5>
                <p class="card-text">${food.strInstructions.slice(
                  0,
                  200
                )}...</p>
                <button onclick="loadFoodDetails(${
                  food.idMeal
                })" type="button" class="btn  btn-food rounded-0 py-2 px-4 rounded-2 btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Details
                 </button>
                
              </div>
            </div>
    `;
    foodContainer.appendChild(foodDiv);
  });
};

const searchFood = () => {
  const searchField = document.getElementById("food-field");
  const searchText = searchField.value;
  loadFood(searchText);
  searchField.value = "";
};

const loadFoodDetails = async (idFood) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayFoodDetail(data.meals[0]);
  } catch (error) {
    console.log(error);
  }
};

const displayFoodDetail = (idFood) => {
  console.log(idFood);

  const detailContainer = document.getElementById("food-detail");

  detailContainer.textContent = "";
  const mealDiv = document.createElement("div");
  mealDiv.classList.add("card");
  mealDiv.innerHTML = `
    <img src="${idFood.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h3 class="card-title">${idFood.strMeal}</h3>
      <div class="d-flex justify-content-between my-4">
        <h5>Location: <span class="fs-6 fw-normal">${idFood.strArea}</span></h5>
        <h5>Category: <span class="fs-6 fw-normal">${idFood.strCategory}</span></h5>
      </div>
      <p class="card-text">${idFood.strInstructions}</p>
    </div>
    `;
  detailContainer.appendChild(mealDiv);
};

loadFood("");
