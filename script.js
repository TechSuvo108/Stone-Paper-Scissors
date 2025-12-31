/* ================= SCORE VARIABLES ================= */
let userpoint = 0;
let comppoint = 0;

/* ================= DOM ELEMENT REFERENCES ================= */
let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");

/* Animation GIF and choice images */
let gif = document.querySelector(".video1");
let images = document.querySelectorAll(".img1");

/* Score display elements */
let userscore = document.querySelector("#userscore");
let compscore = document.querySelector("#compscore");

/* ================= MATCH MODE ELEMENTS ================= */
let matchBtn = document.querySelector("#matchBtn");
let modal = document.querySelector("#matchModal");
let startMatch = document.querySelector("#startMatch");
let closeModal = document.querySelector("#closeModal");

/* ================= MATCH MODE STATE ================= */
let matchMode = false;
let matchOver = false;
let WIN_SCORE = 5;

/* ================= MATCH MODE UI CONTROLS ================= */
matchBtn.addEventListener("click", () => {
    modal.classList.remove("hide");
});

closeModal.addEventListener("click", () => {
    modal.classList.add("hide");
});

startMatch.addEventListener("click", () => {
    matchMode = true;
    matchOver = false;
    resetGame();
    modal.classList.add("hide");
    msg.innerText = "🎯 Match Mode Started! First to 5 wins";
    msg.style.backgroundColor = "purple";
});

/* ================= RESET GAME ================= */
let resetBtn = document.querySelector("#resetBtn");

const resetGame = () => {
    userpoint = 0;
    comppoint = 0;
    matchOver = false;
    userscore.innerText = "0";
    compscore.innerText = "0";
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#20456e";
    msg.style.color = "white";
};

resetBtn.addEventListener("click", resetGame);

/* ================= COMPUTER CHOICE ================= */
let comp = () => {
    const object = ["Rock", "Paper", "Scissor"];
    const i = Math.floor(Math.random() * 3);
    return object[i];
};

/* ================= DRAW HANDLER ================= */
let Gamedraw = () => {
    msg.innerText = "The Game is Draw! Try Again";
    msg.style.backgroundColor = "blue";
};

/* ================= WIN / LOSE HANDLER ================= */
let showwinner = (userwin, userchoice, compChoice) => {
    if (matchOver) return;

    if (userwin) {
        userpoint++;
        userscore.innerText = userpoint;
        msg.innerText = `You win! Your ${userchoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        comppoint++;
        compscore.innerText = comppoint;
        msg.innerText = `You lose! ${compChoice} beats your ${userchoice}`;
        msg.style.backgroundColor = "red";
    }

    /* Match mode winning condition */
    if (matchMode) {
        if (userpoint === WIN_SCORE) {
            msg.innerText = "🏆 YOU WON THE MATCH!";
            msg.style.backgroundColor = "darkgreen";
            matchOver = true;
        } 
        else if (comppoint === WIN_SCORE) {
            msg.innerText = "💻 COMPUTER WON THE MATCH!";
            msg.style.backgroundColor = "darkred";
            matchOver = true;
        }
    }
};

/* ================= MAIN GAME LOGIC ================= */
let playgame = (userchoice) => {
    if (matchOver) return;

    /* Hide choices and show animation GIF */
    images.forEach(image => image.style.display = "none");
    gif.style.display = "block";
    
    setTimeout(() => {
        /* Restore choices after animation */
        gif.style.display = "none";
        images.forEach(image =>
            image.style.display = "flex"
        );

        /* Generate computer choice */
        const compChoice = comp();

        /* Check for draw */
        if (compChoice === userchoice) {
            Gamedraw();
        } else {
            let userwin = true;

            /* Determine winner based on rules */
            if (userchoice === "Rock") {
                userwin = compChoice === "Paper" ? false : true;
            }
            else if (userchoice === "Paper") {
                userwin = compChoice === "Scissor" ? false : true;
            }
            else {
                userwin = compChoice === "Rock" ? false : true;
            }

            showwinner(userwin, userchoice, compChoice);
        }
    }, 2100);
};

/* ================= USER INPUT HANDLING ================= */
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playgame(userchoice);
    });
});
