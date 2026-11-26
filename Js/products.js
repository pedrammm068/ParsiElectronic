const container = document.getElementById("products_container")


   
  
fetch("../html/products.json") 
.then( res => {
    if (!res.ok) {
        throw new Error("فایل JSON پیدا نشد");
      }
     
      return res.json();
})

.then (
    products => {
        container.innerHTML = ""

products.forEach(product => {
    const CardHTML = `

    <div class="product-card rounded-2xl  bg-charcoal red:bg-ice/95 red:border-charcoal/25 border border-b-gray-100 shadow-lg hover:shadow-2xl flex flex-col 
overflow-hidden group transition duration-300">
<a href="./product-id.html?id=${product.id}" class="block">
<div class="p-4 h-56  bg-charcoal red:bg-ice/95 red:border-charcoal/25 flex items-center justify-center relative">

    <img loading="lazy" class="max-h-full transition duration-500 object-contain group-hover:scale-110" src="${product.image}" alt="${product.title}">

</div>
</a>
<div class="p-5 flex flex-col grow">


              <span class="text-lg font-bold text-white red:text-electric-red">مشخصات:</span>
<a href="./product-id.html?id=${product.id}">
     <h3 class="text-lg font-bold mb-2 red:text-electric-red text-white leading-snug">${product.title}</h3>      
</a>
              <div class="flex items-center justify-between mt-auto mb-4">
              <div class="flex  items-center justify-center text-center gap-2 ">
              <span class="text-lg font-bold red:text-electric-red text-white">قیمت:</span>
              <span class="text-lg font-bold red:text-electric-red text-white">${product.price}</span>
              </div>
              <span class="text-sm red:text-charcoal text-green-500">${product.status}</span>
              </div>

              <div class="flex gap-4 w-full md:flex-col">
  
  <div class="cursor-pointer w-1/2 bg-electric red:bg-electric-red md:w-full red:text-ice red:hover:bg-[#d60007] md:hidden text-center transition duration-300 hover:bg-[#0066D6] font-bold text-white py-4  rounded-xl ">
    <a href="./product-id.html?id=${product.id}" class="">دیدن جزیات محصول</a>
  </div>


  <button  data-id="${product.id}"
  data-name="${product.title}"
  data-price="${product.price.replace(/,/g, '')}"
  data-image="${product.image}"
  class="add-to-cart-btn  md:w-full w-1/2 cursor-pointer bg-electric red:bg-electric-red red:text-ice red:hover:bg-[#d60007] text-center transition duration-300 hover:bg-[#0066D6] font-bold text-white py-4 rounded-xl">
                 
  افزودن به سبد خرید
  
  </button>
  
</div>

            </div>

</div>


    
    
    `;
    container.innerHTML += CardHTML
});

    })
    .catch(error => {
        console.error("خطا در دریافت محصولات:", error);
      container.innerHTML = `<p class="text-center col-span-full text-red-500">خطا در بارگذاری محصولات.</p>`;
      
    })

