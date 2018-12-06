/*
 * better placeholder text.
 * https://github.com/DragoniteSpam/ChickenIpsum.git
 */

const regexInt=/[0-9]+/;

words=[
	"bantam",
	"barnyard",
	"beak",
	"broody",
	"chick",
	"chicken",
	"clutch",
	"comb",
	"coop",
	"crest",
	"egg",
	"fowl",
	"free range",
	"hackles",
	"hatch",
	"hen",
	"incubation",
	"nest",
	"pecking order",
	"perch",
	"poultry",
	"pullet",
	"roost",
	"rooster",
	"scratch",
	"wattles"
]

const types={
    WORD: 0,
    SENTENCE: 1,
    PARAGRAPH: 2
}

const data={
    previous: ""
}

function chickenIpsum(){
    let value=document.getElementById("value-input").value;
    let thing=types.WORD;
    if (document.getElementById("thing-input-0").checked){
        thing=types.WORD;
    } else if (document.getElementById("thing-input-1").checked){
        thing=types.SENTENCE;
    } else if (document.getElementById("thing-input-2").checked){
        thing=types.PARAGRAPH;
    }
    
    let text="";
    let failed=false;
    
    for (let i=0; i<value; i++){
        if (failed){
            alert("something broke");
            break;
        }
        switch (thing){
            case types.WORD:
                text=text+chickenIpsumWord(words);
                break;
            case types.SENTENCE:
                text=text+chickenIpsumSentence(words);
                break;
            case types.PARAGRAPH:
                text=text+chickenIpsumPargraph(words);
                break;
            default:
                failed=true;
                break;
        }
    }
    
    var element = document.getElementById("output");
    element.innerHTML=text;
}

function chickenIpsumWord(words){
    if (words.length==0||words.join().length==0){
        return ">:C ";
    }
    if (words.length==1){
        return randomElementFromArray(words)+" ";
    }
    
    // i couldn't find any rules for generating lorem ipsum but i'm guessing it wouldn't
    // look as good if you generated the same word twice in a row
    let attempt="";
    do {
        attempt=randomElementFromArray(words);
    } while (attempt==data.previous);
    data.previous=attempt;
    
    return attempt.trim()+" ";
}

function chickenIpsumSentence(words){
    let sentenceLength=Math.floor(Math.random()*8+4);
    let output="";
    for (let i=0; i<sentenceLength; i++){
        output=output+chickenIpsumWord(words);
    }
    return capitalize(output.trim())+". ";
}

function chickenIpsumPargraph(words){
    let paragraphLength=Math.floor(Math.random()*6+4);
    let output="";
    for (let i=0; i<paragraphLength; i++){
        output=output+chickenIpsumSentence(words);
    }
    return output.trim()+"<br/></br>";
}

function capitalize(str){
    return str.charAt(0).toUpperCase()+str.slice(1);
}