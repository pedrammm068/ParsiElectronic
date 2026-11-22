const cartBtn = document.getElementById("cart-btn")
const cartsidebar = document.getElementById("cart-sidebar")
const cartover = document.getElementById("cart-over")
const closcart = document.getElementById("clos-cart")
const addtocart = document.querySelectorAll(".add-to-cart-btn")
const toast = document.getElementById("toast")
 const cartconteiner = document.getElementById("cart-item-conteiner")
 const allprice = document.getElementById("cart-all-price")
function OpenCart () {
    if(cartsidebar) {
        cartsidebar.classList.remove("translate-x-full")

    }

    if (cartover) {
cartover.classList.remove("hidden")
    }

    document.body.style.overflow = "hidden"
}

function Clos () {
    if(cartsidebar) {
            cartsidebar.classList.add("translate-x-full")
    }

    if (cartover) {
cartover.classList.add("hidden")
    }

        document.body.style.overflow = "auto"
}

if(cartBtn) {
    cartBtn.addEventListener("click" , OpenCart)
}

if(closcart) {
    closcart.addEventListener("click" , Clos)
}

if(cartover) {
    cartover.addEventListener("click" , Clos)
}


function ShowToset(mas , type = "error") {
if(!toast) return

const toastshow = document.createElement("div")

 const bgColor = type === "error" ? "bg-red-500/90" : "bg-green-500/90";
const icon = type === "error" ? 
`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>` :
       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    toastshow.className = `${bgColor} backdrop-blur-md text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 translate-y-10 opacity-0 font-bold text-sm min-w-[300px]`;
    
    toastshow.innerHTML = `
      ${icon}
      <span>${mas}</span>
    `;

    toast.appendChild(toastshow);

  setTimeout(() => {
      toastshow.classList.remove("translate-y-10", "opacity-0");
    }, 10);


      setTimeout(() => {
      toastshow.classList.add("translate-y-10", "opacity-0");
      setTimeout(() => toastshow.remove(), 300);
    }, 3000);

}





let cart = JSON.parse(localStorage.getItem("parsiCart") || "[]")



function SetAddCard() {

const addtocart = document.querySelectorAll(".add-to-cart-btn")


addtocart.forEach(Btn => {
    Btn.onclick  = e => {
        const logeedUs = JSON.parse(localStorage.getItem("parsiLogInUser"))
        if(!logeedUs) {
            ShowToset("برای خرید ابتدا باید وارد حساب کاربری شوید.", "error")
            setTimeout(() => {
                window.location.href = window.location.pathname.includes("/html/") ? "./login.html" : "./html/login.html"
            } , 2000)
            return
        }
        const BtnEl = e.currentTarget 
        const productID = BtnEl.getAttribute("data-id")
         const productName = BtnEl.getAttribute("data-name");
      const productPrice = parseInt(BtnEl.getAttribute("data-price"));
      console.log("قیمت خام:", productPrice);
      const productImage = BtnEl.getAttribute("data-image");
    
    
    
        const adding = cart.find((item) => item.id === productID)
        if (adding) {
            adding.quantity += 1

        } else {
            cart.push({id: productID, name: productName, price: productPrice, image: productImage, quantity: 1})
        }

        localStorage.setItem("parsiCart" , JSON.stringify(cart))
    
        OpenCart()
        renderCart();
        ShowToset("محصول به سبد خرید اضافه شد.", "success");
    }
});
}


function renderCart() {
   if(!cartconteiner || !allprice) {
    return
   }
   if(cart.length === 0) {
    cartconteiner.innerHTML = `<p class="mt-10 text-center text-gray-500">سبد خرید شما خالیه</p>`
    allprice.textContent = "تومان 0"
return
   }
   cartconteiner.innerHTML = ""
   let totalprice = 0

   cart.forEach((item) => {
    totalprice += item.price * item.quantity
    cartconteiner.innerHTML +=
`
        <div class="flex items-center justify-between bg-[#222222] p-3 rounded-lg border border-gray-700 w-full mb-3 overflow-hidden">
            
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain shrink-0">
            
            <div class="flex flex-col grow min-w-0 mx-3">
                <h4 class="text-sm font-bold text-white truncate">${item.name}</h4>
                <p class="text-xs text-gray-400">${item.price.toLocaleString()} تومان</p>
                <span class="text-xs text-[#1683FF]">تعداد: ${item.quantity}</span>
            </div>
            
            <button class="remove-item-btn text-red-500 hover:text-red-400 shrink-0" data-id="${item.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
<g id="Menu / Close_SM">
<path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
            </button>
        </div>
    `
   })


   allprice.textContent = `${totalprice.toLocaleString()} تومان`;

   document.querySelectorAll(".remove-item-btn").forEach((Btn) =>  {
Btn.onclick = (e) => {
    const idRemov = e.currentTarget.getAttribute("data-id")
    cart = cart.filter((item) => item.id !== idRemov)
    localStorage.setItem("parsiCart" , JSON.stringify(cart))
    renderCart()
    ShowToset("محصول از سبد خرید حذف شد.", "error")
}
   })

}

renderCart()
Clos()
SetAddCard()
setTimeout(SetAddCard , 700)