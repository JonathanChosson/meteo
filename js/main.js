let ville;
document.querySelector('#ville').addEventListener('change', function(){
    ville = this.value.replace(/ /g, "-");
    ville = ville.replace(/-$/, "");
})

//Charge donnée dans cookies
let mesRecherches = localStorage;
let tableauRecherches =[];
function majCookie() {
    console.log('Maj Cookie');
    if (mesRecherches.length ==0){
    mesRecherches.setItem(0, JSON.stringify(tableauRecherches));
    }else {
        tableauRecherches = JSON.parse(mesRecherches[0])
    };
    //Affiche l'historique si il y as lieux
    let afficheRecherche = document.getElementsByClassName('header__h1__p');
    if(tableauRecherches.length == 0){
        afficheRecherche[0].innerHTML = "";
    }else
    {
        afficheRecherche[0].innerHTML = "Vos dernières recherches :";
        let afficheTableauRecherche = document.getElementsByClassName('header__span');
        afficheTableauRecherche[0].innerHTML = "";
        for(u in tableauRecherches){
            afficheTableauRecherche[0].innerHTML += `<p class="header__span__p">${tableauRecherches[u]}</p>`
        }
    }
    let btnHisto = document.getElementsByClassName('header__span__p');
    console.log(btnHisto.length);
    if(btnHisto.length == 0) {
    }else {
        for(t in btnHisto){
            console.log(btnHisto[t].innerHTML);
            if(btnHisto[t].innerHTML != undefined){
                btnHisto[t].addEventListener('click', function(event){
                event.preventDefault();
                console.log(event.target.innerHTML);
            })
            }
        }
    }
};
majCookie();




document.querySelector('.header__form--btn').addEventListener('click', function(event){
    event.preventDefault();
    //console.log(ville);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ville},fr&units=metric&appid=4802d916ef4ea849a434c682b46cdb10&lang=fr`;
    let url3j = `https://api.openweathermap.org/data/2.5/forecast?q=${ville},fr&units=metric&appid=4802d916ef4ea849a434c682b46cdb10&lang=fr`;
    fetch(url)
        .then((reponse) => 
        reponse.json()
        .then((data) => {
            console.log(data);
            let tab = document.querySelectorAll('ul li');
            let i = 0;
            let iconCode =data.weather[0].icon;
            let iconUrl =`<img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Condition Actuelles" />`;
            // Première iteration
            for (let r=0; r<4; r++){
                tab[r].classList.remove("animation500delay");
            }
            setTimeout (function() {
                tab[i].innerHTML = iconUrl + data.name + " " + data.sys.country;
                tab[i].classList.add("animation500delay");
                i += 1;
                tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.main.temp) + "°";
                tab[i].classList.add("animation500delay");
                i += 1;
                tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.main.humidity) + " %";
                tab[i].classList.add("animation500delay");
                i+=1;
                tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.wind.speed) + " km/h";
                tab[i].classList.add("animation500delay");
            }, 100);
            //vérifie si la ville existe déjà et rempli le cookie au besoin
            if(tableauRecherches.indexOf(ville) !== -1){

            }else{
                tableauRecherches.push(ville);
                mesRecherches.setItem(0, JSON.stringify(tableauRecherches));
            }
            majCookie();
        })
        ).catch(erreur => alert('Ville non trouvé'));
        //prévision à 3, 6 et 9 heures 
        fetch(url3j)
        .then((reponse2) => 
        reponse2.json()
        .then((data2) => {
            //console.log(data2);
            let tab2 = document.querySelectorAll('.article__ul--li--last__ul__li');
            for (let r2=0; r2<3; r2++){
                tab2[r2].classList.remove("animation1200delay");
            }
            for (let i2 =1; i2 < 4 ; i2++) {
            setTimeout (function(){
            let i3 = i2 -1;
            let icon = data2.list[i2].weather[0].icon;
            let iconUrl2 = `<img src="http://openweathermap.org/img/w/${icon}.png" alt="Condition à ${data2.list[i2].dt_txt.substring(11, 16)} Heures" />`;
            let heure = data2.list[i2].dt_txt.substring(11, 16) + " H";
            tab2[i3].innerHTML =`<span class="far fa-clock"></span> ${heure} <br />`;
            tab2[i3].innerHTML += iconUrl2;
            tab2[i3].innerHTML +=`<p><span class="fas fa-thermometer-three-quarters"></span> ${data2.list[i2].main.temp}°</p>`;
            tab2[i3].innerHTML +=`<p><span class="fas fa-tint"></span> ${data2.list[i2].main.humidity} %</p>`;
            tab2[i3].innerHTML +=`<p><span class="fas fa-wind"></span> ${data2.list[i2].wind.speed} km/h</p>`;
            tab2[i3].classList.add("animation1200delay");
            },100);
        }
        })
        ).catch(erreur => alert('Ville non trouvé'));
        
});