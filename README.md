# Aufgabenergebnis - Fredrik Kappmeier

Die ursprüngliche README-Datei mit der Aufgabenstellung ist zu finden unter: https://github.com/UDG-United-Digital-Group/frontend-junior-code-challenge-1

## Eingesetzte Technologien / Frameworks

Folgende Technologien / Frameworks setze ich in meinem Projekt ein:

- JavaScript
- HTML & CSS

Ich habe mich für JavaScript entschieden, weil es die Technologie ist, die ich mit Abstand am besten beherrsche. Ich habe mich in den letzten Jahren meines Studiums auf den Bereich Web-Entwicklung spezialisiert und verschiedene Projekte durchgeführt. Dabei habe ich die Möglichkeiten von JS zu schätzen gelernt, sowohl die Syntaktischen als auch das breite Anwendungsgebiet der Sprache. Ich bin mit modernen ES6+ Konzepten von JavaScript vertraut und habe es während meiner Bachelor-Arbeit geschafft alle programmatischen Aufgaben in JavaScript zu lösen. Auch mit dem Umgang mit den verschiedenen Dokumentationen (MDN, npm & Co.) bin ich vertraut und habe so die Möglichkeit mich in einem angemessenen Zeitrahmen in Feinheiten der Technologien oder 3rd-Party-Libraries einzuarbeiten.

## Eingesetzte 3rd Party Libraries

Ich setze in meinem Projekt die folgenden 3rd Party Libraries ein:

### Dependencies

Name | Begründung
--- | ---
[Papa Parse](https://www.papaparse.com/) | CSV-Parser, Artikel.csv beinhaltet zu viele Edge-Cases um per Hand geparset zu werden (siehe dataProcessor.js)
[Chart.js](https://www.papaparse.com/) | populäre Diagrammbibliothek für JavaScript, zum Erstellen der in [1.5](https://github.com/UDG-United-Digital-Group/frontend-junior-code-challenge-1#1-zielsetzung) geforderten Diagramme
[randomColor](https://randomcolor.lllllllllllllllll.com/) | Farbengenerator, zum automatischen Einfärben der Diagrammabschnitte mit (halbwegs) attraktiven Farben

### Dev-Dependencies

Name | Begründung
--- | ---
[webpack](https://webpack.js.org/) | Zum Bündeln der einzelnen Dateien zu einer main.js-Datei.
[webpack-cli](https://webpack.js.org/api/cli/) | Webpack-Erweiterung zum Erstellen einer webpack.config.js-Datei
[style-loader](https://webpack.js.org/loaders/style-loader/) | Webpack-Loader welcher CSS-Styles automatisch zum DOM hinzufügt
[css-loader](https://webpack.js.org/loaders/css-loader/) | Webpack-Loader zum Laden von im Code importierten CSS-Dateien
[less-loader](https://webpack.js.org/loaders/less-loader/) | Webpack-Loader zum Laden und Kompilieren von LESS-Dateien
[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/) | Webpack-Erweiterung zum automatischen Generieren einer index.html-Datei
[ESLint](https://eslint.org/) | Linter für sauberen und lesbaren Code
[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) | populäre Airbnb-Stylevorgabe für ESLint
[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) | ESLint-Erweiterung zur Unterstützung von ES6+ import/export-Syntax

## Installation / Ausführen des Projektes

Folgende Komponenten müssen lokal installiert sein:

- [nodejs](https://nodejs.org/en/) v16.4.0 oder neuer
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v8.1.3 oder neuer

Um das Projekt lokal auszuführen, folgendes in der Commandline / Bash eingeben:

```console
$ git clone https://github.com/fkappmeier/frontend-junior-code-challenge-1 udg-probeaufgabe
$ cd udg-probeaufgabe
$ npm install
$ npm run build
```
Danach muss lediglich die im /dist-Ordner befindliche index.html-Datei in einem Browser der Wahl geöffnet werden.
