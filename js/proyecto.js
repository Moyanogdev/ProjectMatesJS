
let botonClick = document.querySelectorAll('.button');


let carrito = []

botonClick.forEach(btn => {
    btn.addEventListener('click', agregarCarrito);
})

function agregarCarrito(e){
    const button = e.target;
    const producto = button.closest('.card');

    const tituloProducto = producto.querySelector('.card-title').textContent;
    const precioProducto = producto.querySelector('.precio').textContent;
    const imagenProducto = producto.querySelector('.card-img-top').src;

    const nuevoProducto = {
        title: tituloProducto,
        precio: precioProducto,
        img: imagenProducto,
        cantidad: 1
    }

    agregarProductoCarrito(nuevoProducto)
}

function agregarProductoCarrito(nuevoProducto){
    let existeProducto = false;
    for(let i = 0 ; i < carrito.length ; i++){
        if(carrito[i].title.trim() === nuevoProducto.title.trim()){
            carrito[i].cantidad ++;
            existeProducto = true;

        }
    }
    if(existeProducto == false){
        carrito.push(nuevoProducto);
    }
    
    guardarSessionStorage();

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


}


function guardarSessionStorage(){
    
    sessionStorage.setItem('carrito', JSON.stringify(carrito));

}

window.onload = function(){

    const storage = JSON.parse(sessionStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
    }
}
  




























