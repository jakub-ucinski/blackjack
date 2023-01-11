import * as _ from "lodash";

class NameGenerator {
  private static names = [
    "Tim",
    "Kerris",
    "Alan",
    "Tom",
    "Charlotte",
    "Gautam",
    "Rhodri",
    "Leigh",
    "Deborah",
  ];

  private static surnames = [
    "Davie",
    "Bright",
    "Dickson",
    "Fussell",
    "Moore",
    "Rangarajan",
    "Talfan Davies",
    "Tavaziva",
    "Turness",
  ];

  public static generate() {
    return `${_.sample(this.names)} ${_.sample(this.surnames)}`;
  }
}

export default NameGenerator;
