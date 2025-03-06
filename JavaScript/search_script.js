
$(document).ready(function() {
    // Simulate a list to search within
    // This will ultimately query the database once it is setup
    const biomes = [
        {name: "Blood Kelp Caves", type: "Biome", image: "Biomes/Biome%20Images/blood_kelp_caves.webp"},
        {name: "Blood Kelp Zone", type: "Biome", image: "Biomes/Biome%20Images/blood_kelp_zone.webp"},
        {name: "Bone Field Caves", type: "Biome", image: "Biomes/Biome%20Images/bone_field_caves.webp"},
        {name: "Bulb Zone", type: "Biome", image: "Biomes/Biome%20Images/bulb_zone.webp"},
        {name: "Bulb Zone Caves", type: "Biome", image: "Biomes/Biome%20Images/bulb_zone_caves.webp"},
        {name: "Crag Field", type: "Biome", image: "Biomes/Biome%20Images/crag_field.webp"},
        {name: "Crash Zone", type: "Biome", image: "Biomes/Biome%20Images/crash_zone.webp"},
        {name: "Crash Zone Mesas", type: "Biome", image: "Biomes/Biome%20Images/crash_zone_mesas.webp"},
        {name: "Crater Edge", type: "Biome", image: "Biomes/Biome%20Images/crater_edge.webp"},
        {name: "Deep Grand Reef", type: "Biome", image: "Biomes/Biome%20Images/deep_grand_reef.webp"},
        {name: "Deep Sparse Reef", type: "Biome", image: "Biomes/Biome%20Images/deep_sparse_reef.webp"},
        {name: "Dunes", type: "Biome", image: "Biomes/Biome%20Images/dunes.webp"},
        {name: "Dunes Caves", type: "Biome", image: "Biomes/Biome%20Images/dunes_caves.webp"},
        {name: "Floating Island", type: "Biome", image: "Biomes/Biome%20Images/floating_island.webp"},
        {name: "Grand Reef", type: "Biome", image: "Biomes/Biome%20Images/grand_reef.webp"},
        {name: "Grand Reef Caves", type: "Biome", image: "Biomes/Biome%20Images/grand_reef_caves.webp"},
        {name: "Grassy Plateaus", type: "Biome", image: "Biomes/Biome%20Images/grassy_plateaus.webp"},
        {name: "Grassy Plateaus Caves", type: "Biome", image: "Biomes/Biome%20Images/grassy_plateaus_caves.webp"},
        {name: "Inactive Lava Zone", type: "Biome", image: "Biomes/Biome%20Images/inactive_lava_zone.webp"},
        {name: "Inactive Lava Zone Corridor", type: "Biome", image: "Biomes/Biome%20Images/inactive_lava_zone_corridor.webp"},
        {name: "Jellyshroom Caves", type: "Biome", image: "Biomes/Biome%20Images/jellyshroom_caves.webp"},
        {name: "Kelp Forest", type: "Biome", image: "Biomes/Biome%20Images/kelp_forest.webp"},
        {name: "Kelp Forest Caves", type: "Biome", image: "Biomes/Biome%20Images/kelp_forest_caves.webp"},
        {name: "Lava Castle", type: "Biome", image: "Biomes/Biome%20Images/lava_castle.webp"},
        {name: "Lava Geyser", type: "Biome", image: "Biomes/Biome%20Images/lava_geyser.webp"},
        {name: "Lava Lakes", type: "Biome", image: "Biomes/Biome%20Images/lava_lakes.webp"},
        {name: "Lost River", type: "Biome", image: "Biomes/Biome%20Images/lost_river.webp"},
        {name: "Mountain Island", type: "Biome", image: "Biomes/Biome%20Images/mountain_island.webp"},
        {name: "Mountains", type: "Biome", image: "Biomes/Biome%20Images/mountains.webp"},
        {name: "Mountains Caves", type: "Biome", image: "Biomes/Biome%20Images/mountains_caves.webp"},
        {name: "Mushroom Forest", type: "Biome", image: "Biomes/Biome%20Images/mushroom_forest.webp"},
        {name: "Mushroom Forest Caves", type: "Biome", image: "Biomes/Biome%20Images/mushroom_forest_caves.webp"},
        {name: "Safe Shallows", type: "Biome", image: "Biomes/Biome%20Images/safe_shallows.webp"},
        {name: "Safe Shallows Caves", type: "Biome", image: "Biomes/Biome%20Images/safe_shallows_caves.webp"},
        {name: "Sea Treader's Path", type: "Biome", image: "Biomes/Biome%20Images/sea_treaders_path.webp"},
        {name: "Sea Treader's Tunnel Caves", type: "Biome", image: "Biomes/Biome%20Images/sea_treaders_tunnel_caves.webp"},
        {name: "Sparse Reef", type: "Biome", image: "Biomes/Biome%20Images/sparse_reef.webp"},
        {name: "Underwater Islands", type: "Biome", image: "Biomes/Biome%20Images/underwater_islands.webp"},
        {name: "Underwater Islands Caves", type: "Biome", image: "Biomes/Biome%20Images/underwater_islands_caves.webp"},
    ]
    // Get params from url
    const input = $("#search_bar");
    const suggestionsCont = $("#suggested_results");

    // Function to search for query in given list
    function search(query) {
        if (!query) return [];

        return biomes.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    }

    // Function to format the Biome name to redirect to correct file
    function formatName(name) {
        return `Biomes/${name.toLowerCase().replace(/\s+/g, '_')}.html`;
    }

    // Handle search button click
    // Pass information to form submission handling function
    $("form.search_form").on("submit", function(event) {
        event.preventDefault();
        const query = input.val().trim();
        handleSearchSubmission(query);
    })

    // Function to handle if search is submitted
    function handleSearchSubmission(query) {
        const results = search(query);

        if (results.length > 0) {
            // Grab params and add to url
            const resultsParam = encodeURIComponent(JSON.stringify(results));
            window.location.href = `search_results.html?results=${resultsParam}`;
        }
        else {
            alert("No results found");
        }
    }

    input.on("input", function() {
        const query = input.val().trim();

        if (query) {
            const results = search(query);

            // Clear any existing suggestions
            suggestionsCont.empty();

            // Format each suggestion
            if (results.length > 0) {
                results.forEach(item => {
                    const suggested_item = $(`
                    <div class="suggested_item">
                        <a href="${formatName(item.name)}">${item.name}</a>
                    </div>
                    `);
                    suggestionsCont.append(suggested_item);
                });
                suggestionsCont.show();
            }
            else {
            suggestionsCont.html("<p> No suggestions.</p>");
            }
        }
        else {
            suggestionsCont.empty();
            suggestionsCont.hide();
        }
    });

    // Close suggestion list if user clicks out
    $(document).click(function(event) {
        if (!$(event.target).closest(".search_form").length) {
            suggestionsCont.empty();
            suggestionsCont.hide();
        }
    });

    // For the search results page
    // Used to display results from search
    const resultsParam = new URLSearchParams(window.location.search).get('results');
    if (resultsParam) {
        // Get results
        const results = JSON.parse(decodeURIComponent(resultsParam));
        const resultsCont = $("#search_results");
        resultsCont.empty();

        // Format each result
        if (results.length > 0) {
            results.forEach(item => {
                const resultItem = $(`
                <div class="item">
                    <div class="item_pic">
                        <img src="${item.image}" alt="${item.name}" />
                    </div>
                    <div class="item_info">
                        <a href="${formatName(item.name)}" class="item_name">${item.name}</a>
                        <p class="item_type">${item.type}</p>
                    </div>
                </div>
                `);
                resultsCont.append(resultItem);
            });
        } else {
            resultsCont.html("<p class='no_results'>No results found.</p>");
        }
    }
});
