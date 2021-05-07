# language : de

Funktionalität: Überblick über alle bereits erstellten Einkaufszettel

  Grundlage:
  Angenommen der User hat sich erfolgreich eingeloggt
  Angenommen der User hat bereits einige Einkaufszettel in der Vergangenheit angelegt

  Szenario: Als User möchte ich sicher sein, dass nur ich meine Inhalte sehen kann
  Angenommen der User verwendet einen ungültigen accessToken
  Wenn der User die Liste aller seiner Einkaufszetten einsehen will
  Dann wird der HTTP-Code '401' zurück gegeben

  Szenario: Als User möchte ich eine Übersicht aller meiner bisherigen Einkaufszettel erhalten
    Wenn der User die Liste aller seiner Einkaufszettel einsehen will
    Dann sieht er die Titel aller seiner Einkaufszettel

  Szenario: Als User möchte ich einen alten Einkaufszettel löschen können
    Wenn der User einen Einkaufszettel löscht
    Dann taucht der Titel des Einkaufszettel nicht mehr in der Übersicht aufgerufen

  Szenario: Als User möchte ich einen neuen Einkaufszettel anlegen können
    Wenn der User einen neuen Einkaufszettel anlegt
    Dann taucht der Teitel des Einkaufszettel in der Übersicht der Einkaufszettel auf