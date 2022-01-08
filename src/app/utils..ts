export default class Utils {
  static convertTeamName(name: string): string {
    switch (name.toUpperCase()) {
      case "BROOKLYN NETS":
        return "bkn";
      case "MILWAUKEE BUCKS":
        return "mil";
      case "BOSTON CELTICS":
        return "bos";
      case "CHARLOTTE HORNETS":
        return "cha";
      case "ATLANTA HAWKS":
        return "atl";
      case "CHICAGO BULLS":
        return "chi";
      case "CLEVELAND CAVALIERS":
        return "cle";
      case "DALLAS MAVERICKS":
        return "dal";
      case "DENVER NUGGETS":
        return "den";
      case "DETROIT PISTONS":
        return "det";
      case "GOLDEN STATE WARRIORS":
        return "gsw";
      case "HOUSTON ROCKETS":
        return "hou";
      case "INDIANA PACERS":
        return "ind";
      case "LOS ANGELES CLIPPERS":
        return "lac";
      case "LOS ANGELES LAKERS":
        return "lal";
      case "MEMPHIS GRIZZLIES":
        return "mem";
      case "MIAMI HEAT":
        return "mia";
      case "MINNESOTA TIMBERWOLVES":
        return "min";
      case "NEW ORLEANS PELICANS":
        return "nop";
      case "NEW YORK KNICKS":
        return "nyk";
      case "OKLAHOMA CITY THUNDER":
        return "okc";
      case "ORLANDO MAGIC":
        return "orl";
      case "PHILADELPHIA 76ERS":
        return "phi";
      case "PHOENIX SUNS":
        return "phx";
      case "PORTLAND TRAIL BLAZERS":
        return "por";
      case "SACRAMENTO KINGS":
        return "sac";
      case "SAN ANTONIO SPURS":
        return "sas";
      case "TORONTO RAPTORS":
        return "tor";
      case "UTAH JAZZ":
        return "uta";
      case "WASHINGTON WIZARDS":
        return "was";
      default:
        return "";
    }
  }
  static convertTeamAbv(name: string): string {
    switch (name.toLowerCase()) {
      case "bkn":
        return "BROOKLYN NETS";
      case "mil":
        return "MILWAUKEE BUCKS";
      case "bos":
        return "BOSTON CELTICS";
      case "cha":
        return "CHARLOTTE HORNETS";
      case "atl":
        return "ATLANTA HAWKS";
      case "chi":
        return "CHICAGO BULLS";
      case "cle":
        return "CLEVELAND CAVALIERS";
      case "dal":
        return "DALLAS MAVERICKS";
      case "den":
        return "DENVER NUGGETS";
      case "det":
        return "DETROIT PISTONS";
      case "gsw":
        return "GOLDEN STATE WARRIORS";
      case "hou":
        return "HOUSTON ROCKETS";
      case "ind":
        return "INDIANA PACERS";
      case "lac":
        return "LOS ANGELES CLIPPERS";
      case "lal":
        return "LOS ANGELES LAKERS";
      case "mem":
        return "MEMPHIS GRIZZLIES";
      case "mia":
        return "MIAMI HEAT";
      case "min":
        return "MINNESOTA TIMBERWOLVES";
      case "nop":
        return "NEW ORLEANS PELICANS";
      case "nyk":
        return "NEW YORK KNICKS";
      case "okc":
        return "OKLAHOMA CITY THUNDER";
      case "orl":
        return "ORLANDO MAGIC";
      case "phi":
        return "PHILADELPHIA 76ERS";
      case "phx":
        return "PHOENIX SUNS";
      case "por":
        return "PORTLAND TRAIL BLAZERS";
      case "sac":
        return "SACRAMENTO KINGS";
      case "sas":
        return "SAN ANTONIO SPURS";
      case "tor":
        return "TORONTO RAPTORS";
      case "uta":
        return "UTAH JAZZ";
      case "was":
        return "WASHINGTON WIZARDS";
      default:
        return "";
    }
  }
}
