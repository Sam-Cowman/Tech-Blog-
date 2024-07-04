document.addEventListener('DOMContentLoaded', function () {
    const postButton = document.getElementById('postButton');
  
    if (postButton) {
      postButton.addEventListener('click', function () {
        alert('Post button clicked!');
      });
    }
  });