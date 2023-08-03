
var ektrB_clone=document.getElementById("ektr_businesses").cloneNode(true)
var metaB_clone=document.getElementById("meta_businesses").cloneNode(true)
var numAnimals_clone=document.getElementById('numOfAnimals').cloneNode(true)
var title=document.getElementById('title')
var Y;
var QBGd; //Ημερήσια Παραγωγή Βιοαερίου
var currentTab = 0; // Current tab is set to be the first tab (0)
var CH4;
var VDG;

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
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 2)) {
    document.getElementById("nextBtn").innerHTML = "Υπολογισμός";
    
  }else if(n==(x.length-1)){
    document.getElementById("nextBtn").innerHTML="Ξεκίνησε πάλι"
  } 
  else {
    document.getElementById("nextBtn").innerHTML = "Επόμενο";
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
    if (y[i].value == "" || y[i].value<0 || (i==2 && y[i].value>365) ) {
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
        if(nextBtn.innerHTML=="Επόμενο"){
            nextBtn.onclick=(e)=>{
                
                var count=0;
                
                for(var i=0;i<inputBtns.length;i++){
                    if(inputBtns[i].classList.contains('changeColor')){
                        count++
                        calculateData(inputBtns[i])
                    }
                }
                if(count==0 && inputBtns.length!=0){
                    alert("Επιλέξτε κάποιο απτα απαιτούμενα πεδία")
                }else if(inputBtns.length==0 && validateForm()){
                    nextPrev(1)
                    clickEventHandler(currentTab+1)
                }else if(!validateForm()) {
                    console.log("invalid")
                }else{
                    if(document.getElementById('metapoihsh').classList.contains('changeColor') && document.getElementById('ektr_businesses')){
                        document.getElementById('calc').removeChild(document.getElementById('numOfAnimals'))
                        document.getElementById("ektr_businesses").remove()
                        if(document.getElementById("meta_businesses")==null){
                            document.getElementById('fieldset').insertBefore(metaB_clone,document.getElementsByClassName("tab")[1])
                            
                        }
                        
                        nextPrev(1)
                        clickEventHandler(currentTab+1)
                        
                        
                    }else if(document.getElementById('ektrofi').classList.contains('changeColor') && document.getElementById('meta_businesses')){
                        if(!document.getElementById('calc').contains(document.getElementById('numOfAnimals'))){
                            document.getElementById('calc').insertBefore(numAnimals_clone,document.getElementById('calc').childNodes[0])
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
            
    }
    }else if(nextBtn.innerHTML=="Υπολογισμός" && currentTab==2){
        nextBtn.onclick=(e)=>{
            if(validateForm()){
                var res=ypologismos()
                nextPrev(1)
                clickEventHandler(currentTab+1)
                document.getElementById('biogas_res').innerHTML="Δυναμικό παραγωγής βιοαερίου: "+res[0]+" m<sup>3</sup>/d"
                document.getElementById('apof_ekp_CO2').innerHTML='Αποφυγή εκπομπών CO2: '+res[1]+" kg/year"
                document.getElementById('kostos_kat').innerHTML='Κόστος κατασκευής: '+res[2]+" €"
                document.getElementById('kostos_leit').innerHTML='Κόστος λειτουργίας: '+res[3]+" €/year"
            }
            
        }
    }else if(nextBtn.innerHTML=="Ξεκίνησε πάλι" && currentTab==3){
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

    
}
//Υπολογισμός δεδομένων Y, CH4
function calculateData(button){
    
    switch(button.value){
        case "Αιγοπροβάτων":
            Y=150
            CH4=0.55
            break;
        case "Πουλερικών":
            CH4=0.60
            Y=30
            break;
        case "Χοιρινών":
            CH4=0.55
            Y=6
            break;
        case "Βοοειδών Γαλακτοπαραγωγής":
            CH4=0.60
            Y=20
            break;
        case "Βοοειδών Κρεατοπαραγωγής":
            CH4=0.55
            Y=50
            break;
        case "Παραγωγή Ελαιόλαδου":
            CH4=0.65
            Y=70
            break;
        case "Τυροκόμιση Γάλακτος":
            CH4=0.50
            Y=30
            break;
        case "Προιόντα Αλευρόμυλων":
            CH4=0.60
            Y=800
            break;
        case "Επεξεργασία Κρέατος":
            CH4=0.70
            Y=80
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


//Υπολογισμός Κόστους Λειτουργίας


//Αλλαγή τίτλου στην κάθε σελίδα
function changeTitle(currentTab){
    switch(currentTab){
        case 0: 
            title.innerHTML='Επιλέξτε είδος επιχείρησης' 
            break;
        case 1: 
            title.innerHTML='Επιλέξτε επιχείρηση'
            break;
        case 2: 
            title.innerHTML='Δώστε τα απαραίτητα δεδομένα'
            break;
        case 3: 
            title.innerHTML='Αποτελέσματα'
            break;
    }
}
