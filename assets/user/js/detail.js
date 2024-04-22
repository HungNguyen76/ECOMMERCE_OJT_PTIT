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
    const productFullDetails = document.getElementById('productFullDetails');
    const productInStock = document.getElementById('productInStock');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const addToWishlistBtn = document.getElementById('addToWishlistBtn');

    productImage.src = product.img;
    productName.textContent = product.name;
    productDetails.textContent = product.des;
    productInStock.textContent = `Số lượng tồn kho: ${product.quant}`;
    productDetailModal.style.display = 'block';

    // Xử lý sự kiện click cho nút "Thêm vào giỏ hàng"
    addToCartBtn.addEventListener('click', function() {
      console.log(`Thêm sản phẩm ${product.name} vào giỏ hàng`);
    });

    // Xử lý sự kiện click cho nút "Yêu thích"
    addToWishlistBtn.addEventListener('click', function() {
      console.log(`Thêm sản phẩm ${product.name} vào danh sách yêu thích`);
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