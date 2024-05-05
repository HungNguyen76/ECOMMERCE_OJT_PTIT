const stars = document.querySelectorAll('.star');
const selectedRating = document.getElementById('selectedRating');

stars.forEach(star => {
  star.addEventListener('click', () => {
    const rating = parseInt(star.dataset.index);
    selectedRating.textContent = `Đánh giá của bạn: ${rating} sao`;
    // Reset all stars to default color
    stars.forEach(s => s.classList.remove('active'));
    // Color the stars up to the selected one
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add('active');
    }
  });
});

// Load username from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function () {
  loadUsername();
});

// Lưu bình luận vào local storage
function saveCommentToLocalStorage(comment) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Tải bình luận từ local storage
function loadCommentsFromLocalStorage() {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  const commentContainer = document.getElementById('comment-container');
  commentContainer.innerHTML = ''; // Xóa bình luận hiện tại trước khi tải lại từ local storage
  comments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment-item');
    commentElement.innerHTML = `
      <p><strong>User:</strong> ${comment}</p>
    `;
    commentContainer.appendChild(commentElement);
  });
}

document.getElementById('comment-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Ngăn chặn việc gửi form

  // Lấy nội dung của ô input bình luận
  const commentInput = document.getElementById('comment');
  const commentText = commentInput.value.trim(); // Lấy nội dung bình luận và loại bỏ khoảng trắng đầu cuối

  if (commentText !== '') { // Kiểm tra xem ô input có trống không
    // Lưu bình luận vào local storage
    saveCommentToLocalStorage(commentText);

    // Tải lại bình luận từ local storage
    loadCommentsFromLocalStorage();

    // Xóa nội dung trong ô input sau khi bình luận được thêm vào
    commentInput.value = '';
  }
});

// Load bình luận từ local storage khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
  loadCommentsFromLocalStorage();
});

// Xóa bình luận khỏi local storage và giao diện
function deleteCommentFromLocalStorage(index) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.splice(index, 1); // Xóa bình luận tại index
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Chỉnh sửa bình luận trong local storage và giao diện
function editCommentInLocalStorage(index, newText) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments[index] = newText; // Cập nhật nội dung bình luận tại index
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Tải lại bình luận từ local storage và hiển thị lên giao diện
function loadCommentsFromLocalStorage() {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  const commentContainer = document.getElementById('comment-container');
  commentContainer.innerHTML = ''; // Xóa bình luận hiện tại trước khi tải lại từ local storage
  comments.forEach((comment, index) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment-item');
    commentElement.innerHTML = `
      <p><strong>User:</strong> ${comment}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>
      <button class="edit-btn" data-index="${index}">Edit</button>
    `;
    commentContainer.appendChild(commentElement);
  });

  // Lắng nghe sự kiện khi người dùng ấn nút "Delete"
  commentContainer.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      deleteCommentFromLocalStorage(index);
      loadCommentsFromLocalStorage(); // Tải lại bình luận từ local storage sau khi xóa
    });
  });

  // Lắng nghe sự kiện khi người dùng ấn nút "Edit"
  commentContainer.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      const newText = prompt('Edit your comment:', comments[index]);
      if (newText !== null) { // Kiểm tra nếu người dùng không hủy bỏ
        editCommentInLocalStorage(index, newText);
        loadCommentsFromLocalStorage(); // Tải lại bình luận từ local storage sau khi chỉnh sửa
      }
    });
  });
}

// Lắng nghe sự kiện khi người dùng ấn nút "Submit"
document.getElementById('comment-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Ngăn chặn việc gửi form

  // Lấy nội dung của ô input bình luận
  const commentInput = document.getElementById('comment');
  const commentText = commentInput.value.trim(); // Lấy nội dung bình luận và loại bỏ khoảng trắng đầu cuối

  if (commentText !== '') { // Kiểm tra xem ô input có trống không
    // Lưu bình luận vào local storage
    saveCommentToLocalStorage(commentText);

    // Tải lại bình luận từ local storage
    loadCommentsFromLocalStorage();

    // Xóa nội dung trong ô input sau khi bình luận được thêm vào
    commentInput.value = '';
  } else {
    alert('Please enter a comment.'); // Thông báo nếu ô input trống
  }
});

// Load bình luận từ local storage khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
  loadCommentsFromLocalStorage();
});
