# language : de
Funktionalität: Überblick über alle bereits erstellten Einkaufszettel

  Grundlage:
    Angenommen der User hat sich eingeloggt um mit der Übersicht zu arbeiten
    Angenommen der User hat bereits einige Einkaufszettel in der Vergangenheit angelegt

  Szenario: Als User möchte ich sicher sein, dass nur ich meine Inhalte sehen kann
    Angenommen der User verwendet einen ungültigen accessToken
    Wenn der User die Liste aller seiner Einkaufszetten einsehen will
    Dann schlägt der overview-Aufruf fehl

  Szenario: Als User möchte ich eine Übersicht aller meiner bisherigen Einkaufszettel erhalten
    Wenn der User die Liste aller seiner Einkaufszetten einsehen will
    Dann sieht er die Titel aller seiner Einkaufszettel

  Szenario: Als User möchte ich einen alten Einkaufszettel löschen können
    Wenn der User einen Einkaufszettel löscht
    Dann taucht der Titel des Einkaufszettel nicht mehr in der Übersicht aufgerufen

  Szenario: Als User möchte ich einen neuen Einkaufszettel anlegen können
    Wenn der User einen neuen Einkaufszettel anlegt
    Dann taucht der Titel des Einkaufszettel in der Übersicht der Einkaufszettel auf