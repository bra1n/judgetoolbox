export class Player {
  type: string;
  personality: string;
  guilty: boolean;
  opinion: string;

  constructor(row: Object) {
    this.type = row['Type'];
    this.personality = row['Personality'];
    this.guilty = row['Did it on purpose? (applicable if A)'] == "Yes";
    this.opinion = row['Believe opponent made mistake (applicable if B):'];
  }
}
