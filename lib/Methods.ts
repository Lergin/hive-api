/**
 * the methods the hive api supports
 */
export class Methods {
  /**
   * the base url for all requests to the api
   */
  static BASE_URL = () => "https://api.hivemc.com/v1";

  /**
   * url for the list of gametypes
   */
  static GAMETYPE_LIST = () => `${Methods.BASE_URL()}/game`;

  /**
   * url for the information about a gametype
   * @param gameType
   */
  static GAMETYPE_INFO = (gameType: string) =>
    `${Methods.BASE_URL()}/game/${gameType}`;

  /**
   * url for the latest games of the gametype
   * @param gameType
   */
  static GAMETYPE_LATEST = (gameType: string) =>
    `${Methods.GAMETYPE_INFO(gameType)}/data`;

  /**
   * url for the list of maps for the gametype
   * @param gameType
   */
  static MAP_LIST = (gameType: string) =>
    `${Methods.GAMETYPE_INFO(gameType)}/maps`;

  /**
   * url for the information about a map of the gametype
   * @param gameType
   * @param map
   */
  static MAP_INFO = (gameType: string, map: string) =>
    `${Methods.MAP_LIST(gameType)}/${map}`;

  /**
   * url for information about a game
   * @param gameType the gametype of the game
   * @param gameId the id of the game
   */
  static GAME_INFO = (gameType: string, gameId: number) =>
    `${Methods.GAMETYPE_INFO(gameType)}/data/${gameId}`;

  /**
   * url for the information about a player within a game
   * @param gameType the gametype of the game
   * @param gameId the id of the game
   * @param uuid the uuid or name of the player
   */
  static GAME_INFO_PLAYER = (gameType: string, gameId: number, uuid: string) =>
    `${Methods.GAME_INFO(gameType, gameId)}/${uuid}`;

  /**
   * url for the leaderboard of a gametype
   * @param gameType
   * @param start
   * @param end
   */
  static GAME_LEADERBOARD = (
    gameType: string,
    start: number = 0,
    end: number = 20
  ) => `${Methods.GAMETYPE_INFO(gameType)}/leaderboard/${start}/${end}`;

  /**
   * url for the leaderboard of a gametype
   * @param gameType
   * @param start
   * @param end
   */
  static GAME_LEADERBOARD_SPECIAL = (
    gameType: string,
    special: string,
    start: number = 0,
    end: number = 20
  ) => `${Methods.GAME_LEADERBOARD(gameType, start, end)}/${special}`;

  /**
   * url for a list of the titles a player can get in a gametype
   */
  static GAME_TITLES = (gameType: string) =>
    `${Methods.GAMETYPE_INFO(gameType)}/titles`;

  /**
   * url for information about a player
   * @param uuid the uuid or name of the player
   */
  static PLAYER = (uuid: string) => `${Methods.BASE_URL()}/player/${uuid}`;

  /**
   * url for the current game a player is on
   * @param uuid the uuid or name of the player
   * @deprecated
   */
  static PLAYER_STATUS_RAW = (uuid: string) =>
    `${Methods.BASE_URL()}/player/${uuid}/status/raw`;

  /**
   * url for the current status of a player
   * @param uuid the uuid or name of the player
   */
  static PLAYER_STATUS = (uuid: string) =>
    `${Methods.BASE_URL()}/player/${uuid}/status`;

  /**
   * url for information of a player for a gametype
   * @param uuid the uuid or name of the player
   * @param gameType
   */
  static PLAYER_GAME_STATS = (uuid: string, gameType: string) =>
    `${Methods.BASE_URL()}/player/${uuid}/${gameType}`;

  /**
   * url for the current playercount of the hive
   */
  static PLAYER_COUNT = () => `${Methods.BASE_URL()}/server/playercount`;

  /**
   * url for the unique playercount of the hive
   */
  static UNIQUE_PLAYER_COUNT = () => `${Methods.BASE_URL()}/server/uniquecount`;

  /**
   * url for a list of the global achievements
   */
  static GLOBAL_ACHIEVEMENT_LIST = () =>
    `${Methods.BASE_URL()}/server/achievements`;

  /**
   * url for a list of the trophies
   * @deprecated
   */
  static TROPHIE_LIST = () => { throw new Error("TROPHIE_LIST is no longer supported") };

  /**
   * url for a list of the staff members
   */
  static STAFF_LIST = () => `${Methods.BASE_URL()}/staff`;

  /**
   * url for a list of the staff members
   */
  static CHAT_REPORT = id => `${Methods.BASE_URL()}/chatreport/${id}`;

  /**
   * url for a list of the staff members
   */
  static RANKS = () => `${Methods.BASE_URL()}/server/ranks`;

  /**
   * url for a list of the staff members
   */
  static BP_SERVER = (uuid: string) =>
    `https://hivemc.com/ajax/getblockpartyserver/${uuid}`;
}
