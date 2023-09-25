// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach((link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPageId = link.getAttribute('href').substring(1);
            const targetPage = document.getElementById(targetPageId);

            if (targetPage) {
                // Hide all pages
                document.querySelectorAll('.page').forEach((page) => {
                    page.style.opacity = 0;
                });

                // Show the target page
                targetPage.style.opacity = 1;

                // Optionally, scroll to the top of the page
                window.scrollTo(0, 0);
            }
        });
    });
});
