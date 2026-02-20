$(document).ready(() => {
    // Use event delegation on the container for better performance
    $(".addheadingbutton")
        // When select changes, create button
        .on("change", ".headingboxheadle", function() {
            const heading = $(this).val();
            
            if (heading) {
                $(".addheadingbutton").html(`
                    <button class="headingBoxone active">
                        ${heading}
                    </button>
                `);
            }
        })
        // When button is clicked, show select again
        .on("click", ".headingBoxone", function() {
            $(".addheadingbutton").html(`
                <select class="headingBox headingboxheadle">
                    <option value="">Select heading...</option>
                    <option value="H1">H1</option>
                    <option value="H2">H2</option>
                    <option value="H3">H3</option>
                    <option value="H4">H4</option>
                    <option value="H5">H5</option>
                    <option value="H6">H6</option>
                </select>
            `);
        });
});