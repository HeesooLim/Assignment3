// IIFE -Immediately Ivoked Function Expression
(function(){

    
    // named function
    function Start()
    {
        console.log('%cApp Started...', "color:white; font-size: 24px;");

        let title = document.title;

        title = title.toLowerCase();

        console.log(`The title of the page is ${title}`);

        let navAnchors = document.querySelectorAll("li a");
        
        for (const anchor of navAnchors) 
        {

            let anchorString = anchor.getAttribute("href");
            anchorString = anchorString.substr(0,anchorString.length-5);

            if((title === "home") && (anchorString === "index") || (title === anchorString))
            {
                anchor.className = "nav-link active";
            }
        }

        // step1. hook into the spot(element) on the page

        let jumbotron = document.getElementsByClassName("jumbotron")[0];

        //step 2 create a new element
        let newParagraph = document.createElement("p");

        // step 3 configure the new element
        newParagraph.textContent = title;

        // step 4 attach the new element
        jumbotron.appendChild(newParagraph);


        console.log(navAnchors);
    } 



    window.addEventListener("load", Start);

})();