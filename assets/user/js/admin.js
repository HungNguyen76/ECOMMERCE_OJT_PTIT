var TOTAL = 0;

window.onload = function () {
    // get data from localstorage
    list_products = getListProducts() || list_products;
    addEventChangeTab();

    if (window.localStorage.getItem('admin')) {
        addTableProducts();
        addTableDonHang();
        addTableKhachHang();
        addThongKe();

        openTab('Homepage')
    } else {
        document.body.innerHTML = `<h1 style="color:red; with:100%; text-align:center; margin: 50px;"> Access is denied.. </h1>`;
    }
}

function setListProducts(newList) {
    window.localStorage.setItem('list_products', JSON.stringify(newList));
}
  
function getListProducts() {
    return JSON.parse(window.localStorage.getItem('list_products'));
}

function setListUser(l) {
    window.localStorage.setItem('ListUser', JSON.stringify(l));
}
  
// logout
function logOutAdmin() {
    alert('This action will return to the Homepage')
    window.localStorage.removeItem('admin');
}

function getListRandomColor(length) {
    let result = [];
    for (let i = length; i--;) {
        result.push(getRandomColor());
    }
    return result;
}

// chart
function addChart(id, chartOption) {
    var ctx = document.getElementById(id).getContext('2d');
    var chart = new Chart(ctx, chartOption);
}

// create Chart
function createChartConfig(
    title = 'Title',
    charType = 'bar',
    labels = ['nothing'],
    data = [2],
    colors = ['red'],
) {
    return {
        type: charType,
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: colors,
                borderColor: colors,
            }]
        },
        options: {
            title: {
                fontColor: '#fff',
                fontSize: 25,
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };
}

// Statistical
function addThongKe() {
    var danhSachDonHang = getListDonHang(true);

    var thongKeHang = {}; // Type statistics

    danhSachDonHang.forEach(order => {
        // If the Order is canceled, it will not be counted in the sold quantity
        if (order.tinhTrang === 'Declined') return;

        // Loop through each products in Order
        order.sp.forEach(sanPhamTrongDonHang => {
            let tenHang = sanPhamTrongDonHang.sanPham.company;
            let soLuong = sanPhamTrongDonHang.soLuong;
            let donGia = stringToNum(sanPhamTrongDonHang.sanPham.price);
            let thanhTien = soLuong * donGia;

            if (!thongKeHang[tenHang]) {
                thongKeHang[tenHang] = {
                    soLuongBanRa: 0,
                    doanhThu: 0,
                }
            }

            thongKeHang[tenHang].soLuongBanRa += soLuong;
            thongKeHang[tenHang].doanhThu += thanhTien;
        })
    })


    // Get ramdom color to draw chart
    let colors = getListRandomColor(Object.keys(thongKeHang).length);

    // Add statistical (collum chart)
    addChart('myChart1', createChartConfig(
        'SOLD',
        'bar',
        Object.keys(thongKeHang),
        Object.values(thongKeHang).map(_ => _.soLuongBanRa),
        colors,
    ));
    // Add statistical (circle chart)
    addChart('myChart2', createChartConfig(
        'REVENUE',
        'doughnut',
        Object.keys(thongKeHang),
        Object.values(thongKeHang).map(_ => _.doanhThu),
        colors,
    ));
}

// ======================= Other Tab =========================

function addEventChangeTab() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var list_a = sidebar.getElementsByTagName('a');
    for (var a of list_a) {
        if (!a.onclick) {
            a.addEventListener('click', function () {
                turnOff_Active();
                this.classList.add('active');
                var tab = this.childNodes[1].data.trim()
                openTab(tab);
            })
        }
    }
}

function turnOff_Active() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var list_a = sidebar.getElementsByTagName('a');
    for (var a of list_a) {
        a.classList.remove('active');
    }
}

function openTab(nameTab) {
    // Hidden all
    var main = document.getElementsByClassName('main')[0].children;
    for (var e of main) {
        e.style.display = 'none';
    }

    // Open tab
    switch (nameTab) {
        case 'Homepage': document.getElementsByClassName('home')[0].style.display = 'block'; break;
        case 'Product': document.getElementsByClassName('sanpham')[0].style.display = 'block'; break;
        case 'Order': document.getElementsByClassName('donhang')[0].style.display = 'block'; break;
        case 'User': document.getElementsByClassName('khachhang')[0].style.display = 'block'; break;
    }
}

// ========================== Product ========================
// Draw list_product
function addTableProducts() {
    var tc = document.getElementsByClassName('sanpham')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;

    for (var i = 0; i < list_products.length; i++) {
        var p = list_products[i];
        s += `<tr>
            <td style="width: 5%">` + (i + 1) + `</td>
            <td style="width: 10%">` + p.masp + `</td>
            <td style="width: 40%">
                <a title="Details" target="_blank" href="productDetail.html?` + p.name.split(' ').join('-') + `">` + p.name + `</a>
                <img src="` + p.img + `"></img>
            </td>
            <td style="width: 15%">` + p.price + `</td>
            <td style="width: 10%">${p.category}</td>
            <td style="width: 15%">
                <div class="tooltip">
                    <i class="fa fa-wrench" onclick="addKhungSuaSanPham('` + p.masp + `')"></i>
                    <span class="tooltiptext">Edit</span>
                </div>
                <div class="tooltip">
                    <i class="fa-solid fa-trash-can" onclick="deleteProduct('` + p.masp + `', '` + p.name + `')"></i>
                    <span class="tooltiptext">Delete</span>
                </div>
            </td>
        </tr>`;
    }

    s += `</table>`;

    tc.innerHTML = s;
}

// Search
function timKiemSanPham(inp) {
    var kieuTim = document.getElementsByName('kieuTimSanPham')[0].value;
    var text = inp.value;

    // Sort
    var vitriKieuTim = { 'ma': 1, 'ten': 2 }; 

    var listTr_table = document.getElementsByClassName('sanpham')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}


let previewSrc; 
// Get data
function layThongTinProductTuTable(id) {
    var khung = document.getElementById(id);
    if (!khung) return false; // Kiểm tra khung tồn tại
  
    var tr = khung.getElementsByTagName('tr');
    if (tr.length < 6) return false; // Kiểm tra có đủ dòng
  
    var masp = '';
    var maspInput = tr[1].getElementsByTagName('td')[1]?.getElementsByTagName('input')[0];
    if (maspInput) masp = maspInput.value;
  
    var name = '';
    var nameInput = tr[2].getElementsByTagName('td')[1]?.getElementsByTagName('input')[0];
    if (nameInput) name = nameInput.value;
  
    var price = '';
    var priceInput = tr[6].getElementsByTagName('td')[1]?.getElementsByTagName('input')[0];
    if (priceInput) price = priceInput.value;

    var category = '';
    var categoryInput = tr[4].getElementsByTagName('td')[1]?.getElementsByTagName('input')[0];
    if (categoryInput) category = categoryInput.value;

    var des = '';
    var desTextarea = tr[5].getElementsByTagName('td')[1]?.getElementsByTagName('input')[0];
    if (desTextarea) des = desTextarea.value;
  
    if (isNaN(price)) {
      alert('Price must be a number');
      return false;
    }
  
    try {
      return {
        "name": name,
        "des": des,
        "img": previewSrc, 
        "price": parseFloat(price).toLocaleString('vi-VN', { useGrouping: true }), 
        "masp": masp,
        "category": category,
      }
    } catch (e) {
      alert('Error: ' + e.toString());
      return false;
    }
  }

  
// Add product
function addProduct() {
    var newSp = layThongTinProductTuTable('khungThemSanPham');
    if (!newSp) return;

    for (var p of list_products) {
        if (p.masp == newSp.masp) {
            alert('Product Code is duplicated !!');
            return;
        }

        if (p.name == newSp.name) {
            alert('Products Name is duplicated!!');
            return;
        }
    }

    // Add product to list_product
    list_products.push(newSp);

    // Save to LocalStorage with variable name 'list_products'
    localStorage.setItem('list_products', JSON.stringify(list_products));

    // Redraw table
    addTableProducts();

    alert('Add Products "' + newSp.name + '" successful.');
    document.getElementById('khungThemSanPham').style.transform = 'scale(0)';
    // Initialize list_products from localStorage
}

// Create Product code
// function autoMaProduct(company) {
    
//     if (!company) company = document.getElementsByName('type')[0].value;
//     var index = 0;
//     for (var i = 0; i < list_products.length; i++) {
//         if (list_products[i].type == type) {
//             index++;
//         }
//     }
//     document.getElementById('maspThem').value = type.substring(0, 3) + index;
// }

// Delete
function deleteProduct(masp, tensp) {
    if (window.confirm('Delete this? Are you sure?  ' + tensp+' ?')) {
        // Delete
        for (var i = 0; i < list_products.length; i++) {
            if (list_products[i].masp == masp) {
                list_products.splice(i, 1);
            }
        }

        // Save to localstorage
        setListProducts(list_products);

        // Redraw table
        addTableProducts();
    }
}

// Edit
function suaSanPham(masp) {
    var sp = layThongTinProductTuTable('khungSuaSanPham');
    if (!sp) return;

    for (var p of list_products) {
        if (p.masp == masp && p.masp != sp.masp) {
            alert('Product Code is duplicated !!');
            return false;
        }

        if (p.name == sp.name && p.masp != sp.masp) {
            alert('Products name is duplicated !!');
            return false;
        }
    }

    for (var i = 0; i < list_products.length; i++) {
        if (list_products[i].masp == masp) {
            list_products[i] = sp;
        }
    }

    // Save to localstorage
    setListProducts(list_products);

    // Redraw table
    addTableProducts();

    alert('Edit ' + sp.name + ' successful');

    document.getElementById('khungSuaSanPham').style.transform = 'scale(0)';
}

function addKhungSuaSanPham(masp) {
    var sp;
    for (var p of list_products) {
      if (p.masp == masp) {
        sp = p;
      }
    }
    var s = `
      <span class="close" onclick="document.getElementById('khungSuaSanPham').style.transform = 'scale(0)';">&times;</span>
      <table class="overlayTable table-outline table-content table-header">
        <tr>
          <th colspan="2">${sp.name}</th>
        </tr>
        <tr>
          <td>Product Code:</td>
          <td><input type="text" value="${sp.masp}"></td>
        </tr>
        <tr>
          <td>Product Name:</td>
          <td><input type="text" value="${sp.name}"></td>
        </tr>
        <tr>
          <td>Image:</td>
          <td>
            <img class="hinhDaiDien" id="anhDaiDienSanPhamSua" src="${sp.img}">
            <input type="file" accept="image/*" onchange="capNhatAnhSanPham(this.files, 'anhDaiDienSanPhamSua')">
          </td>
        </tr>
        <tr>
          <td>Category:</td>
          <td><input type="text" value="${sp.category}"></td>
        </tr>
        <tr>
          <td>Price:</td>
          <td><input type="text" value="${+sp.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}"></td>
        </tr>
        <tr>
          <td colspan="2" class="table-footer">
            <button onclick="suaSanPham('${sp.masp}')">Edit</button>
          </td>
        </tr>
      </table>
    `;
    var khung = document.getElementById('khungSuaSanPham');
    khung.innerHTML = s;
    khung.style.transform = 'scale(1)';
  }

// Update products picture
function capNhatAnhSanPham(files, id) {

    const reader = new FileReader();
    reader.addEventListener("load", function () {
       
        previewSrc = reader.result;
        document.getElementById(id).src = previewSrc;
    }, false);

    if (files[0]) {
        reader.readAsDataURL(files[0]);
    }
}

// Product sort
function sortProductsTable(loai) {
    var list = document.getElementsByClassName('sanpham')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_SanPham); 
    // type allows choosing to sort by code or name or price... 
    decrease = !decrease;
}


// Get the value of a certain type (column) of data in the table
function getValueOfTypeInTable_SanPham(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch (loai) {
      case 'stt':
        return Number(td[0].innerHTML);
      case 'masp':
        return td[1].innerHTML.toLowerCase();
      case 'ten':
        return td[2].innerHTML.toLowerCase();
      case 'gia':
        return stringToNum(td[3].innerHTML);
      case 'khuyenmai':
        return td[4].innerHTML.toLowerCase();
      case 'category':
        // Giả sử category nằm ở cột thứ 5 (index 4)
        return td[4].innerHTML.toLowerCase();
      default:
        return false;
    }
  }
// ========================= Order ===========================
// Draw Table
function addTableDonHang() {
    var tc = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;

    var listDH = getListDonHang();

    TOTAL = 0;
    for (var i = 0; i < listDH.length; i++) {
        var d = listDH[i];
        s += `<tr>
            <td style="width: 5%">` + (i + 1) + `</td>
            <td style="width: 13%">` + d.ma + `</td>
            <td style="width: 7%">` + d.khach + `</td>
            <td style="width: 20%">` + d.sp + `</td>
            <td style="width: 15%">` + d.total + `</td>
            <td style="width: 10%">` + d.ngaygio + `</td>
            <td style="width: 10%">` + d.tinhTrang + `</td>
            <td style="width: 10%">
                <div class="tooltip">
                    <i class="fa fa-check" onclick="approve('`+ d.ma + `', true)"></i>
                    <span class="tooltiptext">Approve</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-remove" onclick="approve('`+ d.ma + `', false)"></i>
                    <span class="tooltiptext">Cancel</span>
                </div>
                
            </td>
        </tr>`;
        TOTAL += stringToNum(d.total);
    }

    s += `</table>`;
    tc.innerHTML = s;
}

function stringToNum(str, char) {
    return Number(str.split(char || '.').join(''));
}

function getListDonHang(traVeDanhSachSanPham = false) {
    var u = getListUser();
    var result = [];
    localStorage.removeItem("aaa");
    for (var i = 0; i < u.length; i++) {
        for (var j = 0; j < u[i].donhang?.length; j++) {
            // Total
            var total = 0;
            for (var s of u[i].donhang[j].sp) {
                var timsp = timKiemTheoMa(list_products, s.ma);
                // console.log(timsp);
                if (timsp.promo.name == 'giareonline') total += stringToNum(timsp.promo.value);
                
                else total += stringToNum(timsp.price);
            }

            // Date
            var x = new Date(u[i].donhang[j].ngaymua).toLocaleString();
            console.log(x);

            // Products (html)
            var sps = '';
            for (var s of u[i].donhang[j].sp) {
                sps += `<p style="text-align: right">` + (timKiemTheoMa(list_products, s.ma).name + ' [' + s.soluong + ']') + `</p>`;
            }
            console.log(sps);

            // Products (array)
            var danhSachProduct = [];
            for (var s of u[i].donhang[j].sp) {
                danhSachProduct.push({
                    sanPham: timKiemTheoMa(list_products, s.ma),
                    soLuong: s.soluong,
                });
            }

            // Save to result
            result.push({
                "ma": u[i].donhang[j].ngaymua.toString(),
                "khach": u[i].username,
                "sp": traVeDanhSachSanPham ? danhSachProduct : sps,
                "total": numToString(total),
                "ngaygio": x,
                "tinhTrang": u[i].donhang[j].tinhTrang
            });
        }
    }
    return result;
}

// approve
function approve(maDonHang, duyetDon) {
    var u = getListUser();
    for(var i = 0; i < u.length; i++) {
        for(var j = 0; j < u[i].donhang.length; j++) {
            if(u[i].donhang[j].ngaymua == maDonHang) {
                if(duyetDon) {
                    if (u[i].donhang[j].tinhTrang == 'Pending') {
                        u[i].donhang[j].tinhTrang = 'Delivered';
                    } else if (u[i].donhang[j].tinhTrang == 'Declined') {
                        alert('Cannot approve a canceled order!');
                        return;
                    }
                } else {
                    if (u[i].donhang[j].tinhTrang == 'Pending') {
                        if (window.confirm('Are you sure you want to cancel this order? This action cannot redo!')) {
                            u[i].donhang[j].tinhTrang = 'Declined';
                        }
                    } else if (u[i].donhang[j].tinhTrang == 'Delivered') {
                        alert('Cannot cancel a delivered order!');
                        return;
                    }
                }
                break;
            }
        }
    }
    // save
    setListUser(u);

    // draw again
    addTableDonHang();
}
// Sort by date
function locOrderTheoKhoangNgay() {
    var from = document.getElementById('fromDate').valueAsDate;
    var to = document.getElementById('toDate').valueAsDate;

    var listTr_table = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[5].innerHTML;
        var d = new Date(td);

        if (d >= from && d <= to) {
            tr.style.display = '';
        } else {
            tr.style.display = 'none';
        }
    }
}
// Sort by Oders
function timKiemDonHang(inp) {
    var kieuTim = document.getElementsByName('kieuTimOrder')[0].value;
    var text = inp.value;

    // Filter
    var vitriKieuTim = { 'ma': 1, 'khachhang': 2, 'trangThai': 6 };

    var listTr_table = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

// Sort
function sortOrderTable(loai) {
    var list = document.getElementsByClassName('donhang')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_Order);
    decrease = !decrease;
}

// Get the value of a certain type (column) of data in the table
function getValueOfTypeInTable_Order(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch (loai) {
        case 'stt': return Number(td[0].innerHTML);
        // Convert to date
        case 'ma': return new Date(td[1].innerHTML);
         // Get username
        case 'khach': return td[2].innerHTML.toLowerCase();
       // Get the number of rows in this order (length is the quantity)
        case 'sanpham': return td[3].children.length;
        // Returns price
        case 'total': return stringToNum(td[4].innerHTML);
        // Return date
        case 'ngaygio': return new Date(td[5].innerHTML);
        //Status
        case 'trangthai': return td[6].innerHTML.toLowerCase();
    }
    return false;
}

// ====================== Admin ============================= //
var adminInfo = [{
    "email": "admin@gmail.com",
    "password": "123456",
    "role": "Admin",
    "name": "ADMIN",
}];

var adminInfoString = JSON.stringify(adminInfo);

localStorage.setItem('adminLists', adminInfoString);


// function phanQuyenUser() {
//     const userSelect = document.getElementById('phanQuyenUser');
//     const quyenSelect = document.getElementById('quyenUser');
//     const tenUser = userSelect.value;
//     const quyenMoi = quyenSelect.value;

//     if (!tenUser) {
//         alert('Vui lòng chọn người dùng để phân quyền.');
//         return;
//     }

//     let listUser = JSON.parse(localStorage.getItem('ListUser')) || [];
//     let user = listUser.find(u => u.name === tenUser);

//     if (!user) {
//         alert('Không tìm thấy người dùng.');
//         return;
//     }

//     // Cập nhật quyền mới cho người dùng
//     user.role = quyenMoi;

//     // Lưu danh sách người dùng đã cập nhật
//     localStorage.setItem('ListUser', JSON.stringify(listUser));

//     // Nếu phân quyền người dùng thành admin, thêm thông tin admin vào danh sách adminLists
//     if (quyenMoi === 'admin') {
//         let adminLists = JSON.parse(localStorage.getItem('adminLists')) || [];
//         let existingAdmin = adminLists.find(admin => admin.email === user.email);

//         if (!existingAdmin) {
//             adminLists.push({ email: user.email, password: user.password });
//             localStorage.setItem('adminLists', JSON.stringify(adminLists));
//         }
//     }

//     alert(`Phân quyền ${quyenMoi} cho người dùng ${user.name} thành công.`);
//     document.getElementById('phanQuyenModal').style.display = 'none';
//     addTableKhachHang(); // Cập nhật lại bảng người dùng
//     loadUsersToSelect(); // Tải lại danh sách người dùng trong select
// }

// function loadUsersToSelect() {
//     const userSelect = document.getElementById('phanQuyenUser');
//     let listUser = JSON.parse(localStorage.getItem('ListUser')) || [];

//     // Xóa tất cả các option hiện có
//     userSelect.innerHTML = '<option value="">-- Chọn người dùng --</option>';

//     // Thêm các option mới từ danh sách người dùng
//     listUser.forEach(user => {
//         const option = document.createElement('option');
//         option.value = user.name;
//         option.textContent = user.name;
//         userSelect.appendChild(option);
//     });
// }

// Draw table
function addTableKhachHang() {
    var tc = document.getElementsByClassName('khachhang')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;
  
    // Hiển thị danh sách người dùng (ListUser)
    let listUser = JSON.parse(localStorage.getItem('ListUser')) || [];
    for (var i = 0; i < listUser.length; i++) {
      var u = listUser[i];
      s += `<tr>
        <td style="width: 5%">${i + 1}</td>
        <td style="width: 9%">${u.role}</td>
        <td style="width: 20%">${u.email}</td>
        <td style="width: 20%">${u.name}</td>
        <td style="width: 10%">${u.password}</td>
        <td style="width: 10%">
          <div class="tooltip">
            <label class="switch">
              <input type="checkbox" ${u.off ? '' : 'checked'} onclick="voHieuHoaUser(this, '${u.name}')">
              <span class="slider round"></span>
            </label>
            <span class="tooltiptext">${u.off ? 'Unlock' : 'Lock'}</span>
          </div>
          <div class="tooltip">
            <i class="fa fa-remove" onclick="deleteUser('${u.name}')"></i>
            <span class="tooltiptext">Delete</span>
          </div>
        </td>
      </tr>`;
    }
  
    // Hiển thị danh sách quản trị viên (adminLists)
    let adminLists = JSON.parse(localStorage.getItem('adminLists')) || [];
    for (var i = 0; i < adminLists.length; i++) {
      var u = adminLists[i];
      s += `<tr>
        <td style="width: 5%">${listUser.length + i + 1}</td>
        <td style="width: 9%">${u.role}</td>
        <td style="width: 20%">${u.email}</td>
        <td style="width: 20%">${u.name}</td>
        <td style="width: 10%">${u.password}</td>
        <td style="width: 10%">
          <div class="tooltip">
            <i class="fa fa-remove" onclick="deleteUser('${u.name}')"></i>
            <span class="tooltiptext">Delete</span>
          </div>
        </td>
      </tr>`;
    }
  
    s += `</table>`;
    tc.innerHTML = s;
  }

// Search
function timKiemUser(inp) {
    var kieuTim = document.getElementsByName('kieuTimKhachHang')[0].value;
    var text = inp.value;

    // Filter
    var vitriKieuTim = { 'ten': 1, 'email': 2, 'account': 3 };

    var listTr_table = document.getElementsByClassName('khachhang')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

// Hàm tạo ID ngẫu nhiên
function generateId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Hàm get set cho danh sách người dùng
function getListUser() {
    var data = JSON.parse(window.localStorage.getItem('ListUser')) || []
    var l = [];
    for (var d of data) {
        l.push(d);
    }
    return l;
}

// Hàm kiểm tra email
function validateEmail(email) {
    var listUser = getListUser();
    for (var i = 0; i < listUser.length; i++) {
        if (listUser[i].email === email) {
            alert('Email đăng ký đã tồn tại');
            return false;
        }
    }
    return true;
}


// Hàm mở modal
function openThemUser() {
    // Tạo modal nếu chưa tồn tại
    var modal = document.getElementById('userModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'userModal';
      modal.className = 'modal';
      document.body.appendChild(modal);
    }
  
    // Nội dung HTML của modal
    var modalContent = `
      <div class="modal-content">
        <h2 class="type">Register</h2>
        <form id="userForm">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
          <label for="role">Role:</label>
          <select id="role" name="role" required>
            <option value="">Select a role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <button type="submit">Tạo tài khoản</button>
          <button type="button" id="cancelBtn">Hủy</button>
        </form>
      </div>
    `;
  
    // Gán nội dung HTML vào modal và hiển thị modal
    modal.innerHTML = modalContent;
    modal.style.display = 'block';
  
    // Xử lý sự kiện submit form
    var form = document.getElementById('userForm');
    if (form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var role = document.getElementById('role').value;
  
        // Validate email
        if (!validateEmail(email)) {
          alert('Email không hợp lệ');
          return;
        }
  
        // Tạo id mới
        var id = generateId(8);
  
        // Tạo đối tượng user mới
        var newUser = {
          id: id,
          name: name,
          email: email,
          password: password,
          role: role,
          off: false
        };
  
        // Lưu user vào localStorage
        if (role.toLowerCase() === 'admin') {
          let adminLists = JSON.parse(localStorage.getItem('adminLists')) || [];
          adminLists.push(newUser);
          localStorage.setItem('adminLists', JSON.stringify(adminLists));
        //   displayAdminList(adminLists); // Cập nhật giao diện hiển thị danh sách tài khoản admin
        } else if (role.toLowerCase() === 'user') {
          let listUser = JSON.parse(localStorage.getItem('ListUser')) || [];
          listUser.push(newUser);
          localStorage.setItem('ListUser', JSON.stringify(listUser));
        }
  
        // Ẩn modal và cập nhật giao diện
        modal.style.display = 'none';
        addTableKhachHang();
      });
    } else {
      alert('Không tìm thấy form');
    }
  
    // Xử lý sự kiện click nút "Hủy"
    var cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function() {
        modal.style.display = 'none';
      });
    }
  }
// Disable user
function voHieuHoaUser(inp, account) {
    var listUser = getListUser();
    for (var u of listUser) {
        if (u.name == account) {
            let value = !inp.checked
            u.off = value;
            setListUser(listUser);

            setTimeout(() => {
                alert(`${value ? 'Lock' : 'Unlock'} account "${u.name}" successful.`);
            }, 500);
            
            break;
        }
    }
    var span = inp.parentElement.nextElementSibling;
    span.innerHTML = (inp.checked ? 'Lock' : 'Unlock');
}

// Delete user
function deleteUser(account) {
    if (window.confirm('Confirm DELETE ALL "' + account + '" Account ?' + ' \n All Data of ' + account + " will be lost! (Including the Order's of " + account +")")) {
        var listuser = getListUser();
        for (var i = 0; i < listuser.length; i++) {
            if (listuser[i].name == account) {
                listuser.splice(i, 1);// delete
                setListUser(listuser);// Save
                localStorage.removeItem('CurrentUser');// Sign out of current account user
                addTableKhachHang();// Redraw the User table
                addTableDonHang();// Redraw the Order table
                return;
            }
        }
    }
}

// Sort
function sortKhachHangTable(loai) {
    var list = document.getElementsByClassName('khachhang')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_KhachHang);
    decrease = !decrease;
}

function getValueOfTypeInTable_KhachHang(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch (loai) {
        case 'stt': return Number(td[0].innerHTML);
        case 'fullName': return td[1].innerHTML.toLowerCase();
        case 'email': return td[2].innerHTML.toLowerCase();
        case 'account': return td[3].innerHTML.toLowerCase();
        case 'password': return td[4].innerHTML.toLowerCase();
    }
    return false;
}

// ================== Sort ====================
var decrease = true; // Sort decrease

function quickSort(arr, left, right, loai, func) {
    var pivot,
        partitionIndex;

    if (left < right) {
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right, loai, func);

        //sort left and right
        quickSort(arr, left, partitionIndex - 1, loai, func);
        quickSort(arr, partitionIndex + 1, right, loai, func);
    }
    return arr;
}

function partition(arr, pivot, left, right, loai, func) {
    var pivotValue = func(arr[pivot], loai),
        partitionIndex = left;

    for (var i = left; i < right; i++) {
        if (decrease && func(arr[i], loai) > pivotValue
            || !decrease && func(arr[i], loai) < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(arr, right, partitionIndex);
    return partitionIndex;
}

function swap(arr, i, j) {
    var tempi = arr[i].cloneNode(true);
    var tempj = arr[j].cloneNode(true);
    arr[i].parentNode.replaceChild(tempj, arr[i]);
    arr[j].parentNode.replaceChild(tempi, arr[j]);
}


function progress(percent, bg, width, height) {
    return `<div class="progress" style="width: ` + width + `; height:` + height + `">
                <div class="progress-bar bg-info" style="width: ` + percent + `%; background-color:` + bg + `"></div>
            </div>`
}


