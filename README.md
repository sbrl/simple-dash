[![Mentioned in Awesome-Selfhosted](https://awesome.re/mentioned-badge.svg)](https://github.com/Kickball/awesome-selfhosted#personal-dashboards)
# simple-dash

Try the Demo here: https://swagielka.github.io/simple-dash/

A simple, fully responsive Dashboard to forward to the services of your choice! Ideal for Desktop and mobile usage!
Add all of your services, whether you host them yourself or not and display them as neat Icons from the FontAwesome libary.
simple-dash is made to be as simple and minimalistic as possible. (The goal was to create a dashboard even my mom could use!) :)
Based on: https://github.com/thetomester13/homepage

This project uses:
- Font Awesome
- Trianglify

This is a fork with several improvements over @swagielka's original version:

 - Static background support
 - [TOML](https://github.com/toml-lang/toml) configuration file
 - Removed excess horizontal space on pages with small numbers of icons

## Screenshots
![Homepage Desktop](example_img/homepage-desktop.jpg?raw=true)
![Homepage Mobile](example_img/homepage-mobile.jpg?raw=true)

## To Use
1. Clone this repository with git.
2. Copy the `config.sample.toml` file to `config.toml`. Update the fields as appropriate to configure your homepage.
3. Run `npm install` in the root of this repository.
4. Open `index.html` in your browser!

## Configure Homepage
- 'items' => The menu will scale to the amount of items you want to display. Insert any link you'd like, or {{cur}} for the current URL of the page. Choose icons from [Font Awesome](http://fontawesome.io/icons/)
