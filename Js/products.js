const container = document.getElementById("products-container")

fetch("../html/products.json") .then (
    products => {
        container.innerHTML = ""

products.forEach(product => {
    const CardHTML = `
    
    
    
    
    `
});

    }
)