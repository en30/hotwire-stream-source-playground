import { connectStreamSource, disconnectStreamSource } from "@hotwired/turbo"

class TickElement extends HTMLElement {
  connectedCallback() {
    connectStreamSource(this);
    setInterval(this.dispatchMessageEvent.bind(this), 1000)
  }

  disconnectedCallback() {
    disconnectStreamSource(this);
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
