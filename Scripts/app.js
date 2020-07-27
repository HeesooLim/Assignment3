"use strict";

/*
    Author: Heesoo Lim
    Date: July 26, 2020
    File Name: app.js
    File Description: This is a JavaScript file that is applied to index.html, contact.html and project.html
*/

let navAnchors = document.querySelectorAll("li a");

/* starting function containing all functions */
function Start()
{
    let title = document.title;

    switch (title) {
        case 'Home':
            injectParagraphsBIO();
            break;
        case 'Project':
            injectParagraphsProject();
            break;
        case 'Contact':
            injectParagraphsContact();
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

function injectParagraphsBIO()
{
    navAnchors[0].className = "nav-link active";

    let XHR = new XMLHttpRequest();
    XHR.open('GET', './Scripts/paragraphs.json');
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

function injectParagraphsProject()
{
    navAnchors[1].className = "nav-link active";
    
    let XHR = new XMLHttpRequest();
    XHR.open('GET', './Scripts/paragraphs.json');
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

/* add texts in Contact page */
function injectParagraphsContact() 
{
    navAnchors[2].className = "nav-link active";

    let XHR = new XMLHttpRequest();
    XHR.open('GET', './Scripts/paragraphs.json');
    XHR.send();

    XHR.addEventListener("readystatechange", function()
    {
        if(XHR.readyState === 4 && XHR.status === 200)
        {
            // heading of Contact page
            let contactHeading = document.querySelector(".formContainer h1");
            // all labels in Contact page
            let labels = document.querySelectorAll(".formContainer label");
            // send and undo buttons in contact page
            let buttons = document.querySelectorAll(".formContainer button");

            let errorDivs = document.querySelectorAll('small');
            
            let data = JSON.parse(XHR.responseText);
            let contentData = data.Contact;

            // inject heading text
            contactHeading.innerText = contentData[0];

            // inject texts for labels from labels array in JSON file
            for (let index = 0; index < 5; index++) 
            {
                labels[index].innerText = contentData[index+1];
            }      

            // inject texts for buttons from buttons array in JSON file
            for (let index = 0; index < 2; index++) 
            {
                buttons[index].innerText = contentData[index+6];
            }

            // inject texts for error messages from buttons array in JSON file
            for (let index = 0; index < 4; index++) 
            {
                errorDivs[index].innerText = contentData[index+8]
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

/* I have referrd the formation of the code from here https://www.youtube.com/watch?v=rsd4FNGTRBw and modified it when I write below code */

// form validation function
function check() 
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

    // check if the user input(first name) is correct or not
    if(firstName.value === '')
    {
        // errorOccur(firstName, injectErrorMessages('firstName'));
        errorOccur(firstName);
    }
    else
    {
        successOccur(firstName);
        successNumber += 1;
    }

    // check if the user input(second name) is correct or not
    if(lastName.value === '')
    {
        // errorOccur(lastName, injectErrorMessages('secondName'));
        errorOccur(lastName);
    }
    else
    {
        successOccur(lastName);
        successNumber += 1;
    }

    // check if the user input(phone number) is correct or not
    if(phone.value === '' || !phonePattern.test(phone.value))
    {
        // errorOccur(phone, injectErrorMessages('phone'));
        errorOccur(phone)
    }
    else
    {
        successOccur(phone);
        successNumber += 1;
    }

    // check if the user input(email address) is correct or not
    if(email.value === '' || !emailPattern.test(email.value))
    {
        // errorOccur(email, injectErrorMessages('email'));
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

    // function injectErrorMessages(type)
    // {
    //     let XHR = new XMLHttpRequest();
    //     XHR.open('GET', './Scripts/paragraphs.json');
    //     XHR.send();

    //     XHR.addEventListener("readystatechange", function()
    //     {
    //         if(XHR.readyState === 4 && XHR.status === 200)
    //         {
    //             let data = JSON.parse(XHR.responseText);
    //             let contentData = data.Contact;
    //             let message = "";

    //             switch (type) {
    //                 case "firstName":
    //                     message = contentData.errorMessages[0];
    //                     errorOccur(firstName, message);
    //                     break;

    //                 case "secondName":
    //                     message = contentData.errorMessages[1];
    //                     errorOccur(lastName, message);
    //                     break;

    //                 case "phone":
    //                     message = contentData.errorMessages[2];
    //                     errorOccur(phone, message);
    //                     break;

    //                 case "email":
    //                     message = contentData.errorMessages[3];
    //                     errorOccur(email, message);
    //                     break;
                
    //                 default:
    //                     break;
    //             }      
    //             return message;
    //         }
    //     })
    // }

    /* when user input is not correct */
    function errorOccur(input)
    {
        // let formControl = input.parentElement;

        // change the class name
        input.parentElement.className = "form-control fail";
    }
    
    /* when user input is correct */
    function successOccur(input)
    {
        let formControl = input.parentElement;

        // change the class name
        formControl.className = "form-control success";
    }
}
