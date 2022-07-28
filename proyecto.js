
// Función de Bienvenida al usuario.
function bienvenida(){

    let usuario = document.getElementById("nombre_usuario");
    let apellido = document.getElementById("apellido_usuario");
    let email = document.getElementById("email_usuario");

    console.log("Nombre: " , usuario.value);
    console.log("Apellido: " , apellido.value);
    console.log("Email registrado: " , email.value);

    Swal.fire({
        icon: "success",
        text: "BIENVENIDO A MOYA MATES",
        imageUrl: './img/logo.png',
        imageWidth: 250,
        imageHeight: 150,
        imageAlt: 'Logo de la marca',
    });
}

// Función Remover datos cargados del usuario. Nota: No funciona correctamente.
function remover(){
    let usuario = document.getElementById("nombre_usuario");
    let apellido = document.getElementById("apellido_usuario");
    let email = document.getElementById("email_usuario");

    console.log("Se ha eliminado el nombre: " , usuario.value);
    console.log("Se ha eliminado el apellido: " , apellido.value);
    console.log("Email eliminado: " , email.value);


}

let boton_uno = document.getElementById("boton_ingresar");
let boton_dos = document.getElementById("boton_borrar");

boton_uno.addEventListener("click" , bienvenida);
//boton_dos.addEventListener("click" , remover);





// Carrito de compras

let botones_compra = document.querySelectorAll(".botonAgregar");
let boton_comprar = document.getElementById("botonComprar");
let boton_vaciar = document.getElementById("botonVaciar");
let carrito = [];
let carrito_storage = [];

boton_vaciar.addEventListener("click" , vaciar_carrito);

for( let boton of botones_compra){

    boton.addEventListener("click", agregar_producto);
}

// Función para agregar los productos.
function agregar_producto(e){

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo= padre.parentNode;

    let nombre_producto = abuelo.querySelector("h5").textContent;
    let img = abuelo.querySelector("img").src;
    let precio = abuelo.querySelector("span").textContent;

    let producto = {
        img: img,
        nombre: nombre_producto,
        precio: precio,
        cantidad:1
    };

    carrito.push();

    let producto_JSON = JSON.stringify(producto);
    carrito_storage.push(producto_JSON);

    localStorage.setItem("producto" , carrito_storage);

    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        gravity: "top",
        position: "right",
        style:{
            background:"green",
            fontSize:"15px"
        },
    }).showToast();

    ver_carrito(producto);
}


// Renderizar los productos en el carrito de compras.
function ver_carrito(producto){

    let fila = document.createElement("tr");

    fila.innerHTML = `<td><img class="imgCarrito" src="${producto.img}"></td>
                      <td>${producto.nombre}</td>
                      <td>${producto.cantidad}</td>
                      <td>${producto.precio}</td>
                      <td><button class="borrar_producto">X</buttton></td>`;

    let tabla_carrito = document.getElementById("carritoTbody");
    tabla_carrito.append(fila);

    let botones_borrar = document.querySelectorAll(".borrar_producto");

    for(let boton of botones_borrar){

        boton.addEventListener("click" , borrar_producto);
    }

}

// Función para eliminar productos individualmente.
function borrar_producto(e){

    let hijo = e.target;
    let abuelo = hijo.parentNode.parentNode;
    abuelo.remove();
    Toastify({
        text: "Producto eliminado del carrito",
        duration: 3000,
        gravity: "top",
        position: "right",
        style:{
            background:"red",
            fontSize:"15px"
        },
    }).showToast();
}

// Función para vaciar el carrito de compras.
function vaciar_carrito(){
    
    $("#carritoTbody tr").remove();
    Swal.fire({
        icon: "warning",
        text: "LOS PRODUCTOS FUERON ELIMINADOS",
        imageUrl: './img/logo.png',
        imageWidth: 250,
        imageHeight: 150,
        imageAlt: 'Logo de la marca',
    });
    

}

// Fetch utilizando API de Clima

let contenedor = document.getElementById("clima");

fetch("https://api.openweathermap.org/data/2.5/weather?q=Córdoba&lang=es&units=metric&appid=a2af7fc4bf2b575d4116c7b51cd859e5")
    .then(response =>response.json())
    .then(data =>{
        contenedor.innerHTML = `<p>Ciudad: ${data.name}</p>
                                <p>Clima: ${data.weather[0].description}</p>
                                <p>La temperatura máxima es: ${data.main.temp_max}</p>
                                <p>La temperatura mínima es: ${data.main.temp_min}</p>
                                <p>Sensación térmica: ${data.main.feels_like}</p>
                                <p>Humedad: ${data.main.humidity}</p>`

    });




























