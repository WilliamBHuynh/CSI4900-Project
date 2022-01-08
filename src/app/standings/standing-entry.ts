export class StandingEntry {
  public team: string;
  public w: number;
  public l: number;
  public wL: number;
  public gb: number;
  public pw: number;
  public pl: number;
  public psg: number;
  public pag: number;
  public div: string;
  constructor(
    team: string,
    w: number,
    l: number,
    wL: number,
    gb: number,
    pw: number,
    pl: number,
    psg: number,
    pag: number,
    div: string
  ) {
    this.team = team;
    this.w = w;
    this.l = l;
    this.wL = wL;
    this.gb = gb;
    this.pw = pw;
    this.pl = pl;
    this.pag = pag;
    this.psg = psg;
    this.div = div;
  }
}
