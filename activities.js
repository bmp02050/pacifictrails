const draggableElements = document.querySelectorAll('.draggable');
const totalElement = document.getElementById('total');

let totalValue = 0;

// Add drag and drop event listeners to each draggable element
draggableElements.forEach((element) => {
    element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });

    element.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    element.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedItemId = e.dataTransfer.getData('text/plain');
        const draggedItem = document.getElementById(draggedItemId);
        const itemValue = parseFloat(draggedItem.getAttribute('data-value'));
        totalValue += itemValue;
        totalElement.textContent = `Total: ${totalValue}`;
    });
});
