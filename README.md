# Min-bandwidth

This node app attemps to minimize bandwidth needed to serve static 
assets.  It does this by doing the following.

- '/' is redirected to /home?<random-number>
- '/home' is generated from code, never cached and small as possible.  
- All other requests are assumed to be for static assets located under the public folder and cached for 10 years.
- The names of all static assets include a version number.
- '/home' loads '/home.<version-number>.html'
- All static assets are loaded into memory at start up.
- Gzipped versions of uncompressed static assets are computed and 
stored in memory at start up.

Note: to illustrate how additional pages can be added, this example also serves a page at '/about'.
