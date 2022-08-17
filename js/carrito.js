
//Variables
let tbody = document.querySelector('.tbody');
let botonCompra = document.getElementById('botonComprar');

//Array Carrito
let carrito = []

//LocalStorage
window.onload = function(){

    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
      renderCarrito()
    }
}


//Función Renderizar Carrito de Compras
function renderCarrito(){

    tbody.innerHTML = '';
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('productoCarrito');
        const contenidoTabla = `
        <th scope="row">1</th>
        <td class="productosTabla">
            <img src=${item.img}  alt="">
            <h6 class="titulo text-white">${item.title}</h6>
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

//Función Calcular la cantidad de los productos y no repetir
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

    sessionStorage.setItem('carrito', JSON.stringify(carrito));
}

//Función Para el total del Carrito
function carritoTotal(){
    let total = 0;
    let totalCarrito = document.querySelector('.carritoTotal');

    carrito.forEach((item) => {
        let precio = Number(item.precio.replace("$", ''));
        total = total + precio*item.cantidad;
    })

    totalCarrito.innerHTML = `Total $${total}`

    // guardarLocalStorage();
}

//Función para eliminar productos del Carrito / Librería Toastify
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

    localStorage.setItem('carrito', JSON.stringify(carrito));

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

//Compra Final Carrito | Sweet Alert
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