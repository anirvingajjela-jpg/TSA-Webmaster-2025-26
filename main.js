/**
 * main.js - Global Utilities
 */

// Shorthand selectors used across the whole project
const qs = q => document.querySelector(q);
const qsa = q => document.querySelectorAll(q);

document.addEventListener("DOMContentLoaded", () => {
    // 1. MAKE SEARCH BUTTONS WORK
    const searchBtn = qs("#search-btn");
    const searchBar = qs("#search-bar");

    if (searchBtn && searchBar) {
        searchBtn.onclick = () => {
            const query = searchBar.value.trim();
            if (query !== "") {
                window.location.href = `/tsa2026/search/?q=${encodeURIComponent(query)}`;
            }
        };
        // Allow pressing "Enter" to search
        searchBar.onkeypress = (e) => { if (e.key === "Enter") searchBtn.click(); };
    }

    // 2. MAKE COPY LINK BUTTON WORK
    const copyBtn = qs("#copy-link-btn");
    if (copyBtn) {
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(window.location.href);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = "Copied!";
            setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
        };
    }
});