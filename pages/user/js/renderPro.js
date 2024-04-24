window.onload = function () {
  init();
};

function init() {
  // get data from localstorage
  let listProducts = getListProducts() || list_products;
  renderListProducts(listProducts);
}

function getListProducts() {
  return JSON.parse(localStorage.getItem('list_products'));
}

function renderListProducts(listProducts) {
  let result = '';

  // Duyệt qua danh sách sản phẩm và tạo HTML
  for (let i = 0; i < listProducts.length; i++) {
    const p = listProducts[i];
    result += `
          <div class="card">
              <div class="card_top">
                  <img src="${p.img}" alt="" class="card_img" onclick="window.location.href='detail.html?masp=${p.masp}'">
              </div>
              <div class="card_body">
                  <h3 class="card_title" onclick="window.location.href='detail.html?masp=${p.masp}'">${p.name}</h3>
                  <p class="card_price">${p.price}</p>
                  <p class="card_desc">Quantity: ${p.quant}</p>
                  <button class="card_btn" id="${p.masp}" data-product-id="${p.masp}" onclick="addToCart('${p.masp}')">Add to Cart</button>
                  <button class="wishlist_btn" data-product-id="${p.masp}" onclick="addToWishlist('${p.masp}')">
                  <i class="fas fa-heart heart_icon"></i>
                  </button>
              </div>
          </div>
      `;
  }

  document.querySelector(".products").innerHTML = result;
}

