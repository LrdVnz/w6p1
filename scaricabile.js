/*
PARTE 1: 
Oggi analizzeremo un problema molto comune: realizzare algoritmi di ricerca.
Il tuo compito è creare una funzione che cercherà per posizione lavorativa E posizione geografica. Questi due valori verranno passati come parametri
Ti abbiamo fornito un array chiamato "jobs" in fondo al file, NON modificarlo in alcun modo.
L'algoritmo che devi realizzare cercherà SIA per posizione lavorativa che per posizione geografica.
Prendi queste tre inserzioni ad esempio:

      job1:  location: "NY, US",     title: "java dev"
      job2:  location: "Genoa, IT"   title: "web dev"
      job3:  location: "US"      title: "dev"

Cercando contemporaneamente come posizione lavorativa "dev" e posizione geografica "US", dovresti ottenere come risultato solamente job1 e job3,
in quanto job2 non soddisfa la condizione posta sulla posizione geografica.

REQUISITI:
- il tuo algoritmo deve tornare i risultati nella seguente forma:
{
  result: [], <-- inserisci qui le inserzioni che rispecchiano la posizione lavorativa e la posizione geografica richiesta
  count: 0 <-- inserisci qui il numero totale delle inserzioni trovate
}

- da ogni inserzione trovata, elimina i campi "description", "requirements", "benefits" e "company_profile" per semplificare il risultato

- la tua ricerca deve essere "case insensitive" (non deve essere influenzata da lettere maiuscole o minuscole nelle parole cercate). Questo e' possibile trasformando tutto in lettere minuscole con .toLowerCase()


PARTE 2: 
Nella pagina HTML, inserisci 2 input di tipo testo (uno per la location e uno per il titolo lavorativo, ricordati di diversificarli con un id) e un bottone con valore “cerca”

Al click del bottone, il codice deve raccogliere i valori dei due input e darli in pasto alla funzione che hai creato nella parte 1. 

Dopo aver raccolto ed elaborato i dati, e’ il momento di mostrare i risultati sulla pagina: 
    Puoi scegliere tu se utilizzare un semplice ul / li oppure una tabella 
    Vai passo per passo e usa molti console.log per capire eventualmente dove sbagli
    SUGGERIMENTO: ti servira’ un ciclo for!

*/
//dwdw//

// NON MODIFICARE QUESTO ARRAY!
const jobs = [
  { title: "Marketing Intern", location: "US, NY, New York" },
  {
    title: "Customer Service - Cloud Video Production",
    location: "NZ, Auckland",
  },
  {
    title: "Commissioning Machinery Assistant (CMA)",
    location: "US, IA, Wever",
  },
  {
    title: "Account Executive - Washington DC",
    location: "US, DC, Washington",
  },
  { title: "Bill Review Manager", location: "US, FL, Fort Worth" },
  { title: "Accounting Clerk", location: "US, MD," },
  { title: "Head of Content (m/f)", location: "DE, BE, Berlin" },
  {
    title: "Lead Guest Service Specialist",
    location: "US, CA, San Francisco",
  },
  { title: "HP BSM SME", location: "US, FL, Pensacola" },
  {
    title: "Customer Service Associate - Part Time",
    location: "US, AZ, Phoenix",
  },
  {
    title: "ASP.net Developer Job opportunity at United States,New Jersey",
    location: "US, NJ, Jersey City",
  },
  {
    title: "Talent Sourcer (6 months fixed-term contract)",
    location: "GB, LND, London",
  },
  {
    title: "Applications Developer, Digital",
    location: "US, CT, Stamford",
  },
  { title: "Installers", location: "US, FL, Orlando" },
  { title: "Account Executive - Sydney", location: "AU, NSW, Sydney" },
  {
    title: "VP of Sales - Vault Dragon",
    location: "SG, 01, Singapore",
  },
  { title: "Hands-On QA Leader", location: "IL, Tel Aviv, Israel" },
  {
    title: "Southend-on-Sea Traineeships Under NAS 16-18 Year Olds Only",
    location: "GB, SOS, Southend-on-Sea",
  },
  { title: "Visual Designer", location: "US, NY, New York" },
  {
    title: "Process Controls Engineer - DCS PLC MS Office - PA",
    location: "US, PA, USA Northeast",
  },
  { title: "Marketing Assistant", location: "US, TX, Austin" },
  { title: "Front End Developer", location: "NZ, N, Auckland" },
  { title: "Engagement Manager", location: "AE," },
  {
    title: "Vice President, Sales and Sponsorship (Businessfriend.com)",
    location: "US, CA, Carlsbad",
  },
  { title: "Customer Service", location: "GB, LND, London" },
  { title: "H1B SPONSOR FOR L1/L2/OPT", location: "US, NY, New York" },
  { title: "Marketing Exec", location: "SG," },
  {
    title: "HAAD/DHA Licensed Doctors Opening in UAE",
    location: "AE, AZ, Abudhabi",
  },
  {
    title: "Talent Management Process Manager",
    location: "US, MO, St. Louis",
  },
  { title: "Customer Service Associate", location: "CA, ON, Toronto" },
  {
    title: "Customer Service Technical Specialist",
    location: "US, MA, Waltham",
  },
  { title: "Software Applications Specialist", location: "US, KS," },
  { title: "Craftsman Associate", location: "US, WA, Everett" },
  { title: "Completion Engineer", location: "US, CA, San Ramon" },
  { title: "I Want To Work At Karmarama", location: "GB, LND," },
  {
    title: "English Teacher Abroad",
    location: "US, NY, Saint Bonaventure",
  },
]; 

/* let givenTitle = document.getElementById("work-title");
givenTitle = givenTitle.value ; 
let givenLocation = document.getElementById("work-location");
givenLocation = givenLocation.value;  */

let userTitle; 
let userLocation; 
// aggiungo il listener al tasto invia. 

  let submitButton = document.getElementById("submit-query");
  submitButton.addEventListener("click", function(){
    // prendo il valore che l'utente ha inserito, per il titolo e la località
     userTitle = document.getElementById("work-title");
     userLocation = document.getElementById("work-location");
     userTitle = userTitle.value; 
     userLocation = userLocation.value; 
     // richiamo le funzioni per : eseguire la ricerca, eliminare eventuali risultati di una ricerca precedente, mostrare i risultati correnti. 
     searchJob(userTitle, userLocation);
     mainListContainer.textContent = ''
     showResults();
  });

  // l'elemento che contiene il risultato. 
let output = {
  result: [],
  count: 0, 
}

function searchJob(givenTitle, givenLocation) {
output.result = [];
output.count = 0; 

for(let i = 0; i < jobs.length; i++){

     convertedTitle = jobs[i].title.toLowerCase();
     convertedLocation = jobs[i].location.toLowerCase();

     if (convertedTitle.includes(givenTitle.toLowerCase()) && convertedLocation.includes(givenLocation.toLowerCase()) ){
        output.result.push(jobs[i]); 
        output.count+= 1; 
      }   
  }
}


/// Creare dei li che abbiano come contenuto due sottosezioni, job description e job location. 
/// crea tramite un loop per prendere tutti quelli da result 
/// crea poi un loop di appendchild per appenderli all'ul 


let mainListContainer = document.querySelector(".result-table");

function showResults() {
  // dopo aver salvato i risultati della ricerca nel mio oggetto output, creo per ogni risultato un elemento li
  // che illustra titolo e posizione. 

  for(let i = 0; i < output.result.length; i++){
    // crea tutti e tre gli elementi. Il container "li" madre e i due div.
    let liContainer = document.createElement("li");
    let liTitle = document.createElement("div");
    let liLocation = document.createElement("div");
    // modifica il contenuto con il risultato della ricerca.
    liTitle.innerText = output.result[i].title; 
    liLocation.innerText = output.result[i].location; 
    //aggiungi i sottodiv al li madre. 
    liContainer.appendChild(liTitle);
    liContainer.appendChild(liLocation);+
    //aggiungi il li madre al ul. 
    mainListContainer.appendChild(liContainer);
  }
}

