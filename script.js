const saiCategori = document.getElementById("saiCategori");
const saiTitre = document.getElementById("saiTiter");
const saiDate = document.getElementById("saiDate");
const saiDescription = document.querySelector(".saiDescription");
const saiStatu = document.getElementById("saiStatu");
const listeAjout = document.querySelector(".listeAjout");
const ajouter = document.getElementById("ajouter");
const descruptionRecuper = document.getElementById("descruptionRecuper");
const dan = document.querySelector(".essa");

// Utilisez un tableau vide pour initialiser dataTache
let dataTache = [];

// Vérification de la présence des données dans le stockage local
if (!localStorage.getItem("key")) {
  localStorage.setItem("key", JSON.stringify(dataTache));
}

// Récupérez le tableau depuis le stockage local
dataTache = JSON.parse(localStorage.getItem("key"));

function ajouterTache() {
  if (
    saiCategori.value === "" ||
    saiTitre.value === "" ||
    saiDate.value === "" ||
    saiDescription.value === "" ||
    saiStatu.value === ""
  ) {
    notification.classList.remove("notification");
    notification.classList.add("notificationn");
    textModifie.textContent = "Erreur! Veuillez remplir les champs";
    setTimeout(() => {
      notification.classList.add("notification");
      notification.classList.remove("notificationn");
    }, 2000);
  }else{
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
      statut: statutValue,
    });
  
    // Sauvegardez le tableau mis à jour dans le localStorage
    localStorage.setItem("key", JSON.stringify(dataTache));
  
    // Réinitialisez les champs de saisie
    saiCategori.value = "";
    saiTitre.value = "";
    saiDate.value = "";
    saiDescription.value = "";
    saiStatu.value = "";
  
    notification.classList.remove("notification");
    notification.classList.add("notificationn");
    textModifie.textContent = "La tache ete ajouter avec succes";
    setTimeout(() => {
      notification.classList.add("notification");
      notification.classList.remove("notificationn");
    }, 2000);  
  }
  // Affichez les tâches
  afficherTaches(dataTache);
}

function afficherTaches(tache) {
  descruptionRecuper.textContent = "";
  listeAjout.innerHTML = ""; // Effacez le contenu actuel
  tache.forEach((element, index) => {
    const divAfficheTache = document.createElement("div");
    divAfficheTache.classList.add("titleAjout");
    divAfficheTache.innerHTML = `
        <span class="idenfiant">${index + 1}</span>
        <span>${element.date}</span>
        <span>${element.titre}</span>
        <span>${element.categorie}</span>
        <span class="flexDis">
          <button
            id="btnVusial${index}"
            style="background-color: rgb(46, 107, 137)"
          >
            <i class="fa-solid fa-eye"></i>
          </button>
          <button id="btnModifier${index}" style="background-color: aqua">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button id="btnSupprimer${index}" style="background-color: red">
            <i class="fa-solid fa-trash"></i>
          </button>
        </span>
        `;
    listeAjout.appendChild(divAfficheTache);
    // descruptionRecuper.textContent = element.description;
    //Pour recupere la description 
    const titleAjout = document.querySelector(".listeAjout");
    const idenfiant = document.querySelectorAll('.idenfiant');
    idenfiant.forEach(element => {
      if (element.textContent % 2 === 0) {
        element.parentElement.style.backgroundColor = '#b7c1c1';
      } 
    });
    console.log(idenfiant);
    //
    titleAjout.addEventListener("click", (event) => {
      event.preventDefault();
      descruptionRecuper.textContent = element.description;
      console.log("sdfghj");
    });

    // ------------------------------------------------------------
    const btnModifier = document.getElementById(`btnModifier${index}`);
    btnModifier.addEventListener("click", () => {
      // Récupérez la tâche à modifier en utilisant l'index
      const tacheAModifier = dataTache[index];

      // Remplissez les champs de saisie avec les données actuelles de la tâche
      saiCategori.value = tacheAModifier.categorie;
      saiTitre.value = tacheAModifier.titre;
      saiDate.value = tacheAModifier.date;
      saiDescription.value = tacheAModifier.description;
      saiStatu.value = tacheAModifier.statut;

      // Supprimez la tâche du tableau dataTache
      dataTache.splice(index, 1);

      // Mettez à jour le localStorage avec le tableau modifié
      localStorage.setItem("key", JSON.stringify(dataTache));

      // Affichez à nouveau la liste de tâches mise à jour
      afficherTaches(dataTache);
      affichgraph();
      chart();
    });

    const btnSupprimer = document.getElementById(`btnSupprimer${index}`);
    btnSupprimer.addEventListener("click", () => {
      // Supprimez la tâche du tableau dataTache en utilisant l'index
      dataTache.splice(index, 1);

      // Mettez à jour le localStorage avec le tableau modifié
      localStorage.setItem("key", JSON.stringify(dataTache));

      // Affichez à nouveau la liste de tâches mise à jour
      afficherTaches(dataTache);
      affichgraph();
      chart();
    });
    //-------------------------------------------------------
    const btnVusial = document.getElementById(`btnVusial${index}`);
    console.log("====================================");
    console.log(btnVusial);
    console.log("====================================");
    btnVusial.addEventListener("click", (e) => {
      if (e.target) {
        esaai.style.display = "block";
        let fermer = document.querySelector(".fermer");
        fermer.style.display = "block";
      }
    });
    /* */
    /* */
    const esaai = document.createElement("div");
    esaai.classList.add("divVisible");
    esaai.innerHTML = `
        <h3 class="pm"> informations tâche</h3>
        <div class="contenu">
          <div class="contenuTitre">
            <span >Date </span>
            <span >Titre </span>
            <span >Catégorie </span>
            <span >Description </span>
            <span >Statut </span>
          </div>
          <div class="contenuLibele">
          <span>${element.date}</span>
          <span>${element.titre}</span>
          <span>${element.categorie}</span>
            <span> ${element.description} </span>
            <span> ${element.statut} </span>
          </div>
        </div>
    `;
    dan.appendChild(esaai);
  });
}

// Écoutez le clic sur le bouton "ajouter" et appelez la fonction ajouterTache
//ajouter.addEventListener("click", ajouterTache);
ajouter.addEventListener("click", (event) => {
  event.preventDefault();
  //message();
  ajouterTache();
  //condition();
  //location.reload();
});

// Au chargement de la page, affichez les tâches depuis le localStorage
afficherTaches(dataTache);

let terminer = 0;
let niveau = 0;
let encour = 0;

affichgraph();
let myChart;
function chart() {
  const ctx = document.getElementById("myChart");
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["terminer", "nouveau", "encours"],
      datasets: [
        {
          data: [terminer, nouveau, encour],
          backgroundColor: ["gray", "blue", "green"],
          borderWidth: 1,
        },
      ],
    },
  });
}
chart();

function affichgraph() {
  terminer = 0;
  nouveau = 0;
  encour = 0;
  dataTache.forEach((element) => {
    if (element.statut === "Terminé") {
      terminer++;
    } else if (element.statut === "Nouveau") {
      nouveau++;
    } else if (element.statut === "En cours") {
      encour++;
    }
  });
}

const notification = document.querySelector(".notification");
const textModifie = document.getElementById("textModifie");
textModifie.textContent = "";
/* function message() {
  if (
    saiCategori.value === "" ||
    saiTitre.value === "" ||
    saiDate.value === "" ||
    saiDescription.value === "" ||
    saiStatu.value === ""
  ) {
    notification.classList.remove("notification");
    notification.classList.add("notificationn");
    textModifie.textContent = "Erreur! Veuillez remplir les champs";
    setTimeout(() => {
      notification.classList.add("notification");
      notification.classList.remove("notificationn");
    }, 2000);
  }
} 
const messageee = document.querySelector('.message');
const info = document.getElementById('info');
function condition() {
  if (saiCategori.value === '' ||
  saiTitre.value === '' ||
  saiDate.value === '' ||
  saiStatu.value === '' ||
  saiDescription.value === ''
  ) {
    info.textContent = 'Veuillez remplir tout les champ';
    messageee.style.display = 'block';
    setTimeout(() => {
      messageee.style.display = 'none'
    }, 1000);
  }
/* saiCategori.value
saiTitre.value
saiDate.value
saiStatu.value
saiDescription.value 
}*/