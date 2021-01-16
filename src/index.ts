import { connectStreamSource, disconnectStreamSource } from "@hotwired/turbo"

class TickElement extends HTMLElement {
  timerId?: number;

  connectedCallback() {
    connectStreamSource(this);
    this.timerId = setInterval(this.dispatchMessageEvent.bind(this), 1000);
  }

  disconnectedCallback() {
    disconnectStreamSource(this);
    if (this.timerId) clearInterval(this.timerId);
  }

  dispatchMessageEvent() {
    const data = `
      <turbo-stream action="replace" target="timer">
        <template>
          <div id="timer">
            ${new Date().toISOString()}
          </div>
        </template>
      </turbo-stream>
    `
    const event = new MessageEvent("message", { data });
    this.dispatchEvent(event);
  }
}

customElements.define("tick-source", TickElement);
