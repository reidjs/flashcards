# Markdown to HTML flashcards
Edit your flashcards in markdown then use them like a native app on your iphone.

## TODO
1. Render pretty looking flashcards using the questions/answer array loaded in the file
2. Create a menu to change category

## Development
From root directory run
 
`python -m SimpleHTTPServer 8000`

Open browser to localhost:8000

## Deployment
Push to the github repo and the github page should update in a few seconds

## Adding new categories
Create a new file, e.g., `no_spaces_allowed_in_name.md` in the categories/ folder
MAKE SURE YOU ADD A NEWLINE AT END OF FILE OR THE LAST FLASHCARD WILL NOT RENDER (regex)

## Requirements for phone editing
- markdown editor like iAWriter (or probably dropbox?)
- Working Copy for version control/changing flashcards from phone

## MVP
1. Can add/edit/remove flashcards from phone and computer by modifying markdown files
2. Flashcards viewable from any browser

## Future additions
1. Spaced repetition, i.e., 
2. "Got it right/Did not" so that it will automatically repeat cards you get wrong

-- 

update system
pushes to master branch are picked up by remote server via webhook

when remote server observes this, it pulls the repo and runs a script which takes all the markdown and turns it into html

when it is finished, it then pushes the generated file `index.html` to the public branch

## Deprecated
```
// XMLHTTP stuff, instead I chose to mock for local dev
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