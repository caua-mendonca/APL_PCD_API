import {QuestIFBR} from "./questIFBR";

export class IFBR {
  public id: number;
  public name: string;
  public quest: QuestIFBR[];
  public date: Date;

  constructor(id: number, name: string, date: Date) {
    this.id = id;
    this.name = name;
    this.quest = [];
    this.date = date;
  }

  public push(quest: QuestIFBR) {
    this.quest.push(quest);
  }


}
