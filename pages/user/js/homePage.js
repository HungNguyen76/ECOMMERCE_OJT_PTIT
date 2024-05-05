function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProductIndex = cart.findIndex(p => p.masp === product.masp);

  if (existingProductIndex !== -1) {
    // If the product already exists in the cart, increase the quantity by 1
    cart[existingProductIndex].quantity += 1;
  } else {
    // If the product is not in the cart, add it with a quantity of 1
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('Product added to cart successfully');

  // Display product name and image
  displayProductInfo(product);
}

function displayProductInfo(product) {
  // Assuming there's a div with id "cartItems" to display cart items
  const cartItemsDiv = document.getElementById('cartItems');

  // Create elements for product name and image
  const productName = document.createElement('p');
  productName.textContent = product.name;

  const productImage = document.createElement('img');
  productImage.src = product.img;
  productImage.alt = product.name;
  productImage.style.width = '100px'; // Adjust size as needed

  // Append elements to cartItemsDiv
  cartItemsDiv.appendChild(productName);
  cartItemsDiv.appendChild(productImage);
}



function addToWishlist(product) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  const existingProductIndex = wishlist.findIndex(p => p.masp === product.masp);

  if (existingProductIndex !== -1) {
    // If the product already exists in the cart, increase the quantity by 1
    wishlist[existingProductIndex].quantity += 1;
  } else {
    // If the product is not in the cart, add it with a quantity of 1
    product.quantity = 1;
    wishlist.push(product);
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  console.log('Product added to wishlist successfully');

  // Display product name and image
  displayWishlistInfo(product);
}


function displayWishlistInfo(product) {
  // Assuming there's a div with id "wishlistItems" to display wishlist items
  const wishlistItemsDiv = document.getElementById('wishlistItems');

  // Create elements for product name and image
  const productName = document.createElement('p');
  productName.textContent = product.name;

  const productImage = document.createElement('img');
  productImage.src = product.img;
  productImage.alt = product.name;
  productImage.style.width = '100px'; // Adjust size as needed

  // Append elements to wishlistItemsDiv
  wishlistItemsDiv.appendChild(productName);
  wishlistItemsDiv.appendChild(productImage);
}

var myCarousel = document.querySelector('#carouselExampleIndicators');
      var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 2000, // Thời gian chuyển đổi giữa các slide (miliseconds)
        wrap: true // Cho phép quay lại slide đầu khi đã chuyển qua slide cuối cùng
      });


      document.addEventListener("DOMContentLoaded", function () {
        const messageModal = document.getElementById("messageModal");
        const messageForm = document.getElementById("messageForm");

        // Hiển thị modal khi nhấn vào biểu tượng tin nhắn
        const floatingIcon = document.querySelector(".floating-icon");
        floatingIcon.addEventListener("click", function () {
          const modal = new bootstrap.Modal(messageModal, {
            keyboard: false,
          });
          modal.show();
        });

        // Xử lý khi người dùng gửi tin nhắn
        messageForm.addEventListener("submit", function (event) {
          event.preventDefault();
          const name = document.getElementById("messageName").value;
          const content = document.getElementById("messageContent").value;

          // Ở đây bạn có thể thực hiện xử lý gửi tin nhắn, ví dụ:
          // Gửi thông tin name và content đến server

          // Sau khi xử lý, có thể hiển thị thông báo thành công hoặc đóng modal
          alert("Message sent successfully!");
          const modal = bootstrap.Modal.getInstance(messageModal);
          modal.hide();

          // Để tránh gửi form nhiều lần, bạn có thể reset form sau khi gửi
          messageForm.reset();
        });
      });

      // Hàm để thêm sản phẩm vào giỏ hàng
      function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage
        cart.push(product); // Thêm sản phẩm vào giỏ hàng
        localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng mới vào localStorage
        updateCartCount(cart.length); // Cập nhật số lượng sản phẩm trong giỏ hàng trên biểu tượng giỏ hàng
      }

      // Hàm để cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
      function updateCartCount(count) {
        document.getElementById('cart_count').innerText = count;
      }

      // Hàm để chuyển hướng đến trang cart.html khi người dùng nhấn vào biểu tượng giỏ hàng
      function goToCart() {
        window.location.href = './cart.html';
      }

      function displayProductInfo(product) {
        const cartItemsDiv = document.getElementById('cartItems');
      
        const productName = document.createElement('p');
        productName.textContent = product.name;
      
        const productImage = document.createElement('img');
        productImage.src = product.img;
        productImage.alt = product.name;
        productImage.style.width = '100px';
      
        cartItemsDiv.appendChild(productName);
        cartItemsDiv.appendChild(productImage);
      }
      
      function displayWishlistInfo(product) {
        const wishlistItemsDiv = document.getElementById('wishlistItems');
      
        const productName = document.createElement('p');
        productName.textContent = product.name;
      
        const productImage = document.createElement('img');
        productImage.src = product.img;
        productImage.alt = product.name;
        productImage.style.width = '100px';
      
        wishlistItemsDiv.appendChild(productName);
        wishlistItemsDiv.appendChild(productImage);
      }
      




    