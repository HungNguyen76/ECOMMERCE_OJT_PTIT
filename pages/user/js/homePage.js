var myCarousel = document.querySelector('#carouselExampleIndicators');
      var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 2000, // Thời gian chuyển đổi giữa các slide (miliseconds)
        wrap: true // Cho phép quay lại slide đầu khi đã chuyển qua slide cuối cùng
      });


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

      // document.querySelector('.star-rating').addEventListener('change', function (e) {
      //   alert('Bạn đã đánh giá ' + e.target.value + ' sao. Cảm ơn bạn!');
      // });


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
      
      
      