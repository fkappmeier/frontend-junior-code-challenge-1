export default class Record {
  constructor(
    artikelNr,
    artikelName,
    hersteller,
    beschreibung,

    materialangaben,
    geschlecht,
    produktart,
    ärmel,

    bein,
    kragen,
    herstellung,
    taschenart,

    grammatur,
    material,
    ursprungsland,
    bildname,
  ) {
    this.artikelNr = artikelNr;
    this.artikelName = artikelName;
    this.hersteller = hersteller;
    this.beschreibung = beschreibung;

    this.materialangaben = materialangaben;
    this.geschlecht = geschlecht;
    this.produktart = produktart;
    this.ärmel = ärmel;

    this.bein = bein;
    this.kragen = kragen;
    this.herstellung = herstellung;
    this.taschenart = taschenart;

    this.grammatur = grammatur;
    this.material = material;
    this.ursprungsland = ursprungsland;
    this.bildname = bildname;
  }
}
