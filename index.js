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

  const alias = copy.querySelector("h1");
  const name = copy.querySelector("h2");
  const powers = copy.querySelector("p");
  const id = copy.querySelector("article.super");
  const status = copy.querySelector("h3");

  alias.textContent = `Alias: ${supers.alias}`;
  name.textContent = `(${supers.name})`;
  powers.textContent = supers.powers;
  id.dataset.supersid = supers._id;

  if (supers.hero) {
    status.textContent = "Hero";
  } else {
    status.textContent = "Villan";
  }
  if (supers.name == "") {
    name.textContent = `(Real name unknown)`;
  }
  if (supers.powers == "") {
    powers.textContent = "Powers unknown";
  }
  copy.querySelector("button").addEventListener("click", () => {
    deleteHero(supers._id);
    const deletedElm = document.querySelector(
      `article[data-supersid="${supers._id}"]`
    );
    deletedElm.classList.add("remove");
    deletedElm.querySelector("button").disabled = true;
  });

  document.querySelector("#app").prepend(copy);

  //Reset text fields
  document.querySelector("[data-label=alias]").value = "";
  document.querySelector("[data-label=name]").value = "";
  document.querySelector("[data-label=powers]").value = "";
}

get();
//CREATE / POST
function post() {
  const heroStatus = document.querySelector("input:checked");
  let heroType = false;
  console.log(heroStatus.value);
  if (heroStatus.value == "hero") {
    heroType = true;
  }
  const data = {
    alias: document.querySelector("[data-label=alias]").value,
    name: document.querySelector("[data-label=name]").value,
    powers: document.querySelector("[data-label=powers]").value,
    hero: heroType
  };
  console.log(data);

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
  validateHero();
});

function validateHero() {
  const heroField = document.querySelector("[data-label=alias]");
  if (heroField.value == "") {
    heroField.classList.add("error");
    heroField.placeholder = "Add an alias";
    heroField.focus();

    heroField.addEventListener("change", e => {
      if (heroField.value == "") {
        console.log("Still empty");
        heroField.classList.add("error");
        heroField.focus();
      } else {
        heroField.classList.remove("error");
        heroField.placeholder = "Alias";
      }
    });
  } else {
    heroField.classList.remove("error");
    heroField.placeholder = "Alias";
    post();
  }
}

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
    .then(data => {
      //TODO delete from DOM
      const deletedElm = document.querySelector(
        `article[data-supersid="${id}"]`
      );
      deletedElm.classList.add("remove");
      deletedElm.remove();
    });
}
