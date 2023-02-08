import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();
    // const box = document.createElement("div");
    // box.classList.add("box");
    // box.innerHTML = this._render({
    //   name: "placeholdy",
    //   terrain: "placeholder",
    //   population: 0,
    // });
    // document.body.querySelector(".main").appendChild(box);
    this._loading = document.querySelector(".progress");
    this._create();
    this.emit(Application.events.READY);
  }

  async _load() {
    this._startLoading();
    let url = "https://swapi.boom.dev/api/planets";
    const planets = [];
    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      url = data.next;
      planets.push(...data.results);
    }
    this._stopLoading();
    return planets;
  }

  _create() {
    this._load().then((planets) => {
      planets.forEach((planet) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = this._render({
          name: planet.name,
          terrain: planet.terrain,
          population: planet.population,
        });
        document.body.querySelector(".main").appendChild(box);
      });
    });
  }

  _startLoading() {
    this._loading.style.display = "block";
  }

  _stopLoading() {
    this._loading.style.display = "none";
  }

  _render({ name, terrain, population }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
}
