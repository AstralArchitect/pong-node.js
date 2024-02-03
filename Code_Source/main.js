const blessed = require('blessed');

// Créer une nouvelle instance de l'écran béni
const screen = blessed.screen();
const screenWidth = screen.width;
const screenHeight = screen.height;
let moveL = true;
let moveH = false;
let vitesse = 100;
// Créer une boîte (widget) pour afficher le caractère
const you = blessed.box({
  content: '|\n|\n|',
  left: screenWidth/screenWidth,
  top: screenHeight/2,
  width: 1, // Largeur du caractère
  height: 3, // Hauteur du caractère
  style: {
    fg: 'white', // Couleur du texte
    bg: 'black'   // Couleur de fond
  }
});
const enemy = blessed.box({
  content: '|\n|\n|',
  left: screenWidth - 1,
  top: screenHeight/2,
  width: 1,
  height: 3,
  style: {
    fg: 'white',   // Couleur du texte pour la deuxième boîte
    bg: 'black'  // Couleur de fond pour la deuxième boîte
  }
});
const ball = blessed.box({
  content: '֍',
  left: screenWidth/2,
  top: screenHeight/2,
  width: 1,
  height: 1,
  style: {
    fg: 'red',   // Couleur du texte pour la deuxième boîte
    bg: 'black'  // Couleur de fond pour la deuxième boîte
  }
});
// Ajouter la boîte à l'écran
screen.append(you);
screen.append(enemy);
screen.append(ball);
// Gérer l'événement de touche pour quitter
screen.key(['escape'], function(ch, key) {
  process.exit(0);
});

// Gérer l'événement de touche pour déplacer la boîte vers le bas
screen.key('down', function(ch, key) {
  you.top++;
  screen.render();
});

screen.key('up', function(ch, key) {
  you.top -= 1;
  screen.render()
});
//déplacer la balle
setInterval(function () {
  //bouger la balle et l'énemie
  if (moveL === true) {
    ball.left--;
  } else if (moveL === false) {
    ball.left++;
  }
  if(moveH === false){
    ball.top++;
    enemy.top = ball.top;
  }else if(moveH === true){
    ball.top--;
    enemy.top = ball.top;
  }
  //changer les mouvements
  if (ball.left === 1) {
    if(ball.top === you.top || ball.top === you.top + 1 || ball.top === you.top + 2)
    moveL = false;
  }else if (ball.left === screenWidth) {
    moveL = true;
  }
  if (ball.top === 1) {
    moveH = false;
  }else if (ball.top === screenHeight) {
    moveH = true;
  }
  //vérifier si vous avez perdu
  if(ball.left < 0){
    process.exit(0);
  }
  //accélérer la balle
  vitesse -= 4;
  //afficher les objets à l'écran
  screen.render();
}, vitesse);