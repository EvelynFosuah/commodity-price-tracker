document.addEventListener('DOMContentLoaded', () => {
    const commodityForm = document.getElementById('commodity-form');
    const inventoryList = document.getElementById('inventory-list');
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    function renderInventory() {
        inventoryList.innerHTML = '';
        inventory.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="item-info">
                    <strong>${item.name}</strong> - $${item.price} per unit - Quantity: ${item.quantity}
                </div>
                <div>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            inventoryList.appendChild(li);
        });
    }

    function saveInventory() {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }

    commodityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('commodity-name').value;
        const price = parseFloat(document.getElementById('commodity-price').value);
        const quantity = parseInt(document.getElementById('commodity-quantity').value);

        inventory.push({ name, price, quantity });
        saveInventory();
        renderInventory();
        commodityForm.reset();
    });

    inventoryList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            inventory.splice(index, 1);
            saveInventory();
            renderInventory();
        } else if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            const item = inventory[index];
            document.getElementById('commodity-name').value = item.name;
            document.getElementById('commodity-price').value = item.price;
            document.getElementById('commodity-quantity').value = item.quantity;
            inventory.splice(index, 1);
            saveInventory();
            renderInventory();
        }
    });

    renderInventory();
});