class n{constructor(t="/json/tents.json"){this.jsonPath=t}async getData(){return await(await fetch(this.jsonPath)).json()}}export{n as P};
