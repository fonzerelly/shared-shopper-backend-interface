# language : de
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
    Dann zeigt der HTTP-status Erfolg an
    Wenn der User sich den neuen Einkaufszettel anzeigen lässt
    Dann entspricht das Label des Eintrags dem Produktnamen
    Dann enthält der Einkaufszettel einen Eintrag

  Szenario: Einen Eintrag im Einkaufszettel löschen
    Angenommen der User hat den neuen Einkaufszettel um einen Eintrag ergänzt
    Wenn der User den neuen Eintrag wieder löscht
    Dann zeigt der HTTP-status Erfolg an
    Wenn der User sich den neuen Einkaufszettel anzeigen lässt
    Dann ist der Einkaufszettel leer

  Szenario: Einen Eintrag im Einkaufszettel nach oben schieben
    Angenommen der User den neuen Einkaufszettel um zwei Einträge ergänzt
    Wenn der User den zweiten Eintrag nach oben schiebt
    Dann zeigt der HTTP-status Erfolg an
    Wenn der User sich den neuen Einkaufszettel anzeigen lässt
    Dann sind die Plätze beider Einträge vertauscht

  Szenario: Einen Eintrag im Einkaufszettel nach unten schieben
    Angenommen der User den neuen Einkaufszettel um zwei Einträge ergänzt
    Wenn der User den ersten Eintrag nach unten schiebt
    Dann zeigt der HTTP-status Erfolg an
    Wenn der User sich den neuen Einkaufszettel anzeigen lässt
    Dann sind die Plätze beider Einträge vertauscht

  Szenario: Markierung eines Eintrags im Einkaufszettel ändern
    Angenommen der User hat den neuen Einkaufszettel um einen Eintrag ergänzt
    Wenn der User den Eintrag markiert
    Dann zeigt der HTTP-status Erfolg an
    Wenn der User sich den neuen Einkaufszettel anzeigen lässt
    Dann ist dieser Eintrag markiert

  Szenario: Anzahl eines Eintrags setzen
    Angenommen der User hat den neuen Einkaufszettel um einen Eintrag ergänzt
    Wenn der User die Anzahl des Eintrags auf 12 setzt
    Dann zeigt der HTTP-status Erfolg an
    Wenn der User sich den neuen Einkaufszettel anzeigen lässt
    Dann steht die Anzahl des Eintrags auf 12
