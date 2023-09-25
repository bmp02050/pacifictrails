const draggableItems = document.querySelectorAll('.draggable');
const bottomContainer = document.getElementById('bottom-container');
const topContainer = document.getElementById('top-container');
const totalElement = document.getElementById('total');

// Function to set up dragstart for items
function setupDragstart(item) {
    item.addEventListener('dragstart', (e) => {
        const itemData = {
            id: item.id,
            name: item.dataset.name,
            cost: item.dataset.cost
        };
        e.dataTransfer.setData('application/json', JSON.stringify(itemData));
    });
}

// Set up dragstart for items in both containers
draggableItems.forEach(item => {
    setupDragstart(item);
});

// Set up dragstart for items in the top container (selected choices)
topContainer.querySelectorAll('.draggable').forEach(item => {
    setupDragstart(item);
});

bottomContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

bottomContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const jsonData = JSON.parse(e.dataTransfer.getData('application/json'));
    handleDrop(bottomContainer, topContainer, jsonData);
});

topContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

topContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const jsonData = JSON.parse(e.dataTransfer.getData('application/json'));
    handleDrop(topContainer, bottomContainer, jsonData);
});
let currentTotal = 0;

// Function to calculate and update the total cost
function updateTotal() {
    currentTotal = 0;
    const items = bottomContainer.querySelectorAll('.draggable');
    items.forEach(item => {
        currentTotal += parseInt(item.dataset.cost);
    });
    totalElement.textContent = `Total Cost: $${currentTotal}`;
}

function handleDrop(target, otherContainer, jsonData) {
    // Check if the target and otherContainer are the same
    if (target === otherContainer) {
        return;
    }

    let exists = false;
    const children = target.children;

    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        // Perform actions on each child element here
        if (child.id === jsonData.id) {
            exists = true;
            break;
        }
    }
    
    if (exists)
        return;
    
    const newItem = document.createElement('div');
    newItem.id = jsonData.id;
    newItem.className = "draggable";
    newItem.draggable = true;
    newItem.dataset.name = jsonData.name;
    newItem.dataset.cost = jsonData.cost;
    newItem.textContent = `${jsonData.name}: Additional Cost $${jsonData.cost}`;

    newItem.addEventListener('dragstart', (e) => {
        const itemData = {
            id: e.target.id,
            name: e.target.dataset.name,
            cost: e.target.dataset.cost
        };
        e.dataTransfer.setData('application/json', JSON.stringify(itemData));
    });


    target.appendChild(newItem);

    totalElement.textContent = `Total Cost: ${currentTotal}`;

    const draggedItemId = jsonData.id;
    const otherItems = otherContainer.querySelectorAll('.draggable');
    let draggedItem;

    otherItems.forEach(item => {
        if (item.id === draggedItemId) {
            draggedItem = item;
        }
    });

    if (draggedItem && target !== otherContainer) {
        draggedItem.remove();
    }
    updateTotal();
}

