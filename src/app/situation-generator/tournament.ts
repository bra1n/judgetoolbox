export class Tournament {
  title: string;
  description: string;
  example: string;

  constructor(row: Object) {
    this.title = row['Title'];
    this.description = row['Description'];
    this.example = row['Example'];
  }
}
