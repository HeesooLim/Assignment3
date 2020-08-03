"use strict";

/*
    Author: Heesoo Lim
    Date: August 03, 2020
    File Name: app.js
    File Description: This is a JavaScript file that is applied to index.html, contact.html and project.html
*/

function Start()
{
    let title = document.title;
    
    switch (title) {
        case 'Home':
            headerNav(title);
            usingXHR(bioContents);
            break;
        case 'Project':
            headerNav(title);
            usingXHR(projectContents);
            break;
        case 'Contact':
            headerNav(title);
            usingXHR(contactContents);
            break;
        default:
            break;
    }
    
    footer();
} 

window.addEventListener("load", Start);

function usingXHR(callback)
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
            let data = JSON.parse(XHR.responseText);

            if(typeof callback === 'function')
            {
                callback(data);
            }
        }
    })
    

}

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

function bioContents(data)
{
    let missionStatement = document.querySelector('.missionStatement');
    let overlay = document.querySelector('.overlay .hoverTexts');

    let bioHoverTexts = data.bioHoverTexts;
    let bioParagraphs = data.bioParagraphs;

    for (const text of bioHoverTexts) 
    {
        let h2 = document.createElement('h2');
        h2.innerText = text.heading;
        overlay.appendChild(h2);
    }

    for (const text of bioParagraphs) 
    {
        let p = document.createElement('p');
        p.innerText = text.paragraph;
        missionStatement.appendChild(p);
    }
}

function projectContents(data)
{
    let articleHeader = document.querySelectorAll("article header");
    
    let articleParagraphs = document.querySelectorAll("article .content");

    let projectTitle = document.querySelector("section h1");

    projectTitle.innerText = data.projectTopic;

    let projectTexts = data.projectTexts;

    let index = 0;

    for (const text of projectTexts) 
    {
        let h3 = document.createElement('h3');
        h3.innerText = text.heading;
        articleHeader[index].appendChild(h3);

        let p = document.createElement('p');
        p.innerText = text.paragraph;
        articleParagraphs[index].appendChild(p);

        index++;
    }
}

function contactContents(data) 
{
    let contactHeading = document.querySelector(".formContainer h1");

    contactHeading.innerText = data.contactTopic;

    let labelTags = document.querySelectorAll(".formContainer label");

    let buttonTags = document.querySelectorAll(".formContainer button");

    let smallTags = document.querySelectorAll('.form-control small');

    let labels = data.contactLabels;
    let buttons = data.contactButtons;
    let errorMessages = data.contactErrorMessages;

    let index = 0;

    for (const text of labels) {
        labelTags[index].innerText = text.label;
        index++;
    }

    index = 0;

    for (const text of buttons) {
        buttonTags[index].innerText = text.button;
        index++;
    }
    
    index = 0;

    for (const text of errorMessages) {
        smallTags[index].innerText = text.errorMessage;
        index++;
    }

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
        let currentLocation = window.location.href ;
        let rootLocation = currentLocation.substr(0, currentLocation.lastIndexOf('/')+1);
        window.location.href = rootLocation + "index.html";
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