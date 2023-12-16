const categories = JSON.parse(localStorage.getItem('categories')) || [];
     
function addCategory() {
  // Validation
  const categoryCode = document.getElementById('categoryCode').value;
  const categoryName = document.getElementById('categoryName').value;
  const categoryImageInput = document.getElementById('categoryImage');
  const categoryImage = categoryImageInput.files[0];
  if (!categoryCode || !/^[1-9][a-zA-Z0-9]*$/.test(categoryCode)) {
    alert('ID to start with a digit from 1 to 9 followed by zero or more digit..');
    return;
}


if (!categoryName || !/^[A-Z][a-z]{2,8}$/.test(categoryName)) {
    alert('first letter  of product name Must capital, followed by 2 to 8 small letters.');
    return;
}




if (!categoryImage) {
    alert('All fields are required');
    return;
}

  // Validate image type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(categoryImage.type)) {
      alert('Invalid image type. Please choose a JPEG, PNG, or GIF image.');
      return;
  }

      // Read the image as data URL
      const reader = new FileReader();
      reader.onload = function (e) {
          const categoryImageData = e.target.result;

          // Create category object
          const category = {
              code: categoryCode,
              name: categoryName,
              image: categoryImageData

          };

          // Add category to the array
          categories.push(category);

          // Save categories to local storage
          localStorage.setItem('categories', JSON.stringify(categories));

          // Refresh the table
          displayCategories();

          // Clear form fields
          document.getElementById('categoryForm').reset();
      };

      reader.readAsDataURL(categoryImage);
  }

  function displayCategories() {
      const categoryTable = document.getElementById('categoryTable').getElementsByTagName('tbody')[0];
      categoryTable.innerHTML = ''; // Clear existing rows

      categories.forEach(category => {
          const newRow = categoryTable.insertRow();
          const cells = Object.values(category).map(value => {
              const cell = newRow.insertCell();
              if (value === category.image) {
                  // Display image in a new img element
                  const image = document.createElement('img');
                  image.src = value;
                  image.classList.add('category-image');
                  cell.appendChild(image);
              } else {
                  cell.textContent = value;
              }
              return cell;
          });

          // Add delete button
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => {
              deleteCategory(categories.indexOf(category));
          });
          const deleteCell = newRow.insertCell();
          deleteCell.appendChild(deleteButton);



          //  const deleteAllButton = document.createElement('button');
          //  deleteAllButton.textContent = 'Delete';
          //  deleteAllButton.addEventListener('click', () => {
          //     deleteAll(categories.indexOf(category));
          //  });
          //  const deleteAllCell = newRow.insertCell();
          //  deleteAllCell.appendChild(deleteAllButton);


      });
  }

  function deleteCategory(index) {
      categories.splice(index, 1);
      localStorage.setItem('categories', JSON.stringify(categories));
      displayCategories();
  }

  function deleteAll() {
      localStorage.clear();
      categories.splice(0);
      displayCategories();
  }

  // Initial display of categories
  displayCategories();