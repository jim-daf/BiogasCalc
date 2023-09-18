
var ektrB_clone=document.getElementById("ektr_businesses").cloneNode(true)
var metaB_clone=document.getElementById("meta_businesses").cloneNode(true)
var numAnimals_clone=document.getElementById('numOfAnimals').cloneNode(true)
var title=document.getElementById('title')
var Y;
var QBGd; //Ημερήσια Παραγωγή Βιοαερίου
var currentTab = 0; // Current tab is set to be the first tab (0)
var CH4;
var VDG;
var dataReload=document.querySelectorAll("[data-reload]")
document.getElementsByClassName("step")[currentTab].classList.add('current');

showTab(currentTab); // Display the current tab

clickEventHandler(currentTab) // Handle click events


function showTab(n) {
  
  var x = document.getElementsByClassName("tab");
  var inputStr=document.getElementsByClassName('inputStr')
  var inputBtns=document.getElementsByClassName('inputBtns')
    /*for(var i=0;i<inputStr.length;i++){
        console.log(inputStr[0].innerHTML)
            inputStr[i].reset
    }*/
    
  Array.from(inputStr).forEach(el => el.value = '');

  for(var i=0;i<inputBtns.length;i++){
    inputBtns[i].classList.remove('changeColor')
  }
  x[n].style.display = "block";
  // Fix Previous-Next buttons
  if(window.location.hash=="#gr" || !window.location.hash){
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
      } else {
        document.getElementById("prevBtn").style.display = "inline";
      }
      if (n == (x.length - 2)) {
        document.getElementById("nextBtn").innerHTML = "Υπολογισμός <i class='fas fa-calculator'></i>"
        
        
      }else if(n==(x.length-1)){
        document.getElementById("nextBtn").innerHTML="Ξεκίνα πάλι <span class='restart-symbol'>&#x27F3;</span>"
      } 
      else {
        document.getElementById("nextBtn").innerHTML = "Επόμενο &raquo;";
      }
  }
  if(window.location.hash=="#eng" && window.location.hash){
      if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
      } else {
        document.getElementById("prevBtn").style.display = "inline";
      }
      if (n == (x.length - 2)) {
        document.getElementById("nextBtn").innerHTML = "Calculate <i class='fas fa-calculator'></i>"
        
      }else if(n==(x.length-1)){
        document.getElementById("nextBtn").innerHTML= "Restart <span class='restart-symbol'>&#x27F3;</span>"
      } 
      else {
        document.getElementById("nextBtn").innerHTML = "Next &raquo;";
      }
  }
  
  //display correct step indicator
  stepHandler(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var tabs = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  tabs[currentTab].style.display = "none";
  // Increase or decrease the current tab by n:
  currentTab = currentTab + n;
  
  
    // display the correct tab and make step blue
    showTab(currentTab);
    document.getElementsByClassName("step")[currentTab].classList.add('current');
  
  
  
}

function validateForm() {
  // This function deals with validation of the form fields
  
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "" || y[i].value<0 || (y[i].name=="hmeresleit" && y[i].value>365) ) {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
      
    }
    
  }
  
  // If the valid status is true, mark the step as current and valid:
  
  return valid; // return the valid status
}

function stepHandler(n) {
  
  var steps = document.getElementsByClassName("step");
  // Remove active class from all steps
  for (var i = 0; i < steps.length; i++) {
    steps[i].className = steps[i].className.replace("active", "");
  }
  //add "active" class on current step:
  steps[n].className += " active";
}
function clickEventHandler(currentTab){
    var inputBtns=document.getElementsByClassName('tab')[currentTab].getElementsByClassName('inputBtns')
    var prevBtn=document.getElementById('prevBtn')
    changeTitle(currentTab)
    
    //Handle input buttons
    for(var i=0;i<inputBtns.length;i++){
        
        inputBtns[i].onclick=(e)=>{
            if(e.target.classList.contains('changeColor')){
                e.target.classList.remove('changeColor')
                
            }else if(!e.target.classList.contains('changeColor')){
                e.target.classList.add('changeColor')
                for(var j=0;j<inputBtns.length;j++){
                    if(inputBtns[j]!==e.target){
                        inputBtns[j].classList.remove('changeColor')
                    }
                }
            }
        }
    }
    
    //Handle next button
        var nextBtn=document.getElementById('nextBtn')
        console.log(nextBtn.innerHTML)
        if(nextBtn.innerHTML=="Επόμενο »" || nextBtn.innerHTML=="Next »"){
            nextBtn.onclick=(e)=>{
                
                var count=0;
                
                for(var i=0;i<inputBtns.length;i++){
                    if(inputBtns[i].classList.contains('changeColor')){
                        count++
                        calculateData(inputBtns[i])
                    }
                }
                if(count==0 && inputBtns.length!=0){
                    if(window.location.hash=="#eng"){
                        alert("Choose one of the required options")
                    }else if(window.location.hash=="#gr" || !window.location.hash){
                        alert("Επιλέξτε κάποιο απτα απαιτούμενα πεδία")
                    }
                    
                }else if(inputBtns.length==0 && validateForm()){
                    nextPrev(1)
                    clickEventHandler(currentTab+1)
                }else if(!validateForm()) {
                    console.log("invalid")
                }else{
                    if(document.getElementById('metapoihsh').classList.contains('changeColor') && document.getElementById('ektr_businesses')){
                        document.getElementById('calc').removeChild(document.getElementById('numOfAnimals'))
                        document.getElementById('calc').style.position = "relative"
                        document.getElementById('calc').style.bottom = "15px"
                        document.getElementById("ektr_businesses").remove()
                        if(document.getElementById("meta_businesses")==null){
                            document.getElementById('fieldset').insertBefore(metaB_clone,document.getElementsByClassName("tab")[1])
                            
                        }
                        
                        nextPrev(1)
                        clickEventHandler(currentTab+1)
                        
                        
                    }else if(document.getElementById('ektrofi').classList.contains('changeColor') && document.getElementById('meta_businesses')){
                        if(!document.getElementById('calc').contains(document.getElementById('numOfAnimals'))){
                            document.getElementById('calc').insertBefore(numAnimals_clone,document.getElementById('calc').childNodes[0])
                            document.getElementById('calc').style.position = "relative"
                            document.getElementById('calc').style.bottom = "0px"
                        }
                        
                        document.getElementById('meta_businesses').remove()
                        if(document.getElementById("ektr_businesses")==null){
                            
                            document.getElementById('fieldset').insertBefore(ektrB_clone,document.getElementsByClassName("tab")[1])
                            
                        }
                        
                        nextPrev(1)
                        clickEventHandler(currentTab+1)
                        
                        
                    }else{
                        nextPrev(1)
                        clickEventHandler(currentTab+1)
                        
                    }
                    
                }
                /*nextBtn.style.backgroundColor="rgb(241, 235, 235)";
                nextBtn.style.color="black";
                nextBtn.style.transition="all 0.3s ease";*/
            
        }
    }else if((nextBtn.innerHTML.includes("Υπολογισμός") || nextBtn.innerHTML.includes("Calculate")) && currentTab==2){
        document.getElementById('posotites').placeholder=="Εισάγετε ποσότητες αποβλήτων m<sup>3</sup>"
        nextBtn.onclick=(e)=>{
            if(validateForm()){
                var res=ypologismos() 
                nextPrev(1)
                clickEventHandler(currentTab+1)
                if(window.location.hash=="#eng"){
                    document.getElementById('biogas_res').innerHTML="<span class='resultsTabSpecialText'  >"+res[0]+"</span> <span class='resultsTabText'  >m<sup>3</sup>/day</span>"
                    document.getElementById('apof_ekp_CO2').innerHTML="<span class='resultsTabSpecialText'  >"+res[1]+"</span> <span class='resultsTabText'  >kg/year</span>"
                    document.getElementById('kostos_kat').innerHTML="<span class='resultsTabSpecialText'  >"+res[2]+"</span> <span class='resultsTabText'  >€</span>"
                    document.getElementById('kostos_leit').innerHTML="<span class='resultsTabSpecialText'  >"+res[3]+"</span> <span class='resultsTabText'  >€/year</span>"
                }
                if(window.location.hash=="#gr" || !window.location.hash){
                    document.getElementById('biogas_res').innerHTML="<span class='resultsTabSpecialText'  >"+res[0]+"</span> <span class='resultsTabText'  >m<sup>3</sup>/day</span>"
                    document.getElementById('apof_ekp_CO2').innerHTML="<span class='resultsTabSpecialText'  >"+res[1]+"</span> <span class='resultsTabText'  >kg/year</span>"
                    document.getElementById('kostos_kat').innerHTML="<span class='resultsTabSpecialText'  >"+res[2]+"</span> <span class='resultsTabText'  >€</span>"
                    document.getElementById('kostos_leit').innerHTML="<span class='resultsTabSpecialText' >"+res[3]+"</span> <span class='resultsTabText'  >€/year</span>"
                }
                // #33b864;
            }
            
        }
    }else if((nextBtn.innerHTML.includes("Ξεκίνα πάλι") || nextBtn.innerHTML.includes("Restart")) && currentTab==3){
        nextBtn.onclick=(e)=>{
            nextPrev(-3)
            clickEventHandler(currentTab-3)
            
            for(var i=0;i<document.getElementsByClassName('step').length;i++){
                if(i!=0){
                    document.getElementsByClassName('step')[i].classList.remove('current')
                }
            }
        }
    }
    
        
    //Handle previous button
    prevBtn.onclick=()=>{
        nextPrev(-1)
        clickEventHandler(currentTab-1)
        document.getElementsByClassName("step")[currentTab].classList.remove("current");

        
        
    }
    
    nextBtn.ontouchend = () => {
        nextBtn.style.backgroundColor = "rgb(241, 235, 235)";
        nextBtn.style.color = "black";
        nextBtn.style.transition = "all 0.3s ease"

    };
    prevBtn.ontouchend = () => {
        prevBtn.style.backgroundColor = "rgb(241, 235, 235)";
        prevBtn.style.color = "black";
        prevBtn.style.transition = "all 0.3s ease"
    };
    

    

    
}
//Υπολογισμός δεδομένων Y, CH4
function calculateData(button){
    
    switch (button.value) {
        case "Αιγοπροβάτων":
        case "Sheep and Goats":
            Y = 150;
            CH4 = 0.55;
            break;
        case "Πουλερικών":
        case "Poultry":
            CH4 = 0.60;
            Y = 30;
            break;
        case "Χοιρινών":
        case "Pork":
            CH4 = 0.55;
            Y = 6;
            break;
        case "Βοοειδών Γαλακτοπαραγωγής":
        case "Dairy Cattle":
            CH4 = 0.60;
            Y = 20;
            break;
        case "Βοοειδών Κρεατοπαραγωγής":
        case "Beef Cattle":
            CH4 = 0.55;
            Y = 50;
            break;
        case "Παραγωγή Ελαιόλαδου":
        case "Olive Oil Production":
            CH4 = 0.65;
            Y = 70;
            break;
        case "Τυροκόμιση Γάλακτος":
        case "Milk Cheese Making":
            CH4 = 0.50;
            Y = 30;
            break;
        case "Προιόντα Αλευρόμυλων":
        case "Flour Mill Products":
            CH4 = 0.60;
            Y = 800;
            break;
        case "Επεξεργασία Κρέατος":
        case "Meat Processing":
            CH4 = 0.70;
            Y = 80;
            break;
    }
    

    return Y,CH4
}
//Υπολογισμός Δυναμικού Παραγωγής Βιοαερίου
function ypologismos(){
    //var numOfAnimals = parseInt(document.getElementById('numAnimals').value)
    
    var hmeresLeitourgias= parseInt(document.getElementById('hmeresleit').value)
    
    var posotites=parseInt(document.getElementById('posotites').value)
    QBGd=Y*posotites
    console.log(Y)
    var QBGyr=QBGd*365;
    var GHG =1.87*QBGyr*CH4*hmeresLeitourgias
    
    VDG=QBGd/1.35
    
    var a= -40*Math.log(VDG)+1000
    var CAPEX=a*VDG

    var kw=(-0.008*Math.log(VDG)+0.082)*VDG
    var OPEX_electr=20*kw*hmeresLeitourgias*0.15
    var OPEX_mech=-0.0046*Math.pow(VDG,2)+27.5*VDG-34.8
    var OPEX_monitor=1800*Math.log(VDG)-5300
    var OPEX_labor=10000*Math.log(VDG)-50000
    console.log("VDG: ",VDG)
    console.log("KW: ",kw)
    console.log("OPEX_electr: ",OPEX_electr)
    console.log("Opex_Mech: ",OPEX_mech)
    console.log("Opex_monitor: ",OPEX_monitor)
    console.log("Opex_Labor: ",OPEX_labor)
    console.log("A:",a)
    if(VDG<300){
        OPEX_labor=0;
    }
    var OPEX=OPEX_electr+OPEX_mech+OPEX_monitor+OPEX_labor
    return [QBGd,GHG.toFixed(3),CAPEX.toFixed(3),OPEX.toFixed(3)]

    
}





//Αλλαγή τίτλου στην κάθε σελίδα
function changeTitle(currentTab){
    if(window.location.hash=="#gr" || !window.location.hash){
        switch(currentTab){
            case 0: 
                title.innerHTML='<div style="text-decoration:underline;">Επιλέξτε είδος επιχείρησης</div>' 
                break;
            case 1: 
                title.innerHTML='<div style="text-decoration:underline;">Επιλέξτε επιχείρηση</div>'
                break;
            case 2: 
                title.innerHTML='<div style="text-decoration:underline;">Δώστε τα απαραίτητα δεδομένα </div><div class="noteForInputs" style="font-weight:normal;  text-decoration:none;">(Ποσότητες αποβλήτων <span style="text-decoration:none; font-style:italic;">ημερισίως</span> και ημέρες λειτουργίας <span style="text-decoration:none; font-style:italic;">ετησίως</span>)</div>'
                break;
            case 3: 
                title.innerHTML='<div style="text-decoration:underline;">Πίνακας αποτελεσμάτων</div>'
                break;
        }
    }else if(window.location.hash=="#eng" && window.location.hash){
        switch(currentTab){
            case 0: 
                title.innerHTML='<div style="text-decoration:underline;">Select type of service</div>' 
                break;
            case 1: 
                title.innerHTML='<div style="text-decoration:underline;">Select service</div>'
                break;
            case 2: 
                title.innerHTML='<div style="text-decoration:underline;">Provide the necessary data </div><div class="noteForInputs" style="font-weight:normal;  text-decoration:none;">(Amounts of waste <span style="text-decoration:none; font-style:italic;">per day</span> and operating days <span style="text-decoration:none; font-style:italic;">per year</span>)</div>'
                break;
            case 3: 
                title.innerHTML='<div style="text-decoration:underline;">Results table</div>'
                break;
        }
    }
    
}







