if (document.querySelector(".sell-form")) {
  const form = document.querySelector(".sell-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const trade = document.getElementById("trade").value;

    if (!name || !description || !price || !category) {
      alert("Please fill all required fields ❌");
      return;
    }

    // Fetch existing products or start fresh
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Add new product
    products.push({
      name,
      description,
      price,
      category,
      trade,
      seller: localStorage.getItem("ecoFindsName") || "Anonymous",
      imageUrl: "" // you can hook this up later
    });

    // Save back to localStorage
    localStorage.setItem("products", JSON.stringify(products));

    alert(`✅ Your product "${name}" has been posted!`);
    window.location.href = "buy.html"; // Redirect to buy page
  });
}
