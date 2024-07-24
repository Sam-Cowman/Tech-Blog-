document.addEventListener('DOMContentLoaded', function () {
  const postButton = document.getElementById('postButton');
  
  if (postButton) {
    postButton.addEventListener('click', function () {
      window.location.href = '/dashboard';
    });
  }
});
