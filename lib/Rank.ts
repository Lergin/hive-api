import { fetch, Methods, Player } from "./main";

export class Rank {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly humanName: string,
    readonly colorCode: string = "",
    readonly legacyId: number = -1
  ) {}

  /**
  * lists the players that have the rank
  *
  * @deprecated
  */
  listPlayers(
    maxCacheAge: number = 24 * 60 * 60 * 1000
  ): Promise<Player[]> {
    throw new Error(
      `No longer supported`
    );
  }
}

export class Ranks {
  static readonly REGULAR = new Rank(0, "REGULAR", "Regular", "&9", 0);
  static readonly GOLD = new Rank(10, "GOLD", "Gold Premium", "&6", 1);
  static readonly DIAMOND = new Rank(20, "DIAMOND", "Diamond Premium", "&b", 2);
  static readonly EMERALD = new Rank(30, "EMERALD", "Emerald Premium", "&a", 3);
  static readonly ULTIMATE = new Rank(40, "ULTIMATE", "Ultimate Premium", "&d");
  static readonly VIP = new Rank(50, "VIP", "VIP", "&5", 4);
  static readonly YOUTUBER = new Rank(51, "YOUTUBER", "YouTuber", "&5");
  static readonly STREAMER = new Rank(52, "STREAMER", "Streamer", "&5");
  static readonly CONTRIBUTOR = new Rank(
    53,
    "CONTRIBUTOR",
    "Contributor",
    "&5"
  );
  static readonly NECTAR = new Rank(54, "NECTAR", "Team Nectar", "&5");
  static readonly HELPER = new Rank(
    60,
    "HELPER",
    "Helper"
  );

  /**
   * @deprecated
   */
  static readonly RESERVED_STAFF = Ranks.HELPER;
  static readonly MODERATOR = new Rank(70, "MODERATOR", "Moderator", "&c", 5);
  static readonly SRMODERATOR = new Rank(
    80,
    "SRMODERATOR",
    "Senior Moderator",
    "&4",
    6
  );
  static readonly STAFFMANAGER = new Rank(
    81,
    "STAFFMANAGER",
    "Staff Manager",
    "&4"
  );
  static readonly COMMUNITYMANAGER = new Rank(
    82,
    "COMMUNITYMANAGER",
    "Community Manager",
    "&4"
  );
  static readonly DEVELOPER = new Rank(90, "DEVELOPER", "Developer", "&8", 7);
  static readonly OWNER = new Rank(100, "OWNER", "Owner", "&e", 8);

  private static _list: Rank[] = [
    Ranks.REGULAR,
    Ranks.GOLD,
    Ranks.DIAMOND,
    Ranks.EMERALD,
    Ranks.ULTIMATE,
    Ranks.VIP,
    Ranks.YOUTUBER,
    Ranks.STREAMER,
    Ranks.CONTRIBUTOR,
    Ranks.NECTAR,
    Ranks.HELPER,
    Ranks.MODERATOR,
    Ranks.SRMODERATOR,
    Ranks.STAFFMANAGER,
    Ranks.COMMUNITYMANAGER,
    Ranks.DEVELOPER,
    Ranks.OWNER
  ];

  static async update() {
    return fetch(Methods.RANKS()).then(
      res =>
        (this._list = Object.entries(res).map(
          ([id, { enum: name, human: humanName }]: any) =>
            new Rank(
              parseInt(id),
              name,
              humanName,
              Ranks[name] ? Ranks[name].legacyId : -1 // copy the legacy id if it is in the provided data
            )
        ))
    );
  }

  static get(id: number | string) {
    if (typeof id === "number") {
      return Ranks.list.filter(r => r.id == id)[0];
    } else {
      return Ranks.list.filter(r => r.name == id)[0];
    }
  }

  /**
   * a list of all available [[Rank]]s
   */
  static get list(): Rank[] {
    return Ranks._list;
  }
}
