# language : de
Funktionalität: health endpoint
  Szenario: Als Dozent möchte ich sicher sein, dass die API nur von meinen Studenten genutzt wird
    Wenn health ohne x-shared-shopper-secret aufgerufen wird
    Dann wird der HTTP-Code '403' zurück gegeben

 
  Szenario: Als Entwickler möchte ich den groben Zustand des Backends auf einen Blick einsehen können
    Wenn health aufgerufen wird
    Dann erfahre ich wie lange der Service schon läuft
    Und ob eine Datenbankverbindung existiert