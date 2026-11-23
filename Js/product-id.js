const conteiner = document.getElementById("product-id")
const url = new URLSearchParams(window.location.search)
const productId = url.get("id")
function ShowProduct() {


    if(!conteiner) {
        return
    }
    
    
    if(!productId) {
        conteiner.innerHTML = `
        <p class="text-red-500 text-center col-span-full text-lg">محصولی یافت نشد.</p>
        `
    return
    }
    fetch("../html/products.json") 
    
    .then (res => {
        if(!res.ok) {
            throw new Error("فایل جیسون پیدا نشد")
        }
        return res.json()
    })
    
    .then(res => {
        const product = res.find(e => e.id == productId)
        
        if (!product) {
    conteiner.innerHTML = `
    <p class="text-red-500 text-center col-span-full text-lg">محصولی با این شناسه یافت نشد.</p>
    `
    return
        }
    
    conteiner.innerHTML = `
    
     <div class="bg-charcoal rounded-3xl p-8 flex items-center justify-center shadow-2xl relative overflow-hidden group h-[400px] ">
                        <div class="absolute inset-0 red:bg-ice/90 bg-[#1683FF]/10 group-hover:bg-[#1683FF]/20 red:group-hover:bg-electric-red/80 transition duration-500"></div>
                        <img src="${product.image}" alt="${product.title}" class="max-h-full max-w-full object-contain relative z-10 transition duration-500 group-hover:scale-105">
                    </div>
    
                        <div class="flex flex-col justify-center py-6">
                        
                        <span class="text-electric red:text-electric-red text-center font-bold mb-2">Parsi Electronic</span>
                        
                        <h1 class="text-3xl md:text-4xl font-bold text-ice red:text-gray-800 mb-4 leading-tight">${product.title}</h1>
                        
                        <p class="red:text-gray-500 text-ice text-sm md:text-base leading-relaxed mb-8 text-justify">
                            ${product.description || "توضیحاتی برای این محصول ثبت نشده است."}
                        </p>
    
                        <div class="border-t border-b  border-gray-200 py-6 mb-8 flex items-center justify-between">
                            <div class="flex flex-col">
                                <span class="text-sm text-ice red:text-gray-500">وضعیت:</span>
                                <span class="red:text-charcoal text-green-500 font-bold">${product.status}</span>
                            </div>
                            <div class="flex gap-4 text-left">
                            <span class="text-2xl text-ice red:text-gray-500">قیمت:</span>
                            <span class="text-3xl font-bold red:text-electric-red text-gray-200">${product.price} 
                            <span class="text-base font-normal text-ice red:text-gray-500">تومان</span>
                            </span>
                            </div>
                        </div>
    
          <button 
                            class="add-to-cart-btn w-full cursor-pointer bg-electric red:bg-electric-red red:hover:bg-electric-red/50 text-center transition duration-300 hover:bg-[#0066D6] font-bold text-white py-4 rounded-xl shadow-lg text-lg flex items-center justify-center gap-3"
                            data-id="${product.id}"
                            data-name="${product.title}"
                            data-price="${product.price.replace(/,/g, '')}"
                            data-image="${product.image}">
                            افزودن به سبد خرید
                        </button>
    
                    </div>
    
    
    `
    
    
    
    })
    .catch (error => {
        console.error("خطا در دریافت اطلاعات محصول:", error)
     container.innerHTML = `<p class="text-red-500 text-center col-span-full text-lg">خطا در بارگذاری اطلاعات محصول.</p>`
    }
    )
}
ShowProduct()


