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
}
