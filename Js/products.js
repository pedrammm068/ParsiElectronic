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

    <div class="product-card rounded-2xl bg-[#171717] border border-b-gray-100 shadow-lg hover:shadow-2xl flex flex-col 
overflow-hidden group transition duration-300">

<div class="p-4 h-56 bg-[#222222] flex items-center justify-center relative">

    <img class="max-h-full transition duration-500 object-contain group-hover:scale-110" src="${product.image}" alt="${product.title}">

</div>

<div class="p-5 flex flex-col flex-grow">


              <span class="text-lg font-bold text-white">مشخصات:</span>

     <h3 class="text-lg font-bold mb-2 text-white leading-snug">${product.title}</h3>
             

              <div class="flex items-center justify-between mt-auto mb-4">
              <span class="text-sm text-green-500">${product.status}</span>
              <div class="flex items-center justify-center text-center gap-2 ">
              <span class="text-lg font-bold text-white">قیمت:</span>
              <span class="text-lg font-bold text-white">${product.price}</span>
              </div>
              </div>

              <button class="w-full bg-[#1683FF] text-center transition duration-300 hover:bg-[#0066D6] font-bold text-white py-4 rounded-xl">
                افزودن به سبد خرید
              </button>
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