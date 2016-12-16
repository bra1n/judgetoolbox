export class Tournament {
  title: string;
  description: string;
  staff: string;
  rel: string;

  constructor(row: Object) {
    this.title = row['Title'];
    this.description = row['Description'];
    this.staff = row['Staff'];
    this.rel = row['REL'];
  }
}
