import PlayerInterface from "../interfaces/PlayerInterface";

interface PlayerKeeperConstructorArgs {
  onPlayerRegister?: (player: PlayerInterface) => void;
  onPlayerDeregister?: (playerId: string) => void;
}

class PlayerKeeper {
  private _players: PlayerInterface[];
  private _onPlayerRegister?: (player: PlayerInterface) => void;
  private _onPlayerDeregister?: (playerId: string) => void;

  public constructor(args?: PlayerKeeperConstructorArgs) {
    this._players = [];
    this._onPlayerRegister = args?.onPlayerRegister;
    this._onPlayerDeregister = args?.onPlayerDeregister;
  }

  public register(player: PlayerInterface) {
    this._players.push(player);
    this._onPlayerRegister?.(player);
  }

  public deregister(playerId: string) {
    this._players = this._players.filter((p) => p.id !== playerId);
    this._onPlayerDeregister?.(playerId);
  }

  public get players() {
    return this._players;
  }
}

export default PlayerKeeper;
