/*  Copyright 2015 Longlius
    This work is free. You can redistribute it and/or modify it under the
    terms of the Do What The Fuck You Want To Public License, Version 2,
    as published by Sam Hocevar. See the COPYING file for more details. */

/* Function quodNomen - Utility function for getting browser name.
 * Parameters: NONE
 */
function quodNomen() {
    return (navigator.
            userAgent.
            match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) 
            || [])[1];
}

/* Function genDevLinkShit - Returns shit needed for link to developer docs
 * Parameters: NONE
 */
function genDevLinkShit() {
    // devURL   -   stores the URL for the docs
    // linkText -   stores the text to display for the link
    var devURL, linkText;
    
    // Switch statement to tailor dev link for current browser
    switch(quodNomen()) {
        // Chrome/Chromium
        case "Chrome":
            devURL = "developer.chrome.com";
            linkText = "Chrome Dev";
            break;
        // Firefox
        case "Firefox":
            devURL = "developer.mozilla.org";
            linkText = "MDN";
            break;
        // Anything else
        default:
            devURL = "htmldog.com";
            linkText = "HTML Dog";
    }
    
    return [devURL, linkText];
}

/* Function genDevLinkNode - Generates a node linking to dev docs
 * Parameters: NONE
 */
 function genDevLinkNode() {
     // Get necessary info for link
     var linkShit = genDevLinkShit();
     
     // Create new anchor element
     var x = document.createElement('a');
     // Set href attribute
     x.setAttribute('href', linkShit[0]);
     // Set text to display for link
     x.textContent = linkShit[1];
     
     // Return finished link node
     return x;
}
