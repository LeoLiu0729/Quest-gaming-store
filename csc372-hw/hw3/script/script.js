document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', (e) => {
    document.querySelectorAll('.gallery img').forEach(i => i.classList.remove('active'));
    e.target.classList.add('active');

    const descriptionBox = e.target.closest('article').querySelector('.description-box');
    const dishName = e.target.alt;
    let description = '';

    switch (dishName) {
      case 'Fried Chicken':
        description = 'Golden crispy fried chicken served with cornbread and rices. Price: $12.99';
        break;
      case 'Fried Catfish':
        description = 'Crispy fresh fried fish. Price: $13.99';
        break;
      case 'Mac and Cheese':
        description = 'Creamy and cheesy mac and cheese. Price: $7.99';
        break;
      case 'Spicy Tuna Roll':
        description = 'Fresh spicy tuna roll with wasabi and soy sauce. Price: $12.99';
        break;
      case 'Tonkotsu Ramen':
        description = 'Rich tonkotsu ramen with pork belly and soft-boiled egg. Price: $14.99';
        break;
      case 'Tempura Udon':
        description = 'Udon noodles served with crispy tempura shrimp. Price: $11.99';
        break;
      case 'Classic Milk Tea':
        description = 'Refreshing classic milk tea with boba pearls. Price: $5.99';
        break;
      case 'Fruit Tea':
        description = 'Freshly brewed fruit tea with seasonal fruits. Price: $6.99';
        break;
      case 'Matcha Latte':
        description = 'Smooth and creamy matcha latte with a hint of sweetness. Price: $7.99';
        break;
    }

    descriptionBox.innerHTML = `<p><strong>${dishName}</strong>: ${description}</p>`;
  });
});
