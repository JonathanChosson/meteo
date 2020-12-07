let ville;
document.querySelector('#ville').addEventListener('change', function(){
    ville = this.value.replace(/ /g, "-");
    ville = ville.replace(/-$/, "");
})

document.querySelector('.header__form--btn').addEventListener('click', function(event){
    event.preventDefault();
    console.log(ville);
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
            tab[i].innerHTML = iconUrl + data.name;
            i += 1;
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.main.temp) + "°";
            i += 1;
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.main.humidity) + " %";
            i+=1;
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.wind.speed) + " km/h";
        })
        ).catch(erreur => alert('Ville non trouvé'));
        //prévision à 3, 6 et 9 heures 
        fetch(url3j)
        .then((reponse2) => 
        reponse2.json()
        .then((data2) => {
            console.log(data2);
            let tab2 = document.querySelectorAll('.article__ul--li--last__ul__li');
            for (let i2 =1; i2 < 4 ; i2++) {
            let i3 = i2 -1;
            let icon = data2.list[i2].weather[0].icon;
            let iconUrl2 = `<img src="http://openweathermap.org/img/w/${icon}.png" alt="Condition à ${data2.list[i2].dt_txt.substring(11, 16)} Heures" />`;
            let heure = data2.list[i2].dt_txt.substring(11, 16) + " H";
            tab2[i3].innerHTML =`<span class="far fa-clock"></span> ${heure}`;
            tab2[i3].innerHTML += iconUrl2;
            tab2[i3].innerHTML +=`<p><span class="fas fa-thermometer-three-quarters"></span> ${data2.list[i2].main.temp}°</p>`;
            tab2[i3].innerHTML +=`<p><span class="fas fa-tint"></span> ${data2.list[i2].main.humidity} %</p>`;
            tab2[i3].innerHTML +=`<p><span class="fas fa-wind"></span> ${data2.list[i2].wind.speed} km/h</p>`;
        }
        })
        ).catch(erreur => console.log('Ville non trouvé'));
});
