document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const cards = document.querySelectorAll(".card");
    const noResults = document.getElementById("noResults");

    function filterCards() {
        if (!searchInput) return;
        const term = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.querySelector("h3") ? card.querySelector("h3").innerText.toLowerCase() : "";
            const meta = card.querySelector(".card-meta") ? card.querySelector(".card-meta").innerText.toLowerCase() : "";
            
            if (term === "" || title.includes(term) || meta.includes(term)) {
                card.style.display = "flex";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", filterCards);
    }
    
    if (searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                filterCards();
            } else {
                // Live filter as you type
                filterCards();
            }
        });
    }
});
