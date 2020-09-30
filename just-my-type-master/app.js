$("#keyboard-upper-container").hide();
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentence = $("#sentence");
let sentenceCounter = 0;
let letterCounter = 0;
let yellowBlock = $("#yellow-block")
let yellowBlockPosition = 20;
let targetLetter = $("#target-letter")
let feedback = $("#feedback")
let posFeedback = $("#glyphicon-ok")
let negFeedback = $("#glyphicon-remove")
let sentenceWords = ["11", "11", "10", "10", "12"]
let mistakeCounter = 0
let startTime = 0

$(document).one("keypress", function(){
    let startTime = Date.now();
});

targetLetter.append(sentences[sentenceCounter][letterCounter])

sentence.append(sentences[0])
sentences[sentenceCounter]

$(document).keydown(function (event){
    $(yellowBlock).css("left", "50px")
    if (event.shiftKey == true) {
       $("#keyboard-lower-container").hide();
       $("#keyboard-upper-container").show();

    }
    $("#" + event.key.charCodeAt(0)).css("background-color", "yellow")
})

$(document).keyup(function (event){
    if (event.shiftKey == false) {
       $("#keyboard-lower-container").show();
       $("#keyboard-upper-container").hide();


    }
    $("#" + event.key.charCodeAt(0)).css("background-color", "#f5f5f5")
});

$(document).keypress(function (event){
    if (sentences[sentenceCounter][letterCounter] == event.key){
        feedback.append("<span class= 'glyphicon glyphicon-ok'></span>")
    }
    else {
        feedback.append("<span class= 'glyphicon glyphicon-remove'></span>")
        mistakeCounter++}

    letterCounter++

    yellowBlockPosition = yellowBlockPosition + 15
    $(yellowBlock).css("left", yellowBlockPosition + "px")
    targetLetter.empty()
    targetLetter.append(sentences[sentenceCounter][letterCounter])
    if (letterCounter === sentences[sentenceCounter].length){
        sentenceCounter++;
        letterCounter = 0;
        sentence.empty();
        sentence.append(sentences[sentenceCounter]);
        yellowBlockPosition = 20
        feedback.empty()
    }
    if (sentenceCounter == sentences.length){
        let endTime = Date.now()
        let minutes = endTime - startTime;
        minutes = minutes/60000
        let wpm = calcWPM(minutes, mistakeCounter)
        sentence.empty()
        targetLetter.empty()
        sentence.append(`WPM: ${wpm}`);
    }    
})

function calcWPM(minutes, mistakeCounter) {
    return 54 / minutes - 2 * mistakeCounter
}

