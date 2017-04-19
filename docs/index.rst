.. Digitales Klassenbuch documentation master file, created by
   sphinx-quickstart on Wed Apr 19 21:39:09 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. toctree::
   :maxdepth: 2

    index


Digitales Klassenbuch
=====================
Im Rahmen eines Schulprojektes entstand das 'Digitale Klassenbuch', eine Web basierte Anwendung um die veralteten
'analogen' Klassenbücher in das 21. Jahrhundert zu holen. Die Anwenseheitskontrolle zu Beginn des Unterrichts nimmt bisher
viel Zeit in Anspruch, ist sehr mühsam und Fehler sind schlecht zu korrigieren. Die von uns erstelle Anwedung soll dem 
Entgegenwirken um es den Lehrern einfacher zu machen Schüler zu verwalten und diesen etwas mehr transparentz zu gewährleisten

Analyse eines Klassenbuchs
**************************

Der erste Schritt zum erstellen der Anwendung war natürlich die Analyse, wie die bisherigen Klassenbücher aufgebaut sind und
verwendet werden. Basierend auf den Ergebissen liesen sich einige Probleme feststellen die in der neuen Anwedung verbessert werden
mussten damit die Anwendung eine 'Exsistenzberechtigung' besitzt.

Funktionsumfang
###############

Für ein **MVP** (Minimal Viable Product) musste zunächst herausgefunden werden, was ein Klassenbuch in der Minimalform ausmacht,
also welche Funktionen unerlässlich sind um das Produkt sinnvoll nutzen zu können. Dies waren die Anforderungen die unser Programm
ebenfalls bieten muss um überhaupt mit einem normalen Klassenbuch konkurrieren zu können.

Alle weiteren Funktionen die eingebaut werden, können als zusätzliche Features angeführt werden. Diese dienen dann aber *nur* der Quality of Life.

Im Verlauf der Programmierung, zumindest nach Erfüllung der Anforderungen für das MVP können weitere Features implementiert werden. Dabei sollte man auf
keinen Fall zu viel Einbauen und somit das Programm mit Funktionen überladen die den Endbenutzer in der Verwendung verunsichern. Allerdings liegt hier auch
der große Vorteil einer digitalen Anwendung gegenüber eines klassichen Klassenbuchs, es lässt sich erweitern und an die Wünsche derer Anpassen, die jeden
Tag mit dem Programm arbeiten.

Vorteile
#########

Kommen wir zunächst zu den Vorteilen eines *normalen* Klassenbuchs. Der wahrscheinlich größte Pluspunkt ist, dass es ohne Internetverbindung verwendet werden kann.
Die Lehrkräfte können somit zu jeder Zeit Einträge erstellen, bearbeiten oder streichen. Des weiteren entstehen keine Wartezeiten bis *die Anwendung* bereit ist.
An Schulen die keine Gebäudeweite Wlan Abdeckung haben, ist somit das alte Klassenbuch klar im Vorteil, da für eine Internet basierte Anwedung erst die nötige
Infrastruktur geschaffen werden muss.

Nachteile
#########

Der größte Vorteil eines normalen Klassenbuchs ist gleichzeitig sein größter Nachteil. Es ist immer nur an einem Platz verfügbar, sollte eine Lehrkraft das Klassenbuch
verlegt haben, oder ein Schüler hat es mitgenommen, besteht keine Möglichkeit Einträge zu erstellen. Somit muss ein Klassenbuch immer und überall zur Verfügung stehen.
Dies lässt sich mit einer Web basierten Lösung sehr einfach erzielen, bei diesem Lösungsansatz lassen sich sogar erweiterte Richtlinien erstellen, beispielsweise das nur Personen aus
einem bestimmten Netzwerk die Anwendung aufrufen können.

Eine Onlinelösung bietet, richtig umgesetzt, die Möglichkeit der Kollaboration. Somit können mehrere Personen die Anwendung gleichzeitig und von verschiedenen Orten aus verwenden.
Für dieses Projekt kam eine Echtzeitdatenbank zum Einsatz, Änderungen die ein Benutzer schreibt kann ein anderer sofort bei sich sehen, somit sind immer alle Anwender auf dem gleichen
Wissensstand.

Ein weiterer Nachteil eines herkömmlichen Klassenbuchs ist die Fälschungssicherheit. Eine unbefugte Person kann problemlos Einträge manipulieren, was oft im nachhinein nichtmehr
nachvollzogen werden kann. Informationen werden somit nicht persistent gespeichert.

Bei der Thematik der Datenspeicherung ergibt sich ein fast noch gravierenderes Problem als die Manipulation der Daten, das Speichern eben jener über einen längeren Zeitraum.
Sollte ein Klassenbuch zerstört werden (Wasserschaden, Feuer, Verlust) lassen sich die Daten nicht wiederherstellen.

Außerdem haben die Schüler kaum, bzw. Schwierig Einblick in ihre persönlichen Daten wie Fehlzeiten. Es besteht ebenfalls keine Möglichkeit die persönlichen Informationen zwischen
den Schülern geheim zu halten. Möchte ein Schüler seine Fehlzeiten erfahren muss er entweder vor oder nach dem Unterricht die Lehrkraft ansprechen, würde er selbsständig seine
Fehlzeiten nachschauen wollen hat er die Möglichkeit auch die seiner Mitschüler zu lesen.

Zusammenfassung
###############

Weder eine Onlinelösung, noch die bisherigen Klassenbücher bieten eine ideale Lösung. Die Anforderungen an ein MVP sind nicht besonders hoch, es lassen sich allerdings eine Menge
Features einbauen die die Verwendung einer digitalen Lösung wesentlich vereinfachen und einiges an Kompfort für Lehrer und Schüler bieten. Sicherlich ist der Gesichtspunkt des
Internetzzwangs nicht außer Acht zu lassen, allerdings muss bei einem herkömmlichen Klassenbuch die physische Anwesenheit garantiert werden.

Klare Vorteile einer digitalen Lösung ergeben sich in den Bereichen der Datensicherung und deren Persistenz durch Benutzerverwaltung sowie dem Schutz der persönlichen Daten eines
jeden Schülers. Die Vielzahl an Möglichkeiten eine Anwedung zu erweitern kann ebenfalls ein großer Einflussfaktor zugunsten der digitalen Lösung sein.