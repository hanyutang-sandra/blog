document.addEventListener("DOMContentLoaded", function() {
    const categoryFilter = document.getElementById("category-filter");
    const paginatedPostsContainer = document.getElementById("paginated-posts");
    const allPostsContainer = document.getElementById("all-posts");
    const paginationContainer = document.querySelector(".pagination");

    function filterPosts() {
      const selectedCategory = categoryFilter.value;

      if (selectedCategory === "all") {
        // Show paginated view, hide all posts view
        if (paginatedPostsContainer) paginatedPostsContainer.style.display = "block";
        if (allPostsContainer) allPostsContainer.style.display = "none";
        if (paginationContainer) paginationContainer.style.display = "block";
      } else {
        // Show all posts view for filtering, hide paginated view
        if (paginatedPostsContainer) paginatedPostsContainer.style.display = "none";
        if (allPostsContainer) allPostsContainer.style.display = "block";
        if (paginationContainer) paginationContainer.style.display = "none";

        // Filter posts in all-posts container
        const allPosts = allPostsContainer.querySelectorAll(".post");
        allPosts.forEach((pst) => {
          const postCategories = pst.querySelector(".post-category").textContent.toLowerCase().trim();
          const categoryMatch = postCategories === selectedCategory;

          if (categoryMatch) {
            pst.style.display = "block";
          } else {
            pst.style.display = "none";
          }
        });
      }
    }

    if (categoryFilter) {
      categoryFilter.addEventListener("change", filterPosts);
    }
})