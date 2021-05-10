# language : de
@wip
Funktionalität: Einkaufszettel manipulieren

  Grundlage:
  Angenommen der User hat sich eingeloggt um einen Einkaufszettel zu manipulieren
  Angenommen der User hat bereits einige Einkaufszettel in der Vergangenheit angelegt
  Angenommen der User hat einen neuen Einkaufszettel angelegt

  Szenario: Einkaufszettel anzeigen
    Wenn der User sich den neuen Einkaufszettel anzeigen lässt
    Dann ist der Einkaufszettel leer

  Szenario: Einen Eintrag im Einkaufszettel erstellen
    Wenn der User den neuen Einkaufszettel um einen Eintrag ergänzt
    Und der User sich den neuen Einkaufszettel anzeigen lässt
    Dann enthält der Einkaufszettel einen Eintrag

  Szenario: Einen Eintrag im Einkaufszettel löschen
    Angenommen der User hat den neuen Einkaufszettel um einen Eintrag ergänzt
    Wenn der User den neuen Eintrag wieder löscht
    Und der User sich den neuen Einkaufszettel anzeigen lässt
    Dann ist der Einkaufszettel leer

  Szenario: Einen Eintrag im Einkaufszettel nach oben schieben
    Angenommen der User den neuen Einkaufszettel um zwei Einträge ergänzt
    Wenn der User den zweiten Eintrag nach oben schiebt
    Und der User sich den neuen Einkaufszettel anzeigen lässt
    Dann sind die Plätze beider Einträge vertauscht

  Szenario: Einen Eintrag im Einkaufszettel nach unten schieben
    Angenommen der User den neuen Einkaufszettel um zwei Einträge ergänzt
    Wenn der User den ersten Eintrag nach unten schiebt
    Und der User sich den neuen Einkaufszettel anzeigen lässt
    Dann sind die Plätze beider Einträge vertauscht

  Szenario: Markierung eines Eintrags im Einkaufszettel ändern
    Angenommen der User den neuen Einkaufszettel um zwei Einträge ergänzt
    Wenn der User den zweiten Eintrag markiert
    Und der User sich den neuen Einkaufszettel anzeigen lässt
    Dann ist dieser Eintrag markiert

  Szenario: Anzahl eines Eintrags setzen
    Angenommen der User hat den neuen Einkaufszettel um einen Eintrag ergänzt
    Wenn der User die Anzahl des Eintrags auf 12 setzt
    Und der User sich den neuen Einkaufszettel anzeigen lässt
    Dann hat steht die Anzahl des Eintrags auf 12
