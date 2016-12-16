export class Scenario {
  topic: string;
  title: string;
  description: string;
  example: string;

  constructor(row: Object) {
    this.topic = row['Topic'];
    this.title = row['Title'];
    this.description = row['Description'];
    this.example = row['Example'];
  }
}
