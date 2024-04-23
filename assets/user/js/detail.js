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
    productCode.textContent = `Mã sản phẩm: ${product.masp}`; // Displaying product code
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




 // Load existing comments from localStorage when the page loads
 document.addEventListener('DOMContentLoaded', function () {
  loadComments();
});

document.getElementById('comment-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;
  const commentContainer = document.getElementById('comment-container');
  const newComment = document.createElement('div');
  newComment.classList.add('comment');

  // Add a delete and edit button to each comment
  newComment.innerHTML = `
  <strong>${name}</strong>: ${comment}
  <button onclick="editComment(this)">Edit</button>
  <button onclick="deleteComment(this)">Delete</button>
`;

  commentContainer.appendChild(newComment);

  // Save the comment to localStorage
  saveComment(name, comment);

  // Clear the form fields
  document.getElementById('name').value = '';
  document.getElementById('comment').value = '';
});

// Function to delete a comment
function deleteComment(button) {
  // Remove the comment div
  button.parentElement.remove();
  // Remove the comment from localStorage
  removeComment(button.parentElement.querySelector('strong').textContent.trim());
}

// Function to edit a comment
function editComment(button) {
  const commentText = button.parentElement.querySelector('strong').nextSibling.nodeValue.trim();
  const newName = prompt('Edit your name:', button.parentElement.querySelector('strong').textContent);
  const newComment = prompt('Edit your comment:', commentText);

  if (newName !== null && newComment !== null) {
    button.parentElement.querySelector('strong').textContent = newName;
    button.parentElement.querySelector('strong').nextSibling.nodeValue = newComment;
    // Update the comment in localStorage
    updateComment(newName, newComment, button.parentElement);
  }
}

// Function to save a comment to localStorage
function saveComment(name, comment) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push({ name: name, comment: comment });
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Function to load comments from localStorage
function loadComments() {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  const commentContainer = document.getElementById('comment-container');
  comments.forEach(function (item) {
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `<strong>${item.name}</strong>: ${item.comment}<button onclick="editComment(this)">Edit</button><button onclick="deleteComment(this)">Delete</button>`;
    commentContainer.appendChild(newComment);
  });
}

// Function to remove a comment from localStorage
function removeComment(name) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments = comments.filter(item => item.name !== name);
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Function to update a comment in localStorage
function updateComment(name, comment, element) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.forEach(item => {
    if (item.name === name) {
      item.comment = comment;
    }
  });
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Update the function name to avoid conflicts
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



