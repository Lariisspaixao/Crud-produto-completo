// JavaScript
const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productTable = document.getElementById('product-table').querySelector('tbody');
const searchInput = document.getElementById('search');

let products = JSON.parse(localStorage.getItem('products')) || [];

// Atualizar tabela
function renderProducts() {
    productTable.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td class="actions">
                <button class="edit" onclick="editProduct(${index})">Editar</button>
                <button class="delete" onclick="deleteProduct(${index})">Excluir</button>
            </td>
        `;
        productTable.appendChild(row);
    });
}

// Adicionar produto
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value);
    products.push({ name, price });
    localStorage.setItem('products', JSON.stringify(products));
    productNameInput.value = '';
    productPriceInput.value = '';
    renderProducts();
});

// Editar produto
function editProduct(index) {
    const product = products[index];
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}

// Excluir produto
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}

// Procurar produto
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    productTable.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td class="actions">
                <button class="edit" onclick="editProduct(${index})">Editar</button>
                <button class="delete" onclick="deleteProduct(${index})">Excluir</button>
            </td>
        `;
        productTable.appendChild(row);
    });
});

// Inicializar tabela
renderProducts();