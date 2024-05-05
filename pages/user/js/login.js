var adminInfo = [{
    "email": "admin@gmail.com",
    "password": "123456"
}];

function equalUser(u1, u2) {
	return (u1.email == u2.email && u1.password == u2.password);
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

// Hàm get set cho người dùng hiện tại đã đăng nhập
function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('CurrentUser')); 
    // Lấy dữ liệu từ localstorage
}

function setCurrentUser(u) {
    window.localStorage.setItem('CurrentUser', JSON.stringify(u));
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.auth_form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn việc submit form
        
        // Lấy giá trị từ trường input email và password
        const email = document.querySelector('.form_input[type="email"]').value;
        const password = document.querySelector('.form_input[type="password"]').value;
        const newUser = {
            email,
            password
        }

        // Kiểm tra nếu email hoặc password không được nhập
        if (!email || !password) {
            alert('Xin hãy nhập email và password!');
            return;
        }

  
        for (var ad of adminInfo) {
            if (equalUser(newUser, ad)) {
                alert('Welcome back Admin!!');
                localStorage.setItem('admin', true);
                window.location.assign('/pages/admin/products.html');
                return false;
            }
        }

        var listUser = getListUser();

        for (var u of listUser) {
            if (equalUser(newUser, u)) {
                if(u.off) {
                    alert('This account is locked by Admin. Can not login!!');
                    return false;
                }
    
                setCurrentUser(u);
    
                // Reload lại trang -> sau khi reload sẽ cập nhật luôn giỏ hàng khi hàm setupEventTaiKhoan chạy
                // location.reload();
                window.location.href = '/pages/user/homepage.html';
                return false;
            }
        }

        // Kiểm tra xem tài khoản có trong localStorage không
        const existingAccounts = JSON.parse(localStorage.getItem('ListUser')) || [];
        const existingAccount = existingAccounts.find(account => account.email === email && account.password === password);
        // const adminExist = localStorage.getItem("admin")
        if (existingAccount) {
            // Nếu tài khoản tồn tại, thông báo đăng nhập thành công
            alert('Đăng nhập thành công!');
            
            // Lưu trạng thái đăng nhập vào localStorage
            localStorage.setItem('isLoggedIn', 'true');
            
            // Hoặc lưu thông tin tài khoản dưới dạng đối tượng JSON
            const userInfo = { email: existingAccount.email, name: existingAccount.name };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            window.location.href = '/pages/user/homepage.html';
        } else {
            // Nếu tài khoản không tồn tại, hiển thị thông báo lỗi
            alert('Tài khoản không tồn tại. Vui lòng tạo tài khoản!');
        }
    });
});
