function d3Chart(starterMons) {
    const margin = {
        top: 40,
        bottom: 10,
        left: 120,
        right: 20
    };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    
    // Creates sources <svg> element
    const svg = d3.select(".starterStats")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    
    // Group used to enforce margin
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .attr("id", "diagram");
    
    // Global variable for all data
    let data = starterMons;
    
    // Scales setup
    const xscale = d3.scaleLinear().range([0, width]);
    const yscale = d3.scaleBand().rangeRound([0, height]).paddingInner(0.1);
    
    // Axis setup
    const xaxis = d3.axisTop().scale(xscale);
    const g_xaxis = g.append("g").attr("class", "x axis");
    const yaxis = d3.axisLeft().scale(yscale);
    const g_yaxis = g.append("g").attr("class", "y axis");
    
    ///////////////////////
    update(data);
    console.log(data);
    
    function update(new_data) {
        //update the scales
        xscale.domain([0, d3.max(new_data, (d) => d.totaal)]);
        yscale.domain(new_data.map((d) => d.naam));
        //render the axis
        g_xaxis.transition().call(xaxis);
        g_yaxis.transition().call(yaxis);
    
        const rect = g.selectAll("rect").data(new_data, (d) => d.totaal).join(
            // ENTER 
            // new elements
            (enter) => {
                const rect_enter = enter.append("rect").attr("x", 0);
                rect_enter.append("title");
                return rect_enter;
            },
            // UPDATE
            // update existing elements
            (update) => update,
            // EXIT
            // elements that aren't associated with data
            (exit) => exit.remove()
        );
    
        // ENTER + UPDATE
        // both old and new elements
        rect.transition()
            .attr("height", yscale.bandwidth())
            .attr("width", (d) => xscale(d.totaal))
            .attr("y", (d) => yscale(d.naam))
            .attr("class", (d) => d.type);
    
        rect.select("title").text((d) => d.naam);
    }
    
    //interactivity
    d3.select("#filter-1st-only").on("change", function () {
        // This will be triggered when the user selects or unselects the checkbox
        const checked = d3.select(this).property("checked");
        if (checked === true) {
            // Checkbox was just checked
    
            // Keep only data element which is the first evolution 
            const filtered_data = data.filter((d) => d.evo === 1);
    
            update(filtered_data); // Update the chart with the filtered data
        } else {
            // Checkbox was just unchecked
            update(data); // Update the chart with all the data we have
        }
    });
    
    d3.select("#filter-2nd-only").on("change", function () {
        // This will be triggered when the user selects or unselects the checkbox
        const checked = d3.select(this).property("checked");
        if (checked === true) {
            // Checkbox was just checked
    
            // Keep only data element which is the first evolution 
            const filtered_data = data.filter((d) => d.evo === 2);
    
            update(filtered_data); // Update the chart with the filtered data
        } else {
            // Checkbox was just unchecked
            update(data); // Update the chart with all the data we have
        }
    });
    
    d3.select("#filter-3rd-only").on("change", function () {
        // This will be triggered when the user selects or unselects the checkbox
        const checked = d3.select(this).property("checked");
        if (checked === true) {
            // Checkbox was just checked
    
            // Keep only data element which is the first evolution 
            const filtered_data = data.filter((d) => d.evo === 3);
    
            update(filtered_data); // Update the chart with the filtered data
        } else {
            // Checkbox was just unchecked
            update(data); // Update the chart with all the data we have
        }
    });
}