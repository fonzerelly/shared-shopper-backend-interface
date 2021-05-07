# language : de
Funktionalität: register- / validate-endpoint

  Grundlage: 
    Angenommen wir kennen das nächste Validierungstoken
    Angenommen wir kennen das nächste Zugriffstoken
 
  Szenario: Als Kunde möchte ich mich bei dem Service registrieren können
    Wenn register mit einer validen email und einem validen passwort aufgerufen wird
    Dann wird ein Transaktionsvorgang mit dem Token angelegt
    Und im Hintergrund eine Email mit dem verify-link an die email adresse gesendet

#   Szenario: Als Kunde möchte ich meine registrierung bestätigen
#     Angenommen der Kunde hat sich zuvor registriert
#     Wenn validate mit dem Token aufgerufen wird
#     Dann wird der login für den Kunden freigeschalten

#   Szenario: Als Entwickler möchte ich erkennen, falls ich einen falschen Validierungstoken verwende
#     Angenommen der Kunde hat sich zuvor registriert
#     Wenn validate mit einem falschen Token aufgerufen wird
#     Dann wird der HTTP-Code 403 zurück gegeben
#     Und sie enthält das Token bezogene Fehlermeldung

#   Szenario: Als Kunde möchte ich mich beim Dienst anmelden
#     Angenommen der Kunde hat sich freigeschalten
#     Wenn der Kunde sich mit seinem Passwort anmeldet
#     Dann erhält der Kunde das Zugriffstoken