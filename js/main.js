const cartCounter = document.querySelector("#cart-counter");
const displayBox = document.getElementById("items-row");

const randomId = Math.floor(Math.random() * (10000 + 1));

const cart = [];
const cartCount = "";
const quantity = 1;

const cartBox = document.getElementById('cart-box')

// Function to calculate and update the total price
function updateTotalPrice() {
    
const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalContainer = document.getElementById('total-price');
    totalContainer.textContent = `Total: $${totalPrice}`;
    const modalTotalContainer = document.getElementById('modal-total-price');
    modalTotalContainer.textContent = `Total: $${totalPrice}`;
  }
// Add to cart Function

function addToCart(item, quantity) {
  const existingItem = cart.find((cartitem) => cartitem.id === item.id);
  if (!existingItem) {
    cart.push({...item, quantity});
    updateCartCounter();
    updateTotalPrice()
  } else {
    alert("item already exist!");
  }
  renderCart();
}

// To get the number of items in the cart and display it.
if (cartCount > 0) {
  cartCounter.innerHTML = `(${cartCount})`;
} else {
  cartCounter.innerHTML = `(0)`;
}
console.log(cartCount);

// Array of items
const foodData = [
  {
    id: 1,
    src: "assets/chinesemeal.jpg",
    name: "beer",
    price: 20,
  },
  {
    id: 2,
    src: "assets/icecream.jpg",
    name: "beer",
    price: 500,
  },
  {
    id: 3,
    src: "assets/cocktail.jpg",
    name: "beer",
    price: 20,
  },
  {
    id: 4,
    src: "assets/friedrice.jpg",
    name: "beer",
    price: 20,
  },
  {
    id: 5,
    src: "assets/pizza.jpg",
    name: "beer",
    price: 20,
  },
  {
    id: 6,
    src: "assets/plantainDish.jpg",
    name: "beer",
    price: 20,
  },
  {
    id: 7,
    src: "assets/burger.jpg",
    name: "beer",
    price: 20,
  },
];
// display Item function
function displayItems(foodDatas) {
  foodDatas.forEach((item) => {
    const colBox = document.createElement("div");
    colBox.classList.add("col-box");

    const addBtn = document.createElement("button");
    addBtn.classList.add("icon");
    addBtn.textContent = "Add to Cart";
    // addBtn.setAttribute("data-hover-text", "Click to add to cart");
    addBtn.onclick = () => addToCart(item, quantity);

    const foodImage = document.createElement("img");
    foodImage.src = item.src;
    foodImage.classList.add('food-img')
    foodImage.alt = item.name;

    const foodTitle = document.createElement("p");
    foodTitle.classList.add("title");
    foodTitle.textContent = `${item.name}`;
    // foodTitle.appendChild(boldTitle);

    const boldTitle = document.createElement("p");
    boldTitle.classList.add("bold-title");
    boldTitle.textContent = `${item.name}`;
    const foodPrice = document.createElement("p");
    foodPrice.classList.add("foodprice");
    foodPrice.textContent = `$${item.price}.00`;
    

    colBox.id = `${item - item.id}`;
    colBox.appendChild(foodImage);
    colBox.appendChild(addBtn);
    colBox.appendChild(foodTitle);
    colBox.appendChild(boldTitle);
    colBox.appendChild(foodPrice);

    displayBox.appendChild(colBox);
  });
}

// function to render the cart

const cartContainer = document.getElementById('list-det');

function renderCart() {
    cartContainer.innerHTML = '';
  cart.forEach((cartItem) => {

    // create a li element 
   const cartList = document.createElement('li');
   cartList.classList.add('cart-list');

    // create a div Element 
    const listContent = document.createElement('div'); 
    listContent.id = `${cartItem.id }`;
    listContent.classList.add('list-content');

    // create a head title 
    const itemHead = document.createElement('h3');
        itemHead.classList.add('item-title');
        itemHead.textContent = `${cartItem.name}`;

    // create p element
    const cartDetails = document.createElement('p');
    cartDetails.classList.add('cart-details');
    cartDetails.textContent = `${cartItem.price}`;

    const cartSpan = document.createElement('span');
    cartSpan.textContent = `${cartItem.price}`;

    
    listContent.appendChild(itemHead);
    listContent.appendChild(cartDetails);
    // cartDetails.appendChild(cartSpan);


    // create the remove button 
    const actionBtn = document.createElement('button')
    actionBtn.classList.add('action-btn');
    actionBtn.textContent= 'x'
    actionBtn.onclick = ()=> removeFromCart(cartItem.id);


    cartList.appendChild(listContent);
    cartList.appendChild(actionBtn);
    
    cartContainer.appendChild(cartList);
  });
}

// function to remove item from cart

function removeFromCart(item) {
 cart.filter((cartItem )=> cartItem.id != item);
  renderCart();
  updateCartCounter();
  updateTotalPrice();

}
// Function to update the cart counter;
function updateCartCounter() {
  cartCounter.textContent = `(${cart.length})`;
}

displayItems(foodData);

if(cart.length === 0 ){
    renderCart();
   
}else{
 
// const emptycartMessage = document.createElement('p');
    // emptycartMessage.textContent = 'Cart is Empty!';
    // emptycartMessage.classList.add('empty-cart');


    // cartBox.appendChild(emptycartMessage);
    cartBox.textContent = 'Empty Cart !'
    cartBox.style.textAlign= 'center';

}


const modalBox = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
function  renderOnModal(){


modalBody.innerHTML='';
    cart.forEach((cartItem) => {
    const modalList = document.createElement('li');
    modalList.classList.add('list-items');
    

    const modalImageContainer = document.createElement('div')
    modalImageContainer.classList.add('item-img');


    const modalImage = document.createElement('img');
    modalImage.src =`${cartItem.src}`;
    modalImage.attr = `${cartItem.name}`;
    modalImage.classList.add('modal-image');


    const ModalDetails = document.createElement('div');
    ModalDetails.classList.add('items-details');

    const modalHead = document.createElement('h4');
    modalHead.classList.add('modal-head');
    modalHead.textContent= `${cartItem.name}`

    const modalQuantity = document.createElement('span');
    modalQuantity.textContent=`${cartItem.quantity}`;
    modalQuantity.classList.add('modal-quantity');


    const modalPara = document.createElement('p');
    modalPara.classList.add('modal-para');
    modalPara.textContent= `${cartItem.price} *`


modalImageContainer.appendChild(modalImage);
    ModalDetails.appendChild(modalHead);
    ModalDetails.appendChild(modalPara);
    modalList.appendChild(modalImageContainer);
    modalList.appendChild(ModalDetails);

    modalPara.appendChild(modalQuantity);
    modalBody.appendChild(modalList);


    });
    
}

function handleConfirmOrder(){
        modalBox.style.opacity = 1;
        renderOnModal()
}