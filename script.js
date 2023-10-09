const saiCategori = document.getElementById('saiCategori');
const saiTitre = document.getElementById('saiTiter');
const saiDate = document.getElementById('saiDate');
const saiDescription = document.querySelector('.saiDescription');
const saiStatu = document.getElementById('saiStatu');
const listeAjout = document.querySelector('.listeAjout');
const ajouter = document.getElementById('ajouter');
const descruptionRecuper = document.getElementById('descruptionRecuper');

// Utilisez un tableau vide pour initialiser dataTache
let dataTache = [];

// Vérification de la présence des données dans le stockage local
if (!localStorage.getItem("key")) {
    localStorage.setItem("key", JSON.stringify(dataTache));
}

// Récupérez le tableau depuis le stockage local
dataTache = JSON.parse(localStorage.getItem("key"));

function ajouterTache() {
    const categorieValue = saiCategori.value;
    const titreValue = saiTitre.value;
    const dateValue = saiDate.value;
    const descriptionValue = saiDescription.value;
    const statutValue = saiStatu.value;

    // Ajoutez la nouvelle tâche au tableau dataTache
    dataTache.push({
        categorie: categorieValue,
        titre: titreValue,
        date: dateValue,
        description: descriptionValue,
        statut: statutValue
    });

    // Sauvegardez le tableau mis à jour dans le localStorage
    localStorage.setItem("key", JSON.stringify(dataTache));

    // Réinitialisez les champs de saisie
    saiCategori.value = '';
    saiTitre.value = '';
    saiDate.value = '';
    saiDescription.value = '';
    saiStatu.value = '';

    // Affichez les tâches
    afficherTaches(dataTache);
}

function afficherTaches(tache) {
  descruptionRecuper.textContent = '';
    listeAjout.innerHTML = ''; // Effacez le contenu actuel
    tache.forEach((element, index) => {
        const divAfficheTache = document.createElement('div');
        divAfficheTache.classList.add('titleAjout');
        divAfficheTache.innerHTML = `
        <span>${index + 1}</span>
        <span>${element.date}</span>
        <span>${element.titre}</span>
        <span>${element.categorie}</span>
        <span>
          <button
            id="btnVusial"
            style="background-color: rgb(46, 107, 137)"
          >
            <i class="fa-solid fa-eye"></i>
          </button>
          <button id="btnModifier" style="background-color: aqua">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button id="btnSupprimer" style="background-color: red">
            <i class="fa-solid fa-trash"></i>
          </button>
        </span>
        `;
        listeAjout.appendChild(divAfficheTache);
        descruptionRecuper.textContent = element.description;
    });
}

// Écoutez le clic sur le bouton "ajouter" et appelez la fonction ajouterTache
//ajouter.addEventListener("click", ajouterTache);
ajouter.addEventListener("click", (event) => {
  event.preventDefault();
  message();
  ajouterTache();
  location.reload();
});

// Au chargement de la page, affichez les tâches depuis le localStorage
afficherTaches(dataTache);


let terminer = 0;
let niveau = 0;
let encour = 0;

affichgraph()
 let myChart;
function chart() {
const ctx = document.getElementById('myChart');
if(myChart){
    myChart.destroy()
}
 myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['terminer', 'nouveau', 'encours'],
      datasets: [{
        data: [terminer, nouveau, encour],
        backgroundColor:['gray', 'blue', 'green'],
        borderWidth: 1
      }]
    },
    
  });
  
}
chart()

function affichgraph() {
    terminer = 0
    nouveau = 0
    encour = 0
    dataTache.forEach(element => {
        if (element.statut==="Terminé") {
            terminer++ ;
        }else  if (element.statut==="Nouveau") {
            nouveau++;
        } else  if (element.statut==="En cours") {
            encour ++;
        }
    });
} 


const notification = document.querySelector('.notification');
const textModifie = document.getElementById('textModifie');
textModifie.textContent = '';
function message(){
  if (saiCategori.value === "" ||
  saiTitre.value === "" ||
  saiDate.value === "" ||
  saiDescription.value === "" ||
  saiStatu.value === "" 
  ) {
    notification.classList.remove("notification");
    notification.classList.add("notificationn");
    textModifie.textContent = 'Erreur! Veuillez remplir les champs';
    setTimeout(() => {
      notification.classList.add("notification");
    notification.classList.remove("notificationn");
    }, 2000);
  }
}