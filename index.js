// Shopping List App Logic

// DOM element references
const nameInput = document.querySelector('#item-name');
const priceInput = document.querySelector('#item-price');
const addItemBtn = document.querySelector('#add-item');
const clearListBtn = document.querySelector('#clear-list');
const listOutput = document.querySelector('#shopping-list');

let listItems = [];

// Load list from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
  const storedList = localStorage.getItem('shoppingList');
  if (storedList) {
    listItems = JSON.parse(storedList);
    updateList();
  }
});

// Function to refresh the list view
function updateList() {
  listOutput.innerHTML = '';
  listItems.forEach(function(item, index) {
    const listEntry = document.createElement('li');
    listEntry.classList.add('list-item');
    
    // Create the list item content
    listEntry.innerHTML = `
      <span>${item.name} - Ksh ${item.price}</span>
      <button class="mark-btn" data-index="${index}">Mark Purchased</button>
    `;
    
    // Mark as purchased visually
    if (item.purchased) {
      listEntry.classList.add('purchased');
    }
    
    // Append the new list item
    listOutput.appendChild(listEntry);
  });

  // Add event listeners to mark items as purchased
  const markBtns = document.querySelectorAll('.mark-btn');
  markBtns.forEach(function(button) {
    button.addEventListener('click', function() {
      const itemIndex = button.getAttribute('data-index');
      togglePurchased(itemIndex);
    });
  });

  // Save the updated list to localStorage
  localStorage.setItem('shoppingList', JSON.stringify(listItems));
}

// Function to add a new item
addItemBtn.addEventListener('click', function() {
  const name = nameInput.value.trim();
  const price = priceInput.value.trim();

  if (name && price) {
    listItems.push({ name: name, price: price, purchased: false });
    updateList();
    nameInput.value = '';
    priceInput.value = '';
  } else {
    alert('Both name and price are required!');
  }
});

// Function to toggle the purchased status
function togglePurchased(index) {
  listItems[index].purchased = !listItems[index].purchased;
  updateList();
}

// Function to clear the entire list
clearListBtn.addEventListener('click', function() {
  listItems = [];
  updateList();
});
