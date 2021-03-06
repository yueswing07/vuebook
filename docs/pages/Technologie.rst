************
Technologien
************

Bei vielen modernen Webanwendungen kommt eine Vielzahl von Tools und Frameworks zum Einsatz. Für den erfolgreichen Abschluss
eines Projekts spielt die Wahl der zu verwendenden Tools eine wichtige Rolle.

Editor
######

Der wichtigste Teil für die Arbeit an einem Projekt ist der Editor, da man hier Stunden verbringt und Code schreibt muss sich
dieser an die persönlichen Präferenzen anpassen lassen. Unter anderem sollte das Fabschema angepasst werden können um die Augen
bei langer Bildschirmarbeit zu entspannen.

Der nächste wichtige Punkt ist Syntaxhighlighting um den bestehenden Code schnell analysieren zu können.

Besonder im Webbereich ist ein *beautifier* sehr hilfreich um Code einzurücken. Unformatierter HTML Quellcode lässt sich schwer
lesen und es passieren häufig Fehler beim schließen langer Tags.

Liste bekannter Editoren:

* `Sublime <https://www.sublimetext.com/3>`_
* `Atom <https://atom.io/>`_
* `Visual Studio Code <https://code.visualstudio.com/>`_

Jeder dieser Editoren lässt sich kostenlost verwenden und bietet eine Vielzahl an Erweiterungen um den Arbeitsablauf zu erleichtern.
Alle lassen sich ganz nach den eigenen Bedürfnissen konfigurieren und für alle Arten der Programmierung verwenden. Die größte
Stärke ist die Community hinter jedem Tool, da diese für Erweiterungen der Standardversion sorgen.

Versionsverwaltung
##################

Arbeiten mehrer Personen getrennt an ein und dem selben Projekt tritt schnell der Fall ein, dass eine Datei von mehreren Personen gleichzeitig bearbeitet wird. 
Auch kann es vorkommen, dass die Änderungen von einer Person ungewünschtes Verhalten im Code von einem anderen Kollborator auslöst.

Solche und ähnliche Probleme lassen sich mit einer Versionsverwaltung lösen. 
Jeder der an dem Projekt arbeitet kann jederzeit seine Änderungen commiten, sollten beim Übernehmen der Änderungen diskripanzen entstehen muss sich der jeweilige Benutzer 
selber darum kümmern diese zu lösen, erst dann wird der Code übernommen.

In diesem Projekt kam die Versionsverwaltung *Git* zum Einsatz.

NPM
###

Hinter NPM verbirgt sich ein dependency-Manager für Javascript Module. NPM steht für *Node Package Manager* und wird meißt für NodeJS Projekte verwendet um größere Module
in ein Projekt zu integrieren. Mit Hilfe zusätzlicher Tools kann NPM auch für die Entwicklung browserbasierter Anwendungen verwendet werden. Beispielsweise kann das Tool
:ref:`my-reference-label` die angegebenen Abhängigkeiten auflösen.

Der Vorteil eines NPM basierten Projekts ist, dass andere Entwickler sich nicht darum kümmern müssen die benötigten Module auf ihrem System von Hand zu installieren.
Alle Abhängigkeiten werden in der *package.json* Datei hinterlegt, mit dem Befehl *npm install* werden automatisch alle Module in einem lokalen Verzeichnis angelegt und
stehen zur Einbindung in eigenen Javascript Dateien bereit. Module die über NPM geladen werden können über ihren Namen und ohne Pfadangabe eingebunden werden.

Ein weiteres Feature von NPM ist das erstellen von Skripten die über die Kommandozeile gestartet werden können. So lassen sich ein einfacher Webserver oder build-Prozesse
starten. Es können Module wie Grunt über NPM gestartet werden welche unter anderem LESS in CSS Dateien umwandeln, dies ist besonder hilfreich wenn die Applikation über ein
deploy-Skript auf einen Server übertragen werden soll. Innerhalb des deploy Skripts können beliebig viele Schritte ausgeführt werden um die Anwedung im Browser bereit
stellen zu können.

ReadTheDocs (RTFM)
##################

ReadTheDocs ist ein wichtiger Bestandteil der Anwendung, mit diesem Tool lässt sich eine strukturierte, responsive, durchsuchbare Dokumentation erstellen. Grundvoraussetzung
zur Nutzung von ReadTheDocs ist eine *Sphinx* Installation. Um mit ReadTheDocs zu arbeiten wird ein *docs* Ordner im Projekt benötigt, über ein Quickstart Skript von Sphinx
kann die Grundlegende Struktur der Dokumentation erstellt werden. Im Anschluss daran können Seiten im reStructuredText Format erstellt werden, Sphinx wandelt diese in Html Code
um. Commited und pusht man seine Änderungen kann ReadTheDocs per Webhook auf die Neuerung reagieren und einen internen build Prozess anstoßen, nach dessen Ende ist die Dokumentation
online aufrufbar.

Für ReadTheDocs gibt es ein Theme, welches auch hier zum Einsatz kommt namens *sphinx_rtd_theme*. Dieses sorgt für eine Übersichtliche Anzeige der Inhalte, das responsive Design
und ein generell besser lesbares Layout.