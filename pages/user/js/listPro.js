const list_products = [
    {
        name: "Dell Precision 5550 - Core i7 10750H 16GB",
        img: "/pages/user/image/45448_laptop_dell_latitude_5520_42lt552003_anphatpc.jpg",
        price: "14.990.000VNĐ",
        masp: "M1",
        des: "Để tí thêm vào nha",
        quant: "0"
    },
    {
        name: "MacBook Air 13 Inch M100 CEH",
        img: "/pages/user/image/Mac_Air.jpg",
        price: "8.990.000VNĐ",
        masp: "M2",
        des: "Để tí thêm vào nha",
        quant: "5"
    },
    {
        name: "Laptop Dell Precision 7530 Core i7-8850H",
        img: "/pages/user/image/v14_den_1412dcdc644640c782821e9be102a32d_master.webp",
        price: "13.500.000VNĐ",
        masp: "M3",
        des: "Để tí thêm vào nha",
        quant: "2"
    },
    {
        name: "Laptop Lenovo V14 G3 IAP 82TS0067VN",
        img: "/pages/user/image/Laptop Dell P15 35.webp",
        price: "13.500.000VNĐ",
        masp: "M4",
        des: "Để tí thêm vào nha",
        quant: "5"
    },
    {
        name: "Bàn phím AKKO 3098 RF World Tour London",
        img: "/pages/user/image/Bàn phím AKKO.jpg",
        price: "1.599.000VNĐ",
        masp: "M5",
        des: "Để tí thêm vào nha",
        quant: "12"
    },
    {
        name: "Bàn phím AKKO 3098 RF Dracula Castle",
        img: "/pages/user/image/Bàn phím Akko 3098 RF Dracula.png",
        price: "1.799.000VNĐ",
        masp: "M6",
        des: "Để tí thêm vào nha",
        quant: "22"
    },
    {
        name: "Bàn phím AKKO 3098 RF Dracula Castle",
        img: "/pages/user/image/Bàn phím Akko 3098 RF Dracula.png",
        price: "1.799.000VNĐ",
        masp: "M7",
        des: "Để tí thêm vào nha",
        quant: "22"
    },
    {
        name: "Bàn phím Demon Slayer Kamado Nezuko",
        img: "/pages/user/image/Bàn phím Demon Slayer.jpg",
        price: "2.959.000VNĐ",
        masp: "M8",
        des: "Để tí thêm vào nha",
        quant: "27"
    },
    {
        name: "Bàn phím AKKO ACR Pro Alice Plus",
        img: "/pages/user/image/Bàn phím Akko ACR Pro Alice Plus.jpg",
        price: "1.959.000VNĐ",
        masp: "M9",
        des: "Để tí thêm vào nha",
        quant: "10"
    },
    {
        name: "Chuột Chơi Game Razer Orochi V2",
        img: "/pages/user/image/Chuột Gaming Razer Orochi V2.webp",
        price: "590.000VNĐ",
        masp: "M10",
        des: "Để tí thêm vào nha",
        quant: "234"
    },
    {
        name: "Chuột Bluetooth Logitech Pebble M350S",
        img: "/pages/user/image/Chuột không dây LOGITECH PEBBLE.webp",
        price: "499.000VNĐ",
        masp: "M11",
        des: "Để tí thêm vào nha",
        quant: "102"
    },
    {
        name: "Chuột chơi game FPS AKKO RG389 Black ",
        img: "/pages/user/image/Chuột chơi game.jpg",
        price: "899.000VNĐ",
        masp: "M12",
        des: "Để tí thêm vào nha",
        quant: "34"
    },
    {
        name: "Chuột Không dây Gaming Razer Blasilik",
        img: "/pages/user/image/Chuột Không dây Gaming Razer Basilisk X HyperSpeed.webp",
        price: "1.990.000VNĐ",
        masp: "M13",
        des: "Để tí thêm vào nha",
        quant: "302"
    },
    {
        name: "Bàn phím cơ AKKO MOD007 PC Blue White Piano Switch",
        img: "/pages/user/image/Bàn phím cơ MOD007 PC BLUE on White.webp",
        price: "1.790.000VNĐ",
        masp: "M43",
        des: "Để tí thêm vào nha",
        quant: "12"
    },
    {
        name: "Chuột không dây A4 Tech FG20",
        img: "/pages/user/image/Chuột không dây A4 Tech FG20.jpg",
        price: "250.000VNĐ",
        masp: "A01",
        des: "Để tí thêm vào nha",
        quant: "8"
    },
    {
        name: "Chuột có dây Gaming Asus TUF M3 Gen II",
        img: "/pages/user/image/Chuột có dây Gaming Asus TUF M3 Gen II.jpg",
        price: "500.000VNĐ",
        masp: "FG3",
        des: "Để tí thêm vào nha",
        quant: "6"
    },
    {
        name: "Laptop MSI Cyborg 15 A12VE 240VN",
        img: "/pages/user/image/Laptop MSI Cyborg 15 A12VE 240VN.jpg",
        price: "22.490.000VNĐ",
        masp: "MSI3",
        des: "Để tí thêm vào nha",
        quant: "35"
    },
    {
        name: "Laptop ASUS Zenbook DUO UX8406MA-PZ307W",
        img: "/pages/user/image/Laptop ASUS Zenbook DUO.webp",
        price: "48.990.000VNĐ",
        masp: "DUO32",
        des: "Để tí thêm vào nha",
        quant: "10"
    },
];


// Chuyển danh sách sản phẩm thành chuỗi JSON
const productListString = JSON.stringify(list_products);

// Lưu vào localStorage
localStorage.setItem('list_products', productListString);

console.log('Danh sách sản phẩm đã được lưu vào localStorage.');



