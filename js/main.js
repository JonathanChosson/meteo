document.getElementById('ville').addEventListener('change', function(){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.value}&units=metric&appid=4802d916ef4ea849a434c682b46cdb10&lang=fr`;
    fetch(url)
        .then((reponse) => 
        reponse.json()
        .then((data) => {
            console.log(data);
            let tab = document.querySelectorAll('ul li');
            let i = 0;
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.name);
            i += 1;
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.main.temp) + "°";
            i +=1;
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.main.humidity) + " %";
            i+=1;
            tab[i].innerHTML = tab[i].innerHTML.replace(tab[i].innerText, data.wind.speed) + " km/h";
        })
        ).catch(erreur => console.log('Ville non trouvé'));
});
