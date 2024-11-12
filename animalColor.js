// Fetch animal color data from the server
fetch('http://localhost:3000/animalColor')
    .then(res => res.json())
    .then(data => {
        // Unbox data into animal and color array
        animalArray=data.animals.map(animal=>animal.name)
        colorArray=data.colors.map(color=>color.name)


        //list all animals
        const animalList = document.getElementById('animalList');
        animalArray.forEach(animal => {
            const li = document.createElement('li');
            li.textContent = animal;
            li.setAttribute('draggable', 'true');
            li.classList.add('draggableItem');
            animalList.appendChild(li);
        });


    //list all colors
        const colorList = document.getElementById('colorList');
        colorArray.forEach(color => {
            const li = document.createElement('li');
            li.textContent = color;
            li.setAttribute('draggable', 'true');
            li.classList.add('draggableItem');
            colorList.appendChild(li);
        });

        enableDragAndDrop();

    })

    function enableDragAndDrop() {
        const draggableItems = document.querySelectorAll('.draggableItem');
        const dropZoneAnimal = document.getElementById('dropZoneAnimal');
        const dropZoneColor = document.getElementById('dropZoneColor');


    //make start point
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', e.target.textContent);
            });
        });
    
        // Prevent default dragover behavior (so drop is allowed)
        dropZoneAnimal.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        dropZoneColor.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    
        // Handle drop for animal zone
        dropZoneAnimal.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedItem = e.dataTransfer.getData('text');
            
            // Check if the dropped item is an animal
            if (isAnimal(draggedItem)) {
                dropZoneAnimal.textContent = `You dropped: ${draggedItem}`;
                dropZoneAnimal.style.backgroundColor = '#A3D8FF';
            } else {
                alert('You can only drop animals here!');
            }
        });
    
        // Handle drop for color zone
        dropZoneColor.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedItem = e.dataTransfer.getData('text');
            
            // Check if the dropped item is a color
            if (isColor(draggedItem)) {
                dropZoneColor.textContent = `You dropped: ${draggedItem}`;
                dropZoneColor.style.backgroundColor = '#FFD1A1'; 
            } else {
                alert('You can only drop colors here!');
            }
        });
    }
    
    // Function to check if the dropped item is an animal
    function isAnimal(item) {
        const animals = animalArray; 
        return animals.includes(item);
    }
    
    // Function to check if the dropped item is a color
    function isColor(item) {
        const colors = colorArray; 
        return colors.includes(item);
    }



