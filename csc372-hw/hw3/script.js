document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', (e) => {
      // Clear any previous active images
      document.querySelectorAll('.gallery img').forEach(i => i.classList.remove('active'));
      e.target.classList.add('active');
  
      // Get the dish description
      const descriptionBox = e.target.closest('article').querySelector('.description-box');
      const dishName = e.target.alt;
      let description = '';
      
      if (dishName === 'Margherita Pizza') {
        description = 'The classic Margherita Pizza – fresh basil, mozzarella, and a crispy crust, all for just $10!';
      } else if (dishName === 'Pepperoni Pizza') {
        description = 'Pepperoni lovers unite! This pizza is topped with premium pepperoni slices for $12.';
      } else if (dishName === 'Veggie Delight Pizza') {
        description = 'A healthy option – our Veggie Delight is loaded with fresh toppings for $11.';
      } else if (dishName === 'Pulled Pork Sandwich') {
        description = 'Juicy pulled pork served on a soft bun with BBQ sauce for $9.';
      } else if (dishName === 'BBQ Ribs') {
        description = 'These BBQ ribs are slow-cooked to perfection, served with a side of coleslaw for $15.';
      } else if (dishName === 'BBQ Chicken') {
        description = 'Grilled BBQ chicken with a smoky glaze, available for $10.';
      }
  
      // Update the description section with the chosen dish
      descriptionBox.innerHTML = `<p><strong>${dishName}</strong>: ${description}</p>`;
    });
  });
  