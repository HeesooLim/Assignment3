"use strict";

/*
    Author: Heesoo Lim
    Date: July 28, 2020
    File Name: app.js
    File Description: This is a JavaScript file that is applied to index.html, contact.html and project.html
*/

/* starting function containing all functions */
function Start()
{
    let title = document.title;
    
    switch (title) {
        case 'Home':
            headerNav(title);
            bioContents();
            break;
        case 'Project':
            headerNav(title);
            projectContents();
            break;
        case 'Contact':
            headerNav(title);
            contactcontents();
            break;
        default:
            break;
    }

    footer();
} 

window.addEventListener("load", Start);

function headerNav(title)
{
    // Instantiate XMLHttpRequest object
    let XHR = new XMLHttpRequest();

    // Open the request
    XHR.open('GET', './Views/partials/header.html');

    // Send a request to the server
    XHR.send();

    XHR.addEventListener("readystatechange", function()
    {
        if(XHR.readyState === 4 && XHR.status === 200)
        {
            let header = document.getElementsByTagName('header')[0];

            header.innerHTML = XHR.responseText;

            let navAnchor = document.getElementById(title);

            navAnchor.className = "nav-link active";
        }
    })
}

function bioContents()
{
    // Instantiate XMLHttpRequest object
    let XHR = new XMLHttpRequest();

    // Open the request
    XHR.open('GET', './Scripts/paragraphs.json');

    // Send a request to the server
    XHR.send();

    XHR.addEventListener("readystatechange", function()
    {
        if(XHR.readyState === 4 && XHR.status === 200)
        {
            let missionStatement = document.querySelectorAll('.missionStatement p');
            let overlay = document.querySelectorAll('.overlay h2');

            let data = JSON.parse(XHR.responseText);
            let contentData = data.BIO;

            for (let index = 0; index < 2; index++) 
            {
                overlay[index].innerText = contentData[index];
            }
            
            for (let index = 0; index < 3; index++) 
            {
                missionStatement[index].innerText = contentData[index+2];
            } 
            
        }
    })
}

function projectContents()
{
    // Instantiate XMLHttpRequest object
    let XHR = new XMLHttpRequest();

    // Get information and open the request
    XHR.open('GET', './Scripts/paragraphs.json');

    // Send a request to the server
    XHR.send();

    XHR.addEventListener("readystatechange", function()
    {
        if(XHR.readyState === 4 && XHR.status === 200)
        {
            let projectHeading = document.querySelector("section h1");

            let articleTopic = document.querySelectorAll("article h3");

            let articleParagraphs = document.querySelectorAll("article p");
            
            let data = JSON.parse(XHR.responseText);
            let contentData = data.Projects;

            projectHeading.innerText = contentData[0];

            for (let index = 0; index < 3; index++) 
            {
                articleTopic[index].innerText = contentData[index+1];

                articleParagraphs[index].innerText = contentData[index+4];
            }        
        }
    })
}

function contactcontents() 
{
    // Instantiate XMLHttpRequest object
    let XHR = new XMLHttpRequest();

    // Open the request
    XHR.open('GET', './Scripts/paragraphs.json');

    // Send a request to the server
    XHR.send();

    XHR.addEventListener("readystatechange", function()
    {
        if(XHR.readyState === 4 && XHR.status === 200)
        {
            let contactHeading = document.querySelector(".formContainer h1");

            let labels = document.querySelectorAll(".formContainer label");

            let buttons = document.querySelectorAll(".formContainer button");

            let errorDivs = document.querySelectorAll('small');
            
            let data = JSON.parse(XHR.responseText);

            let contentData = data.Contact;

            contactHeading.innerText = contentData[0];

            for (let index = 0; index < 5; index++) 
            {
                labels[index].innerText = contentData[index+1];
            }      

            for (let index = 0; index < 2; index++) 
            {
                buttons[index].innerText = contentData[index+6];
            }

            for (let index = 0; index < 4; index++) 
            {
                errorDivs[index].innerText = contentData[index+8]
            }
        }
    })

    document.getElementById('form').addEventListener('submit', (event) =>
    {
        event.preventDefault();
        formValidate();
    });
}

function formValidate() 
{
    // input elements
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('secondName');
    let phone = document.getElementById('phone');
    let email = document.getElementById('email');

    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    // count how many form elements input the user typed correctly
    let successNumber = 0;

    if(firstName.value === '')
    {
        errorOccur(firstName);
    }
    else
    {
        successOccur(firstName);
        successNumber += 1;
    }

    if(lastName.value === '')
    {
        errorOccur(lastName);
    }
    else
    {
        successOccur(lastName);
        successNumber += 1;
    }

    if(phone.value === '' || !phonePattern.test(phone.value))
    {
        errorOccur(phone)
    }
    else
    {
        successOccur(phone);
        successNumber += 1;
    }

    if(email.value === '' || !emailPattern.test(email.value))
    {
        errorOccur(email);
    }
    else
    {
        successOccur(email);
        successNumber += 1;
    }

    // if all inputs from user are correct, it will load index page
    if(successNumber === 4)
    {
        window.location.href = "https://heesoolim.github.io/Assignment3/index.html";
    }

    /* when user input is not correct */
    function errorOccur(input)
    {
        input.parentElement.className = "form-control fail";
    }
    
    /* when user input is correct */
    function successOccur(input)
    {
        // change the class name
        input.parentElement.className = "form-control success";
    }
}

function footer()
{
    // Instantiate XMLHttpRequest object
    let XHR = new XMLHttpRequest();

    // Open the request
    XHR.open('GET', './Views/partials/footer.html');

    // Send a request to the server
    XHR.send();

    XHR.addEventListener("readystatechange", function()
    {
        if(XHR.readyState === 4 && XHR.status === 200)
        {
            let footer = document.getElementsByTagName('footer')[0];

            footer.innerHTML = XHR.responseText;
        }
    })
}
/* I have referrd form validation function https://www.youtube.com/watch?v=rsd4FNGTRBw */