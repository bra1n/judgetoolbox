export class Scenario {
  topic: string;
  title: string;
  description: string;
  example: string;
  flag: boolean;
  difficulty: number;

  constructor(row: Object) {
    this.topic = row['Topic'];
    this.title = row['Title'];
    this.description = row['Description'];
    this.example = row['Example'];
    this.flag = row['Flag'] == '1';
    this.difficulty = parseInt(row['Difficulty'], 10);
  }
}
