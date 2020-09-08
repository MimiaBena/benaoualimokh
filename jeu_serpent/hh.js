window.onload = function () // fonction qui s'execute Au chargement 
{
    var canvaswidth = 900;  // Debut des variables generales
    var canvasheight = 600;
    var blocksize = 30;
    var ctx;
    var delay = 100;
    var serpent;  // fin des variables generales 
    

    init(); 
// lancement général qui appellera les autres fonctions imbriquées

    function init() // Définition de la fonction init  lancée plus haut 
    {
        var canvas = document.createElement('canvas');
        canvas.width = canvaswidth;
        canvas.height = canvasheight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        serpent = new snake([[6, 4], [5, 4], [4, 4]], "down"); 
// le serpent est défini avec une direction de depart
        refreshcanvas(); //appel de refresh canvas
        
    } // fin de fonction init
    
    function refreshcanvas() 
//debut fonction refreshcanvas : effacement - avancement -dessin- boucle ttes les 100ms
    {
        ctx.clearRect(0, 0, canvaswidth, canvasheight);
        serpent.advance();
        serpent.draw();
        setTimeout(refreshcanvas, delay);
// est ce qu'on ne devrait pas appeler serpent.setDirection ici plutôt ...dans la fonction refreshcanvas????
         


    }
// fin de refreshcanvas ( il contient : body , direction,advance, setdirection)

    function drawblock(ctx, position) 
    {
        var x = position[0] * blocksize;
        var y = position[1] * blocksize;
        ctx.fillRect(x, y, blocksize, blocksize);

    }

    function snake(body, direction) // definition du conteneur
    {
        this.body = body;
        this.direction = direction;
        this.draw = function ()
          {
            ctx.save();
            ctx.fillStyle = '#ff0000';
            for (i = 0; i < this.body.length; i++) {
                drawblock(ctx, this.body[i]);
            }
            ctx.restore();

        };

        this.advance = function () 
        {
            var nextposition = this.body[0].slice();
            switch (this.direction) 
            {
                case "right":
                    nextposition[0] += 1;
                    break;
                case "left":
                    nextposition[0] -= 1;
                    break;
                case "down":
                    nextposition[1] += 1;
                    break;
                case "up":
                    nextposition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction");

            }

            this.body.unshift(nextposition);
            this.body.pop();

        };
              
         this.setdirection = function (newDirection)
         {
            var allowedDirections;
            switch (this.direction)
            {
                case "right":
                case "left":    
                    allowedDirections = ["up","down"];
                break;
            case "up":
            case "down":
                    allowedDirections = ["left","right"];
                    
                break;
            default:
                throw ("invalid direction");
            }

             
             if(allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection; 
             }
            };
       
    
        
    }; //fin du conteneur
    
       
    
Hervé 
il y a 6 jours
0


Salut Nico,

j'ai fait les changements dont tu as parlé mais toujours pareil, le serpent ne va que dans la direction déclarée dans la fonction init ;
j'ai mis des commentaires dans mon code pour un meilleur coup d'oeil , je pense que j'ai certainement par méconnaissance, une erreur soit de déclaration, positionnement, ou appel de fonction. Sinon même un point virgule de trop ou de moins dans mon code ,  a moins que ce soit un pb relatif a un défaut matériel du clavier ??? j'envisage tout anyway .
Repasse un coup d'oeil avec les commentaires que j'ai ajoutés , peut être que le coupable se cache dans le code !!!

ci- apres le code revu + commentaires :
window.onload = function () // fonction qui s'execute Au chargement 
{
    var canvaswidth = 900;  // Debut des variables generales
    var canvasheight = 600;
    var blocksize = 30;
    var ctx;
    var delay = 100;
    var serpent;  // fin des variables generales 
    

    init(); 
// lancement général qui appellera les autres fonctions imbriquées

    function init() // Définition de la fonction init  lancée plus haut 
    {
        var canvas = document.createElement('canvas');
        canvas.width = canvaswidth;
        canvas.height = canvasheight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        serpent = new snake([[6, 4], [5, 4], [4, 4]], "down"); 
// le serpent est défini avec une direction de depart
        refreshcanvas(); //appel de refresh canvas
        
    } // fin de fonction init

    function refreshcanvas() 
//debut fonction refreshcanvas : effacement - avancement -dessin- boucle ttes les 100ms
    {
        ctx.clearRect(0, 0, canvaswidth, canvasheight);
        serpent.advance();
        serpent.draw();
        setTimeout(refreshcanvas, delay);
// est ce qu'on ne devrait pas appeler serpent.setDirection ici plutôt ...dans la fonction refreshcanvas????
         


    }
// fin de refreshcanvas ( il contient : body , direction,advance, setdirection)

    function drawblock(ctx, position) 
    {
        var x = position[0] * blocksize;
        var y = position[1] * blocksize;
        ctx.fillRect(x, y, blocksize, blocksize);

    }

    function snake(body, direction) // definition du conteneur
    {
        this.body = body;
        this.direction = direction;
        this.draw = function ()
        {
            ctx.save();
            ctx.fillStyle = '#ff0000';
            for (i = 0; i < this.body.length; i++) {
                drawblock(ctx, this.body[i]);
            }
            ctx.restore();

        };

        this.advance = function () 
        {
            var nextposition = this.body[0].slice();
            switch (this.direction) 
            {
                case "right":
                    nextposition[0] += 1;
                    break;
                case "left":
                    nextposition[0] -= 1;
                    break;
                case "down":
                    nextposition[1] += 1;
                    break;
                case "up":
                    nextposition[1] -= 1;
                    break;
                default:
                    throw ("invalid direction");

            }

            this.body.unshift(nextposition);
            this.body.pop();

        };
        
         this.setdirection = function (newDirection)
         {
            var allowedDirections;
            switch (this.direction)
            {
                case "right":
                case "left":    
                    allowedDirections = ["up","down"];
                break;
            case "up":
            case "down":
                    allowedDirections = ["left","right"];
                break;
            default:
                throw ("invalid direction");
            }

             
             if(allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection; 
             }
            };
       
    
        
    }; //fin du conteneur
    
       
    
    Document.onkeydown = function handlekey(e)
// DEBUT DE LA fonction a prendre en compte quand on appuie sur une touche
    {
        var key = e.keyCode;
        var newDirection; // LA VARIABLE newDirection EST DECLAREE ICI !!!!!!
        switch(key) 
        {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
                   case 40:
                newDirection = "down";
                break;
            default:
                return;

        }
                
        serpent.setdirection(newDirection); // LANCEMENT DE LA FONCTION    setDirection de notre CONTENEUR (this.setDirection = function(newDirection) ) ?????????
    } 
    
} 