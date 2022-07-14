

function bienvenida(){

    let usuario = document.getElementById("nombre_usuario");
    let apellido = document.getElementById("apellido_usuario");
    let email = document.getElementById("email_usuario");

    console.log("Nombre: " , usuario.value);
    console.log("Apellido: " , apellido.value);
    console.log("Email registrado: " , email.value);

    let msj = document.createElement("h1");
    msj.innerText = "BIENVENIDO/A";

    mensaje.append(msj);
}

function remover(){
    let usuario = document.getElementById("nombre_usuario");
    let apellido = document.getElementById("apellido_usuario");
    let email = document.getElementById("email_usuario");

    console.log("Se ha eliminado el nombre: " , usuario.value);
    console.log("Se ha eliminado el apellido: " , apellido.value);
    console.log("Email eliminado: " , email.value);

    usuario.remove();
    apellido.remove();
    email.remove();

}

/* La función remover, elimina los nodos existentes. es solo demostración
ya que no registra funcionalidad para el simulador.*/

let boton_uno = document.getElementById("boton_ingresar");
let boton_dos = document.getElementById("boton_borrar");

boton_uno.addEventListener("click" , bienvenida);
//boton_dos.addEventListener("click" , remover);





// CARRITO


let botones_compra = document.querySelectorAll(".botonAgregar");
let carrito = [];
let carrito_storage = [];

for( let boton of botones_compra){

    boton.addEventListener("click", agregar_producto);
}

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

    carrito.push(producto);

    let producto_JSON = JSON.stringify(producto);
    carrito_storage.push(producto_JSON);

    localStorage.setItem("producto" , carrito_storage);

    ver_carrito(producto);
}


/* Renderizar los productos en el carrito de compras. */
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


function borrar_producto(e){

    let hijo = e.target;
    let abuelo = hijo.parentNode.parentNode;
    abuelo.remove();
}



/* OBJETO PRODUCTO

class Producto{
    constructor(id, nombre , precio , stock){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    get_datos(){
        console.log("Datos Producto");
        console.log("Nombre: " , this.nombre);
        console.log("Precio: " , this.precio);
        console.log("Stock: " , this.stock);
    }

    get_stock(){
        if(this.stock <= 5){
            console.log("ALERTA POCO STOCK: ",  this.stock);
        }
        return this.stock;
    }

    set_stock_venta(cantidad){
        if(this.stock > 0){
            this.stock = this.stock - cantidad;
        }
        else if(this.stock <= 0){
            alert("Producto fuera de stock");
            console.log("Producto fuera de stock");
        }
    }
}

*/



/* FUNCION DE CALCULO DE CUOTAS


  function calculo_cuotas (suma_total , cuotas){

    cuotas = parseInt( prompt("Ingrese cuotas a pagar: 1, 3, 6 o 12"));
    cuotas = parseInt(cuotas);

    if (cuotas == 1){
        parseInt(suma_total);
        alert("Total a pagar en una cuota: " + suma_total);
        console.log("Total a pagar en una cuota: " , suma_total);
        console.log("Gracias por su compra.");
        return suma_total;
    }

    else if (cuotas == 3){
        parseInt(suma_total);
        alert("Total a pagar en 3 cuotas: " + suma_total * 1.2);
        console.log("Total a pagar en 3 cuotas: " , suma_total * 1.2);
        console.log("Gracias por su compra.");
        return suma_total * 1.2;
    }

    else if (cuotas == 6){
        parseInt(suma_total);
        alert("Total a pagar en 6 cuotas: " + suma_total * 1.5);
        console.log("Total a pagar en 6 cuotas: " , suma_total * 1.5);
        console.log("Gracias por su compra.");
        return suma_total * 1.5;
    }

    else if (cuotas == 12){
        parseInt(suma_total);
        alert("Total a pagar en 12 cuotas:  " + suma_total * 1.8);
        console.log("Total a pagar en 12 cuotas: " , suma_total * 1.8);
        console.log("Gracias por su compra.");
        return suma_total * 1.8;
    }

    else{
        alert("INGRESE UN DATO CORRECTO");
        console.log("No ingresó un dato correcto");
        calculo_cuotas(suma_total , cuotas);
    }
}

*/



























