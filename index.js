fetch("https://frontendautum2019-5e0c.restdb.io/rest/supers", {
  method: "get",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "x-apikey": "5d88744bfd86cb75861e25fa",
    "cache-control": "no-cache"
  }
})
  .then(e => e.json())
  .then(heros => {
    heros.forEach(supers => {
      const template = document.querySelector("template").content;
      const copy = template.cloneNode(true);
      copy.querySelector("h1").textContent = supers.alias;
      copy.querySelector("h2").textContent = supers.name;
      copy.querySelector("p").textContent = supers.powers;

      if (supers.hero) {
        copy.querySelector("h3").textContent = "Hero";
      } else {
        copy.querySelector("h3").textContent = "Villan";
      }

      document.querySelector("#app").appendChild(copy);
    });
  });
