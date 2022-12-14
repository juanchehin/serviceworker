if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/serviceworker.js")
        .then(function(registration) {
            console.log("Service Worker registered with scope:", registration.scope);
        }).catch(function(err) {
            console.log("Service worker registration failed:", err);
        });
}

self.addEventListener("install", function() {
    console.log("install");
});
self.addEventListener("activate", function() {
    console.log("activate");
});
self.addEventListener("fetch", function(event) {
    if (event.request.url.includes("bootstrap.min.css")) {
        console.log("Fetch request for:", event.request.url);
        event.respondWith(
            new Response(
                ".hotel-slogan {background: green!important;} nav {display:none}", { headers: { "Content-Type": "text/css" } }
            )
        );
    }
});

$(document).ready(function() {
    // Fetch and render upcoming events in the hotel
    $.getJSON("/events.json", renderEvents);
});




/* ************************************************************ */
/* The code below this point is used to render to the DOM. It   */
/* completely ignores common sense principles as a trade off    */
/* for readability.                                             */
/* You can ignore it, or you can send angry tweets about it to  */
/* @TalAter                                                     */
/* ************************************************************ */

var renderEvents = function(data) {
    data.forEach(function(event) {
        $(
            "<div class=\"col-lg-2 col-md-4 col-sm-6 event-container\"><div class=\"event-card\">" +
            "<div class=\"event-date\">" + event.date + "</div>" +
            "<img src=\"" + event.img + "\" alt=\"" + event.title + "\" class=\"img-responsive\" />" +
            "<h4>" + event.title + "</h4>" +
            "<p>" + event.description + "</p>" +
            "</div></div>"
        ).insertBefore("#events-container div.calendar-link-container");
    });
};