import {
  PlayerGameInfo,
  PlayerGameInfoFactory,
  GameTypes,
  Achievement,
  createAchievementsFromAchievementResponse,
  PlayerGameInfoAchievements,
  PlayerGameInfoFactoryAchievements,
  createDateFromResponse
} from "../main";

export class RrPlayerGameInfo extends PlayerGameInfo
  implements PlayerGameInfoAchievements {
  constructor(
    points: number,
    readonly firstLogin: Date,
    readonly lastLogin: Date,
    readonly victories: number,
    readonly gamesPlayed: number,
    readonly tablesCleared: number,
    readonly achievements: Achievement[]
  ) {
    super(GameTypes.RR, points);
  }
}

export class RrPlayerGameInfoFactory
  extends PlayerGameInfoFactory<RrPlayerGameInfo>
  implements PlayerGameInfoFactoryAchievements {
  private _firstLogin: Date;
  private _lastLogin: Date;
  private _victories: number;
  private _gamesPlayed: number;
  private _tablesCleared: number;
  private _achievements: Achievement[];

  create(): RrPlayerGameInfo {
    return new RrPlayerGameInfo(
      this._points,
      this._firstLogin,
      this._lastLogin,
      this._victories,
      this._gamesPlayed,
      this._tablesCleared,
      this._achievements
    );
  }

  fromResponse(res) {
    if (res.code == 404) {
      return this;
    }

    return this.points(res.points)
      .victories(res.victories)
      .gamesPlayed(res.gamesplayed)
      .firstLogin(createDateFromResponse(res.firstlogin))
      .lastLogin(createDateFromResponse(res.lastlogin))
      .achievements(
        createAchievementsFromAchievementResponse(
          GameTypes.RR,
          res.achievements
        )
      )
      .tablesCleared(res.tablescleared);
  }

  firstLogin(firstLogin: Date) {
    this._firstLogin = firstLogin;
    return this;
  }

  lastLogin(lastLogin: Date) {
    this._lastLogin = lastLogin;
    return this;
  }

  victories(victories: number) {
    this._victories = victories;
    return this;
  }

  gamesPlayed(gamesPlayed: number) {
    this._gamesPlayed = gamesPlayed;
    return this;
  }

  achievements(achievements: Achievement[]) {
    this._achievements = achievements;
    return this;
  }

  tablesCleared(tablesCleared: number) {
    this._tablesCleared = tablesCleared;
    return this;
  }
}
