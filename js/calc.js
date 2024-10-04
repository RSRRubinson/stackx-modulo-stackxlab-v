const disp      = document.querySelector(".output");
const hist      = document.querySelector(".disp_hist");
const hist_data = document.querySelector(".hist_data");

const historyBtn = document.querySelector('[data-hist-Btn]');
const historyContainer = document.querySelector('[data-history-container]');

const operator_List = ['^', '/', '*', '-', '+'];
const numbers_List  = ['0', '1', '2', '3', '4','5', '6', '7', '8', '9'];

let hist_oper = [];
let res_hist = [];
let equationHistory = [4];

let flag_Oper = false;

historyBtn.addEventListener(
    'click', () => {
        historyContainer.classList.toggle('hide');
        
        showHistory();
    }
   
);

window.addEventListener(
    'click', (event) => {
        const target = event.target;
        
        returnResultToDisplay(target)
    }
)

function input(n){
    let n1 = n;

    if(disp.value == 0){
        disp.value = n1;
    }
    else if(flag_Oper == true){
        reset();
        
        disp.value = n1;
        
        flag_Oper = false;
    }
    else{
        disp.value += n; 
        
    }
}

function contain(arr, val) {
    // Vale lembrar que o método `indexOf` retorna o índice do valor
    // caso for encontrado e `-1` caso não for encontrado. Logo, uma das
    // formas de converter o valor para booleano é fazer a comparação
    // conforme abaixo.
    // Se o índice retornado for DIFERENTE de `-1`, `true` será retornado.
    // Caso contrário (o valor não existe, logo, `-1` foi retornado),
    // a comparação abaixo resultará em `false`.
    
    return arr.indexOf(val) !== -1;
}

function reset(){
    disp.value = 0;
    hist.value = "";
}
                  // Tecla = foi pressionada
function result(){
    
    hist.value = disp.value+"=";

	
	if(hist.value != "0=" && hist.value != "00="){
		hist_oper.push(hist.value);
        
		// console.log(`hist_oper > ${hist_oper}`)
		// console.log(hist_oper.length)
		
		res_hist.push(eval(disp.value)); // resultado da operação armazenada em res_hist
		
        console.log(`resultado operação hist_oper > ${res_hist}`)
		disp.value = eval(disp.value);
        
        flag_Oper = true;

		history();
    }
	
}

function history(){
    hist_data.innerHTML = "";
    
    console.log(hist_oper);
	
    if(hist_oper.length > 4){
        hist_oper.shift();
        res_hist.shift();

        console.log(`length > 4 ${hist_oper} > ${res_hist}`);
    }
    
    for(var i=0;i<hist_oper.length;i++){

        hist_data.innerHTML+=`
            <div class='historyDiv'>
                <p style='margin-right:5px;color:white;'>
                   <span>
                     ${hist_oper[i]}
                   </span>
                   <span style 'cursor: pointer' data-result = ''>
                     ${res_hist[i]}
                   </span>
                </p>
            </div>
        `;         
     }    
}

function backSpace(){
    if(disp.value.length>1)
        disp.value = disp.value.slice(0,-1);
    else
        disp.value = 0;
}

function showHistory(){
    if (document.querySelector(".history").style.display == "none"){
        document.querySelector(".history").style.display = "block";
        document.querySelector(".keys").style.display = "none";
    }
    else{
        document.querySelector(".history").style.display = "none";
        document.querySelector(".keys").style.display = "block";
    }
}

function deleteHistory(){
    let state = confirm(" Tem certeza que deseja Apagar o Hisórico ? ");
    
	if(state == true){
        document.querySelector(".hist_data").innerHTML="";
        
		hist_oper = [];
		res_hist = [];
        equationHistory = [];
    }
}