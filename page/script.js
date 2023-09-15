// Array para almacenar los productos
var products = [];

// Función para agregar un producto al arreglo y mostrarlo en el Index
function addProduct(name, image) {
  var product = {
    name: name,
    image: image
  };

  products.push(product);
  
  // Actualiza el HTML del Index para mostrar el nuevo producto
  var productsList = document.getElementById('products-list');
  productsList.innerHTML = '';

  for (var i = 0; i < products.length; i++) {
    var productHTML = '<div class="product">' +
                      '<img src="' + products[i].image + '">' +
                      '<h3>' + products[i].name + '</h3>' +
                      '</div>';

    productsList.innerHTML += productHTML;
  }
}

// Evento que se dispara al enviar el formulario
document.getElementById('product-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Obtiene los valores del formulario
  var name = document.getElementById('name').value;
  var image = document.getElementById('image').value;

  // Llama a la función addProduct pasando los valores del formulario
  addProduct(name, image);
});
