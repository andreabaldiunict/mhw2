/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const Answer_ID = {};                                           
const choices = document.querySelectorAll('.choice-grid div');    

for (const choice of choices) {
    choice.addEventListener('click', Section_Click);                 
}

//QUESTA FUNZIONE CONSENTE DI EVIDENZIARE IL "BOX" SELEZIONATO E DI OPACIZZARE TUTTO IL RESTO.
function Section_Click(event){
    const choice = event.currentTarget;
    const userAnswerId = choice.dataset.choiceId;
    const answers = choice.parentNode.querySelectorAll('div');

    choice.querySelector('.checkbox').src = "images/checked.png";
    choice.classList.add('selected');
    choice.classList.remove('opacity');

    for (const ans of answers) {
        if(ans.dataset.choiceId !== userAnswerId){
            ans.classList.add('opacity');
            ans.querySelector('.checkbox').src = "images/unchecked.png";
            ans.classList.remove('selected');
        }
    }

    Answer_ID[choice.dataset.questionId] = choice.dataset.choiceId;

    if(Answer_ID.one && Answer_ID.two && Answer_ID.three){
        for (const choice of choices) 
            choice.removeEventListener('click',Section_Click);
        View_Result(Calc_Result());
    }
}

//QUESTA FUNZIONE CONSENTE DI CALCOLARE IL RISULTATO DEL TEST CONFRONTANDO LE RISPOSTE SCELTE DALL'UTENTE.
function Calc_Result(){
    if(Answer_ID.one === Answer_ID.two || Answer_ID.one === Answer_ID.three)
        return Answer_ID.one;
    else if(Answer_ID.two === Answer_ID.one || Answer_ID.two === Answer_ID.three)
        return Answer_ID.two;
    else if(Answer_ID.three === Answer_ID.one || Answer_ID.three === Answer_ID.two)
        return Answer_ID.three;
    return Answer_ID.one;
}

//QUESTA FUNZIONE CONSENTE DI VISUALIZZARE LA SEZIONE RISULTATO E DI ATTIVARE LA POSSIBILITÀ DI RESET.
function View_Result(key){
    const view = document.querySelector('#test_result');
    view.querySelector('h1').textContent = RESULTS_MAP[key].title;
    view.querySelector('p').textContent = RESULTS_MAP[key].contents;
    view.classList.remove('t_result');
    const button = document.querySelector('#restart');
    button.addEventListener('click', Reset_Test);
}

//QUESTA FUNZIONE CONSENTE DI RESETTARE IL TEST.
function Reset_Test(){
    const not_Display = document.querySelector('#test_result');
    not_Display.classList.add('t_result');

    for (const key in Answer_ID) {
        delete Answer_ID[key];
    }

    for (const choice of choices) {
        choice.classList.remove('opacity');
        choice.classList.remove('selected');
        choice.addEventListener('click', Section_Click);
        choice.querySelector('.checkbox').src = "images/unchecked.png";
    }
}