// load categories js..

const loadCategories = () => {
  fetch ("https://openapi.programming-hero.com/api/categories")
  .then(res => res.json())
  .then(data => displaycategories(data.categories));
 
}

const Removeactiveclass = () => {
 const Removebtn = document.querySelectorAll(".removeactive")
 Removebtn.forEach(btn => {
btn.classList.remove('Active')
 })
}

const displaycategories =(categoris) => {
 const categoriesEL = document.getElementById("Categories-container")
 categoriesEL.innerHTML = ""
  categoris.forEach(categori =>{
  const div = document.createElement('div')
   div.innerHTML = `  
       <button id="Active-button-${categori.id}" onclick="loadcategorisplant(${categori.id})" class="mb-2 removeactive">${categori.category_name}</button>
   `
      categoriesEL.appendChild(div)
  }) 
}

 const loadcategorisplant= (id) => {
  managespinner(true)
 fetch(`https://openapi.programming-hero.com/api/category/${id}`)
 .then(res => res.json())
 .then(json =>{
    Removeactiveclass();
  const Activebutton =document.getElementById(`Active-button-${id}`)
  Activebutton.classList.add("Active")
    displaycategorisplant(json.plants)
 }
 ) }

 const displaycategorisplant = (plants) => {
  const AllPlantsEl = document.getElementById("all-plants")
    AllPlantsEl.innerHTML = "";
 plants.forEach(plant => {
 const newdiv = document.createElement("div")
  newdiv.innerHTML = `
   <div class=" bg-base-100 w-56  h-auto shadow-sm rounded-xl ">
  <figure>
    <img
      src="${plant.image}" class="w-full h-42 object-cover rounded-t-xl" />
  </figure>
  <div class=" space-y-3 p-3 ">
    <h3 class="font-bold  ">
     ${plant.name}
    </h3>
    <p class="font-normal text-[12px] text-[#1F2937] ">${plant.description}</p>
    <div class="flex justify-between m">
      <div class="badge bg-[#DCFCE7] text-[#15803D]">${plant.category}</div>
      <div class=" badge-outline">${plant.price}</div>
    </div>
    <div><button class="p-1 text-white bg-[#15803D] w-full rounded-2xl">Add to Cart</button></div>
  </div>
       </div>
  `
    AllPlantsEl.appendChild(newdiv);
    managespinner(false);
 })
 }

// all plants section js
const Allplants = () => {
  managespinner(true);
 fetch('https://openapi.programming-hero.com/api/plants')
 .then(res => res.json())
 .then(data => displayAllplants(data.plants)
 )
}
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
// },

  const managespinner = (status) => {
    if(status == true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("all-plants").classList.add("hidden")
    }else{
        document.getElementById("all-plants").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
    }
  }

const PlantsDetails =(id) => {
 fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
 .then(res => res.json())
 .then(data => DisplayPlantsDetails(data.plants)
 )
}

 const DisplayPlantsDetails = (plants) => {
 const modaldetails = document.getElementById("modal-details")
  modaldetails.innerHTML = ` 
  <div class=" space-y-3">
        <h2 class="font-bold text-xl">${ plants.name}</h2>
        <img src="${plants.image}" class="w-full object-cover rounded-xl h-68">
        <span><span class="font-bold">Categories:</span>${plants.category}</span>
        <p class="mt-2"><span class="font-bold">Prize:</span>${plants.price}</p>
        <p><span class="font-bold">Description:</span>${plants.description}
</p>
       </div>
  `
document.getElementById("my_modal_5").showModal();
  
 }

 const displayAllplants = (plants) => {
 const AllPlantsEl = document.getElementById("all-plants")
  
 plants.forEach(plant => {
 const newdiv = document.createElement("div")
 newdiv.innerHTML =  `
   <div class=" bg-base-100 w-56  h-auto shadow-sm rounded-xl ">
  <figure>
    <img
      src="${plant.image}" class="w-full h-42 object-cover rounded-t-xl" />
  </figure>
  <div class=" space-y-3 p-3 ">
    <h3 onclick="PlantsDetails(${plant.id})" class="font-bold ">
     ${plant.name}
    </h3>
    <p class="font-normal text-[12px] text-[#1F2937] ">${plant.description}</p>
    <div class="flex justify-between m">
      <div class="badge bg-[#DCFCE7] text-[#15803D]">${plant.category}</div>
      <div class=" badge-outline">${plant.price}</div>
    </div>
    <div><button class="p-1 text-white bg-[#15803D] w-full rounded-2xl">Add to Cart</button></div>
  </div>
       </div>
 `
  AllPlantsEl.appendChild(newdiv);
  managespinner(false);
 }) 
 }


Allplants();
loadCategories();
 