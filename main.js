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
    let titles = []
    let exceptions = ["My", "Home", "Projet"]
    for (let i = 0; i < HTMLTitles.length; i++) {
        titles.push(HTMLTitles[i])
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
    project.id = "https://cs108.epfl.ch/p/"

    titles.unshift(project)
    titles.unshift(home)
    titles.push(my)
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
            if(exceptions.indexOf(titles[i].textContent) === -1 ){
                link.href = "#"+titles[i].id.replace('/', '\\/');
            } else{
                link.href = titles[i].id
            }
            div.appendChild(link);
        }
    }
    let content = document.getElementById('content');
    console.log(content)
    const feur = content.insertAdjacentElement("beforebegin", div);
    const style = document.createElement('style');
    style.textContent =`
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
.show {
  display: block;
}`
;
    const script = document.createElement('script')
    script.textContent = `function displayMenu() {
  document.getElementById("dropdownMenu").classList.toggle("show")
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
})();