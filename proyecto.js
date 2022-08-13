
let botonClick = document.querySelectorAll('.button');
let tbody = document.querySelector('.tbody');

let botonCompra = document.getElementById('botonComprar');

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

    const productoInput = tbody.getElementsByClassName('inputProducto');
    for(let i = 0 ; i < carrito.length ; i++){
        if(carrito[i].title.trim() === nuevoProducto.title.trim()){
            carrito[i].cantidad ++;

            const valorInput = productoInput[i];
            valorInput.value++;

            carritoTotal();
            return null;
        }
    }
    carrito.push(nuevoProducto);

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

    renderCarrito();

}

function renderCarrito(){

    tbody.innerHTML = '';
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('productoCarrito');
        const contenidoTabla = `
        <th scope="row">1</th>
        <td class="productosTabla">
            <img src=${item.img}  alt="">
            <h6 class="titulo">${item.title}</h6>
        </td>
        <td class="precioTabla"><p>${item.precio}</p></td>
        <td class="cantidadTabla">
            <input type="number" min="1" value=${item.cantidad} class="inputProducto">
            <button class="eliminar btn btn-danger">x</button>
        </td>
        `

        tr.innerHTML = contenidoTabla;
        tbody.append(tr);

        tr.querySelector(".eliminar").addEventListener('click', removerProductoCarrito);
        tr.querySelector(".inputProducto").addEventListener('change', cantidadSuma);
    })

    carritoTotal();
}

function cantidadSuma(e){
    let sumaElemento = e.target;
    let tr = sumaElemento.closest(".productoCarrito");
    let tituloSuma = tr.querySelector('.titulo').textContent;
    
    carrito.forEach(item => {
        if(item.title.trim() === tituloSuma){
            sumaElemento.value < 1 ? (sumaElemento.value = 1) : sumaElemento.value;
            item.cantidad = sumaElemento.value;
            carritoTotal();
        }
    })
}

function carritoTotal(){
    let total = 0;
    let totalCarrito = document.querySelector('.carritoTotal');

    carrito.forEach((item) => {
        let precio = Number(item.precio.replace("$", ''));
        total = total + precio*item.cantidad;
    })

    totalCarrito.innerHTML = `Total $${total}`

    guardarLocalStorage();
}

function removerProductoCarrito(e){

    let botonEliminar = e.target;
    let tr = botonEliminar.closest(".productoCarrito");

    let titulo = tr.querySelector(".titulo").textContent;
    for(let i = 0 ; i < carrito.length ; i++){

        if(carrito[i].title.trim() === titulo.trim()){
            carrito.splice(i , 1);
        }
    }

    tr.remove();

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

function guardarLocalStorage(){
    
    localStorage.setItem('carrito', JSON.stringify(carrito));

}
  
window.onload = function(){

    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
      renderCarrito()
    }
}


botonCompra.addEventListener('click', () => {
    let swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'CONFIRMAR COMPRA',
        text: "¿Estás seguro de realizar la compra?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            '¡Compra confirmada!',
            'Generando envío...',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '¡Compra Cancelada!',
            '¡Te esperamos la próxima!',
            'error'
          )
        }
    })
});


























