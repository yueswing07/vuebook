********
Techstack
********

.. image:: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
 :target: https://stackshare.io/bfia5f/vuebook
 :alt: Coverage Status

Als TechStack bezeichnet man einen Sammlung von Tools/Programmen die für die Umsetzung und Wartung einer Anwedung verwendet werden.
Ein Stack lässt sich in verschiedene Segmente unterteilen, in diesem Fall kommen Tools aus dem DevOps Bereich und dem Anwendungs/Daten Bereich zum Einsatz.
Dabei spielt der DevOps Bereich eine eher passive Rolle wohingegen der Anwendungsbereich aktiv beim Entwickeln unterstützt, beispielsweise zählen Frameworks
zum Anwendungsbereich und stellen Funktionen zur Verfügung um schnell und einfach eine Anwendung aufzubauen.


DevOps
######

DevOps beschreibt den Ansatz Prozesse zu verbessern. Dabei sollen die Bereiche **Dev** für Development und **Ops** für Operations
enger mit einander arbeiten um so zum einen die Qualität der Anwendung zu erhöhen, gleichzeitig jedoch für eine schnellere Entwicklung und Auslieferung sorgen.

.. _my-reference-label:

Webpack
-------

.. figure:: https://severallevels.io/wp-content/uploads/2016/06/webpack.png
   :width: 75px
   :height: 75px

   Webpack Logo

Webpack ist *bundler* für Websprachen. Mittels dieses Tools kann beispielsweise Javascript in verschiedene Dateien ausgelagert werden und an bestimmten Stellen eingebunden werden.
Somit ist es möglich Code wieder zu verwenden ohne in von Hand an die richtige Stelle kopieren zu müssen. Später wenn die Webanwendung deployt wird, kümmert sich Webpack um den
korrekten Zusammenbau der Dateien.

Dieser Schritt wird benötigt, da Browser nicht in der Lage sind *require* Anweisungen zu verarbeiten. Module wie *CommonJS* oder *RequireJS* ermöglichen es für die lokale Entwicklung
solche Anweisungen zu verwenden, da Vue Anwendungen später im Browser laufen stehen diese Module nicht mehr zur Verfügung. Webpack kümmert sich darum die Abhängigkeiten auf zu lösen
und ist somit ein essentieller Bestandteil vieler moderner Webanwendungen.

Babel
-----

.. figure:: https://raw.githubusercontent.com/babel/logo/master/babel.png
   :width: 75px
   :height: 75px
   
   Babel Logo

Bei Babel handelt es sich um einen Javascript compiler. Dieser ermöglicht es die neuste ES6+ Javascript Schreibweise zu benutzen, obwohl diese noch nicht (zum Zeitpunkt des schreibens)
von Browsern unterstützt wird.

Der folgende Code ist in ES6 geschrieben, der modernen Version von Javascript. Viele oft benötigte Funktionen haben eine stark vereinfachte Schreibweise und sind
dennoch sehr leserlich.

.. code:: javascript

   // functions
   myParameter => {
      console.log(myParamter)
   }
   // Something more advanced
   [1,2,3].map(n => n + 1);

Babel sorgt nun dafür, dass der oben geschriebene Code in für aktuelle Browser konformes es2015 konvertiert wird.

.. code:: javascript

   // normal JS function
   (function (myParameter) {
     console.log(myParamter);
   });
   // The advanced example in es2015
   [1, 2, 3].map(function (n) {
    return n + 1;
   });

Anwedung und Daten
##################


Bootstrap
---------
.. figure:: https://logo-png.com/logos/bootstrap-logo.png
   :width: 75px
   :height: 75px

   Bootstrap Logo

Hierbei handelt es sich um ein Framework zum erstellen von Responsiven Webseiten. Bootstrap arbeitet auf CSS und Javascript Ebene und wird über CSS Klassen eingebunden. 
Eine Webseite die das Bootstrap Grid Layout verwendet, wird in eine bestimmte Anzahl Spalten unterteilt (Standardmäßig 12 Stück).

Über CSS Klassen kann dann definiert werden, wie viele dieser Spalten das Element bei welcher Breite des Browserfensters einnehmen darf. 
Ein Element kann in einem breiten Fenster (Desktop) zwei Spalten einnehmen um dann bei einem kleinen Viewport wie dem eines Smartphones auf zwölf Spalten zu expandieren 
und andere Elemente zu verschieben.

.. figure:: http://www.tutorialrepublic.com/lib/images/grid-system-illustration.jpg

   Bootstrap Grid Layout

Firebase
--------
.. figure:: https://lh3.googleusercontent.com/-whXBCDVxIto/Vz2Rsyz-UjI/AAAAAAAAiJc/UjvR-M2b9tY5SyKFkDY6Q_MbusEINRXkQ/w506-h750/Firebase_16-logo.png
   :width: 75px
   :height: 75px

   Firebase Logo

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
.. figure:: https://vuejs.org/images/logo.png
   :width: 75px
   :height: 75px

   VueJS Logo

Webseiten lassen sich nur über Javascript dynamisch verändern, entweder über natives JS oder mithilfe einer Libary wie JQuery. Für kleine Änderungen reicht es zumeist aus
JQuery zu verwenden. Bei einer komplexen Anwendung wie dieser wäre man länger damit beschäftigt Funktionen zu schreiben um das HTML zu updaten als mit der eigentlichen Programmlogik. 
Gemäß dem Satz man solle das Rad nicht immer neu erfinden macht es an dieser Stelle sind ein Framework zu verwenden um das HTML zu verändern.
Zwar ist die Einarbeitung in ein komplettes Framework sehr zeitintensiv, allerdings holt man oft während der Umsetzung die Zeit wieder rein da sich Funktionen wesentlich schneller umsetzten lassen.
Vue ist ein Framework vergleichbar mit React von Facebook oder Angular von Google. Im Vergleich zu den beiden anderen ist Vue sehr innovativ und 
bietet die Möglichkeit eines schnellen Einstiegs.

.. _my-reference-components:

Components
~~~~~~~~~~

Der Aufbau von Vue erfolgt in *Components*, einzelnen Vue Dateien die einen Teil des Programms abbilden. Beispielsweise stellt eine Komponente die Startseite dar. 
In dieser können beliebig viele weitere Komponenten eingebunden werden. Somit kann auf der Startseite ein Login, eine News-Feed etc. angezeigt werden. 
Jede dieser Komponenten bringt ihre eigene Logik mit die entweder für sich, mit dem 'Eltern' Element oder global mit beliebig anderen Komponeten Daten austauschen können.

Alle Komponenten bestehen aus drei Teilen, einem *template*, einem *script* und einem *style*. Im Template Part werden Html Elemente eingetragen, der Html Code wird dabei 
mit Vue Elementen versehen um Logik abzubilden. So lassen sich beispielsweise for-Schleifen oder if-Abfagen verwenden um bestimmte Elemente basierend 
auf Variablen die im *script* Teil der Komponente definiert wurden. Sobald sich der Inhalt einer Variable verändert, kümmert Vue sich im Hintergrund darum das Html neu zu rendern. 
Die Seite muss dabei nicht neu geladen werden.

.. figure:: http://i.imgur.com/pHKxeyt.png
   :width: 500px
   
   Ausschnitt einer Vue Datei
 
Router
~~~~~~
 
Eines der vielen Features die Vue mitbringt ist das *routing*, also das weiterleiten des Anwenders durch die Applikation. Die Besonderheit dabei ist, dass beim Aufruf der Webseite nur die index.html gesendet wird, es gibt somit keine Unterseiten die der Webserver verarbeiten könnte.

.. figure:: http://i.imgur.com/H5KLVPZ.png
   :width: 500px
   
   Angeben der Routen für Vue
   
Für das Routing in Vue sind zwei Angaben wichtig, der **Pfad** in Form der URL und die Angabe, welche **Komponente** für diesen Pfad gerendert werden soll.
Wie oben zu sehen, gibt es vier Routen. Jeweils zwei für Lehrkräfte und zwei für Schüler, je nach dem was in der URL steht wird die entsprechend angegebene Komponente
angezeigt. Wichtig ist, zu überprüfen ob ein Benutzer die jeweilige Seite aufrufen darf, oder ob eine Anmeldung erfolgen muss.
 
.. _my-reference-store:

Store
~~~~~

In Vue kann man die weiter oben beschrieben Komponenten in Komponenten laden. So kann die Startseite Text beinhalten und einen Login Button, der Button ist Teil einer
anderen Komponente die den Anmeldevorgang übernimmt. Man hat eine *Parent - Child* Beziehung, dabei ist die Startseite die *Parent* Komponente und der Login Button hat die
Rolle des *Child* Elements. 

Beide können über vorgegebene Wege miteinander kommunizieren, ein Elternelement übergibt *properties* an seine Kinder. Diese 'lauschen' und sobald sich
der Wert dieser Eigenschaft im Elternelement verändert übernehmen alle Kinder die neuen Werte.
Die Child-Elemente können lediglich über *events* Daten an die übergeordnete Komponete senden, das Parent-Element muss dann das Event abfangen und bearbeiten.
Manchmal kann es jedoch nötig sein Werte über mehrere Child-Element zu verteilen, beispielsweise den Benutzerstatus (eingeloggt oder nicht). Man müsste nun
mindestens eine *propertie* an die Kinder-Elemente übergeben die den aktuellen Benutzer enthält, allerdings kann die Startseite den Wert nicht mehr verändern sobald
sich der Benutzer angemeldet hat da eine Weiterleitung auf das Benutzerdashboard erfolgt in dem beispielsweise Fehlzeiten eingetragen werden können.

.. figure:: https://vuejs.org/images/props-events.png
   :width: 500px

   Parent-Child Kommunikation

Um diesem Problem entgegen zu wirken gibt es eine Erweiterung namens Vuex. Diese beinhaltet die **Store** Komponente welche einen globalen Eventbus zur Verfügung stellt auf dem
Events übertragen und verarbeitet werden können. Die direkte Kommunikation fällt in diesem Fall weg, alle Änderungen an Daten werden dem Store Objekt bekannt gemacht und dieser ändert
seine internen Werte. Alle Komponenten können auf diese Veränderung lauschen und innerhalb ihres eigenen Wirkbereiches Abläufe starten.

Als kleines Beispiel dient die Anmeldung an einer Webanwendung, es gibt eine Startseite, einen Login Button und eine Seite die aufgerufen werden soll nachdem sich der Benutzer
erfolgreich angemeldet hat. Klickt der Benutzer auf den Button, startet die 'Login' Komponente eine interne Routine um zu prüfen ob sich der Benutzer anmelden darf oder nicht.
Sollte der Login erfolgreich sein, meldet dies die Button Komponente an den Store und übergibt dabei ein Benutzerobjekt in dem der Name enthalten ist.
Über einen Vue Router erfolgt die Weiterleitung zum Backend. Dort kann das Benutzerobjekt aus dem Vuex Store abgefragt werden und der Name wird auf der Webseite angezeigt.