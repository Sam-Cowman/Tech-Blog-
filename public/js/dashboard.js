document.getElementById('new-post-btn').addEventListener('click', () => {
  document.getElementById('new-post-form').style.display = 'block';
});

document.getElementById('post-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post.');
    }
  }
});

document.querySelectorAll('.edit-btn').forEach(button => {
  button.addEventListener('click', async (event) => {
    const id = event.target.getAttribute('data-id');
    const title = prompt('Enter new title');
    const content = prompt('Enter new content');

    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post.');
      }
    }
  });
});

document.querySelectorAll('.delete-btn').forEach(button => {
  button.addEventListener('click', async (event) => {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post.');
    }
  });
});
