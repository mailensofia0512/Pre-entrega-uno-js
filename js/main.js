// globales:

// carrito e historial inicial 
let carrito = [];
let historial = [];

// productos
const productos = [
    { id: 1, nombre: "Producto 1", precio: 100 },
    { id: 2, nombre: "Producto 2", precio: 200 },
    { id: 3, nombre: "Producto 3", precio: 300 },
    { id: 4, nombre: "Producto 4", precio: 400 },
    { id: 5, nombre: "Producto 5", precio: 500 },
]


// mostrar productos al conusmidor

function MostrarProductos() {
    let mensaje = "Productos disponibles:\n";
    productos.forEach(producto => {
        mensaje += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
    });
    return mensaje;
}



function realizarCompra() {
    if (carrito.length !== 0) {
        let total = 0
        total = parseInt(carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0));
        console.log(total);
        let confirmar = confirm(`¿Desea confirmar la compra por un total de $${total}?`);
        if (confirmar === true) {
            historial.push({ accion: 'compra', total: total });
            carrito = []; // Vaciar el carrito después de la compra
            return (`Compra realizada con éxito. Total: $${total}`);
        } else {
            return "Compra cancelada.";
        }
    } else {
        return "El carrito está vacío. No se puede realizar la compra.";
    }
}




// inicio de consola

function mostrarMenu() {
    let opcion;
    let mensaje = "Bienvenido al sistema de compras. \n";
    mensaje += "Seleccione una opción:\n";
    mensaje += "1. Mostrar productos\n";
    mensaje += "2. Agregar producto al carrito\n";
    mensaje += "3. Ver carrito\n";
    mensaje += "4. ver historial \n";
    mensaje += "5. realizar compra\n";
    mensaje += "6. Salir\n";

    do {
        opcion = parseInt(prompt(mensaje));
        switch (opcion) {
            case 1:
                alert(MostrarProductos());
                break;
            case 2:
                let id = parseInt(prompt("Ingrese el ID del producto a agregar:\n" + MostrarProductos()));
                const productoSeleccionado = productos.find(producto => producto.id === id);
                if (productoSeleccionado) {
                    carrito.push(productoSeleccionado);
                    historial.push({ accion: 'agregar', producto: productoSeleccionado });
                    alert(`${productoSeleccionado.nombre} agregado al carrito.`);
                } else {
                    alert("Producto no encontrado.");
                }
                break;
            case 3:
                if (carrito.length > 0) {
                    let mensajeCarrito = "Carrito:\n";
                    carrito.forEach(producto => {
                        mensajeCarrito += `${producto.id}. ${producto.nombre} - $${producto.precio} \n`;
                    });
                    let total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
                    mensajeCarrito += `\nTotal: $${total}`;
                    alert(mensajeCarrito);
                } else {
                    alert("El carrito está vacío.");
                }
                break;
            case 4:
                if (historial.length > 0) {
                    let mensajeHistorial = "Historial:\n";
                    historial.forEach((registro, index) => {
                        let texto = registro.producto ? registro.producto.nombre : "no se agregaron productos al carrito";
                        mensajeHistorial += `${index + 1}. Acción: ${registro.accion}, Producto: ${texto} \n`;
                    });
                    alert(mensajeHistorial);
                } else {
                    alert("No hay historial disponible.");
                }
                break;
            case 5:
               alert (realizarCompra());
               break;
            case 6:
                alert("Gracias por usar el sistema. ¡Hasta luego!");
                break;
            default:
                alert("Opción no válida. Intente nuevamente.");
                break;
        }
    } while (opcion !== 6);
}

mostrarMenu();

