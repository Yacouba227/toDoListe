// Define variables for HTML elements
const saiCategori = document.getElementById('saiCategori');
const saiTiter = document.getElementById('saiTiter');
const saiDate = document.getElementById('saiDate');
const saiDescription = document.querySelector('.saiDescription');
const saiStatu = document.getElementById('saiStatu');
const listeAjout = document.querySelector('.listeAjout');
const descruptionRecuper = document.getElementById('descruptionRecuper');
const notification = document.querySelector('.notification');

// Initialize localStorage if 'cles' doesn't exist
if (!localStorage.getItem('cles')) {
    localStorage.setItem('cles', JSON.stringify([]));
}

// Initialize variables
let tach = JSON.parse(localStorage.getItem('cles'));
let tache = {
    index: 0,
    date: '',
    titre: '',
    categorie: '',
    description: '',
    statut: '',
};
let terminer = 0;
let nouveau = 0;
let encours = 0;
let indd = 0;

// Function to insert tache items into the list
const insertline = () => {
    listeAjout.innerHTML = '';
    tach.forEach(element => {
        listeAjout.innerHTML += `
        <div class="titleAjout">
            <span>${element.index}</span>
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
        </div>
        `;
    });

    // Show descriptions of each tâche on click
    let titleAjout = document.querySelectorAll('.titleAjout');
    titleAjout.forEach(element => {
        element.addEventListener('click', () => {
            let ind = element.querySelector('span').textContent;
            let desc = tach.find((id) => id.index == ind);
            descruptionRecuper.textContent = desc.description;
        });
    });

    // Button views
    let btnVusial = document.querySelectorAll('#btnVusial');
    btnVusial.forEach(button => {
        let tac = JSON.parse(localStorage.getItem('cles'));
        button.addEventListener('click', (e) => {
            let indd = e.target.parentElement.parentElement.parentElement.querySelector('span').textContent;
            let tab = tac.find((idd) => idd.index == indd);
            infotache.style.visibility = 'visible';
            infotache.innerHTML = `<h3 class="w-100"> informations tâche</h3>
                                   <div class="d-flex mx-4 my-2">
                                        <div class="d-flex flex-column align-items-start me-2">
                                             <span class="inf">Date </span>
                                             <span class="inf">Titre </span>
                                             <span class="inf">Catégorie </span> 
                                             <span class="inf">Description </span> 
                                             <span class="inf">Statut </span> 
                                        </div>
                                        <div class="d-flex flex-column align-items-start">
                                             <span> : ${tab.date} </span>
                                             <span>: ${tab.titre} </span>
                                             <span>: ${tab.categorie} </span>
                                             <span>: ${tab.description} </span>
                                             <span>: ${tab.statut} </span>
                                        </div>
                                   </div>`;
            let sortie = document.querySelector('.sortie');
            sortie.style.display = 'block';

        });
    });

    // Button supprimer
    let btnSupprimer = document.querySelectorAll('#btnSupprimer');
    btnSupprimer.forEach(button => {
        let tac = JSON.parse(localStorage.getItem('cles'));
        button.addEventListener('click', (e) => {
            let indd = e.target.parentElement.parentElement.parentElement.querySelector('span').textContent;
            let tab = tac.filter((idd) => idd.index != indd);
            tac = tab;
            localStorage.setItem('cles', JSON.stringify(tac));
            insertline();
            affichgraph();
            chart();
        });
    });

    // Button editer
    let btnModifier = document.querySelectorAll('#btnModifier');
    btnModifier.forEach(button => {
        let tac = JSON.parse(localStorage.getItem('cles'));
        button.addEventListener('click', (e) => {
            indd = e.target.parentElement.parentElement.parentElement.querySelector('span').textContent;
            let asup = e.target.parentElement.parentElement.parentElement;
            asup.remove();
            let tab = tac.find((idd) => idd.index == indd);
            saiDate.value = tab.date;
            saiTiter.value = tab.titre;
            saiCategori.value = tab.categorie;
            saiDescription.value = tab.description;
            saiStatu.value = tab.statut;
        });
    });
}

// Initial insertion
insertline();

// Function to calculate tache statistics
function affichgraph() {
    terminer = 0;
    nouveau = 0;
    encours = 0;
    tach.forEach(element => {
        if (element.statut === "Terminé") {
            terminer++;
        } else if (element.statut === "Nouveau") {
            nouveau++;
        } else if (element.statut === "En cours") {
            encours++;
        }
    });
}

// Button ajouter event listener
const ajouter = document.getElementById('ajouter');
ajouter.addEventListener('click', () => {
    let tac = JSON.parse(localStorage.getItem('cles'));
    const findEl = tac.find((el) => el.index == parseInt(indd));
    if (findEl) {
        tache = {
            index: indd,
            date: saiDate.value,
            titre: saiTiter.value,
            categorie: saiCategori.value,
            description: saiDescription.value,
            statut: saiStatu.value,
        };
        const indexToUpdate = tac.findIndex((el) => el.index == parseInt(indd));
        tac[indexToUpdate] = tache;
        localStorage.setItem('cles', JSON.stringify(tac));

        if (saiStatu.value !== '') {
            affichgraph();
            clearInputFields();
            insertline();
            showNotification();
            chart();
            indd = 0;
        }
        return;
    }

    tache = {
        index: tach.length ? tach.length + 1 : 1,
        date: saiDate.value,
        titre: saiTiter.value,
        categorie: saiCategori.value,
        description: saiDescription.value,
        statut: saiStatu.value,
    };

    tach.push(tache);
    updateTach();
    if (saiStatu.value !== '') {
        affichgraph();
    }

    clearInputFields();
    insertline();
    showNotification();
    chart();
});

// Function to clear input fields
function clearInputFields() {
    saiDate.value = "";
    saiTiter.value = "";
    saiCategori.value = "";
    saiDescription.value = "";
    saiStatu.value = "";
}

// Function to display notification
function showNotification() {
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// ================= Chart.js =======================
affichgraph();
let myChart;
const ctx = document.getElementById('myChart').getContext('2d');
document.addEventListener("DOMContentLoaded", function () {
    // Chart initialization code here
    chart();
});

// Function to create and update the chart
function chart() {
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Terminer', 'Nouveau', 'En cours'],
            datasets: [{
                data: [terminer, nouveau, encours],
                backgroundColor: ['gray', 'blue', 'green'],
                borderWidth: 1,
            }],
        },
    });
}
// ===================================================

// Function to update localStorage
function updateTach() {
    localStorage.setItem('cles', JSON.stringify(tach));
}
