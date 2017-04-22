******
Aufbau
******

In den anderen Abschnitten wurden die Tools und Frameworks vorgestellt die verwendet wurden um die Webanwendung zu erstellen.
Dieser Teil beschreibt nun den Aufbau der Anwendung, von der Struktur des Quellcodes bis zum deployment.

Initialisierung
###############

Die Anwendung nutzt den Firebase Dienst von Google um Daten zu speichern, Benutzer zu authentifizieren, zum Hosting und könnte zu einem späteren Zeitpunkt an die
Analytics Schnittstelle angebunden werden um detaillierte Nutzungsinformationen zu sammeln.

Firebase
--------

Firebase wird über NPM in das Projekt eingebunden, auf der *main.js* wird ein Objekt initialisiert welches die Verbindung zur Firebase API aufbaut und die Anwendung dort
authentifiziert um Zugriff auf die anderen Dienste zu erhalten. Jedes Projekt hat eine eigene Konfiguration welche eingebunden werden muss. Diese Einstellungen sollen nicht
im Repository sichtbar sein, sondern über andere Wege der Anwendung zugeführt werden.

.. figure:: http://imgur.com/T185IQj.png
   :width:100px
   :height:100px

   [1] Firebase initialisierung

Vue Komponenten
---------------

Neben Firebase werden noch der Vue Router, Vue Bootstrap und Vuex benötigt. Der Router stellt dabei die Anwendungsinterne Weiterleitung zur Verfügung, das Bootstrap Modul ermöglicht
die Verwendung der Bootstrap Klassen in den *template* Abschnitten und über Vuex wird der globale Store bereitgestellt. Im Anschluss daran werden die Module konfiguriert.

Ein Beispiel für die Konfiguration des Router Objekts

.. code:: javascript

  const routes = [
    { path: '/', component: Welcome },
    { path: '/registration-student', component: RegistrationStudent },
    { path: '/registration-teacher', component: RegistrationTeacher },
    { path: '/dashboard-student', component: DashboardStudent },
    { path: '/dashboard-teacher', component: DashboardTeacher },
    { path: '/app', component: App },
   ]
   const router = new VueRouter({
    routes,
   })

Wesentlich komplexer gestaltet sich die Konfiguration des Vuex :ref:`my-reference-store`. Dieser bildet die zentrale Verwaltung der Variablen die in den einzelnen Komponeten verwendet werden.
Außerdem bildet er die Schnittstelle zwischen der Anwendung und dem Aufruf von Firebase um beispielsweise Daten in die Datenbank zu schreiben. Die Tatsache, dass alle Komponenten
auf Änderungen von Werten im Store reagieren können, war es möglich die Echtzeitdatenbank von Firebase voll zu nutzen und Daten in Echtzeit auf allen Geräten zu aktualisieren.

.. figure:: http://imgur.com/48luyWm.png
   :width: 300px
   :height: 300px

   [2] Beispielhafte Funktion des Stores

Zwar besitzt der Store, wie oben zu sehen, *setter* Methoden allerdings keine *getter* da alle internen Werte public sind.

Nach der Konfiguration aller Komponenten wird ein Vue Objekt erzeugt, diesem werden alle erstellen Komponenten zugewiesen.
Im Anschluss daran wird ein Observer von Firebase genutzt um auf Änderungen des Login Statuses des Benutzer zu reagieren.

Vue startet
###########

Ist die Initialisierung abgeschlossen wird Vue über ein Html Element eingebunden welches ein ID Attribut gleich dem Wert des *el* Attributs im Vue Objekt besitzt.
Sollte kein solches Element gefunden werden erhält man eine entsprechende Fehlermeldung. Bis zu diesem Schritt wurde noch keine *.vue* - Datei geladen, die
Einbindung erfolgt in einer normalen Html Datei.
Somit ist es möglich die Anwendung an einer bestimmten Stelle in einem bereits bestehenden Webauftritt ein zu bauen.

.. code:: html

   <body>
       <div id="app">
           <router-view></router-view>
       </div>
       <!-- built files will be auto injected -->
   </body>

Die Anwendung wird innerhalb des *div* Elements gerendert, dabei spielt der *router-view* Tag eine entscheidende Rolle. Dieser sorgt dafür, dass die Komponente gerendert wird
die zur URL aus dem Vue Router Objekt passt.

.. figure:: http://imgur.com/fuUuNAj.png
   :width: 300px

   [3] Starten von Vue und Rendern der Komponente

Eine Komponente im Detail
#########################

Virtuelles DOM
--------------

Wurde Vue fehlerfrei initialisiert und für die aktuelle URL gibt es eine Komponente im Vue Router, wird diese geladen. Dazu erstellt Vue zunächst einen virtuellen DOM (Document Object Model)
Vue arbeitet somit nicht direkt im Html und wählt Elemente beispielsweise über einen Klassen oder ID Selektor aus, sondern erstellt intern alle nötigen Elemente und bearbeitet sie
auch intern. Erst wenn dieser Schritt fertig ist kümmert sich Vue um das Rendering.

Diese Vorgehensweise bietet einen enormen Leistungsvorteil. Um auf einer großen Seite alle Elemente mit einer bestimmten Klasse zu verändern müsste über das gesamte DOM interriert werden
und alle vorkommen würden einzeln bearbeitet werden. Dieser Vorgang müsste für jede Änderung der Elemente wiederholt werden. Selbst wenn die ID eines Elements verwendet werden kann,
wird dieses am Ende der Webseite angezeigt, muss jedes vorhergehende Element überprüft werden. Dank seines virtuellen DOMs kann Vue die Daten intern besser strukturieren und somit den Aufwand wesentlich verkleinern.

Struktur
--------

Template
^^^^^^^^

Wie unter :ref:`my-reference-components` beschrieben besteht eine Komponente aus drei Abschnitten, dem *template*, dem *script* und dem *style*.
Im **template** werden neben normalen Html Elements spezielle Vue Anweisungen verwendet um Variablen anzuzeigen oder Schleifen zu durchlaufen.
Anhand des Logins kann ein Teil der Funktionsweise einfach erklärt werden. Zunächst der Template Teil der *Welcome* Komponente. Diese wird, per Definition im Vue Router
als Standardseite geladen.

.. code:: html

   <template>
        <div class="wrapper container">
           <h1>Welcome to the application</h1>
           <h2>Anmelden als Schüler</h2>
           <login :loginType='"student"'></login>
           <hr>
           <h2>Anmelden als Lehrkraft</h2>
           <login :loginType='"teacher"'></login>
       </div>
   </template>

Zu sehen sind neben normalen Html Tags zwei *login* tags, spezielle vom Entwickler angelegte Tags die eine weitere Komponente einbinden. Wir errinern uns: Eine Komponente kann
Unterkomponenten haben die wiederung Unterkomponenten einbinden können. Innerhalb des login Tags erfolgt ein *data-binding*, der Variable *loginType* wird einmal der String
*student* oder *teacher* übergeben. In beiden Fällen wird die Variable an die Login-Komponente weitergegben.

.. figure:: http://imgur.com/f1m6Wg9.png
    :width: 500px

    [4] Databinding

Script
^^^^^^

Nun ist die Variable 'loginType' zwar in der *welcome.vue* definiert, allerdings kann die eingebundene *Login.vue* noch nichts mit diesem Wert anfangen. Ein so übergebener Wert
muss erst in der Komponente bekannt gemacht werden.

.. code:: javascript

    export default {
        data(){
            return {

            }
        },
        props: [
            'loginType'
        ],
        methods: {
            login: function(providerName){
                var loginInfos = {
                    'providerName': providerName,
                    'loginType': this.loginType
                }
                this.$store.commit('loginUser',loginInfos)
            },
        }
    }

Im *script* Bereich einer Komponente werden Methoden definiert damit die Komponente Ihre zugedachte Aufgabe erfüllen kann. Ein Skript Bereich besteht aus mehreren Unterfunktionen.
Der wichtigste Bereich der immer angegeben werden muss ist der *data()* Bereich, bzw. Die *data()* Methode. Um ein *binding* vorzunehmen muss die Variable des Eltern-Elements unter
gleichem Namen im *props* Array angegeben werden. Innerhalb des *methods* Objekts werden alle Methoden aufgefürt die innerhalb der Komponente zur Verfügung stehen sollen. In diesem
Fall gibt es eine Methode namens 'login'. Diese wirde über ein Klick Event aufgerufen welches an einen Button angefügt wurde. 

An dieser Stelle wird zum ersten mal der Vuex Store
aufgerufen, dem Aufruf werden Informationen zum Provider und der Art des Logins übergeben. In diesem Fall wird der Wert aus dem Eltern-Element übergeben.

.. figure:: http://imgur.com/MDndnbZ.png
   :width: 1000px

   [5] Benutzer meldet sich an

Datenübergabe
^^^^^^^^^^^^^
In der *main.js* wurde zu Beginn ein Firebase Observer angelegt welcher den aktuellen Anmeldestatus eines Benutzers überprüft, ändert sich dieser bsp. von ``null`` zu einem Benutzer
Objekt werden die angegebenen Methoden aufgerufen, in diesem Fall wird bei einem gültigen Benutzer der ``loginType`` angefragt und basierend auf dem Ergebnis wird ein Eintrag in der
Datenbank geprüft, ob der Benutzer bereits registriert ist oder nicht. Sollte der Benutzer die Registrierung bereits abgeschlossen haben, wird er auf sein Schüler/Lehrer Dashboard
weitergeleitet. Sollte er die Registreirung nicht abgeschlossen haben lädt zunächst ein Formular in dem Angaben zur Person gemacht werden müssen. Im Anschluss kann der Benutzer sein
Dashboard aufrufen.

.. figure:: http://imgur.com/V4azryy.png

    [6] Registrierung

Daten verändern
###############

