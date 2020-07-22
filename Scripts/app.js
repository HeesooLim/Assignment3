"use strict";

/*
    Author: Heesoo Lim
    Date: July 21, 2020
    File Name: app.js
    File Description: This is a JavaScript file that is applied to index.html, contact.html and project.html
*/

/* starting function containing all functions */
function Start()
{
    let title = document.title;
    let navAnchors = document.querySelectorAll("li a");

    switch (title) {
        case 'Home':
            injectParagraphsOverlay();
            injectParagraphsBIOP();
            navAnchors[0].className = "nav-link active";
            break;
        case 'Project':
            injectParagraphsProject();
            navAnchors[1].className = "nav-link active";
            break;
        case 'Contact':
            injectParagraphsContact();
            navAnchors[2].className = "nav-link active";
            // get elements within the form
            let form = document.getElementById('form');
            form.addEventListener('submit', (event) =>
            {
                // prevent users from clicking submit button without typing anything
                event.preventDefault();
                check();
            });
            break;
        default:
            break;
    }
    
    addTextsToFooter();
} 

window.addEventListener("load", Start);

function injectParagraphsOverlay()
{
    
    let XHR = new XMLHttpRequest();
    XHR.open('GET', './Scripts/paragraphs.json');
    XHR.send();

    console.log(XHR.readyState);

    XHR.addEventListener("readystatechange", function()
    {
        if(XHR.readyState === 4 && XHR.status === 200)
        {
            let overlay = document.querySelectorAll('.overlay h2');
            let data = JSON.parse(XHR.responseText);
            let contentData = data.BIO;
            for (let index = 0; index < overlay.length; index++) 
            {
                overlay[index].innerText = contentData.hoverTexts[index];
            }          
        }
    })
}

function injectParagraphsBIOP()
{
    
    let XHR = new XMLHttpRequest();
    XHR.open('GET', './Scripts/paragraphs.json');
    XHR.send();

    console.log(XHR.readyState);

    XHR.addEventListener("readystatechange", function()
    {
        if(XHR.readyState === 4 && XHR.status === 200)
        {
            let missionStatement = document.querySelectorAll('.missionStatement p');
            let data = JSON.parse(XHR.responseText);
            let contentData = data.BIO;
            for (let index = 0; index < missionStatement.length; index++) 
            {
                missionStatement[index].innerText = contentData.Ps[index];
            }          
        }
    })
}

function injectParagraphsProject()
{
    
    let XHR = new XMLHttpRequest();
    XHR.open('GET', './Scripts/paragraphs.json');
    XHR.send();

    console.log(XHR.readyState);

    XHR.addEventListener("readystatechange", function()
    {
        if(XHR.readyState === 4 && XHR.status === 200)
        {
            let articleTopic = document.querySelectorAll("article h3");
            let projectHeading = document.querySelector("section h1");
            let articleParagraphs = document.querySelectorAll("article p");
            
            let data = JSON.parse(XHR.responseText);
            let contentData = data.Projects;
            projectHeading.innerText = contentData.topic;

            for (let index = 0; index < articleTopic.length; index++) 
            {
                articleTopic[index].innerText = contentData.subtitles[index];
                articleParagraphs[index].innerText = contentData.paragraphs[index];
            }          
        }
    })
}

/* add texts in footer */
function addTextsToFooter()
{
    // select footer nav bar
    let footerTag = document.querySelectorAll("nav")[1];

    footerTag.innerHTML = 
    `
    <h6>&copy; CopyRight 2020. All Rights Reserved. ( References of Pictures  <a href="https://unsplash.com/photos/VAJEea9u6k8">1</a> <a href="https://unsplash.com/photos/Wc8k-KryEPM">2</a> <a href="https://unsplash.com/photos/GjFbKfI874o">3</a>)</h6> 
    `;
}

/* add texts in Contact page */
function injectParagraphsContact() 
{
    let XHR = new XMLHttpRequest();
    XHR.open('GET', './Scripts/paragraphs.json');
    XHR.send();

    console.log(XHR.readyState);

    XHR.addEventListener("readystatechange", function()
    {
        if(XHR.readyState === 4 && XHR.status === 200)
        {
            let contactHeading = document.querySelector(".formContainer h1");
            let labels = document.querySelectorAll(".formContainer label");
            let buttons = document.querySelectorAll(".formContainer button");
            
            let data = JSON.parse(XHR.responseText);
            let contentData = data.Contact;
            contactHeading.innerText = contentData.topic;

            for (let index = 0; index < labels.length; index++) 
            {
                labels[index].innerText = contentData.labels[index];
            }      
            for (let index = 0; index < buttons.length; index++) 
            {
                buttons[index].innerText = contentData.buttons[index];
            }         
        }
    })
    
}

/* I have referenced the formation of the code from here https://www.youtube.com/watch?v=rsd4FNGTRBw and modified it when I write under code */

// form validation function
function check() 
{
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('secondName');
    let phone = document.getElementById('phone');
    let email = document.getElementById('email');
    // get each form element's value without space
    let firstNameValue = firstName.value.trim();
    let lastNameValue = lastName.value.trim();
    let phoneValue = phone.value.trim();
    let emailValue = email.value.trim();

    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    // count how many form elements input the user typed correctly
    let successNumber = 0;

    // check if the user input(first name) is correct or not
    if(firstNameValue === '')
    {
        errorOccur(firstName, 'Please enter your first name');
    }
    else
    {
        successOccur(firstName);
        successNumber += 1;
    }

    // check if the user input(second name) is correct or not
    if(lastNameValue === '')
    {
        errorOccur(lastName, 'Please enter your last name');
    }
    else
    {
        successOccur(lastName);
        successNumber += 1;
    }

    // check if the user input(phone number) is correct or not
    if(phoneValue === '' || !phonePattern.test(phoneValue))
    {
        errorOccur(phone, 'Please enter the correct phone number');
    }
    else
    {
        successOccur(phone);
        successNumber += 1;
    }

    // check if the user input(email address) is correct or not
    if(emailValue === '' || !emailPattern.test(emailValue))
    {
        errorOccur(email, 'Please enter the correct email address');
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
    function errorOccur(input, message)
    {
        let formControl = input.parentElement;

        // assign error message
        formControl.querySelector('small').innerText = message;

        // change the class name
        formControl.className = "form-control fail";
    }
    
    /* when user input is correct */
    function successOccur(input)
    {
        let formControl = input.parentElement;

        // change the class name
        formControl.className = "form-control success";
    }
}
