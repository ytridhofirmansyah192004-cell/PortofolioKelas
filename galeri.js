document.addEventListener("DOMContentLoaded", function () {
	// Lightbox functionality
	const lightbox = document.querySelector(".lightbox");
	const lightboxMedia = document.querySelector(".lightbox-media");
	const lightboxTitle = document.querySelector(".lightbox-title");
	const lightboxDescription = document.querySelector(".lightbox-description");
	const lightboxClose = document.querySelector(".lightbox-close");
	const galleryItems = document.querySelectorAll(".gallery-item");
	const scrollTopBtn = document.querySelector(".scroll-top");

	// Open lightbox
	galleryItems.forEach((item) => {
		item.addEventListener("click", function () {
			const media = this.querySelector("img, video");
			const title = media.getAttribute("data-title") || "Tidak Ada Judul";
			const description = media.getAttribute("data-description") || "Tidak ada deskripsi yang tersedia.";

			// Create a clone of the media
			const mediaClone = media.cloneNode(true);
			if (mediaClone.tagName === "VIDEO") {
				mediaClone.muted = false;
				mediaClone.autoplay = true;
				mediaClone.play();
			}

			// Clear previous content
			lightboxMedia.innerHTML = "";

			// Add the media to lightbox
			lightboxMedia.appendChild(mediaClone);

			// Set title and description
			lightboxTitle.textContent = title;
			lightboxDescription.textContent = description;

			// Show the lightbox
			lightbox.classList.add("active");
			document.body.style.overflow = "hidden";

			// If it's a video, play it
			if (media.tagName === "VIDEO") {
				mediaClone.play();
			}
		});
	});

	// Close lightbox
	lightboxClose.addEventListener("click", function () {
		lightbox.classList.remove("active");
		document.body.style.overflow = "auto";

		// Pause any playing video
		const video = lightboxMedia.querySelector("video");
		if (video) {
			video.pause();
		}
	});

	// Close lightbox when clicking outside content
	lightbox.addEventListener("click", function (e) {
		if (e.target === lightbox) {
			lightbox.classList.remove("active");
			document.body.style.overflow = "auto";

			// Pause any playing video
			const video = lightboxMedia.querySelector("video");
			if (video) {
				video.pause();
			}
		}
	});

	// Scroll to top button
	window.addEventListener("scroll", function () {
		if (window.pageYOffset > 300) {
			scrollTopBtn.classList.add("visible");
		} else {
			scrollTopBtn.classList.remove("visible");
		}
	});

	scrollTopBtn.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	// Auto-play videos in gallery when they become visible
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const video = entry.target.querySelector("video");
					if (video) {
						video.play();
					}
				} else {
					const video = entry.target.querySelector("video");
					if (video) {
						video.pause();
					}
				}
			});
		},
		{ threshold: 0.5 }
	);

	galleryItems.forEach((item) => {
		observer.observe(item);
	});
});
