class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <header>
      <div class="navigation">
        <a href="/"><img class="header-img" src="/files/img/logo.svg"></a>
        <a href="/" class="header-button">Home</a>
        <a href="/campaigns/" class="header-button">Campaigns</a>
        <a href="/agenda/" class="header-button">Agenda</a>
        <a href="/lidworden/" class="header-button">Lid Worden<br>Membership</a>
      </div>
    </header>
    <hr>
    `;
  }
}

customElements.define('header-component', Header);

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <br>
    <hr>
    <footer>
      <div class="footer-div">
        <img style="width: 135px; height: 135px;" src="/files/img/logo.svg">
        
        <p>
          Contact:
          <br>
          <a target="_blank" href="https://instagram.com/sikkelenharp">Instagram</a>
          <br>
          <a target="_blank" href="https://discord.gg/dgraWb2e">Discord</a>
          <br>
          <a href="/lidworden/">Wordt lid!</a>
        </p>

        <p>
          Socialistische Cultuur:
          <br>
          <a target="_blank" href="https://ssvhetspook.nl">S.S.V. Het Spook</a>
          <br>
          <a target="_blank" href="https://instagram.com/hetrodewieltje_nijmegen">Het Rode Wieltje</a>
        </p>

        <p style="margin: 0px;">
          Onze vrienden:
          <br>
          <a target="_blank" href="https://derodelap.nl">De Rode Lap</a>
          <br>
          <a target="_blank" href="https://rsp.nu">Revolutionair Socialistische Partij</a>
          <br>
          <a target="_blank" href="https://roodjongeren.nl">ROOD, Socialistische Jongeren</a>
        </p>
          
      </div>
    </footer>
    `;
  }
}

customElements.define('footer-component', Footer);