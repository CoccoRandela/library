let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

Book.prototype.toggleRead = function() {
    if (this.read === false) this.read = true;
    else this.read = false;
}

function openCloseForm(e) {
    let form = document.querySelector('.form-container');
    let openForm = document.querySelector('.open-form');
    if (e.target === form || e.target === openForm) {
        form.classList.toggle('active');
    }
}

function eraseForm() {
    const form = document.querySelector('.form');
    const formElements = form.querySelectorAll('input');
    Array.prototype.forEach.call(formElements, element => {
        if (element.checked) {
            element.checked = false;
        }
        element.value = '';
    })
}

function addBookToLibrary() {
    let book = new Book(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, document.getElementById('read').checked);
    myLibrary.push(book);
    eraseForm();
    displayLibrary();
}

function displayLibrary(library = myLibrary) {
    while (document.querySelector('.library').hasChildNodes()) {
        document.querySelector('.library').removeChild(document.querySelector('.library').lastChild)
    }
    myLibrary.forEach(element => {
        let book = document.createElement('div');
        book.classList.add('book');
        book.setAttribute('data-number', `${library.indexOf(element)}`);

        let title = document.createElement('p');
        title.textContent = `"${element.title}"`;
        book.appendChild(title);

        let author = document.createElement('p');
        author.textContent = element.author;
        book.appendChild(author);

        let pages = document.createElement('p');
        pages.textContent = `Pages: ${element.pages}`;
        book.appendChild(pages);

        let readLabel = document.createElement('label');
        readLabel.setAttribute('for', 'read-book');
        readLabel.textContent = 'Read:';

        let read = document.createElement('input');
        read.setAttribute('id', 'read-book');
        read.setAttribute('type', 'checkbox');
        read.checked = element.read;

        let div = document.createElement('div')
        div.classList.add('checkbox-container');
        div.appendChild(readLabel);
        div.appendChild(read);
        book.appendChild(div)




        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remove';
        book.appendChild(removeButton);

        document.querySelector('.library').appendChild(book);
    })
}

function removeBook(book, e) {
    let removeButton = book.querySelector('.remove-button');
    if (e.target === removeButton) {
        let bookNumber = book.dataset.number;
        myLibrary.splice(bookNumber, 1);
        displayLibrary();
    } else return;
}

function toggleRead(book, e) {
    let checkbox = book.querySelector('input');
    if (e.target === checkbox) {
        let bookNumber = book.dataset.number;
        let libraryItem = myLibrary[bookNumber]
        libraryItem.toggleRead();
    }
}

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.form-container').classList.toggle('active');
    addBookToLibrary();
})

document.addEventListener('click', click => {
    let books = document.querySelectorAll('.book');
    books.forEach(book  => removeBook(book, click));
    books.forEach(book  => toggleRead(book, click));
})

document.addEventListener('click', openCloseForm, 'click')