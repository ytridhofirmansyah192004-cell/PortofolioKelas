document.addEventListener("DOMContentLoaded", () => {
	const $ = (sel) => document.querySelector(sel);
	const $$ = (sel) => document.querySelectorAll(sel);

	const lightbox = $(".lightbox");
	const lightboxMedia = $(".lightbox-media");
	const lightboxTitle = $(".lightbox-title");
	const lightboxDescription = $(".lightbox-description");
	const scrollTopBtn = $(".scroll-top");
	const galleryItems = $$(".gallery-item");

	// Open Lightbox
	galleryItems.forEach((item) => {
		item.addEventListener("click", () => {
			const media = item.querySelector("img, video");
			const clone = media.cloneNode(true);

			if (clone.tagName === "VIDEO") {
				Object.assign(clone, { muted: false, autoplay: true });
				clone.play();
			}

			lightboxMedia.innerHTML = "";
			lightboxMedia.appendChild(clone);
			lightboxTitle.textContent = media.dataset.title || "Tidak Ada Judul";
			lightboxDescription.textContent = media.dataset.description || "Tidak ada deskripsi yang tersedia.";
			lightbox.classList.add("active");
			document.body.style.overflow = "hidden";
		});
	});

	// Close Lightbox
	const closeLightbox = () => {
		lightbox.classList.remove("active");
		document.body.style.overflow = "auto";
		const video = lightboxMedia.querySelector("video");
		if (video) video.pause();
	};

	$(".lightbox-close").addEventListener("click", closeLightbox);
	lightbox.addEventListener("click", (e) => {
		if (e.target === lightbox) closeLightbox();
	});

	// Scroll To Top Button
	window.addEventListener("scroll", () => {
		scrollTopBtn.classList.toggle("visible", window.pageYOffset > 300);
	});
	scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

	// Auto Play/Pause Video on View
	const observer = new IntersectionObserver(
		(entries) =>
			entries.forEach(({ isIntersecting, target }) => {
				const video = target.querySelector("video");
				if (video) isIntersecting ? video.play() : video.pause();
			}),
		{ threshold: 0.5 }
	);

	galleryItems.forEach((item) => observer.observe(item));
});
