// Lấy phần tử div chứa danh sách sản phẩm
const productsContainer = document.querySelector('.products');

// Hàm hiển thị danh sách sản phẩm với thông tin chi tiết
function displayProducts(products, category = null) {
  productsContainer.innerHTML = ''; // Xóa nội dung hiện tại của container

  // Lọc sản phẩm theo danh mục
  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  // Tạo phần tử HTML cho mỗi sản phẩm
  filteredProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('card');

    productElement.innerHTML = `
      <div class="card_top">
        <img src="${product.img}" alt="${product.name}" class="card_img" onclick="window.location.href='detail.html?masp=${product.masp}'">
      </div>
      <div class="card_body">
        <h3 class="card_title" onclick="window.location.href='detail.html?masp=${product.masp}'">${product.name}</h3>
        <p class="card_price">${product.price}</p>
        <p class="card_desc">Quantity: ${product.quant}</p>
        <button class="card_btn" id="${product.masp}" data-product-id="${product.masp}" onclick="addToCart('${product.masp}')">Add to Cart</button>
        <button class="wishlist_btn" data-product-id="${product.masp}" onclick="addToWishlist('${product.masp}')">
          <i class="fas fa-heart heart_icon"></i>
        </button>
      </div>
    `;

    productsContainer.appendChild(productElement);
  });
}

// Lấy danh sách sản phẩm từ localStorage
const products = JSON.parse(localStorage.getItem('list_products')) || [];

// Gọi hàm hiển thị tất cả sản phẩm ban đầu
displayProducts(products);

// Lấy các phần tử danh mục (category)
const laptopCategory = document.querySelector('.category:nth-child(1)');
const mouseCategory = document.querySelector('.category:nth-child(2)');
const keyboardCategory = document.querySelector('.category:nth-child(3)');

// Thêm sự kiện click cho các danh mục
laptopCategory.addEventListener('click', () => displayProducts(products, 'laptop'));
mouseCategory.addEventListener('click', () => displayProducts(products, 'mouse'));
keyboardCategory.addEventListener('click', () => displayProducts(products, 'keyboard'));


// Hàm sắp xếp sản phẩm theo giá
function sortProductsByPrice(order) {
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9]+/g, "").replace('.', ''));
    const priceB = parseFloat(b.price.replace(/[^0-9]+/g, "").replace('.', ''));
    return order === 'ascending' ? priceA - priceB : priceB - priceA;
  });
  // b1 lấy 10 sản phẩm đầu tiên trong sortedProducts lưu ra một mảng mới
  // 1.1 khai bao một mảng mới chứa 10  phần tử của mảng sortProduct
  // 1.2 sử dụng vòng lặp chạy từ 1 đến 10 trong mảng sortProduct lưu vào mảng mới
  // b2 truyền mảng mới sang function displayProducts hiển thị
  displayProducts(sortedProducts);
}
// Gọi hàm sắp xếp và hiển thị sản phẩm theo giá tăng dần
sortProductsByPrice('ascending');
