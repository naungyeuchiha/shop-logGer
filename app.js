window.onload = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      document.getElementById("location").value = `${latitude}, ${longitude}`;
    });
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
};

async function submitData() {
  const shopName = document.getElementById("shopName").value;
  const note = document.getElementById("note").value;
  const location = document.getElementById("location").value;
  const photo = document.getElementById("photo").files[0];

  const formData = new FormData();
  formData.append("shopName", shopName);
  formData.append("note", note);
  formData.append("location", location);
  formData.append("photo", photo);

  await fetch("https://script.google.com/macros/s/AKfycbxlOSPWJQvgm4Y_4edeqsMVLTgufMwugPUBEHFX6le7lMZNuaPASbUS3aQA_vQT2S6g/exec", {
    method: "POST",
    body: formData
  });

  alert("✅ Submitted!");
}