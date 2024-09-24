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
            productGrid.append(newProducts.firstChild);
                      }
        })
        .catch((error) => console.error("Error loading more products:", error));
    });
  });


//   //addc to cart function using Ajax
//   //does it work?

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.add-to-cart-btn').forEach(function(button){
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const productId = this.getAttribute('data-product-id');
      console.log(productId);
      fetch(window.Shopify.routes.root + 'products/'+productId+'.js')
  .then(response => response.json())
  .then(product =>{

    let formData = {
      'items': [{
        'id': 'product.variants[0].id',
        'quantity': 1
      }]
    }
    fetch(window.Shopify.routes.root + 'cart/add.json', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                    })
                    .then(response => {
                       const cartCounter = document.querySelector('.cart-counter');  // Assuming this is the class of your cart counter
                        if (cartCounter) {   cartCounter.textContent = cart.item_count;
                        }// Update the counter with the total items in the cart
                    return response.json();
                    })
                    .catch((error) => {
                    console.error('Error:', error);
                    });
                  });
              }
  )
  

//   document.addEventListener('DOMContentLoaded', function() {
//     // Listen for clicks on any 'Add to Cart' buttons
//     document.querySelectorAll('.add-to-cart-btn').forEach(function(button) {
//       button.addEventListener('click', function(event) {
//         event.preventDefault();  // Prevent the default button behavior
//         const productId = this.getAttribute('data-product-id');
//         function updateCart () {
//             const productId = fetch(window.Shopify.routes.root + 'products/'+productId+'.js')
//             .then(response => response.json()).then(response =>{
//               let formData = {
//               'items': [{
//               'id': response.variants[0].id,
//               'quantity': 1
// }]
//               };
//               fetch(window.Shopify.routes.root + 'cart/add.json', {
//               method: 'POST',
//               headers: {
//               'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(formData)
//               })
//               .then(response => {
//                  const cartCounter = document.querySelector('.cart-counter');  // Assuming this is the class of your cart counter
//                   if (cartCounter) {   cartCounter.textContent = cart.item_count;
//                   }// Update the counter with the total items in the cart
//               return response.json();
//               })
//               .catch((error) => {
//               console.error('Error:', error);
//               });
//             });
//         }
//     // Function to update the cart counter
//     function updateCartCounter() {
//       // Send an AJAX request to get the current cart info
//       fetch('/cart.js')
//         .then(response => response.json())
//         .then(cart => {
//           // Find the cart counter element and update its text with the item count
//           const cartCounter = document.querySelector('.cart-count-bubble');
//           if (cartCounter) {
//             cartCounter.textContent = cart.item_count;  // Update the counter with the total items in the cart
//           }
//         })
//         .catch(error => {
//           console.error('Error updating cart counter:', error);
//         });
//     }
//   });
    //     // Send an AJAX request to add the product to the cart
    //     fetch('/cart/add.js', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //           id: productId,
    //           quantity: 1
    //         })
    //       })
    //       .then(response => response.json())
    //       .then(data => {
    //         // If the product was successfully added, update the cart counter
    //         updateCartCounter();
    //       })
    //       .catch(error => {
    //         console.error('Error adding product to cart:', error);
    //       });
    //     });
    //   });
    // })})
