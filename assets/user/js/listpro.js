let list_products = [
    {
        masp: "mac0",
        name: "Macbook Air M1",
        img: "./image/items/Macbook-Air-M1_silver.png",
        price: "$1000",
        des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
        quant: "1"
     
    },
  
    {
        masp: "cesar0",
        name: "CESAR DOG FOOD",
        price: "$20",
        des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
        img: "./image/items/item-9.png",
        quant: "1"
    },
      
    {
        masp: "havitg92",
        name: "HAVIT HV-G92 Keyboard-Optical",
        price: "$70",
        des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
        img: "./image/items/item-2.png",
        quant: "1"
    },
    {
        masp: "acer5",
        name: "Acer Nitro 5",
        price: "$100",
        des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
        img: "./image/items/item-11.png",
        quant: "1"
    },
    {
        masp: "mini0",
        name: "Mini Merc",
        price: "$90",
        des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
        img: "./image/items/item-12.png",
        quant: "1"
    },
    {
        masp: "football0",
        name: "Footbal shoes",
        price: "$40",
        des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
        img: "./image/items/item-13.png",
        quant: "1"
    },
    {
        masp: "havitg92",
        name: "HAVIT HV-G92 Gamepad",
        price: "$110",
        des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
        img: "./image/items/item-14.png",
        quant: "1"
    },
    {
        masp: "green0",
        name: "Green Bomber Jacket",
        price: "$30",
        des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
        img: "./image/items/item-15.png",
        quant: "1"
    },
    {
        masp: "skin0",
        name: "Skincare",
        price: "$60",
        des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem fuga harum voluptate?",
        img: "./image/items/item-16.png",
        quant: "11"
    }
]
  function setListProducts(newList) {
    window.localStorage.setItem('ListProducts', JSON.stringify(newList));
  }
  