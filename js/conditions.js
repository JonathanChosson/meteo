function modifHeader() {
    console.log(condition);
    console.log(header[0]);
    if(condition == 'Rain'){
        header[0].classList.toggle('breezy');
        rain.classList.remove('hidden');
    }else if(condition == 'Clouds'){
        header[0].classList.toggle('cloudy');
        clouds.classList.remove('hidden');
    }else if(condition =="Clear"){
        header[0].classList.toggle('hot');
        sun.classList.remove('hidden');
    }else if(condition =="Snow"){
        header[0].classList.toggle('stormy');
        snow.classList.remove('hidden');
    }
}