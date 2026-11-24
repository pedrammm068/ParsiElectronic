const mobileMB = document.getElementById("mobile-Menu-btn")
const mobileM = document.getElementById("mobile_Menu")

function MobileMenu () {
    
    if (mobileMB && mobileM) {
        mobileMB.addEventListener("click" , () => {
            mobileM.classList.toggle("hidden")
        } )
    }
}
MobileMenu()