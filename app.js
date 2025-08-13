window.onload = () => {
  // Auto-fill GPS location
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      document.getElementById("location").value = `${latitude}, ${longitude}`;
    });
  }

  // Register service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }

  // Attach submit event
  document.getElementById("submitBtn").addEventListener("click", async () => {
    const shopName = document.getElementById("shopName").value;
    const note = document.getElementById("note").value;
    const location = document.getElementById("location").value;
    const photo = document.getElementById("photo").files[0];

    if (!shopName || !location || !photo) {
      alert("Please fill all required fields and select a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("shopName", shopName);
    formData.append("note", note);
    formData.append("location", location);
    formData.append("photo", photo);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxlOSPWJQvgm4Y_4edeqsMVLTgufMwugPUBEHFX6le7lMZNuaPASbUS3aQA_vQT2S6g/exec", {
        method: "POST",
        body: formData
      });
      alert("✅ Submitted successfully!");
    } catch (error) {
      alert("❌ Submission failed. Please try again.");
      console.error(error);
    }
  });
};
