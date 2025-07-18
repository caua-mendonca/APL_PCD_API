import { QuestIFBR } from "./questIFBR";

export class IFBR {
  public idTable: string;
  public id: number;
  public name: string;
  public score: number;
  public date: Date;

  constructor(id: number, name: string, date: Date, score: number) {
    this.idTable = "";
    this.id = id;
    this.name = name;
    this.date = date;
    this.score = score
  }
}
