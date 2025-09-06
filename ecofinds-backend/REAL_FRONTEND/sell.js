// sell.js
import { db, storage } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

document.getElementById("sellForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const trade = document.getElementById("trade").value;
  const file = document.getElementById("image").files[0];

  try {
    // 1. Upload image
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    // 2. Save product to Firestore
    await addDoc(collection(db, "products"), {
      name,
      description,
      price,
      category,
      trade,
      imageUrl,
      createdAt: new Date()
    });

    alert(" Product posted successfully!");
    e.target.reset();
  } catch (err) {
    console.error("Error posting product:", err);
    alert(" Something went wrong while posting the product.");
  }
});
