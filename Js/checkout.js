const cart = JSON.parse(localStorage.getItem("parsiCart") || "[]")
const pay = document.getElementById("pay-btn")
const can = document.getElementById("can-btn")
const cartBtn = document.getElementById("cart-num")
const endprice = document.getElementById("final-price")
const timer = document.getElementById("timer")
const toast = document.getElementById("toast")

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



let allprice = 0
cart.forEach( e => {
    allprice +=  e.price * e.quantity
});


if (endprice) {
    endprice.textContent = `${allprice.toLocaleString()} تومان`
}


let time = 30
const endtimer = setInterval(() => {
    time--

    const min = Math.floor( time / 60)
    const sec = time % 60

    if(timer) {
        timer.textContent =  `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    }

    if(time <= 0 ) {
clearInterval(endtimer) 
   const overlay = document.createElement("div");
            overlay.className = "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4";
            
            overlay.innerHTML = `
                <div class="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full transition duration-300">
                  
                    <span class="text-xl font-bold text-gray-800 mb-2">زمان پرداخت به پایان رسید!</span>
                    <p class="text-gray-500 text-sm mb-6">برای جلوگیری از مشکلات امنیتی، در حال انتقال به صفحه اصلی هستید...</p>
                    <div class="flex justify-center">
                        <div class=" rounded-full h-8 w-8 border-b-2 border-[#FFD700]"></div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(overlay);
            setTimeout(() => {
                window.location.href = "../index.html"; 

            } , 3000)
    }

} , 1000)

if(cartBtn) {
    cartBtn.addEventListener("input", (e) => {

        let value = e.target.value.replace(/\D/g , "")
        if(value.length > 16) {
            value = value.slice(0,16)
        }
        let format =  value.match(/.{1,4}/g)
        e.target.value = format ? format.join(" ") : ""
    })
}

if(pay) {
    pay.addEventListener("click" , (e) => {
        if(cartBtn.value.replace(/\D/g , "").length < 16  ) {
            cartBtn.classList.add("border-red-500", "ring-2", "ring-red-500/30")
ShowToset("16 رقم کارت خود را وارد کنید", "error");
return
        } 
         pay.innerHTML = `
<span> در حال پردازش... </span>`
            pay.disabled = true
         clearInterval(endtimer)
         localStorage.removeItem("parsiCart")


        ShowToset("پرداخت موفقیت امیز بود!", "")

        setTimeout(() => {
            window.location.href = "../index.html"
        }, 1000)

    })
}

if (can) {
    can.addEventListener("click", () => {

        clearInterval(endtimer)

        ShowToset("پرداخت لغو شد!", "success")

        setTimeout(() => {
            window.location.href = "../index.html"
        }, 1000)

    })
}