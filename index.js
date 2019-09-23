"use strict";

const key = "5d88744bfd86cb75861e25fa";
const endpoint = "https://frontendautum2019-5e0c.restdb.io/rest/supers";

//READ / GET
function get() {
  fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(heroes => {
      heroes.forEach(addHeroToTheDom);
    });
}

function addHeroToTheDom(supers) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h1").textContent = `Alias: ${supers.alias}`;
  copy.querySelector("h2").textContent = `Name: ${supers.name}`;
  copy.querySelector("p").textContent = supers.powers;

  if (supers.hero) {
    copy.querySelector("h3").textContent = "Hero";
  } else {
    copy.querySelector("h3").textContent = "Villan";
  }
  if (supers.name == "") {
    copy.querySelector("h2").textContent = `Name: Unknown`;
  }
  copy.querySelector("button").addEventListener("click", () => {
    deleteHero(supers._id);
  });

  document.querySelector("#app").prepend(copy);
}

get();
//CREATE / POST
function post() {
  const data = {
    alias: document.querySelector("[data-label=alias]").value,
    name: document.querySelector("[data-label=name]").value,
    powers: document.querySelector("[data-label=powers]").value,
    hero: true
  };

  const postData = JSON.stringify(data);
  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => console.log(data));
  // window.location = "";
  addHeroToTheDom(data);
}
document.querySelector("button").addEventListener("click", e => {
  post();
});

function deleteHero(id) {
  console.log("clicked");
  // Delete / delete
  fetch(`${endpoint}/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
}
