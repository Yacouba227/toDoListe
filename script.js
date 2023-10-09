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

function afficherTaches(taches) {
    listeAjout.innerHTML = ''; // Effacez le contenu actuel
  console.log('====================================');
  console.log(taches);
  console.log('====================================');
    taches.forEach((element, index) => {
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
    });
}

// Écoutez le clic sur le bouton "ajouter" et appelez la fonction ajouterTache
ajouter.addEventListener("click", ajouterTache);

// Au chargement de la page, affichez les tâches depuis le localStorage
afficherTaches(dataTache);
