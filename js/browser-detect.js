/*  Copyright 2015 Longlius
    This work is free. You can redistribute it and/or modify it under the
    terms of the Do What The Fuck You Want To Public License, Version 2,
    as published by Sam Hocevar. See the COPYING file for more details. */

// GLOBAL VARIABLES
// brwsr_n - name of browser
// error_p - has an error occurred?
// error_m - message to show user
var brwsr_n = '';
var error_p = false;
var error_m = '';

/* Function derpStringArray - create array of n derp strings
 * Parameters:
 *      n - length of array to create
 */
function derpStringArray(n) {
    var derpArr = [];
    for(var i=0; i<n; ++i){
        derpArr.push('derp');
    }
    return derpArr;
}
/* Function quodNomen - Utility function for getting browser name.
 * Parameters: NONE
 */
function quodNomen() {
    if(!brwsr_n){
        brwsr_n = ((navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || derpStringArray(3))[1]).toLowerCase();
    }
    return brwsr_n;
}

/* Function genFullLink - Generates fully-formed link
 * Parameters:
 *      muhURL      - URL to link to
 *      muhProto    - protocol to use
 *      tinfoil     - Should this be an HTTPS link?
 */
 function genFullLink(muhURL, muhProto, tinfoil) {
     // Start link with an empty string since beginning of it depends
     // on the values of 'muhProto' and 'tinfoil'
     var linkPreface = '';
     
     // Format of link depends on protocol
     switch(muhProto) {
        // HTTP protocol (regular and secure)
        case 'http':
            // if 'tinfoil' is true, use https. if not, use plain http
            linkPreface = (tinfoil ? 'https' : 'http') + '://';
            break;
        // Internal Mozilla pages
        case 'about':
            linkPreface = 'about:';
            break;
        // Internal Chrome pages
        case 'chrome':
            linkPreface = 'chrome://';
            break;
        // Other protocols produce error message through alert
        default:
            error_p = true;
            error_m = "Protocol " + muhProto + " not recognized!";
     }
     
     // Return fully-formed link
     return linkPreface + muhURL;
 }

/* Function genLinkNode - Generates a node for a link
 * Parameters:
 *      linkURL     - URL to link to
 *      linkText    - text to display for link
 *      linkProto   - protocol
 *      tinfoil     - use HTTPS?
 */
 function genLinkNode(linkURL, linkText, linkProto, tinfoil) {
     // Create new anchor element
     var x = document.createElement('a');
     // Set href attribute
     x.setAttribute('href', genFullLink(linkURL, linkProto, tinfoil));
     // Set text to display for link
     x.textContent = linkText;
     
     // Return finished link node
     return x;
}

/* Function browserDevShit - Returns shit needed for link to developer docs
 * Parameters: NONE
 */
function browserDevShit() {
    // devURL   -   stores the URL for the docs
    // linkText -   stores the text to display for the link
    var devURL, linkText;
    
    // Switch statement to tailor dev link for current browser
    switch(quodNomen()) {
        // Chrome/Chromium
        case "chrome":
            devURL = "developer.chrome.com";
            linkText = "Chrome Dev";
            break;
        // Firefox
        case "firefox":
            devURL = "developer.mozilla.org";
            linkText = "MDN";
            break;
        // Anything else
        default:
            devURL = "htmldog.com";
            linkText = "HTML Dog";
    }
    
    // Return shit in array
    return [devURL, linkText];
}

/* Function genDevLinkNode - Generates a node linking to dev docs
 * Parameters: NONE
 */
 function genDevLinkNode() {
     // Get necessary shit for link
     var shit = browserDevShit();
     // Create node for dev docs link (use HTTPS)
     return genLinkNode(shit[0], shit[1], 'http', true);
}
