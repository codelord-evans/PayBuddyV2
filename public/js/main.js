document.addEventListener('DOMContentLoaded', () => {
    // Entry point when the DOM is ready
    loadDashboard(); // Load the dashboard initially
  });
  
  function loadDashboard() {
    // Logic to load the dashboard UI
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
      <!-- Your dashboard UI components go here -->
      <h1>Welcome to Your Payment System</h1>
      <button onclick="loadRegistrationForm()">Register</button>
      <button onclick="loadDepositForm()">Deposit</button>
      <!-- Add more buttons and UI elements as needed -->
    `;
  }
  
  function loadRegistrationForm() {
    // Logic to load the user registration form UI
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
      <!-- Your registration form UI components go here -->
      <h2>User Registration</h2>
      <form onsubmit="registerUser(event)">
        <!-- Add registration form fields -->
        <button type="submit">Register</button>
      </form>
    `;
  }
  
  function loadDepositForm() {
    // Logic to load the deposit form UI
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
      <!-- Your deposit form UI components go here -->
      <h2>Deposit Funds</h2>
      <form onsubmit="depositFunds(event)">
        <!-- Add deposit form fields -->
        <button type="submit">Deposit</button>
      </form>
    `;
  }
  
  // Add more functions for other UI components as needed
  
  function registerUser(event) {
    // Logic to handle user registration
    event.preventDefault();
    // Use fetch or XMLHttpRequest to send registration data to the backend
    // After successful registration, you can navigate to the dashboard or display a success message
    loadDashboard();
  }
  
  function depositFunds(event) {
    // Logic to handle deposit funds
    event.preventDefault();
    // Use fetch or XMLHttpRequest to send deposit data to the backend
    // After successful deposit, you can navigate to the dashboard or display a success message
    loadDashboard();
  }
  
  // Add more functions for handling other actions

  //communication with backend
  async function registerUser(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value; // Replace with actual form field IDs
  
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      if (response.ok) {
        console.log('User registered successfully');
        loadDashboard(); // Or redirect to the dashboard
      } else {
        const data = await response.json();
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  