
var ektrB_clone=document.getElementById("ektr_businesses").cloneNode(true)
var metaB_clone=document.getElementById("meta_businesses").cloneNode(true)
var title=document.getElementById('title')

var currentTab = 0; // Current tab is set to be the first tab (0)

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
    document.getElementById("nextBtn").innerHTML = "Calculate";
    
  }else if(n==(x.length-1)){
    document.getElementById("nextBtn").innerHTML='Restart'
  } 
  else {
    document.getElementById("nextBtn").innerHTML = "Next";
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
    if (y[i].value == ""  ) {
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
        if(nextBtn.innerHTML=="Next"){
            nextBtn.onclick=(e)=>{
        var count=0;
        for(var i=0;i<inputBtns.length;i++){
            if(inputBtns[i].classList.contains('changeColor')){
                count++
                
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
                
                
                document.getElementById("ektr_businesses").remove()
                if(document.getElementById("meta_businesses")==null){
                    console.log(metaB_clone)
                    document.getElementById('fieldset').insertBefore(metaB_clone,document.getElementsByClassName("tab")[1])
                }
                
                nextPrev(1)
                clickEventHandler(currentTab+1)
                
            }else if(document.getElementById('ektrofi').classList.contains('changeColor') && document.getElementById('meta_businesses')){
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
    }else if(nextBtn.innerHTML=="Calculate" && currentTab==2){
        nextBtn.onclick=(e)=>{
            

            var res=calculate()
            nextPrev(1)
            clickEventHandler(currentTab+1)
            
            document.getElementById('biogas_res').innerHTML="Δυναμικό παραγωγής βιοαερίου: "+res
            document.getElementById('apof_ekp_CO2').innerHTML='Αποφυγή εκπομπών CO2: '
            document.getElementById('kostos_kat').innerHTML='Κόστος κατασκευής: '
            document.getElementById('kostos_leit').innerHTML='Κόστος λειτουργίας: '
        }
    }else if(nextBtn.innerHTML=='Restart' && currentTab==3){
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
//Calculate biogas
function calculate(){
    var numOfAnimals = parseInt(document.getElementById('numAnimals').value)
    
    var posotites=parseInt(document.getElementById('posotites').value)
    var biogas =posotites+numOfAnimals
    
    return biogas
    
}
//Change fieldset title of current tab
function changeTitle(currentTab){
    switch(currentTab){
        case 0: 
            title.innerHTML='Επέλεξε είδος επιχείρησης' 
            break;
        case 1: 
            title.innerHTML='Επέλεξε επιχείρηση'
            break;
        case 2: 
            title.innerHTML='Δώσε τα απαραίτητα δεδομένα'
            break;
        case 3: 
            title.innerHTML='Αποτελέσματα'
            break;
    }
}