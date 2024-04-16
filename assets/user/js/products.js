let list_products = [
  {
      masp: "mac0",
      name: "Macbook Air M1",
      img: "./image/items/Macbook-Air-M1_silver.png",
      price: "$1000",
      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
      quant: "0"
   
  },

  {
      masp: "cesar0",
      name: "CESAR DOG FOOD",
      price: "$20",
      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
      img: "./image/items/item-9.png",
      quant: "0"
  },
    
  {
      masp: "havitg92",
      name: "HAVIT HV-G92 Keyboard-Optical",
      price: "$70",
      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
      img: "./image/items/item-2.png",
      quant: "0"
  },
  {
      masp: "acer5",
      name: "Acer Nitro 5",
      price: "$100",
      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
      img: "./image/items/item-11.png",
      quant: "0"
  },
  {
      masp: "mini0",
      name: "Mini Merc",
      price: "$90",
      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
      img: "./image/items/item-12.png",
      quant: "0"
  },
  {
      masp: "football0",
      name: "Footbal shoes",
      price: "$40",
      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
      img: "./image/items/item-13.png",
      quant: "0"
  },
  {
      masp: "havitg92",
      name: "HAVIT HV-G92 Gamepad",
      price: "$110",
      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
      img: "./image/items/item-14.png",
      quant: "0"
  },
  {
      masp: "green0",
      name: "Green Bomber Jacket",
      price: "$30",
      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
      img: "./image/items/item-15.png",
      quant: "0"
  },
  {
      masp: "skin0",
      name: "Skincare",
      price: "$60",
      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
      img: "./image/items/item-16.png",
      quant: "0"
  }
]

window.onload = function() {
  init()
}


// Hàm khởi tạo, tất cả các trang đều cần
function init() {
  // get data from localstorage
  list_products = getListProducts() || list_products;
  setListProducts(list_products)
  renderListProducts()
}

function setListProducts(newList) {
  window.localStorage.setItem('ListProducts', JSON.stringify(newList));
}

function getListProducts() {
  return JSON.parse(window.localStorage.getItem('ListProducts'));
}

// Khởi tạo giỏ hàng
let cart = {};
// Lấy tham chiếu đến các phần tử cần thiết
const cartCountElement = document.getElementById('cart_count');
const cartMenuItemsElement = document.querySelector('.cart-menu-items');
const cartTotalElement = document.getElementById('cart-total');

function renderListProducts() {
  let result = '';
  let productIndex = 1; // initialize a variable to keep track of the product index

  for (var p of list_products) {
    result += `
      <div class="card">
        <div class="card_top">
          <img src="${p.img}" alt="" class="card_img" onclick="window.location.href='detail${productIndex}.html'">
          <div class="card_top_icons">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="card_top_icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
            </svg>
          </div>
        </div>
        <div class="card_body">
          <h3 class="card_title" onclick="window.location.href='detail${productIndex}.html'">${p.name}</h3>
          <p class="card_price">${p.price}</p>
          <p class="card_desc">${p.quant}</p>
          <button class="card_btn" id="${p.masp}" data-product-id="${p.masp}" ">Add to Cart</button>
        </div>
      </div>
    `;
    productIndex++;
  }

  document.getElementsByClassName("products")[0].innerHTML = result;
}