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

function book(title, author, pages, hasRead){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.hasRead = hasRead
};

function addBookToLibrary(e){
    e.preventDefault();
    let hasReadInput;
    hasReadBook.forEach(radioButton => {
        if(radioButton.checked){
            hasReadInput = radioButton.value;
        };
    });
    myLibrary.push(
        new book(
            bookTitle.value,
            bookAuthor.value,
            bookPages.value,
            hasReadInput
        )
    );
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
            document.getElementById('formContainer').style.display = 'block';
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
}

addBookFormToggleBtn.addEventListener('click', () => {
    form.classList.remove('hidden');
});

addBookForm.addEventListener('submit', addBookToLibrary);

closeForm.addEventListener('click', () => {
    form.classList.add('hidden');
})

showBooksFromLibrary();