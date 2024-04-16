document.getElementById('orderForm').onsubmit = function(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var data = {};
    formData.forEach(function(value, key){
      data[key] = value;
    });
    console.log('Dữ liệu đơn hàng:', data);
    // Gọi hàm confirmOrder để xác nhận đơn hàng
    confirmOrder();
  };
  
  function confirmOrder() {
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    var total = document.getElementById('total').value;
    var paymentMethod = document.getElementById('paymentMethod').value;
    
    var confirmMessage = 'Xác nhận đơn hàng:\n' +
                         'Tên: ' + name + '\n' +
                         'Địa chỉ: ' + address + '\n' +
                         'Số điện thoại: ' + phone + '\n' +
                         'Tổng giá tiền: ' + total + ' VND\n' +
                         'Phương thức thanh toán: ' + paymentMethod;
    
    if (confirm(confirmMessage)) {
      // Hiển thị thông báo xác nhận bằng alert nếu người dùng xác nhận
      alert('Đơn hàng đã được xác nhận.');
    } else {
      // Ghi vào console nếu người dùng hủy đơn hàng
      console.log('Đơn hàng đã bị hủy.');
    }
  }
  