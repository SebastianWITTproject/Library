const submit = document.getElementById("form");
const Books = document.getElementById("books");
const add = document.getElementById("booksel");
const toggle = document.getElementById("formToggle");
let booklist = [];
let dataId = 0;

// Book object constructor

function book(title, author, page, read, id)
{
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.id = id;
}

function remove(event)
{
    let toFind = event.target.parentElement.dataset.indexNumber;
    let indextoRem = booklist.findIndex(item => item.id == toFind);
    booklist.splice(indextoRem, 1);
    Books.removeChild(event.target.parentElement);
}

function setColor(event)
{
    let toFind = event.target.parentElement.dataset.indexNumber;
    let isRead = booklist[booklist.findIndex(item => item.id == toFind)].read;
    if (isRead == false)
    {
        event.target.style.backgroundColor= "green";
        booklist[booklist.findIndex(item => item.id == toFind)].read = true;
    }
    else
    {
        event.target.style.backgroundColor= "pink";
        booklist[booklist.findIndex(item => item.id == toFind)].read = false;
    }
}

function displayBooks(index)
{
    // Set up the DOM architecture to create one book div with his children content

    let wrapper = document.createElement("div");
    let divTitle = document.createElement("div");
    let divAuthor = document.createElement("div");
    let divPage = document.createElement("div");
    let divRead = document.createElement("button");
    let divRem= document.createElement("button");
    
   
    divTitle.innerHTML= booklist[index].title;
    divAuthor.innerHTML= booklist[index].author;
    divPage.innerHTML= booklist[index].page;
    divRem.innerHTML= "Remove";
    
    divRead.innerHTML= "Read";
    if (booklist[index].read == false)
    {
        divRead.style.backgroundColor= "pink";
    }
    else
    {
        divRead.style.backgroundColor= "green";
    }
    divRead.addEventListener("click", function(event) {setColor(event);});
    divRem.addEventListener("click", function(event) {remove(event);});

    wrapper.appendChild(divTitle);
    wrapper.appendChild(divAuthor);
    wrapper.appendChild(divPage);
    wrapper.appendChild(divRead);
    wrapper.appendChild(divRem);

    wrapper.dataset.indexNumber = booklist[index].id;

    Books.appendChild(wrapper).className = "book";
       
}

// Create an object based on the input fields on submit + give an ID value to find removed elements in array object
// + call function display on each object array element to create book html for each index of array

submit.addEventListener("submit", function (event)
{
    event.preventDefault();
    let info = new book(event.target.title.value, event.target.author.value,
                        event.target.page.value, event.target.read.checked, dataId);
     
    booklist.push(info);
    displayBooks(booklist.length - 1);
    event.target.reset();
    dataId ++; 
    toggle.style.display = "none";
    Books.style.display = "flex";
    document.querySelectorAll("body> *").forEach((el) => el.style.opacity = "1");;
}
);

add.addEventListener("click", function (event)
{
    toggle.style.display = "inline-block";
    Books.style.display = "none";
    document.querySelectorAll("body > :not(.formToggle)").forEach((el) => el.style.opacity = "0.3");;
}
);
    document.addEventListener("click", function (event)
    {
        if(!event.target.closest("#formToggle") && !event.target.closest(".booksel"))
        {
            toggle.style.display = "none";
            document.querySelectorAll("body> *").forEach((el) => el.style.opacity = "1");;
            Books.style.display = "flex";
        }
    }
    );
   
