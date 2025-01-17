let headerItems = [
  {
    text: "Проверка льгот",
    href: "/check25"
  },
  {
    text: "Достижения",
    href: "/achievements"
  },
  {
    text: "О проекте",
    href: "/info"
  }
];

let headerHTML = `
<header>
  <a href="/" class="header-logo">КУМОВСТВО</a>
  <ul id="headNav">
`;

for(let i = 0; i < headerItems.length; ++i) {
  headerHTML += `
  <li class="headNavItem">
    <a href="${headerItems[i].href}">${headerItems[i].text}</a>
  </li>
  `;
}

headerHTML += `
  </ul>
</header>
`;


let site = document.querySelector('#root')
site.insertAdjacentHTML("afterbegin", headerHTML)