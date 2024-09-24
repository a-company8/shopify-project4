document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;  // Tracks the current page number
    const loadMoreBtn = document.getElementById("load-more-btn");
    const productGrid = document.querySelector(".products-grid");
    const productSection = document.querySelector(".custom-collection-section");
    const moreButtonProducts = document.querySelector(".add-more-products");
  
    // Get the collection handle and products per row from the data attributes
    const collectionHandle = productSection.getAttribute("data-collection-handle");
    const productsPerRow = productSection.getAttribute("data-products-per-row");  // Read products per row from data attribute
  
    // Load more products when "Load More" button is clicked
    loadMoreBtn.addEventListener("click", function () {
      currentPage++;  // Increment the page number
  
      // AJAX request to fetch more products
      fetch(`/collections/${collectionHandle}?view=ajax&page=${currentPage}&limit=${productsPerRow}`)
        .then((response) => response.text())
        .then((html) => {
        
          const newProducts = document.createElement("div");

          
          newProducts.innerHTML = html;
  
          // Append the new products to the product grid
          while (newProducts.firstChild) {
            moreButtonProducts.appendChild(newProducts.firstChild);
          }
        })
        .catch((error) => console.error("Error loading more products:", error));
    });
  });
  

  

//   add to cart functions
function myFunction(productTitle) {

    const productId = fetch(window.Shopify.routes.root + 'products/'+productTitle+'.js')
   .then(response => response.json()).then(response =>{
     let formData = {
     'items': [{
     'id': response.variants[0].id,
     'quantity': 1
      }]
     };
     fetch(window.Shopify.routes.root + 'cart/add.json', {
     method: 'POST',
     headers: {
     'Content-Type': 'application/json'
     },
     body: JSON.stringify(formData)
     })
     .then(response => {
     return response.json();
     })
     .catch((error) => {
     console.error('Error:', error);
     });
   });
      
   }
  

   