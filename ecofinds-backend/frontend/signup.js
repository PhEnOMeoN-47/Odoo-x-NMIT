document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const message = document.getElementById("message");

  console.log("signup.js loaded");
  console.log("message element:", message);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submit clicked");

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();
      console.log("Response from backend:", data, "res.ok:", res.ok);

      if (res.ok) {
        message.textContent = data.message; // Success message
        message.style.color = "green";
      } else {
        message.textContent = data.error;   // Error message
        message.style.color = "red";
      }

    } catch (err) {
      message.textContent = "Server error";
      message.style.color = "red";
      console.error(err);
    }
  });
});
