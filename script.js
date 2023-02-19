//First, add button and event listeners
const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addBookToLibrary);

const newBookBtn = document.querySelector('#newBtn')
newBookBtn.addEventListener('click', () => popUpForm.style.display = 'block')

const popUpForm = document.getElementById('popUp');

//[1] is to get the second span element. Even if it only has one span, still need to add.
const closePopUp = document.getElementsByTagName('span')[1];
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none');

//Define book class and constructor
class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = form.pages.value + ' Pages';
        this.read = form.read.checked;
    }
}

//Define empty library array and object to be instantiated later
let myLibrary = [];
let newBook;

function addBookToLibrary() {
    event.preventDefault();
    popUpForm.style.display = 'none';

    //dont forget the 'new' when instantiating objects!
    newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    setData();
    Reload();
    form.reset();
}

//Reload the visuals of the browser each time
function Reload() {
    const libContainer = document.getElementById('Library-container');
    const allBooks = document.querySelectorAll('.book')
    //This is to make sure only 1 book is added, by removing previous book data after the first addition.
    //Otherwise, it will be add 1, then add 2 at once, then add 3 at once, etc
    allBooks.forEach(book => libContainer.removeChild(book));

    for (let i=0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

//createBook function to add DOM elements to add to display after the books has been added.
//append all the details needed to the book Div, then finally append book Div to the Library
function createBook(item) {
    const library = document.querySelector('#Library-container')
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    //start with book div first as container. Then append the other details inside
    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    //set the incoming item (book object) details as the text context of the newly created element
    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authorDiv.textContent = item.author;
    authorDiv.classList.add('author');
    bookDiv.appendChild(authorDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn');
    bookDiv.appendChild(readBtn);
    if(item.read === false) {
        readBtn.textContent = 'Have not been read';
        readBtn.style.backgroundColor = '#e04f63';
    }else {
        readBtn.textContent = 'Have been Read';
        readBtn.style.backgroundColor = '#63da63'
    }

    removeBtn.textContent = 'Remove Book';
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);

    library.appendChild(bookDiv);

    //Remove book once clicked on remove button
    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData();
        Reload();
    });

    //Toggle between read and not read when clicked
    readBtn.addEventListener('click', () => {
        item.read = !item.read;
        setData();
        Reload();
    });
    //Note, why we do setData() and Reload() after removing or toggling?

    //For setData(), it is to update the localStorage with the new myLibrary array -> JSON
    //If we omit setData(), we can try to do some changes (delete, or toggle read), but after refresh it will be gone.
    //Because the localStorage is not updated with the new changes, it still only has previous info.

    //For Reload(), it is to reload all the elements. If something has been removed, the for loop at Reload() will update with new myLibrary.length
    //And when it is creating each individual book before appending it to the myLibrary, it will check the checkbox for read or not read.
    //As the page has already been loaded BEFORE we interact (delete/toggle checkbox), we have to reload to show our changes.

 

};

//Set library array object to be stored in local storage by converting it to JSON using stringify
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//When page is refreshed, we always execute restore() function first, to get data from existing local storage if any
function restore() {
    //if no existing local storage data, do nothing.
    if(!localStorage.myLibrary) {
       Reload();
    }
    //Else, get existing data from localstorage
    //previously (before the refresh) the function setData() will create a keyName called 'myLibrary'.
    //so now we set objects to get the keyValue (book objects) of the keyName 'myLibrary'.
    //We receive the info from localStorage in the form of JSON string, so we need to PARSE it to convert to Javascript object.
    //We then set the array object as myLibrary (empty array created at the start).
    //Lastly, we execute Reload() function to display the visuals of the book container.
    else {
        let objects = localStorage.getItem('myLibrary')
        objects = JSON.parse(objects);
        myLibrary = objects;
        Reload();
    }
}

restore();
