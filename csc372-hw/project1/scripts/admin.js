// File Upload Validation and Message Display
document.addEventListener('DOMContentLoaded', function() {
    const fileUpload = document.getElementById('file-upload');
    const uploadForm = document.querySelector('.admin-upload form');

    if (uploadForm) {
        uploadForm.addEventListener('submit', function(event) {
            const file = fileUpload.files[0];
            if (!file) {
                alert('Please select a file to upload.');
                event.preventDefault();
                return;
            }
            
            const allowedExtensions = ['json', 'csv', 'txt'];
            const fileExtension = file.name.split('.').pop().toLowerCase();
            
            if (!allowedExtensions.includes(fileExtension)) {
                alert('Invalid file format. Please upload a JSON, CSV, or TXT file.');
                event.preventDefault();
            } else {
                alert('File uploaded successfully!');
            }
        });
    }
});

// Product Listing Page Search Filter
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('product-search');
    const productRows = document.querySelectorAll('table tbody tr');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase();
            
            productRows.forEach(function(row) {
                const productName = row.cells[1].textContent.toLowerCase();
                const productCategory = row.cells[3].textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});

// Confirmation for Delete and Archive Actions
document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete');
    const archiveButtons = document.querySelectorAll('.archive');

    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (!confirm('Are you sure you want to delete this product?')) {
                event.preventDefault();
            }
        });
    });

    archiveButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (!confirm('Are you sure you want to archive this product?')) {
                event.preventDefault();
            }
        });
    });
});

// Product Edit Page Validation
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.querySelector('.edit-product form');

    if (editForm) {
        editForm.addEventListener('submit', function(event) {
            const name = document.getElementById('product-name').value;
            const description = document.getElementById('product-description').value;
            const category = document.getElementById('product-category').value;
            const price = document.getElementById('product-price').value;

            if (!name || !description || !category || !price) {
                alert('Please fill out all fields.');
                event.preventDefault();
            }
        });
    }
// Example product data for demo purposes
let products = [
    { id: '001', name: 'GeForce RTX 4090', description: 'The latest graphics card', category: 'Graphics Card', imagePath: 'images/rtx4090.jpg', price: '1499.99' },
    { id: '002', name: 'Gaming Keyboard', description: 'RGB Mechanical Keyboard', category: 'Keyboard', imagePath: 'images/gprokeyboard.png', price: '99.99' },
    { id: '003', name: 'Gaming Mouse', description: 'Lightweight precision mouse', category: 'Mouse', imagePath: 'images/gpromouse.png', price: '59.99' },
];

// Function to display products in the table
function renderProducts() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; 
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td>$${product.price}</td>
            <td>
                <button class="edit" data-id="${product.id}">Edit</button>
                <button class="delete" data-id="${product.id}">Delete</button>
                <button class="archive" data-id="${product.id}">Archive</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    attachEventListeners(); 
}

// Add new product
document.querySelector('.add-product').addEventListener('click', function() {
    const newProduct = {
        id: Date.now().toString(), 
        name: prompt('Enter product name:'),
        description: prompt('Enter product description:'),
        category: prompt('Enter product category:'),
        imagePath: 'images/default.jpg',
        price: prompt('Enter product price:')
    };

    if (newProduct.name && newProduct.description && newProduct.category && newProduct.price) {
        products.push(newProduct);
        renderProducts(); 
    } else {
        alert('All fields are required.');
    }
});

// Search filter functionality
document.getElementById('product-search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const productRows = document.querySelectorAll('table tbody tr');
    productRows.forEach(function(row) {
        const productName = row.cells[1].textContent.toLowerCase();
        const productCategory = row.cells[3].textContent.toLowerCase();
        if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Attach event listeners to Edit, Delete, Archive buttons
function attachEventListeners() {
    // Edit product
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            window.location.href = `product-edit.html?id=${productId}`;  
        });
    });

    // Delete product
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this product?')) {
                const productId = this.getAttribute('data-id');
                products = products.filter(p => p.id !== productId); 
                renderProducts();  // Re-render the product table
            }
        });
    });

    // Archive product (same as delete for now)
    document.querySelectorAll('.archive').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to archive this product?')) {
                const productId = this.getAttribute('data-id');
                alert(`Product ${productId} archived.`);
            }
        });
    });
}

// Initial product render
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
});
});
