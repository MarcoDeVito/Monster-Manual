console.log(`pagina ricaricata`);
let monsterManual = {};
// let btn1 = document.querySelector("#btn1")
let clear = document.querySelector("#clear")
let search = document.querySelector("#search")
let wrapper = document.querySelector("#wrapper")
let notFound = false;
let numID = 0;
let start = document.querySelector('#start');
let include = document.querySelector('#include');
let perfect = document.querySelector('#perfect');
let masterless = document.querySelector('#masterless');
let research;
let lettera = []
let masterlessSave = localStorage.getItem('Masterless');
    if (masterlessSave == 'true') {
        masterless.checked=true
    }
    else{
        masterless.checked=false
    }





let requestURL = 'Monster-Manual-ord.JSON';


fetch(requestURL).then((response) => response.json()).then((data) => {
    // let masterlessSave = localStorage.getItem('Masterless');
    // if (masterlessSave == 'true') {
    //     masterless.checked=true
    // }
    // else{
    //     masterless.checked=false
    // }
    console.log(data);
    monsterManual = data;
    console.log(monsterManual.monsters[210]);



    // btn1.addEventListener('click', () => {
    //     if (search.value != 0) {
    //         findMoster(search.value);
    //         search.value = "";
    //     }

    // })

    search.addEventListener("input", () => {

        if (search.value != 0) {
            findMoster(search.value);
            // search.value = "";
        }

    });

    clear.addEventListener('click', () => {
        wrapper.innerHTML = "";
        search.value = "";
        lettera = []
        console.log(start.checked);
        console.log(include.checked);
        console.log(perfect.checked);



    })

    let radios = document.querySelectorAll(".form-check-input")


    radios.forEach(button => {
        button.addEventListener("click", () => {
            if (search.value) {
                
                findMoster(search.value);

            }
        });

    })

});

function rollDice(rolls = 1, die = 6) {
    console.log("inizio calcolo");
    let diceSum = 0;
    for (let i = 0; i < rolls; i++) {
        let resDice = Math.floor(Math.random() * (die) + 1);
        console.log(resDice);
        diceSum += resDice;
    }
    return diceSum
}

function calculatePE(sfidaString) {
    let pe;
    switch (sfidaString) {
        case "0":
            pe = "0 o 10";
            break;
        case "1/8":
            pe = "25";
            break;
        case "1/4":
            pe = "50";
            break;
        case "1/2":
            pe = "100";
            break;
        case "1":
            pe = "200";
            break;
        case "2":
            pe = "450";
            break;
        case "3":
            pe = "700";
            break;
        case "4":
            pe = "1.100";
            break;
        case "5":
            pe = "1.800";
            break;
        case "6":
            pe = "2.300";
            break;
        case "7":
            pe = "2.900";
            break;
        case "8":
            pe = "3.900";
            break;
        case "9":
            pe = "5.000";
            break;
        case "10":
            pe = "5.900";
            break;
        case "11":
            pe = "7.200";
            break;
        case "12":
            pe = "8.400";
            break;
        case "13":
            pe = "10.000";
            break;
        default:
            pe = "Invalid Sfida";
    }

    return sfidaString + ", " + pe + " PE";
}

function CalcoloVita(index) {
    // console.log(index);
    let i;
    let minus = false;
    let VitaCalcolata = document.querySelector(`#${index}`)
    index = index.replace("mostro", "")
    // console.log(index);
    // console.log(rollDice(6,6));
    let dadiCalcolo = monsterManual.monsters[index].HP.Notes
    dadiCalcolo = dadiCalcolo.replace("(", "")
    dadiCalcolo = dadiCalcolo.replace(")", "")
    if (dadiCalcolo.indexOf("+") == -1) {
        minus = true;
    }
    dadiCalcolo = dadiCalcolo.split(/[d+-]/);
    if (dadiCalcolo[2] == null) {
        dadiCalcolo = rollDice(dadiCalcolo[0], dadiCalcolo[1])

    } else if (minus) {
        dadiCalcolo = parseInt(rollDice(dadiCalcolo[0], dadiCalcolo[1])) - parseInt(dadiCalcolo[2])
        if (dadiCalcolo == 0) {
            dadiCalcolo = 1
        }

    }
    else {
        dadiCalcolo = parseInt(rollDice(dadiCalcolo[0], dadiCalcolo[1])) + parseInt(dadiCalcolo[2])

    }




    console.log(monsterManual.monsters[index].HP.Notes);
    console.log(dadiCalcolo);
    if (lettera.findIndex((el) => {
        return el.mostro == index
    }) == -1) {

        inizio = 'A'.charCodeAt(0)
        lettera.push({ "mostro": index, "letterafinale": inizio })
        i = lettera.findIndex((el) => {
            return el.mostro == index
        })
    }
    else {
        i = lettera.findIndex((el) => {
            return el.mostro == index
        })
        lettera[i].letterafinale++
    }
    VitaCalcolata.innerHTML += "," + String.fromCharCode(lettera[i].letterafinale) + ": " + dadiCalcolo;
    console.log(lettera);
}

function cancellaVitaMostri(index) {
    index = index.replace("vita", "")
    // console.log(index);
    let VitaCalcolata = document.querySelector(`#${index}`)
    index = index.replace("mostro", "")
    // console.log(index);
    VitaCalcolata.innerHTML = monsterManual.monsters[index].HP.Notes
    let i = lettera.findIndex((el) => {
        return el.mostro == index
    })
    inizio = 'A'.charCodeAt(0)
    lettera[i].letterafinale = inizio - 1;

}


function canc(clickedID) {
    console.log(clickedID);
    let articolo = document.querySelector(`#article${clickedID}`)
    wrapper.removeChild(articolo)
}

function calcoloMod(caratteristica) {
    let Modificatore = Math.floor((caratteristica - 10) / 2);
    if (Modificatore > 0) {
        return "+" + Modificatore;
    }
    else {
        return Modificatore;
    }
}


function findMoster(search) {
    let i = 0;

    if (search === '*') {
        search = "";
    }
    search = search.trim()
    // if (notFound) {
    wrapper.innerHTML = "";
    //     notFound = false;
    // }
    monsterManual.monsters.forEach((element, mostroIndex) => {
        if (include.checked) {
            research = element.Name.toLowerCase().includes(search.toLowerCase());
        }
        if (start.checked) {
            research = element.Name.toLowerCase().startsWith(search.toLowerCase());
        }
        if (perfect.checked) {
            research = element.Name.toLowerCase() === search.toLowerCase();
        }
        if (research) {
            // console.log('Name: ' + element.Name);
            // console.log('HP: ' + element.HP.Value);
            // console.log('FOR: ' + element.Abilities.Str);
            // console.log('Resistenze: ' + element.DamageResistances);

            function calcoloDistanze(array) {
                let speedArray = [];
                array.forEach(el => {
                    let accomp = el.split(" ");
                    accomp.forEach((el, index) => {


                        if (el == "ft.") {
                            accomp[index] = "m."

                        }
                        else if (el == "climb") {
                            accomp[index] = "scalare"
                        }

                        else if (!isNaN(parseInt(el))) {
                            accomp[index] = el * 0.3
                        }
                    })

                    let accompArray = accomp.join(" ");
                    speedArray.push(accompArray)
                })
                if (speedArray.length > 1) { speedArray = speedArray.join(", ") }
                return speedArray;
            }


            i++;
            numID++;

            let articolo = document.createElement('article');
            articolo.setAttribute('id', `article${numID}`)
            articolo.classList.add("col-12", "mt-4", "col-md-6", "col-xl-4")
            articolo.innerHTML = `<h2><a href="https://www.google.com/search?q=${element.Name}+5e+token&udm=2" target="_blank" >${element.Name}</a></h2>
            <p class="text-center">${element.Type}</p>
            <hr>
            `;

            if (!masterless.checked) {

                articolo.innerHTML += `
                <p><strong>Armor Class:</strong> ${element.AC.Value} ${element.AC.Notes}</p>
                <p><strong>HP:</strong> ${element.HP.Value} <button class="vitaMostro" id="mostro${mostroIndex}" onClick="CalcoloVita(this.id)">${element.HP.Notes}</button><button class="canc1" id="vitamostro${mostroIndex}" onClick="cancellaVitaMostri(this.id)">X</button>
                </p>
                `;
            }

            articolo.innerHTML += `
            <p><strong>Speed:</strong> ${calcoloDistanze(element.Speed)}</p>
            <p><strong>CR:</strong> ${calculatePE(element.Challenge)}</p>
            <hr>
            <div class="container-fluid">
                    <div class="row justify-content-center text-center">

                        <div class="col-12 col-md-6 ">
                            <div class="row">
                                <p class="col-4"><strong>FOR</strong></p>
                                <p class="col-4"><strong>DES</strong></p>
                                <p class="col-4"><strong>CON</strong></p>
                                <p class="col-4">${element.Abilities.Str} (<strong>${calcoloMod(element.Abilities.Str)}</strong>)</p>
                                <p class="col-4">${element.Abilities.Dex} (<strong>${calcoloMod(element.Abilities.Dex)}</strong>)</p>
                                <p class="col-4">${element.Abilities.Con} (<strong>${calcoloMod(element.Abilities.Con)}</strong>)</p>
                            </div>
                        </div>
                        
                        <div class="col-12 col-md-6">
                            <div class="row">
                                <p class="col-4"><strong>INT</strong></p>
                                <p class="col-4"><strong>SAG</strong></p>
                                <p class="col-4"><strong>CAR</strong></p>
                                <p class="col-4">${element.Abilities.Int} (<strong>${calcoloMod(element.Abilities.Int)}</strong>)</p>
                                <p class="col-4">${element.Abilities.Wis} (<strong>${calcoloMod(element.Abilities.Wis)}</strong>)</p>
                                <p class="col-4">${element.Abilities.Cha} (<strong>${calcoloMod(element.Abilities.Cha)}</strong>)</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <hr>
                <p><strong>Vulnerabilities:</strong> ${element.DamageVulnerabilities} </p>
                <p><strong>Damage Immunities:</strong> ${element.DamageImmunities}</p>
                <p><strong>Condition Immunities:</strong> ${element.ConditionImmunities.join(", ")}</p>
                <p><strong>Senses:</strong> ${calcoloDistanze(element.Senses)}</p>
                <p><strong>Languages:</strong> ${element.Languages} </p>
                <p><strong>Challenge:</strong> ${element.Challenge} </p>
                <hr>`;
            element.Actions.forEach(el => articolo.innerHTML += `<p><strong>${el.Name}:</strong> ${el.Content} </p>
            <button class="canc" id="${numID}" onClick="canc(this.id)">X</button>`);
            
            
            if((typeof(element.Traits[0])!='undefined')){
                articolo.innerHTML += `<hr><h5><strong>Tratti</strong><h5> `
            element.Traits.forEach(el => articolo.innerHTML += `<p><strong>${el.Name}:</strong> ${el.Content} ${el.Usage}</p>
            <button class="canc" id="${numID}" onClick="canc(this.id)">X</button>`);
            }
            wrapper.appendChild(articolo);
        }
    });
    if (i == 0) {

        wrapper.innerHTML = `<h3 style="margin-top: 2rem" class="text-center">Nessun elemento trovato</h3>`;
        // alert('Mostro non trovato')


    }
    // else {
    //     console.log(`trovate ${i} entry`);
    // }
   

}

masterless.addEventListener("input", () => {

    localStorage.setItem('Masterless', masterless.checked);
})