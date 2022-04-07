const addBookFormToggleBtn = document.getElementById('addBookFormToggleBtn');
const form = document.getElementsByClassName('formContainer')[0];
const closeForm = document.getElementById('close-mark');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const hasReadBook = document.getElementsByName('hasRead');
const addBookForm = document.getElementsByTagName('form')[0];
const addBookBtn = document.getElementById('addBookBtn');
const showField = document.getElementById('show');

let myLibrary = [];
let updateIndex = -1;

function book(title, author, pages, hasRead){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.hasRead = hasRead
};

function addBookToLibrary(e){
    e.preventDefault();
    const bookObject = new book(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        hasReadBook[0].checked ? hasReadBook[0].value : hasReadBook[1].value
    );
    if(addBookBtn.textContent === 'Update'){
        updateBookInLibrary(bookObject);
        return;
    }
    if(myLibrary.some((bk) =>  bk.title === bookTitle.value)) {
        alert(`${bookTitle.value} already exists.`);
        return false;
    } else {
        myLibrary.push(bookObject);
    }
    clearFields();
    showBooksFromLibrary();
    form.classList.add('hidden');
}

function updateBookInLibrary(bookToUpdate) {
    myLibrary[updateIndex] = bookToUpdate;
    showBooksFromLibrary();
    form.classList.add('hidden');
}

function showBooksFromLibrary(){
    showField.innerHTML = "";
    myLibrary.forEach((book, index) => {
        let card = document.createElement('div');
        card.classList.add('card');

        let cardTitle = document.createElement('h3');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = book.title;

        let cardAuthor = document.createElement('p');
        cardAuthor.classList.add('card-author');
        cardAuthor.textContent = book.author;

        let cardPages = document.createElement('p');
        cardPages.classList.add('card-pages');
        cardPages.textContent = `${book.pages} pages`;

        let readStatusBtn = document.createElement('input');
        readStatusBtn.type = 'button';
        readStatusBtn.value = 'Mark as read';
        readStatusBtn.classList.add('btn', 'readBtn');
        if(book.hasRead === 'read'){
            readStatusBtn.classList.add('bookCompleted');
            readStatusBtn.value = '✔ Completed';
        }
        readStatusBtn.addEventListener('click', () => {
            if(book.hasRead === 'read'){
                book.hasRead = 'notread';
            }
            else{
                book.hasRead = 'read';
            }
            showBooksFromLibrary();
        });

        let editBtn = document.createElement('input');
        editBtn.type = 'button';
        editBtn.value = 'Edit';
        editBtn.classList.add('btn', 'editBtn');
        editBtn.addEventListener('click', () => {
            addBookBtn.textContent = 'Update';
            bookTitle.value = book.title;
            bookAuthor.value = book.author;
            bookPages.value = book.pages;
            updateIndex = index;
            form.classList.remove('hidden');
        });

        let deleteBtn = document.createElement('input');
        deleteBtn.type = 'button';
        deleteBtn.value = "Remove";
        deleteBtn.classList.add('btn', 'deleteBtn');
        deleteBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            showBooksFromLibrary();
        });

        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        card.appendChild(readStatusBtn);
        card.appendChild(editBtn);
        card.appendChild(deleteBtn);
        showField.append(card);
    })
};

const clearFields = () => {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    hasReadBook[0].checked = true;
}

addBookFormToggleBtn.addEventListener('click', () => {
    addBookBtn.textContent = 'Add';
    form.classList.remove('hidden');
});

addBookForm.addEventListener('submit', addBookToLibrary);

closeForm.addEventListener('click', () => {
    form.classList.add('hidden');
    clearFields();
})

showBooksFromLibrary();