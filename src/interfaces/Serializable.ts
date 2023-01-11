export type serializable =
  | string
  | number
  | { [key: string]: serializable }
  | serializable[];

interface Serializable {
  serialize(): serializable;
}

export default Serializable;
