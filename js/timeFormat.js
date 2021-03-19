const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let date = new Date();
let options = {weekday: "long"};
let toDay = date.toLocaleDateString('fr-FR', options);
toDay = toDay[0].toUpperCase() + toDay.substring(1);
