// Tampilkan tombol saat discroll ke bawah
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
	if (window.scrollY > 200) {
		scrollBtn.classList.remove("hidden");
	} else {
		scrollBtn.classList.add("hidden");
	}
});

// Scroll smooth ke atas saat tombol diklik
scrollBtn.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});
