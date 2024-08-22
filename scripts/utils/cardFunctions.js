//Functions qui touchent ou animent les cards

//Crée l'animation des cards dans la galerie
export function cardAnimation(){
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.setProperty('--item-index', index);
        card.addEventListener('click', function () {
            // Add the animate class to trigger the animation
            card.classList.add('clicked');
        
            // Remove the animate class after the animation is complete
            card.addEventListener('animationend', function (event) {
                if (event.animationName === 'card-animation') {
                  card.classList.remove('clicked');
                }
              }, { once: true });
          });
    });
}

//Utilisée pour déplacer la galerie en fonction du nombre de filtres sélectionés
export function recetteCardPosition(div){
    div.style.top = 
    ` calc(116vh + ${Math.max(ingredients.length,appareils.length,ustensils.length)*73}px)
    `;
}