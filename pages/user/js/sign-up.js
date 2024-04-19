document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.auth_form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn việc submit form

        // Lấy giá trị từ trường input email và password
        const email = document.querySelector('.form_input[type="email"]').value;
        const name = document.querySelector('.form_input[type="text"]').value;
        const password = document.querySelector('.form_input[type="password"]').value;

        // Kiểm tra nếu email hoặc password không được nhập
        if (!email || !password) {
            alert('Vui lòng nhập cả email và mật khẩu');
            return;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert('Vui lòng nhập đúng định dạng của email');
            return;
        }

        // Kiểm tra xem tên người dùng có chỉ chứa các ký tự chữ cái không
        var username = "username";
        const usernameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
        if (!usernameRegex.test(username)) {
            alert('Tên người dùng chỉ có thể chứa các chữ cái và khoảng trắng');
            return;
        }

        // Kiểm tra xem tài khoản đã tồn tại trong localStorage chưa
        const existingAccounts = JSON.parse(localStorage.getItem('ListUser')) || [];
        const existingAccount = existingAccounts.find(account => account.email === email);

        if (existingAccount) {
            alert('Tài khoản này đã tồn tại!');
            return;
        }

        // Nếu tài khoản không tồn tại, lưu tài khoản mới vào localStorage
        const id = Math.random().toString(36).substr(2, 8);
        const newAccount = { id, name, email, password };       
        existingAccounts.push(newAccount);
        console.log("existingAccounts", existingAccounts)
        localStorage.setItem('ListUser', JSON.stringify(existingAccounts));

        // Thông báo đăng ký thành công
        alert('Tạo tài khoản thành công!');

        // Chuyển hướng người dùng đến trang đăng nhập
        window.location.href = '../login.html';
    });
});
