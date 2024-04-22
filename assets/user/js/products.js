

window.onload = function() {
  init()
}


// // Hàm khởi tạo, tất cả các trang đều cần
function init() {
  // get data from localstorage
  list_products = getListProducts() || list_products;
  setListProducts(list_products)
  renderListProducts()
}

// function setListProducts(newList) {
//   window.localStorage.setItem('ListProducts', JSON.stringify(newList));
// }

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
          <p class="card_desc">Quantity: ${p.quant}</p>
          <button class="card_btn" id="${p.masp}" data-product-id="${p.masp}" ">Add to Cart</button>
        </div>
      </div>
    `;
    productIndex++;
  }

  document.getElementsByClassName("products")[0].innerHTML = result;
}