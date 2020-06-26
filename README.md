# Markdown Flashcards
Edit your flashcards in markdown then view and edit them on any device with a word editor. Uses bootstrap for styling, hosted on github pages.

## Development

### TODO
1. handle pretty rendering of markdown within the card (bold, headers, etc)
2. Directions on how to set up iPhone shortcut

### Run local
From root directory run
 
`python -m SimpleHTTPServer 8000`

Open browser to localhost:8000

### Deployment
Push to the github repo and the github page should update in a few seconds

## Usage 

### Adding new flash card decks
Create a new file in the `categories` folder, e.g., `categories/no_spaces_allowed_in_name.md`

*NOTE: MAKE SURE YOU ADD A NEWLINE AT END OF FILE OR THE LAST FLASHCARD WILL NOT RENDER (regex)*

### Adding new questions to a flash card deck
Questions are denoted by a single '#' and then a whitespace character
`# What is the square root of 64?`

Answers are anything else
`The answer is *8*`

### Requirements for phone editing
- markdown editor like iAWriter (or probably dropbox?)
- Working Copy for version control/changing flashcards from phone

## Future additions
1. Spaced repetition, i.e., keep track of cards that have been seen
2. "Got it right/Did not" so that it will automatically repeat cards you get wrong
3. randomization
4. CRUD cards from within the browser

-- 

update system
pushes to master branch are picked up by remote server via webhook

when remote server observes this, it pulls the repo and runs a script which takes all the markdown and turns it into html

when it is finished, it then pushes the generated file `index.html` to the public branch

## Deprecated
```
// XMLHTTP stuff
// function readTextFile(file, callback) {
//     const rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function () {
//         if(rawFile.readyState === 4) {
//             if(rawFile.status === 200 || rawFile.status == 0) {
//                 const allText = rawFile.responseText;
//                 callback(allText)
//             }
//         }
//     }
//     rawFile.send(null);
// }
// function loadXMLDoc(url) {
//     let xmlhttp
//     if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
//         xmlhttp=new XMLHttpRequest();
//     }
//     else {// code for IE6, IE5
//         xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xmlhttp.onreadystatechange=function()
//     {
//         if (xmlhttp.readyState==4 && xmlhttp.status==200)
//         {
//             const text = xmlhttp.responseText   
//             const div = document.createElement('div')
//             div.innerHTML = text
//             const ul = div.getElementsByTagName('ul')
//             console.log(ul[0])
//             // categoryNames = 
//             // const categories = document.getElementById('categories')
//             // categories.appendChild(ul[0])
//             const anchors = ul[0].getElementsByTagName('a')
//             for(let i = 0; i < anchors.length; i++) {
//                 const anchor = anchors[i]
//                 anchor.setAttribute('href', `#${anchor.innerHTML}`)
//             }
//         }
//     }
//     xmlhttp.open("GET", url, false);
//     xmlhttp.send();
// }
```