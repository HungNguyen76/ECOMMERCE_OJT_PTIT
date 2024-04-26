// Lấy danh sách sản phẩm từ localStorage
const productListString = localStorage.getItem('list_products');
const productList = JSON.parse(productListString);

// Lấy mã sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('masp');

// Hàm hiển thị chi tiết sản phẩm
function showProductDetail(productId) {
  const product = productList.find(p => p.masp === productId);
  if (product) {
    const productDetailModal = document.getElementById('productDetailModal');
    const productImage = document.getElementById('productImage');
    const productName = document.getElementById('productName');
    const productDetails = document.getElementById('productDetails');
    const productPrice = document.getElementById('productPrice'); // New
    const productCode = document.getElementById('productCode'); // New
    const productInStock = document.getElementById('productInStock');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const addToWishlistBtn = document.getElementById('addToWishlistBtn');

    productImage.src = product.img;
    productName.textContent = product.name;
    productDetails.textContent = `Mô tả: ${product.des}`; // Adding "Mô tả:" before description
    productPrice.textContent = `Giá: ${product.price}`; // Displaying price
    productCode.textContent = `Mã sản phẩm: '${product.masp}'`; // Displaying product code
    productInStock.textContent = `Số lượng tồn kho: ${product.quant}`;
    productDetailModal.style.display = 'block';

    // Xử lý sự kiện click cho nút "Thêm vào giỏ hàng"
    addToCartBtn.addEventListener('click', function() {
      addToCart(product);
    });

    // Xử lý sự kiện click cho nút "Yêu thích"
    addToWishlistBtn.addEventListener('click', function() {
      addToWishlist(product);
    });
  } else {
    console.error(`Không tìm thấy sản phẩm có mã ${productId}`);
  }
}


// Gọi hàm showProductDetail khi trang được tải
window.addEventListener('DOMContentLoaded', function() {
  if (productId) {
    showProductDetail(productId);
  }
});

// Lấy các phần tử HTML cần sử dụng
const productDetailModal = document.getElementById('productDetailModal');
const closeBtn = document.querySelector('.close');

// Hàm đóng modal
function closeModal() {
  productDetailModal.style.display = 'none';
}

// Xử lý sự kiện click cho nút đóng modal
closeBtn.addEventListener('click', closeModal);

// Xử lý sự kiện click bên ngoài modal để đóng modal
window.addEventListener('click', function(event) {
  if (event.target === productDetailModal) {
    closeModal();
  }
});

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProductIndex = cart.findIndex(p => p.masp === product.masp);

  if (existingProductIndex !== -1) {
    // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
    cart[existingProductIndex].quantity += 1;
  } else {
    // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới sản phẩm với số lượng là 1
    product.quantity = 1;
cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('Thêm sản phẩm vào giỏ hàng thành công');
}

// Hàm thêm sản phẩm vào danh sách yêu thích
function addToWishlist(product) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const existingProductIndex = wishlist.findIndex(p => p.masp === product.masp);

  if (existingProductIndex === -1) {
    // Nếu sản phẩm chưa có trong danh sách yêu thích, thêm mới sản phẩm
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log('Thêm sản phẩm vào danh sách yêu thích thành công');
  } else {
    console.log('Sản phẩm đã tồn tại trong danh sách yêu thích');
  }
}




 