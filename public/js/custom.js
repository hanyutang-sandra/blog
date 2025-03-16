document.addEventListener("DOMContentLoaded", function() {
    const categoryFilter = document.getElementById("category-filter");
    const posts = document.querySelectorAll(".post");
  
    function filterPosts() {
      const selectedCategory = categoryFilter.value;
      if (selectedCategory == "all") {
        posts.forEach(pst => pst.style.display = "block")
        return
      }
      
      posts.forEach((pst) => {
        const postCategories = pst.querySelector(".post-category").textContent.toLowerCase()
        const categoryMatch = postCategories === selectedCategory
        
        if (categoryMatch) {
          pst.style.display = "block";
        } else {
          pst.style.display = "none";
        }
      });
    }

    categoryFilter.addEventListener("change", filterPosts);
})