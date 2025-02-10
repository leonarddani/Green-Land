async function fetchProducts() {
    
    const response =  await fetch("https://dummyjson.com/products");

    const products = await response.json();

    
    console.log("this is a text ", products.products[0].reviews);
    

    

}

// document.addEventListener("DOMContentLoaded", () => {
//     fetchProducts();
//   });
  
fetchProducts()