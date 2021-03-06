import {
  PlayerGameInfo,
  PlayerGameInfoFactory,
  GameTypes,
  Achievement,
  createAchievementsFromAchievementResponse,
  PlayerGameInfoAchievements,
  PlayerGameInfoFactoryAchievements,
  Game,
  createDateFromResponse
} from "../main";

export enum DrVisibility {
  SHOW_ALL = "SHOW_ALL",
  RUNNERS_AS_GHOSTS = "RUNNERS_AS_GHOSTS",
  RUNNERS_INVISIBLE = "RUNNERS_INVISIBLE"
}

export type DrTrapClass =
  | "ArrowTrap"
  | "DisappearingFloorTrap"
  | "SnakeReplaceTrap"
  | "PistonTrap"
  | "KnockBackTrap"
  | "InvertBlocksTrap"
  | "BlockReplaceTrap"
  | "ToggleOpenableTrap"
  | "StrongWindsTrap"
  | "MineFieldTrap"
  | "TNTRainTrap";

export class DrPlayerGameInfo extends PlayerGameInfo
  implements PlayerGameInfoAchievements {
  /**
   * @deprecated use [[DrPlayerGameInfo#trapClassKills]] and [[DrPlayerGameInfo#mapKills]] instead
   */
  readonly trapKills = [];

  /**
   * @deprecated use [[DrPlayerGameInfo#trapClassDeaths]] and [[DrPlayerGameInfo#mapDeaths]] instead
   */
  readonly trapDeaths = [];

  constructor(
    points: number,
    readonly firstLogin: Date,
    readonly lastLogin: Date,
    readonly victories: number,
    readonly gamesPlayed: number,
    readonly kills: number,
    readonly deaths: number,
    readonly multiKills,
    readonly mapRecords,
    readonly availableBanners,
    readonly title: string,
    readonly trapsActivated: number,
    readonly runnerGamesPlayed: number,
    readonly deathGamesPlayed: number,
    readonly totalCheckpoints: number,
    readonly runnerWins: number,
    readonly deathWins: number,
    readonly selectedBanner,
    readonly visibility,
    readonly trapClassKills: Map<DrTrapClass, number>,
    readonly trapClassDeaths: Map<DrTrapClass, number>,
    readonly mapKills,
    readonly mapDeaths,
    readonly recentGames: Game[],
    readonly achievements: Achievement[]
  ) {
    super(GameTypes.DR, points);
  }
}

export class DrPlayerGameInfoFactory
  extends PlayerGameInfoFactory<DrPlayerGameInfo>
  implements PlayerGameInfoFactoryAchievements {
  private _firstLogin: Date;
  private _lastLogin: Date;
  private _victories: number;
  private _gamesPlayed: number;
  private _title: string;
  private _achievements: Achievement[];
  private _kills: number;
  private _deaths: number;
  private _multiKills;
  private _mapRecords;
  private _availableBanners;
  private _trapsActivated: number;
  private _runnerGamesPlayed: number;
  private _deathGamesPlayed: number;
  private _totalCheckpoints: number;
  private _runnerWins: number;
  private _deathWins: number;
  private _selectedBanner;
  private _visibility;
  private _trapClassKills;
  private _trapClassDeaths;
  private _mapKills;
  private _mapDeaths;
  private _recentGames: Game[];

  create(): DrPlayerGameInfo {
    return new DrPlayerGameInfo(
      this._points,
      this._firstLogin,
      this._lastLogin,
      this._victories,
      this._gamesPlayed,
      this._kills,
      this._deaths,
      this._multiKills,
      this._mapRecords,
      this._availableBanners,
      this._title,
      this._trapsActivated,
      this._runnerGamesPlayed,
      this._deathGamesPlayed,
      this._totalCheckpoints,
      this._runnerWins,
      this._deathWins,
      this._selectedBanner,
      this._visibility,
      this._trapClassKills,
      this._trapClassDeaths,
      this._mapKills,
      this._mapDeaths,
      this._recentGames,
      this._achievements
    );
  }

  fromResponse(res) {
    if (res.code == 404) {
      return this;
    }

    return this.achievements(
      createAchievementsFromAchievementResponse(GameTypes.DR, res.achievements)
    )
      .availableBanners(res.availablebanners)
      .deathGamesPlayed(res.deathgamesplayed)
      .deathWins(res.deathwins)
      .deaths(res.deaths)
      .firstLogin(createDateFromResponse(res.firstlogin))
      .gamesPlayed(res.games_played)
      .kills(res.kills)
      .lastLogin(createDateFromResponse(res.lastlogin))
      .mapRecords(res.maprecords)
      .multiKills(res.multikills)
      .points(res.total_points)
      .recentGames(res.recentgames.map(a => new Game(GameTypes.DR, a)))
      .runnerGamesPlayed(res.runnergamesplayed)
      .runnerWins(res.runnerwins)
      .selectedBanner(res.selectedbanner)
      .title(res.title)
      .totalCheckpoints(res.totalcheckpoints)
      .trapsActivated(res.trapsactivated)
      .victories(res.victories)
      .visibility(res.visibility)
      .trapClassKills(res.trapclasskills)
      .trapClassDeaths(res.trapclassdeaths)
      .mapKills(res.mapkills)
      .mapDeaths(res.mapdeaths);
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

  title(title: string) {
    this._title = title;
    return this;
  }

  availableBanners(availableBanners) {
    this._availableBanners = availableBanners;
    return this;
  }

  mapRecords(mapRecords) {
    this._mapRecords = mapRecords;
    return this;
  }

  multiKills(multiKills) {
    this._multiKills = multiKills;
    return this;
  }

  selectedBanner(selectedBanner) {
    this._selectedBanner = selectedBanner;
    return this;
  }

  visibility(visibility) {
    this._visibility = visibility;
    return this;
  }

  deathGamesPlayed(deathGamesPlayed: number) {
    this._deathGamesPlayed = deathGamesPlayed;
    return this;
  }

  deathWins(deathWins: number) {
    this._deathWins = deathWins;
    return this;
  }

  deaths(deaths: number) {
    this._deaths = deaths;
    return this;
  }

  /**
   * @deprecated use [[DrPlayerGameInfoFactory#trapClassDeaths]] and [[DrPlayerGameInfoFactory#mapDeaths]] instead
   */
  trapDeaths(trapDeaths) {
    return this;
  }

  kills(kills: number) {
    this._kills = kills;
    return this;
  }

  runnerGamesPlayed(runnerGamesPlayed: number) {
    this._runnerGamesPlayed = runnerGamesPlayed;
    return this;
  }

  runnerWins(runnerWins: number) {
    this._runnerWins = runnerWins;
    return this;
  }

  totalCheckpoints(totalCheckpoints: number) {
    this._totalCheckpoints = totalCheckpoints;
    return this;
  }

  /**
   * @deprecated use [[DrPlayerGameInfoFactory#trapClassKills]] and [[DrPlayerGameInfoFactory#mapKills]] instead
   */
  trapKills(trapKills) {
    return this;
  }

  trapsActivated(trapsActivated: number) {
    this._trapsActivated = trapsActivated;
    return this;
  }

  trapClassKills(trapClassKills) {
    this._trapClassKills = trapClassKills;
    return this;
  }

  trapClassDeaths(trapClassDeaths) {
    this._trapClassDeaths = trapClassDeaths;
    return this;
  }

  mapKills(mapKills) {
    this._mapKills = mapKills;
    return this;
  }

  mapDeaths(mapDeaths) {
    this._mapDeaths = mapDeaths;
    return this;
  }

  recentGames(recentGames: Game[]) {
    this._recentGames = recentGames;
    return this;
  }
}
