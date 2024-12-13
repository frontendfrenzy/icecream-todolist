
const cartItem = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const confirmOrderBtn = document.getElementById('confirm-order');
const confirm = document.getElementById('confirm-page');

let cart = {};
let total = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const name = button.getAttribute('data-name');
    const priceAttr = button.getAttribute('data-price');
    let price = parseFloat(priceAttr);

    if (isNaN(price)) {
      price = 0; // or set a default price value
    }

    const quantity = 1; // assume quantity is 1 for now
  

    if (cart[name]) {
      cart[name].quantity += quantity;
    } else {
      cart[name] = {
        price: price,
        quantity: quantity
      }
    }

    updateCart();
  });
});

function updateCart() {
  cartItem.innerHTML = '';
  total = 0;

  for (const name in cart) {
    const item = cart[name];
    const li = document.createElement('li');
    li.style.listStyle = 'none';
    li.style.color = 'black';
    li.style.padding = '10px 9px';
    li.style.backgroundColor = 'white';
    li.style.borderRadius = '15px';
    li.style.margin = '3%';
    li.style.width = '68%';
    li.textContent = `${name} - $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;

    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.style.padding = '2px 10px';
    removeBtn.style.marginLeft = '10px';
    removeBtn.style.border = '1px solid black';
    removeBtn.style.borderTopRightRadius = '10px';
    removeBtn.style.borderBottomLeftRadius = '10px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.backgroundColor = 'rgb(249, 234, 216)';
    removeBtn.addEventListener('click', function() {
      removeItem(name);
    });
    li.appendChild(removeBtn);

    cartItem.appendChild(li);
    total += item.price * item.quantity;
  }

  cartTotal.textContent = total.toFixed(2);
}

function removeItem(name) {
  if (cart[name].quantity > 1) {
    cart[name].quantity -= 1;
  } else {
    delete cart[name];
  }
  updateCart();
}



confirmOrderBtn.addEventListener('click', () => {
  confirm.style.display = 'block';
});

