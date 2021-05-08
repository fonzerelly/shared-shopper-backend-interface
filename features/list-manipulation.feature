# language : de
@wip
Funktionalität: Einkaufszettel manipulieren

  Grundlage:
  Angenommen der User hat sich erfolgreich eingeloggt
  Angenommen der User hat bereits einige Einkaufszettel in der Vergangenheit angelegt
  Angenommen der User hat einen neuen Einkaufszettel angelegt

  Szenario: Einkaufszettel anzeigen
  Wenn der User sich den neuen Einkaufszettel anzeigen lässt
  Dann ist der Einkaufszettel leer

  Szenario: Einen Eintrag im Einkaufszettel erstellen
  Wenn der User den neuen Einkaufszettel um einen Eintrag ergänzt
  Dann enthält der Einkaufszettel einen Eintrag

  Szenario: Einen Eintrag im Einkaufszettel löschen
  Angenommen der User hat den neuen Einkaufszettel um einen Eintrag ergänzt
  Wenn der User den neuen Eintrag wieder löscht
  Dann ist der Einkaufszettel leer

  Szenario: Einen Eintrag im Einkaufszettel nach oben schieben
  Angenommen der User den neuen Einkaufszettel um zwei Einträge ergänzt
  Wenn der User den zweiten Eintrag nach oben schiebt
  Dann ist dieser Eintrag der erste in der Liste