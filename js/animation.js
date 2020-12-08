function animationRecharge (){
    tab[i].classList.remove("animation500delay");
    setTimeout (function() {
        tab[i].innerHTML = iconUrl + data.name;
        tab[i].classList.add("animation500delay");
    }, 100);
}


