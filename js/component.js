function toggleDropdown() {
    let dropdown = document.getElementById("dropdownMenu");
    let arrow = document.getElementById("dropdown-arrow");
    
    dropdown.classList.toggle("show");
    arrow.classList.toggle("rotate");
}

// Menutup dropdown saat klik di luar
document.addEventListener("click", function (event) {
    let dropdown = document.getElementById("dropdownMenu");
    let button = document.querySelector(".lang-btn");
    let arrow = document.getElementById("dropdown-arrow");

    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
        arrow.classList.remove("rotate");
    }
});

// Mengubah bahasa
function changeLanguage(lang) {
    document.getElementById("selected-lang").textContent = lang;
    document.getElementById("dropdownMenu").classList.remove("show");
    document.getElementById("dropdown-arrow").classList.remove("rotate");
}

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    });
  });