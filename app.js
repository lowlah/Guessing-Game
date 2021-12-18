const rElement= document.getElementById("r");
const gElement= document.getElementById("g");
const bElement= document.getElementById("b");
const DisplayElement= document.getElementById("color-display");

const levels= Array.from(document.getElementsByClassName(" mode"));
const squareBoxes= Array.from(document.getElementsByClassName("square"));

let levelButton= levels.find((level)=>{
    const classList=Array.from(level.classList);
    return classList.includes("selected");
});

let gameLevel=levelButton.innerHTML;
//let squares = getSquares(gameLevel);

levels.forEach(level=>{
    level.addEventListener("click",function(){
        levels.forEach((mode) => mode.classList.remove("selected"));
        this.classList.add("selected");
        //gameLevel = this.innerHTML;
        //squares = getSquares(gameLevel)

       gameLevel = this.innerHTML;
    });
   
});
// start button
const startButton= document.getElementById("reset"); 
startButton.addEventListener("click",function(){
    this.innerHTML="Change Color"
    //assign a background color to each square
    for(let i=0; i<squareBoxes.length; i=i+1){
        const red= Math.floor(Math.random()* 256);
        const green= Math.floor(Math.random()* 256);
        const blue= Math.floor(Math.random()* 256);

        const rgbCombo="rgb("+ red + "," + green +","+blue +")"

        const square= squareBoxes[i];
        square.dataset.rgb_value=JSON.stringify([red,green,blue])
        square.style.backgroundColor= rgbCombo;

    }
//assign rgb values  to header
const squareIndex=Math.floor(Math.random() *6);
const headerColors= squareBoxes[squareIndex];
setBackgroundColor(headerColors);

});

function setBackgroundColor(squareElement){
    const setHeaderElementBackgroundColor=(rgbValues,element)=>{
        const [r,g,b]=rgbValues;
        const rgbCombo= `rgb(${r},${g},${b})`;
        element.style.backgroundColor= rgbCombo;
        element.innerHTML=rgbValues.find(rgbValue=>{
            return rgbValue > 0;

        });
    };
    const rgbCombo= squareElement.dataset.rgb_value;
    DisplayElement.dataset.rgb_value= rgbCombo;
    const[red,green,blue]=JSON.parse(rgbCombo);

    const redBackground=[red,0,0];
    const greenBackground=[0,green,0];
    const blueBackground=[0,0,blue];

    setHeaderElementBackgroundColor(redBackground,rElement);
    setHeaderElementBackgroundColor(greenBackground,gElement);
    setHeaderElementBackgroundColor(blueBackground,bElement);

}
//add listener to squares
squareBoxes.forEach(square => {
    square.addEventListener("click",function(){
        const headerValue= DisplayElement.dataset.rgb_value;
        const squareValue= this.dataset.rgb_value;

        if (headerValue==squareValue){
            setSquareWin(headerValue);
            alert("Congrats you won!")

        }else {
            alert("try again")
            this.classList.add("hidden");

        }
    });
});

function setSquareWin(headerRgbString){
    const[r,g,b]=JSON.parse(headerRgbString);
    const rgbCombo= `rgb(${r},${g},${b})`;

    squareBoxes.forEach(sq => {
        sq.classList.remove("hidden");
        sq.style.backgroundColor= rgbCombo;

    });

};

function getSquares(level) {
    const tiles = Array.from(
      document.getElementsByClassName(" mode")
    );
  
    tiles.forEach((sq) => sq.classList.remove("hidden"));
  
    if (level === "Easy") {
      const hiddenSquares = tiles.slice(3, tiles.length);
      const squareBoxes = tiles.slice(0, 3);
  
      hiddenSquares.forEach((sq) => sq.classList.add("hidden"));
  
      return squareBoxes;
    }
  
    return tiles;
  }