const socket = io()

const contenido = document.getElementById('contenido')

socket.on('actualizar_realtimeproducts',(content) => {
    let htmlcontent = ''
    content.map(element => {
        htmlcontent += `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title} </h5>
                    <h6>U$D: ${element.price}</h6>
                    <p class="card-text">${element.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Stock: ${element.stock}</li>
                    <li class="list-group-item">Category: ${element.category}</li>
                    <li class="list-group-item">ID : ${element.id} - Code: ${element.code}</li>
                    <li class="list-group-item">Status: ${element.status}</li>
                    <li class="list-group-item">${element.thumbnail}</li>
                </ul>
            </div>`
    });
    contenido.innerHTML = htmlcontent
})

document.getElementById("add_product").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const info_to_send = {
        title: formData.get("title"),
        price: formData.get("price"),
        code: formData.get("code"),
        category: formData.get("category"),
        stock: formData.get("stock"),
        thumbnail: formData.get("thumbnail"),
        description: formData.get("description")
    }


    fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(info_to_send),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            console.log("Producto agregado con éxito");
        } else {
            console.error("Error al agregar el producto");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });
    event.target.reset();
}); 

document.getElementById("del_product").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const idToDelete = formData.get("id");

    fetch(`/api/products/${idToDelete}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            console.log("Producto eliminado con éxito");

        } else {
            console.error("Error al eliminar el producto");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });
    event.target.reset();
});