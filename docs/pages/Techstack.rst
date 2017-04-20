********
Techstack
********


.. image:: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
 :target: https://stackshare.io/bfia5f/vuebook
 :alt: Coverage Status


Über das oben zu sehende Badget kann der für dieses Projekt verwendete *Techstack* eingesehen werden


  Ein Techstack ist eine Sammlung von Tools die miteinander Arbeiten. Dabei bilden sie die zu grunde liegende
  Plattform auf der eine Anwendung läuft.


Der Stack lässt sich in zwei Bereiche aufteilen. Zum einen den den Anwedungs-/Daten Bereich, zum anderen den DevOps Bereich.


DevOps
######

DevOps beschreibt den Ansatz Prozesse zu verbessern. Dabei sollen die Bereiche **Dev** für Development und **Ops** für Operations
enger mit einander arbeiten um so zum einen die Qualität der Anwendung zu erhöhen, gleichzeitig jedoch für eine schnellere Entwicklung und Auslieferung sorgen.

Vorstellung der Techs
#####################

Bootstrap
---------
.. image:: https://logo-png.com/logos/bootstrap-logo.png
   :width: 75px
   :height: 75px
Hierbei handelt es sich um ein Framework zum erstellen von Responsiven Webseiten. Bootstrap arbeitet auf CSS und Javascript Ebene und wird über CSS Klassen eingebunden. Eine Webseite die das Bootstrap Grid Layout verwendet, wird in eine bestimmte Anzahl Spalten unterteilt (Standardmäßig 12 Stück).

Über CSS Klassen kann dann definiert werden, wie viele dieser Spalten das Element bei welcher Breite des Browserfensters einnehmen darf. Ein Element kann in einem breiten Fenster (Desktop) zwei Spalten einnehmen um dann bei einem kleinen Viewport wie dem eines Smartphones auf zwölf Spalten zu expandieren und andere Elemente zu verschieben.

.. figure:: http://www.tutorialrepublic.com/lib/images/grid-system-illustration.jpg
Bootstrap Grid Layout

Firebase
--------
.. image:: https://lh3.googleusercontent.com/-whXBCDVxIto/Vz2Rsyz-UjI/AAAAAAAAiJc/UjvR-M2b9tY5SyKFkDY6Q_MbusEINRXkQ/w506-h750/Firebase_16-logo.png
   :width: 75px
   :height: 75px

Das von Google bereitgestellte Firebase ist eine Sammlung verschiedener Dienste. Unter anderem darin enthalten sind

* Datenbank
* Benutzerverwaltung
* Analytics
* Storage
* Hosting

Somit bildet Firebase das Rückgrad der Anwendung im Bereich der Daten und des Hostings. Bis zu einer bestimmten Nutzungsgrenze kann der Dienst kostenlos verwendet werden. Bei der Datenbank handelt es sich um eine Echtzeitdatenbank im No-SQl Format, die Daten werden als JSON Objekte erstellt.

Firebase bietet über eine API die Möglichkeit Benutzer auf verschiedene Wege zu authentifizieren, beispielsweise über den Google Account, Facebook, Twitter oder Github. Auch können anonyme Anmeldungen erlaubt werden sowie die Eingabe eigener Benutzerdaten. Diese persönlichen Informationen werden nicht in der Datenbank abgelegt sondern sind entweder über die API oder das Firebase Backend erreichbar.

Weiterhin bietet Firebase eine Vielzahl an Analyse und Konfigurationsmöglichkeiten. So lassen sich mit einfachsten mitteln Google Analytics einbinden um nachvollziehen zu können, wie populär die Anwendung ist und welche Bereich dabei besonders herausstechen. Ebenfalls vorhanden ist eine AdMob Einbindung um Webung anzuzeigen.

Vue
--------
.. image:: https://vuejs.org/images/logo.png
   :width: 75px
   :height: 75px

Webseiten lassen sich nur über Javascript dynamisch verändern, entweder über natives JS oder mithilfe einer Libary wie JQuery. Für kleine Änderungen reicht es zumeist aus JQuery zu verwenden. Bei einer komplexen Anwendung wie dieser wäre man länger damit beschäftigt Funktionen zu schreiben um das HTML zu updaten als mit der eigentlichen Programmlogik. Gemäß dem Satz man solle das Rad nicht immer neu erfinden macht es an dieser Stelle sind ein Framework zu verwenden um das HTML zu verändern.

Zwar ist die Einarbeitung in ein komplettes Framework sehr zeitintensiv, allerdings holt man oft während der Umsetzung die Zeit wieder rein da sich Funktionen wesentlich schneller umsetzten lassen.

Vue ist ein Framework vergleichbar mit React von Facebook oder Angular von Google. Im Vergleich zu den beiden anderen ist Vue sehr innovativ und bietet die Möglichkeit eines schnellen Einstiegs.

Der Aufbau von Vue erfolgt in *Components*, einzelnen Vue Dateien 
