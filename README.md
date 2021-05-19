# SpellBook
## Project Goals
SpellBook is intended a resource for players of the tabletop role playing game, Dungeons & Dragons (D&D), published by Wizards of the Coast (Wizards).

SpellBook offers a quick, simple and interactive way for players to look up the  Spells associated with the different D&D classes, and to examine the game rules for each Spell in detail.

User Goals:
- Find information on Spells for use in game.
- Players may use this site while actually playing with other people, and as such need to be able to find the information in a timely, straightforward manner to minimize disruption to the game.

Site Owner Goal:
- Provide a streamlined, interactive interface that users can navigate easily and quickly to find the information they need.

## UX
### User Stories
1. As a user, I want to be able to view a list of Spells associated with each Class.
2. As a user, I want to be able to search through the list to locate a particular Spell.
3. As a user, I want to be able to view the game information and description for a particular Spell.
4. As a user, I want to be able to contact the Site Owner to provide feedback or request further features
5. As the site owner, I want to be able to provide clear documentation on the licence under which the game information is provided, and attribution wherever copyrighted material is used.

### Wireframes
- [index.html](wireframes/index.pdf)
- [contact.html](wireframes/contact.pdf)
- [about.html](wireframes/about.pdf)

## Features
### Features to be implemented

## Technologies Used
- HTML5 - the pages of this site were designed using HTML.
- CSS3 - the pages of this site were styled using CSS.
- JavaScript - the interactive elements of this site were implemented using JavaScript.
- [Gitpod](https://www.gitpod.io/) - the site was developed using Gitpod as the development environment.
- [Bootstrap](https://getbootstrap.com/) - Bootstrap was used to structure the layout of the site and assist in making it responsive.
- [jQuery](https://jquery.com/) - jQuery was used to simplify and condense JavaScript, particularly for interacting with, and writing to, the DOM. 
- [DataTables](https://www.datatables.net/) - DataTables was used to add ordering and filtering functionality to the site's tables.
- [Font Awesome](https://fontawesome.com/) - Font Awesome icons were used for the social media links in the footer.
- [Google Fonts](https://fonts.google.com/) - Google Fonts were used throughout the project.
- [Hover.CSS](https://ianlunn.github.io/Hover/) - Hover.CSS was used to add hover effects to social media links in the footer.
- [Image Color Picker](https://imagecolorpicker.com/) - Image Color Picker was used to select the site's color pallette.
- [D&D 5e API](http://www.dnd5eapi.co/) - All game information was requested via this API.
- [EmailJS](https://www.emailjs.com/) - The EmailJS API was used in order to send submitted data from contact.html to the site owner.
- [Free Logo Design](https://www.freelogodesign.org/) - The site's brand logo was created using Free Logo Design.
- [Favicon Generator](https://www.favicongenerator.com/) - Favicon Generator was used to create and size the favicon for the site, using the logo created above.
- [Squoosh](https://squoosh.app/) - All images used on the site were compressed and resized using Squoosh.

## Testing
### Validation
### Automated Testing
### Testing of User Stories
### Manual Testing

## Bugs
### Fixed
- **Bug:** The search input added by the DataTables plugin was displaying incorrectly on tablet-sized screens.
    - **Issue:** DataTables creates a Bootstrap `.row` containing two `.col` divs to position the label and search input. The first of these divs was too wide, pushing the search input accross the middle of the screen.
    - **Fix:** Created a media query for tablet-sized screens only, intended to target the div in question and reduce it's `max-width`.
- **Bug:** The return to top button was causing the viewport to jump to the top, rather than a smooth scroll.
    - **Issue:** Was using JQuery to target the `window` and set the `.scrollTop()` to `0` on click, causing the page to jump to the top.
    - **Fix:** Targeted the `html` element instead of the `window`, and used the `.animate()` method to set the `scrollTop` to `0` smoothly over the course of `1000ms`.
- **Bug:** When using links to target specific elements by their ID, the element was being overlaid by the site's fixed navbar.
    - **Issue:** The links were causing the top of the target element to sit at the very top of the window, which meant the fixed navbar was obscuring them.
    - **Fix:** Applied a positive `padding-top` and a corresponding negative `margin-top` to the target elements. This fixed the bug, but caused issues on mobile screens as the new padding on the first element was blocking clicks on links. This was fixed by changing the `z-index` of the divs.
### Bugs to be fixed

## Deployment
- This site was developed in [Gitpod](https://www.gitpod.io/), committed and pushed to [Github](https://github.com/), and deployed on [GitHub Pages](https://pages.github.com/).
- At the time of submission, there are no differences between the development version and deployed version of the site.

### The following steps were taken to deploy this site:
- Logged in to Github, and navigated to the site's **[repository](https://github.com/kevinoc554/spellbook)**.
- Clicked on **Settings** in the toolbar near the top of the screen.
- Clicked on **Pages** on the left side of the **Settings** page.
- Under the **Source** heading, clicked on the **Branch** dropdown, and selected **Master**.
- Clicked on **Save**, deploying the site.
- Clicked on the URL at the top of the **GitHub Pages** section to navigate to the live site.
- *More info on deploying to **GitHub Pages** can be found [here](https://docs.github.com/en/github/working-with-github-pages/creating-a-github-pages-site#creating-your-site).*

### To run and edit the code for this site locally, follow these steps:
* Log in to GitHub, and navigate to the site's **[repository](https://github.com/kevinoc554/spellbook)**.
* Click on the green **Code** button.
* Copy the URL under **Clone with HTTPS** by clicking on the **Copy** button.
* Open the terminal in your IDE, and navigate to the desired directory.
* Type `git clone` into the terminal, and paste in the copied URL, e.g.,  
``git clone https://github.com/kevinoc554/spellbook.git``
* Press enter to clone the repository.
* *More info on cloning a **GitHub** repository can be found [here](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).*

## Credits
### Code
- The site's responsive offcanvas navbar was adapted from a Bootstrap example [here](https://getbootstrap.com/docs/4.6/examples/offcanvas/).
### Content
### Media
- Hero images and Class Icons on the site are taken from the official Dungeons & Dragons Fan Site Kit, and used in line with Wizard's [Fan Site Kit Policy](https://dnd.wizards.com/articles/features/fan-site-kit).
- Ink well image used under Creative Commons licence from [pngall.com](http://www.pngall.com/?p=26696). 
### Acknowledgements