var resourceJSON;

async function initResources() {
    try {
        const response = await fetch("/tsa2026/resource/resources.json");
        resourceJSON = await response.json();

        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');

        if (query && window.location.pathname.includes('/search/')) {
            filterBySearch(query);
        } else if (window.location.pathname.includes('/browse/')) {
            renderResources(resourceJSON);
        } else {
            // Homepage Spotlight: 3 Random
            const spotlight = [...resourceJSON].sort(() => 0.5 - Math.random()).slice(0, 3);
            renderResources(spotlight);
        }
    } catch (e) { console.error("Could not load resources:", e); }
}

// THE FUNCTION CALLED BY YOUR BUTTONS: onclick="filterResourcesByTag('event')"
function filterResourcesByTag(tag, newest = true) {
    if (!resourceJSON) return;
    
    let filtered = tag === 'all' || !tag 
        ? resourceJSON 
        : resourceJSON.filter(res => res.tags.includes(tag));

    if (newest) filtered = [...filtered].reverse();
    renderResources(filtered);
}

function filterBySearch(query) {
    const results = resourceJSON.filter(res => 
        res.name.toLowerCase().includes(query.toLowerCase()) ||
        res.description.toLowerCase().includes(query.toLowerCase())
    );
    renderResources(results);
}

function renderResources(data) {
    const container = qs("#event-container");
    if (!container) return;
    
    container.innerHTML = data.map((item, index) => {
        // Calculate correct ID based on master list index
        const originalIndex = resourceJSON.indexOf(item);
        return `
            <div class="filtered-event">
                <img src="${item.image || '/tsa2026/img/placeholder.jpg'}" class="filev-img">
                <div class="caption">
                    <a href="/tsa2026/resource/?id=${originalIndex}">${item.name}</a>
                </div>
            </div>`;
    }).join('');
}

initResources();