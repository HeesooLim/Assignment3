"use strict";

/*
    Author: Heesoo Lim
    Date: July 02, 2020
    File Name: app.js
    File Description: This is a JavaScript file that is applied to index.html, contact.html and project.html
*/

/* starting function containing all functions */
function Start()
{
        highlightActiveLink();
        addHeading2HoverTextInBio();
        addParagraphsInBio();
        addTextsInProject();
        addTextsToContact();
        addTextsToFooter();
} 

window.addEventListener("load", Start);

let title = document.title;

/* highlight actived link */
function highlightActiveLink() 
    {
        let title = document.title;

        title = title.toLowerCase();

        // select all anchor tags in navigation bar
        let navAnchors = document.querySelectorAll("li a");

        let activeAnchor = "nav-link active";

        for (const anchor of navAnchors) 
        {
            let href = anchor.getAttribute("href");

            // remove .html from href
            let hrefName = href.substr(0, href.length - 5);

            // if the title and href match, make the anchor active
            if (hrefName === title || title === "home" && hrefName === "index") 
            {
                anchor.className = activeAnchor;    
            }
        }
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

/* add h2 texts in Biopage */
function addHeading2HoverTextInBio() 
{
    if(title === "Home")
    {
        // get an element
        let overlayText = document.getElementsByClassName("overlay")[0];
            
        if (overlayText) 
        {
            // create h2 element
            let firstH2 = document.createElement("h2");

            // insert texts into h2 element
            firstH2.textContent = `Welcome,`;
                
            // add h2 element in div element
            overlayText.appendChild(firstH2);

            let secondH2 = document.createElement("h2");
            secondH2.textContent = `I am Heesoo`;
            overlayText.appendChild(secondH2);
        }
    }
        
}

/* add mission state <p> in Bio page */
function addParagraphsInBio() 
{
    if(title === "Home")
    {
        // get an element
        let missionStatement = document.getElementsByClassName("missionStatement")[0];

        if (missionStatement) 
        {
            // add contents in a div element
            missionStatement.innerHTML =
            `
            <p>"To do my best with courage and passion"</p>
            <p>Hi, my name is Heesoo Lim.</p>
            <p>I'm taking Software Engineering Technology course. My goal is to be a Cyber Secutrity Expert</p>
            `;
        }
    }
        
}

/* add texts in Project page */
function addTextsInProject() 
{
    if (title === "Project") 
    {
        // get an element
        let articleTag = document.getElementsByClassName("article");
        let projectHeadingDiv = document.getElementsByClassName("myProject")[0];

        if (projectHeadingDiv) 
        {
            // create h1 element
            let myProjectListHeading1 = document.createElement("h1");

            // insert texts into h1 element
            myProjectListHeading1.textContent = `My Project List`;

            // add h1 element in div element
            projectHeadingDiv.appendChild(myProjectListHeading1);
        }

        if(articleTag)
        {
            // get a header element from each article tag
            let firstHeaderTag = articleTag[0].getElementsByClassName("header")[0];
            
            // create p element
            let cooking = document.createElement("p");

            // insert texts into p element
            cooking.textContent = `Cooking`;

            // add p element in header element
            firstHeaderTag.appendChild(cooking);

            // second header
            let secondHeaderTag = articleTag[1].getElementsByClassName("header")[0];
            let cSharp = document.createElement("p");
            cSharp.textContent = `C#`;
            secondHeaderTag.appendChild(cSharp);

            // third header
            let thirdHeaderTag = articleTag[2].getElementsByClassName("header")[0];
            let drawing = document.createElement("p");
            drawing.textContent = `Drawing`;
            thirdHeaderTag.appendChild(drawing);


            // create p element 
            let firstExplanation = document.createElement("p");

            // insert texts into p element
            firstExplanation.textContent = "I love to cook! I'd learned cooking as a hobby for a while. I like to have what I cooked with my friends or family. I feel satisfied whenever I hear my food is delicious XD";
            
            // add p element in article element
            articleTag[0].appendChild(firstExplanation);

            //second explanation paragraph
            let secondExplanation = document.createElement("p");
            secondExplanation.textContent = "I'd studied C a few years ago. These days I'm learning TCP network programming in C#";
            articleTag[1].appendChild(secondExplanation);

            //third explanation paragraph
            let thirdExplanation = document.createElement("p");
            thirdExplanation.textContent = "I draw a picture whenever I have time. It helps me release stress a lot. This is the one I drew before I started this semester.";
            articleTag[2].appendChild(thirdExplanation);
        }
    }
}

/* add texts in Contact page */
function addTextsToContact() 
{
    if (title === "Contact") 
    {
        // get an element
        let formTag = document.getElementsByClassName("form");
        let contactHeading1Div = document.getElementById("contactHeading");

        if(contactHeading1Div)
        {
            // create h1 element
            let formHeading1 = document.createElement("h1");

            // insert texts into h1 element
            formHeading1.textContent = `Contact`;

            // add h1 element in div element
            contactHeading1Div.appendChild(formHeading1);
        }

        if(formTag)
        {
            // get elements
            let formElement = document.querySelectorAll(".form-control");

            // insert texts into each of elements' label tag
            formElement[0].querySelector("label").innerHTML = "First Name";
            formElement[1].querySelector("label").innerHTML = "Second Name";
            formElement[2].querySelector("label").innerHTML = "Phone";
            formElement[3].querySelector("label").innerHTML = "Email";
            formElement[4].querySelector("label").innerHTML = "Message";

            // get elements
            let buttons = formElement[5].querySelectorAll("button");

            // insert texts into each of elements' button tag
            buttons[0].innerHTML = "Send";
            buttons[1].innerHTML = "Undo";
        }
    }
    }

// get elements within the form
let form = document.getElementById('form');
let firstName = document.getElementById('firstName');
let secondName = document.getElementById('secondName');
let phone = document.getElementById('phone');
let email = document.getElementById('email');

/* if current page is contact page and submit button is clicked */
if(title === "Contact")
{
    form.addEventListener('submit', (event) =>
    {
        // prevent users from clicking submit button without typing anything
        event.preventDefault();
        check();
    });
}

// form validation function
function check() 
{
    // get each form element's value without space
    let firstNameValue = firstName.value.trim();
    let secondNameValue = secondName.value.trim();
    let phoneValue = phone.value.trim();
    let emailValue = email.value.trim();

    // count how many form elements input the user typed correctly
    let successNumber = 0;

    // check if the user input(first name) is correct or not
    if(firstNameValue === '' || firstNameValue.length < 3)
    {
        errorOccur(firstName, 'name should be more then 3 characters');
    }
    else
    {
        successOccur(firstName);
        successNumber += 1;
    }

    // check if the user input(second name) is correct or not
    if(secondNameValue === '' || secondNameValue.length < 3)
    {
        errorOccur(secondName, 'name should be more then 3 characters');
    }
    else
    {
        successOccur(secondName);
        successNumber += 1;
    }

    // check if the user input(phone number) is correct or not
    if(phoneValue === '' || phoneValue.length < 9)
    {
        errorOccur(phone, 'phone should be more then 9 characters');
    }
    else
    {
        successOccur(phone);
        successNumber += 1;
    }

    // check if the user input(email address) is correct or not
    if(emailValue === '' || emailValue.length < 10)
    {
        errorOccur(email, 'email should be more then 10 characters');
    }
    else
    {
        successOccur(email);
        successNumber += 1;
    }

    // if all inputs from user are correct, it will load index page
    if(successNumber === 4)
    {
        window.location.href = "https://heesoolim.github.io/Assignment2/index.html";
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
