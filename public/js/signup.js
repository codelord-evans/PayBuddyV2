document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
  
    signupForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          alert('User created successfully!');
          // You can redirect the user to a login page or any other page
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while creating the user.');
      }
    });
  });
  