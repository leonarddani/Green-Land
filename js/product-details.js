async function fetchProducts() {
    const response = await fetch("https://dummyjson.com/products?limit=194");
    const productsData = await response.json();
     
    console.log("this is a test", productsData);
    console.log("this is a test",  productsData.products[0].reviews);
    // prductsDisplay(productsData.products);
    renderProductDescription(productsData.products)
    // 

}

function prductsDisplay(products){
    const productContainer = document.querySelector(".product-details");
        productContainer.innerHTML = `
            <h1 class="product-title">${products[0].title}</h1>
            <div class="product-list">

                <ul>
                    <li>

                        <span class="vlersimet"><i class="fa-solid fa-star"></i>${products[0].rating}</span>

                    </li>
                    <li>Garancioni: <span class="warranty">${products[0].warrantyInformation}</span></li>
                    <li>Kodi: <span class="sku-code">${products[0].sku}</span></li>

                </ul>
            </div>

            <span class="actual-price ">$259</span>
            <p class="discount-price  space">$${products[0].price}</p>
            <p class="">Sasia </p>
           <hr class="hr-line"> 
            
            <div class="product-quantity flex gap space">
               
                <button><i class="fa-solid fa-plus"></i></button>
                <span class="quantity">4</span>
                <button><i class="fa-solid fa-minus"></i></button>

                <p><span class="stock-quantity">${products[0].stock}</span>produkte ne stock</p>
                 
            </div>

            <div class="productt-btn">
                <button class="product-btn">Blej Tani </button>
                <button class="product-btn">add to card</button>
            </div>
    `
}

function renderReviews(reviews){
    const productReview = document.querySelector(".tab-3-content")
    productReview.innerHTML = "";

    reviews.forEach(review => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-review");
        productElement.innerHTML =  `
        <h2 class="review-coment">${review.comment}</h2>
                <span class="review-name">${review.reviewerName}</span>
                <span class="review-date">${review.date}</span>
                <div>${review.reviewerEmail}</div>
                <p>Rating <span>${review.rating}<i class="fa-solid fa-star"></i></span></p>
        `;
        productReview.appendChild(productElement)
    });
}

function renderProductDescription(des){
    const productReview = document.getElementById("tab-1-content")
    productReview.innerHTML = `
        <p class="">${des[0].description}</p> 
    `;
}





fetchProducts();


const tab1 = document.querySelector('.tab-1');
const tab2 = document.querySelector('.tab-2');
const tab3 = document.querySelector('.tab-3');

const tab1Content = document.querySelector('.tab-1-content');
const tab2Content = document.querySelector('.tab-2-content');
const tab3Content = document.querySelector('.tab-3-content');

tab2Content.style.display = 'none';
tab3Content.style.display = 'none';

function resetTabs() {
    tab1Content.style.display = 'none';
    tab2Content.style.display = 'none';
    tab3Content.style.display = 'none';

    tab1.classList.remove('active');
    tab2.classList.remove('active');
    tab3.classList.remove('active');
}

tab1.addEventListener('click', () => {
    resetTabs(); 
    tab1Content.style.display = 'block'; 
    tab1.classList.add('active'); 
});


tab2.addEventListener('click', () => {
    resetTabs(); 
    tab2Content.style.display = 'block'; 
    tab2.classList.add('active'); 
});


tab3.addEventListener('click', () => {
    resetTabs(); 
    tab3Content.style.display = 'block'; 
    tab3.classList.add('active'); 
});


tab1.classList.add('active');
tab1Content.style.display = 'block'; 

tab2Content.style.display = 'none';
tab3Content.style.display = 'none';


