let ville;
document.querySelector('#ville').addEventListener('change', function(){
    ville = this.value.replace(/ /g, "-");
    ville = ville.replace(/-$/, "");
})

document.querySelector('.header__form--btn').addEventListener('click', function(event){
    event.preventDefault();
    console.log(ville);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ville},fr&units=metric&appid=4802d916ef4ea849a434c682b46cdb10&lang=fr`;
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
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.main.temp_min) + "°";
            i += 1;
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.main.temp_max) + "°";
            i +=1;
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.main.humidity) + " %";
            i+=1;
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.wind.speed) + " km/h";
        })
        ).catch(erreur => alert('Ville non trouvé'));
});
