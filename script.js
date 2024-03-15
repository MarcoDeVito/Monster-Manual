let monsterManual={};
let requestURL = './Monster-Manual.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    monsterManual= request.response;
    console.log(monsterManual);
    findMoster("banshee");
    
}

function findMoster(search){
    console.log(search.toLowerCase())
    monsterManual.monsters.forEach(element => {
        if(search.toLowerCase() === element.Name.toLowerCase()){
            console.log(element.HP.Value);
            console.log(element.Abilities.Str);
            console.log(element.DamageResistances);

        }
    });
}