

function showError(element , mas) {
element.textContent = mas
element.classList .remove("hidden")
}


const registerForm = document.getElementById("registerForm")

if(registerForm) {
    registerForm.addEventListener("submit" , (p) => {
p.preventDefault()


const userN = document.getElementById("regUserN").value.trim() 
const userE = document.getElementById("regUserE").value.trim()
const userP =  document.getElementById("regUserP").value
const userCP = document.getElementById("regUserConfirmP").value
const ermas = document.getElementById("Ermasg")
let users

if (!userN || !userE || !userP || !userCP) {
showError(ermas , "لطفا فیلد ها را پر کنید")
return
}

if(userP.length < 8 || userP.length >= 22) {
showError(ermas , "رمز عبور حداقل باید 8 کارکتر باشه تا 22 کارکتر باشه")
return
}

const Upcase = /[A-Z]/.test(userP)
const Lowcase = /[a-z]/.test(userP)
const Numberhs = /[0-9]/.test(userP)

if (!Upcase || !Lowcase || !Numberhs) {
showError(ermas , "رمز عبور باید شامل حروف بزرگ و حروف کوچیک و اعداد باشد")
return
}


 if(userP !== userCP) {
showError(ermas , "رمز عبور یکسان نیست")
return
 }

users = JSON.parse(localStorage.getItem("parsiUsers")) || []
 const exUsers = users.find(user => user.userE === userE)


 if (exUsers) {
showError(ermas , "این ایمیل قبلا در سایت ثبت شده")
return
 }

 users.push({userN , userE , userP})
 localStorage.setItem("parsiUsers" , JSON.stringify(users))

 ermas.textContent = "ثبت نام موفقیت امیز بود! درحال انتقال..."
ermas.classList.remove("hidden" , "text-red-500")
ermas.classList.add("text-green-500")

setTimeout(() => {
    window.location.href = "./login.html"
} , 1500)
    })

}

const loginForm = document.getElementById("loginForm")


if(loginForm) {
    loginForm.addEventListener("submit" , (e) => {
e.preventDefault()
   




 const loginE = document.getElementById("LogUserE").value.trim();
        const loginP = document.getElementById("LogUserP").value;
        const loginErrMsg = document.getElementById("ErmasgLog");
let users

if (!loginE || !loginP ) {
showError(loginErrMsg ,"لطفا ایمیل و رمز عبور را وارد کنید.")
return
}
users = JSON.parse(localStorage.getItem("parsiUsers")) || [];

const user = users.find(u => u.userE === loginE && u.userP === loginP)

if (!user) {
            showError(loginErrMsg, "چنین شخصی در سایت وجود ندارد یا اطلاعات اشتباه است.");
            return;
        }

     localStorage.setItem("parsiLogInUser", JSON.stringify(user)) 


loginErrMsg.textContent = `خوش آمدید ${user.userN}! در حال انتقال...`;
        loginErrMsg.classList.remove("hidden", "text-red-500");
        loginErrMsg.classList.add("text-green-500");


        setTimeout(() => {
            window.location.href = "../index.html"; 
        }, 1500);

})

} 



const registerLoginbtn = document.getElementById("registerLogin-btn")
const userprof = document.getElementById("user-prof")
const userNdis = document.getElementById("userN-dis")
const logoutbtn = document.getElementById("logout-btn")

const logInUser = JSON.parse(localStorage.getItem("parsiLogInUser"))

if (logInUser) {
if (registerLoginbtn) {
    registerLoginbtn.classList.add("hidden")
}

if (userprof) {
    userprof.classList.remove("hidden")
    userprof.classList.add("flex")

}

if(userNdis) {
    userNdis.textContent = ` سلام , ${logInUser.userN}`
}
}

    else {
        
        if(registerLoginbtn) {
            registerLoginbtn.classList.remove("hidden")
            
        }
        if (userprof) {
            userprof.classList.add("hidden")
            userprof.classList.remove("flex")
            
        }
        
    }
    
    
if(logoutbtn) {
    logoutbtn.addEventListener( "click",() => {
localStorage.removeItem("parsiLogInUser")
window.location.reload()
    })
}


function setTog(BtnId , InputId) {
const btn = document.getElementById(BtnId)
const Input = document.getElementById(InputId)

if(btn && Input) {
    btn.addEventListener("click" , () => {
        if(Input.type === "password" ) {
            Input.type = "text"
        } else {
            Input.type = "password"
        }



    })
}

}
setTog("togell" , "regUserP")
   setTog("togell", "LogUserP")


 