document.addEventListener('DOMContentLoaded', function () {
    console.log("Assignment project started.");

    // getting the input elements we have for search, category and event card
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const eventCards = document.querySelectorAll('.event-card');

    // Creating a "No events found" message when the user search and no event is found
    const noEventMessage = document.createElement('p');
    noEventMessage.textContent = "No events found.";
    noEventMessage.style.textAlign = "center";
    noEventMessage.style.color = "#888";
    noEventMessage.style.marginTop = "20px";
    noEventMessage.style.display = "none";

    // Adding it to the event list section
    const eventList = document.querySelector('.event-list');
    if (eventList) {
        eventList.appendChild(noEventMessage);
    } else {
        console.error("'.event-list' not found!");
        return;
    }

    // main function to filter between the event cards if the user search for an event
    function searchEvents() {
        const searchWords = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value.toLowerCase();
        let visibleCount = 0;

        eventCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p:last-child').textContent.toLowerCase();

            const categoryPara = Array.from(card.querySelectorAll('p')).find(p =>
                p.innerText.toLowerCase().includes('category:')
            );

            let category = '';
            if (categoryPara) {
                category = categoryPara.innerText.toLowerCase().replace('category:', '').trim();
            }

            const searchMatches = title.includes(searchWords) || description.includes(searchWords);
            const categoryMatches = selectedCategory === '' || category === selectedCategory;

            if (searchMatches && categoryMatches) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Showing the "No events found" message if no event card found
        noEventMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Listening to input changes
    searchInput.addEventListener('input', searchEvents);
    categorySelect.addEventListener('change', searchEvents);
});
