# Min-bandwidth

This node app attemps to minimize bandwidth needed to serve static assets.
It does this by doing the following.

- '/' is never cached and small as possible.
- The document returned for '/' is pages/index.html (not under the public folder).
- Other pages, such as 'about', 'contact', etc. have their bootstrap file stored under the pages folder with names about.html, contact.html, etc.
- Each page has a handler specifically for it in the router.
- Each page is comprised of screens.  
- The html for a screen is stored under the public folder as an html fragment.
- The html screen fragments are loaded via ajax.  
- The screens and all other static assets are located under the public folder and cached for 1 year.
- The pages, screens and all static assets are loaded into memory at start up.
- The page handlers (and ajax handlers) are the only dynamically generated content.
- Gzipped versions of uncompressed static assets are computed and stored in memory at start up.
- Pages pass through 2 transformations. 
  - When the app starts, an appConfig object is constructed from the environmental variables and passed to the client as a Javascript object.
  - When a request comes in for a page, the page request handler incorporates model data into the HTML file as a Javascript object.  This would normally be data from the database for the user based on identification of the user through a long-lived cookie. 

Note: to illustrate how additional pages can be added, this example also serves a page at '/about'.

TODO: add a third-party authentication layer.

