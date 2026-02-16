// ==UserScript==
// @name            CS-108 Table
// @name:fr         Table des matières CS-108
// @namespace       https://hotwraith.github.io/
// @version         2026-02-16
// @description     -
// @description:fr  -
// @description:de  Shit I should've listened to my german teachers
// @author          Maerwan
// @match           *://cs108.epfl.ch/*
// @icon            https://cs-214.epfl.ch/favicon.png
// @run-at          document-end
// ==/UserScript==


(function () {
    let HTMLTitles = document.getElementsByTagName('h2')
    let HTMLSubtitles = document.getElementsByTagName('h3')
    let titles = [];
    let subtitles = [];
    let exceptions = ["My", "Home", "Projet", "Exercices", "Examens"]
    for (let i = 0; i < HTMLTitles.length; i++) {
        titles.push(HTMLTitles[i])
    }
    for (let i = 0; i < HTMLSubtitles.length; i++) {
        subtitles.push(HTMLSubtitles[i])
    }
    console.log(titles)
    'use strict';

    let my = document.createElement("h2")
    my.textContent = "My"
    my.id = "https://cs108.epfl.ch/my"

    let home = document.createElement("h2")
    home.textContent = "Home"
    home.id = "https://cs108.epfl.ch/"

    let project = document.createElement("h2")
    project.textContent = "Projet"
    project.id = "https://cs108.epfl.ch/p/";

    let exercices = document.createElement("h2")
    exercices.textContent = "Exercices"
    exercices.id = "https://cs108.epfl.ch/e/";

    let exams = document.createElement("h2")
    exams.textContent = "Examens"
    exams.id = "https://cs108.epfl.ch/x/";

    titles.push(home);
    titles.push(project);
    titles.push(exercices);
    titles.push(exams);
    titles.push(my);
    let sidebar = document.createElement('div')
    sidebar.classList = "sidebar"
    let collapse = document.createElement('button')
    collapse.onclick = displayMenu
    collapse.textContent = "Extend"
    collapse.classList = "sidebar-button"
    sidebar.appendChild(collapse)
    let div = document.createElement("div")
    div.classList = 'topnav'
    for (let i = 0; i < titles.length; i++) {
        if(titles[i].id != ''){
            console.log(titles[i].id)
            let link = document.createElement("a");
            let strong = document.createElement("strong");
            strong.textContent = titles[i].textContent;
            link.appendChild(strong)
            link.classList = 'active';
            if(exceptions.indexOf(titles[i].textContent) === -1){
                link.href = "#"+titles[i].id.replace('/', '\\/');
                sidebar.appendChild(link);
                for(let j = 0; j < subtitles.length; j++){
                    if(subtitles[j].textContent[0] === titles[i].textContent[0]){
                        console.log(subtitles[j].textContent[0], titles[i].textContent[0])
                        let sublink = document.createElement("a")
                        sublink.classList = "collapsable"
                        sublink.href = "#"+subtitles[j].id.replace('/', '\\/');
                        sublink.textContent = subtitles[j].textContent;
                        sidebar.appendChild(sublink);
                    }
                }
            } else{
                link.href = titles[i].id
                div.appendChild(link);
            }

        }
    }
    let content = document.getElementById('content');
    console.log(content)
    content.insertAdjacentElement("beforebegin", sidebar);
    const feur = content.insertAdjacentElement("beforebegin", div);
    const style = document.createElement('style');
    style.textContent =`
.sidebar {
background-color: #000000;
justify-content:left;
}

.topnav {
   background-color:var(--background-color);
  color:hsl(0 0% 30%);
  padding:.5em 4em;
  box-shadow:3px 3px 5px hsl(0 0% 0%/.2);
  overflow: hidden;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  z-index: 2;
}
.topnav a {
  float: left;
  background-color:var(--background-color);
  color:hsl(0 0% 30%);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.topnav a:hover {
  background-color:var(--background-color);
  color: black;
}
.topnav a.active {
  background-color:var(--background-color);
  color:hsl(0 0% 30%);
}
.lowbar {

}

.sidebar {
  position: fixed;
  top: 2rem;
  left: 2rem;
  width: 220px;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;

  background-color: var(--background-color);
  color: hsl(0 0% 30%);
  padding: 1rem;

  border-radius: 12px;
  box-shadow: 3px 3px 8px hsl(0 0% 0% / 0.2);
  z-index: 1000;
}

.sidebar h3 {
  margin-top: 0;
  color: var(--heading-color);
  font-size: 1.1rem;
}

.sidebar a {
  display: block;
  padding: 0.3em 0.5em;
  border-radius: 6px;
  margin-bottom: 0.2em;
}

.sidebar a:hover {
  background-color: var(--link-color);
  color: var(--background-color);
}

@media (max-width: 900px) {
  .sidebar {
    display: none;
  }
}

.collapsable {
  display: none !important;
}

.sidebar .sidebar-button {
  position: sticky;
  top: 0;
  z-index: 2;

  background-color: var(--heading-color);
  color: white;
  border: none;
  padding: 0.6em 0.8em;
  margin-bottom: 0.8em;

  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;

  box-shadow: 2px 2px 5px hsl(0 0% 0% / 0.2);
}

/* Button hover effect */
.sidebar .sidebar-button:hover {
  background-color: var(--link-color);
}

.show {
  display: block !important;
}`
;
    const script = document.createElement('script')
    script.textContent = `function displayMenu() {
  document.getElementById("collapsable").classList.toggle("show")
}`;
    document.head.appendChild(script)
    document.head.appendChild(style);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
	if(subtitles.length == 0 && titles.length <= 5) {
		sidebar.style = "display:none;"	
	} else if(subtitles.length == 0) {
		collapse.style = "display:none;"
		}
})();

function displayMenu() {
    let sublinks = document.getElementsByClassName("collapsable")
    let button = document.getElementsByClassName("sidebar-button")[0]
    if(button.textContent === "Collapse") {
        button.textContent = "Extend"
    } else {
        button.textContent = "Collapse"
    }
    for(let i = 0; i < sublinks.length; i++){
        sublinks[i].classList.toggle("show")
    }
}