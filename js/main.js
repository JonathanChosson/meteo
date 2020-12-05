let ville;
document.querySelector('#ville').addEventListener('change', function(){
    ville = this.value;
})

document.querySelector('.header__form--btn').addEventListener('click', function(event){
    event.preventDefault();
    console.log(ville);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=4802d916ef4ea849a434c682b46cdb10&lang=fr`;
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
        ).catch(erreur => alert('Ville non trouvé'));
});
