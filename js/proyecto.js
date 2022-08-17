
//Variable
let botonClick = document.querySelectorAll('.button');

//Array Carrito
let carrito = []

//ForEach botón Agregar producto al carrito | Arrow function
botonClick.forEach(btn => {
    btn.addEventListener('click', agregarCarrito);
})

//Función agrega productos y sus elementos
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

//Función Agrega productos y no repite | Toastify
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
    
    guardarLocalStorage();

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

//Función para guardar en Storage
function guardarLocalStorage(){
    
    localStorage.setItem('carrito', JSON.stringify(carrito));

}

//Onload para guardar storage
window.onload = function(){

    const storage = JSON.parse(LocalStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
    }
}
  




























