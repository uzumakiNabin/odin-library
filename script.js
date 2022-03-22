const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const hasReadBook = document.getElementsByName('hasRead');
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
}

function showBooksFromLibrary(){
    showField.innerHTML = "";
    myLibrary.forEach(book => {
        let card = document.createElement('div');
        card.classList.add('card');
        let cardTitle = document.createElement('h3');
        cardTitle.classList.add('cardTitle');
        cardTitle.textContent = book.title;
        let cardAuthor = document.createElement('p');
        cardAuthor.classList.add('cardAuthor');
        cardAuthor.textContent = book.author;
        let cardPages = document.createElement('p');
        cardPages.classList.add('cardPages');
        cardPages.textContent = `${book.pages} pages`;
        let cardReadStatus = document.createElement('p');
        cardReadStatus.classList.add('cardReadStatus');
        cardReadStatus.textContent = "Mark this book as read.";
        let cardReadStatusCheck = document.createElement('input');
        cardReadStatusCheck.type = 'checkbox';
        if(book.hasRead === 'read'){
            cardReadStatusCheck.checked = true;
        }
        else{
            cardReadStatusCheck.checked = false;
        }
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        card.appendChild(cardReadStatus);
        card.appendChild(cardReadStatusCheck);
        showField.append(card);
    })
}

addBookBtn.addEventListener('click', addBookToLibrary);

showBooksFromLibrary();