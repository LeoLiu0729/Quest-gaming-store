document.addEventListener('DOMContentLoaded', () => {
  const mealList = document.querySelector('#selected-meals');
  const totalElement = document.querySelector('#total-price');
  let total = 0; // Initialize total price

  document.querySelectorAll('.dishes-list li').forEach(dish => {
    // Add "+" button for each dish
    const addButton = document.createElement('button');
    addButton.textContent = "+";
    addButton.classList.add('add-btn');
    dish.appendChild(addButton);

    addButton.addEventListener('click', () => {
      const dishName = dish.textContent.replace('+', '').trim(); 
      const price = parseFloat(dish.dataset.price); 
      const imgSrc = dish.dataset.img;

      
      let existingItem = Array.from(mealList.children).find(item => item.querySelector('.meal-name').textContent === dishName);

      if (existingItem) {
        
        const quantityElement = existingItem.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantity += 1; // Increase the quantity by 1
        quantityElement.textContent = quantity;
        total += price; // Update total
      } else {
      
        const mealItem = document.createElement('li');
        mealItem.classList.add('meal-item');

        // Add the dish name, image, quantity, price, and remove button
        mealItem.innerHTML = `
          <img src="${imgSrc}" alt="${dishName}" class="meal-img">
          <span class="meal-name">${dishName}</span>
          <span class="meal-price" > -  </span>
          <span class="quantity">1</span> 
          <button class="add-order-btn">Add another order</button>
          <button class="delete-btn">Remove</button>
        `;

        // Append the new meal item to the meal plan
        mealList.appendChild(mealItem);

        // Update total price
        total += price;

        // Functionality to remove the selected dish entirely
        mealItem.querySelector('.delete-btn').addEventListener('click', () => {
          const quantity = parseInt(mealItem.querySelector('.quantity').textContent);
          mealList.removeChild(mealItem); // Remove the item from the list
          total -= price * quantity; // Update the total
          totalElement.textContent = total.toFixed(2); // Update total in the UI
        });

        // Functionality to add another order
        mealItem.querySelector('.add-order-btn').addEventListener('click', () => {
          const quantityElement = mealItem.querySelector('.quantity');
          let quantity = parseInt(quantityElement.textContent);
          quantity += 1; // Increase the quantity by 1
          quantityElement.textContent = quantity;
          total += price; // Update total
          totalElement.textContent = total.toFixed(2); // Update total in the UI
        });
      }

      // Update the total price displayed
      totalElement.textContent = total.toFixed(2);
    });
  });
});
