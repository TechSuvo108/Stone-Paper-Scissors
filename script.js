let userpoint= 0;
let comppoint= 0;

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");


let gif = document.querySelector(".video1");
let images = document.querySelectorAll(".img1");


let userscore = document.querySelector("#userscore");
let compscore = document.querySelector("#compscore");


let comp = () =>{
    const object=["Rock", "Paper", "Scissor"];
    const i=Math.floor(Math.random()*3);
    return object[i];
}

let Gamedraw = () => {
    msg.innerText = "The Game is Draw! Try Again";
    msg.style.backgroundColor = "blue";
}

let showwinner = (userwin, userchoice, compChoice) => {
    if(userwin){
        userpoint++;
        userscore.innerText= userpoint;
        msg.innerText = `You win! Your ${userchoice} Beats Computer's ${compChoice}`;
        msg.style.backgroundColor="green";
        msg.style.color="white";
    }
    else{
        comppoint++;
        compscore.innerText= comppoint;
        msg.innerText = `You lose! Computer's ${compChoice} Beats your ${userchoice}`;
        msg.style.backgroundColor="red";
        msg.style.color="white";
    }
}

let playgame = (userchoice) =>{

    //Hide images and show Gif:-
    images.forEach(image => image.style.display = "none");
    gif.style.display = "block";
    
     setTimeout(() => {
        // Hide GIF
        gif.style.display="none";
        images.forEach(image => 
            image.style.display = "flex");

        // Determine game result AFTER the GIF disappears
        const compChoice= comp();

        if (compChoice === userchoice){
            Gamedraw();
        }
        else{
            let userwin = true;
            if(userchoice === "Rock"){
                userwin = compChoice === "Paper" ? false : true ;
            }
            else if(userchoice === "Paper"){
                userwin = compChoice === "Scissor" ? false : true ;
            }
            else{
                userwin = compChoice === "Rock" ? false : true ;
            }
            showwinner(userwin, userchoice, compChoice);
        }
     },2100)
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playgame(userchoice);
    });    
});







