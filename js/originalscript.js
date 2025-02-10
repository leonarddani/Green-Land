async function fetchCategoriesData() {
    try {
    const categoriesResponse = await fetch("https://dummyjson.com/products/categories"
    );
    const categories = await categoriesResponse.json();
    console.log("Categories:", categories);

    const productsResponse = await fetch("https://dummyjson.com/products");
    const products = await productsResponse.json();
    console.log("Products:", products);

    displayProductData(categories, products);
    } catch (error) {
    console.log("Error fetching data:", error);
    }
}
fetchCategoriesData();
