tailwind.config = {
	theme: {
		extend: {
			colors: {
				primary: "#1a1f3c",
				secondary: "#000000",
			},
			borderRadius: {
				none: "0px",
				sm: "4px",
				DEFAULT: "8px",
				md: "12px",
				lg: "16px",
				xl: "20px",
				"2xl": "24px",
				"3xl": "32px",
				full: "9999px",
				button: "8px",
			},
		},
	},
};

const navbar = document.getElementById("navbar");
const anggotaSection = document.getElementById("anggota");
const tentangSection = document.getElementById("tentang");
const scrollBtn = document.getElementById("scrollToTopBtn");
const heroSection = document.getElementById("hero");

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

// Toggle dropdown
menuBtn.addEventListener("click", () => {
	mobileMenu.classList.toggle("max-h-0");
	mobileMenu.classList.toggle("py-3"); // agar animasi smooth saat terbuka
});

// Close dropdown saat klik di luar
document.addEventListener("click", (e) => {
	if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
		// Pastikan menu sedang terbuka
		if (!mobileMenu.classList.contains("max-h-0")) {
			mobileMenu.classList.add("max-h-0");
			mobileMenu.classList.remove("py-3");
		}
	}
});
document.querySelectorAll("#mobile-menu a").forEach((link) => {
	link.addEventListener("click", () => {
		mobileMenu.classList.add("max-h-0");
		mobileMenu.classList.remove("py-3");
	});
});

window.addEventListener("scroll", () => {
	const anggotaTop = tentangSection.offsetTop;

	if (window.scrollY > anggotaTop - 100) {
		scrollBtn.classList.remove("hidden");
	} else {
		scrollBtn.classList.add("hidden");
	}
});

// Scroll listener untuk ubah warna navbar
window.addEventListener("scroll", () => {
	const heroBottom = heroSection.offsetHeight;
	const scrollY = window.scrollY;

	if (scrollY > heroBottom - 80) {
		navbar.classList.remove("text-white");
		navbar.classList.add("text-gray-800");
		menu.classList.remove("text-white");
	} else {
		navbar.classList.add("text-white");
		navbar.classList.remove("text-gray-800");
		menu.classList.add("text-white");
	}
});
