const cartBtn = document.getElementById("cart-btn")
const cartsidebar = document.getElementById("cart-sidebar")
const cartover = document.getElementById("cart-over")
const closcart = document.getElementById("clos-cart")
const addtocart = document.querySelectorAll(".add-to-cart-btn")
const toast = document.getElementById("toast")
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


function ShowToset(mas , type = error) {
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





let cart = JSON.parse(localStorage.getItem("parsiCart") || [])



function SetAddCard() {
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
    }
});
}
