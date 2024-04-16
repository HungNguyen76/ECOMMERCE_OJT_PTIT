const products = [
    { name: "Laptop Acer đen xám", category: "Laptop", color: "đen, xám", image: "#" },
    { name: "MacBook Air", category: "Laptop", color: "xám, trắng, hồng nhạt", image: "#" },
    { name: "MacBook Pro", category: "Laptop", color: "trắng, đen, bạc", image: "#" },
    { name: "MacBook Retina", category: "Laptop", color: "hồng, da, xám", image: "#" },
    { name: "Laptop HP", category: "Laptop", color: "đen, xám, trắng", image: "#" },
    { name: "Laptop DELL", category: "Laptop", color:"đen, xám", image: "#"},
    { name: "Iphone 15 Pro", category: "Phone", color: "đen, bạc titan", image: "#" },
    { name: "Iphone 15 ProMax", category: "Phone", color: "đen, xám, bạc titan", image: "#" },
    { name: "Iphone 14 ProMax", category: "Phone", color:"đen, bạc kim", image: "#"},
    { name: "", category: "Phone", color: "đen, bạc titan", image: "#" },
    { name: "PC Gaming Omen", category: "PC", color: "đen, xám, trắng", image: "#" },
    { name: "PC Gaming ALIENWAR", category: "PC", color:"đen, xám", image: "#"},
    { name: "PC Gaming CORSAIR", category: "PC", color: "đen, bạc", image: "#" },
    // Thêm sản phẩm khác nếu cần
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm);
    });

    renderSearchResults(filteredProducts);
});

document.addEventListener('click', function(event) {
    if (!searchInput.contains(event.target)) {
        searchResults.classList.remove('show');
        searchInput.value = ''; // Xóa nội dung trong ô tìm kiếm khi click ra ngoài
    }
});

function renderSearchResults(results) {
    searchResults.innerHTML = '';

    if (results.length > 0) {
        searchResults.classList.add('show');
    } else {
        searchResults.classList.remove('show');
    }

    results.forEach(product => {
        const productElement = document.createElement('a');
        productElement.textContent = `${product.name} - ${product.category}`;  // tạo một đường liên kết (anchor element) với nội dung là tên sản phẩm và danh mục của sản phẩm 
        productElement.href = "#"; // Gắn href để có thể nhấp vào sản phẩm
        productElement.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
            showProductDetails(product); // Hiển thị thông tin chi tiết của sản phẩm khi nhấp vào
        });
        
        searchResults.appendChild(productElement);
    });
}

function showProductDetails(product) {
    // Hiển thị thông tin chi tiết của sản phẩm
    alert(`Tên sản phẩm: ${product.name}\nDanh mục: ${product.category}\nKích thước: ${product.size} \nẢnh: ${product.image}`);
    // Bạn có thể thay thế alert bằng cách hiển thị thông tin chi tiết trong một modal, một cửa sổ popover, hoặc bất kỳ cách hiển thị nào khác phù hợp với thiết kế của bạn.
}