import EventEmitter from "eventemitter3";
import Beat from "./Beat";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();
    this._beat = new Beat();
    const lyrics = ["Ah", "ha", "ha", "ha", "stayin' alive", "stayin' alive"];
    let count = 0;

    this._beat.addListener(Beat.events.BIT, (event) => {
      if (count < lyrics.length) {
        const currentLyric = lyrics[count];
        this._create(currentLyric)
        count++;
      }
    })

   

    this.emit(Application.events.READY);
  }

  _create(lyric) {
      const message = document.createElement("div");
      message.classList.add("message");
      message.innerText = lyric;
      document.querySelector(".main").appendChild(message);
  }

  

}
