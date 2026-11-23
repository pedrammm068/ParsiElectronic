
const themetoggle = document.getElementById("theme-toggle")
const htmlElement = document.documentElement

function SetupTheme() {

    const savedTheme = localStorage.getItem("parsiTheme");

    if (savedTheme === "red") {
        htmlElement.classList.add("red-theme")
    }

    if (themetoggle) {
        themetoggle.addEventListener("click", () => {

            htmlElement.classList.toggle("red-theme")

            const currentTheme = htmlElement.classList.contains("red-theme") ? "red": "blue"
            localStorage.setItem("parsiTheme", currentTheme)

        })
    }
}

SetupTheme()
