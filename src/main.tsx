import { render } from "preact";
import { App } from "./app";

const serPayBox = document.querySelector(".serPayBox.f12.cl");
const calcMain = document.createElement("div");
serPayBox?.appendChild(calcMain);
render(<App />, calcMain);
