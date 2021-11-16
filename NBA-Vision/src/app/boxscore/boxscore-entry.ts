export class BoxscoreEntry {
  public player: string;
  public mp: number;
  public pts: number;
  public fg: number;
  public fga: number;
  public fgaP: number;
  public threeP: number;
  public threePA: number;
  public threePP: number;
  public ft: number;
  public fta: number;
  public ftaP: number;
  public drb: number;
  public trb: number;
  public ast: number;
  public stl: number;
  public blk: number;
  public tov: number;
  public pf: number;
  public plusMinus: number;
  public team: string;
  constructor(
    player: string,
    mp: number,
    pts: number,
    fg: number,
    fga: number,
    fgaP: number,
    threeP: number,
    threePA: number,
    threePP: number,
    ft: number,
    fta: number,
    ftaP: number,
    drb: number,
    trb: number,
    ast: number,
    stl: number,
    blk: number,
    tov: number,
    pf: number,
    plusMinus: number,
    team: string,
  ) {
    this.player = player;
    this.mp = mp;
    this.pts = pts;
    this.fg = fg;
    this.fga = fga;
    this.fgaP = fgaP;
    this.threeP = threeP;
    this.threePA = threePA;
    this.threePP = threePP;
    this.ft = ft;
    this.fta = fta;
    this.ftaP = ftaP;
    this.drb = drb;
    this.trb = trb;
    this.ast = ast;
    this.stl = stl;
    this.blk = blk;
    this.tov = tov;
    this.pf = pf;
    this.plusMinus = plusMinus;
    this.team = team;
  }
}
