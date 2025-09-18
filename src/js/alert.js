export default class Alert {
  constructor() {
    // The path for fetch is relative to the root HTML file (index.html), not the .js file.
    this.path = "public/json/alerts.json"; 
  }

  async init() {
    try {
      const alerts = await this.fetchAlerts();
      if (alerts && alerts.length > 0) {
        this.render(alerts);
      }
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }

  async fetchAlerts() {
    const response = await fetch(this.path);
    if (!response.ok) {
      throw new Error(`Failed to load alerts.json: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  }

  render(alerts) {
    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      p.style.padding = "1em";
      p.style.margin = "0";
      section.appendChild(p);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(section);
    }
  }
}