export class Tournament {
  title: string;
  description: string;
  staff: string;

  constructor(row: Object) {
    this.title = row['Title'];
    this.description = row['Description'];
    this.staff = row['Staff'];
  }
}
