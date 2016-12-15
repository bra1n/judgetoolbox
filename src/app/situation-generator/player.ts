export class Player {
  type: string[] = [];
  personality: string[] = [];
  guilty: string[] = [];
  opinion: string[] = [];

  definitions = {
    type: 'Type',
    personality: 'Personality',
    guilty: 'Guilty A',
    opinion: 'Opinion B'
  };

  constructor() {}

  import(row: Object) {
    if(row[this.definitions.type]) {
      this.type.push(row[this.definitions.type]);
    }
    if(row[this.definitions.personality]) {
      this.personality.push(row[this.definitions.personality]);
    }
    if(row[this.definitions.guilty]) {
      this.guilty.push(row[this.definitions.guilty]);
    }
    if(row[this.definitions.opinion]) {
      this.opinion.push(row[this.definitions.opinion]);
    }
  }

  getTypes():string[] {
    return this.type;
  }

  getPersonalities():string[] {
    return this.personality;
  }

  getGuilts():string[] {
    return this.guilty;
  }

  getOpinions():string[] {
    return this.opinion;
  }
}
