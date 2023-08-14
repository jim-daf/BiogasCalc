
var dataReload=document.querySelectorAll("[data-reload]")
    
    var languages={
        eng:{
            headtitle:"Calculation of CO2 & Biogas",
            typeOfService1:"Processing",
            typeOfService2:"Animal breeding",
            service1:"Olive Oil Production",
            service2:"Milk Cheese Making",
            service3:"Flour Mill Products",
            service4:"Meat Processing",
            service5:"Sheep and Goats",
            service6:"Poultry",
            service7:"Pork",
            service8:"Dairy Cattle",
            service9:"Beef Cattle",
            input1:"Enter number of animals",
            input2:"Enter waste quantities",
            input3:"Enter days of operation",
            result1:"Biogas production potential:",
            result2:"Avoidance of CO2 emissions:",
            result3:"Construction cost:",
            result4:"Operating costs:",
            previous:"« Previous",
            home:"Home",
            visitSite:"Visit our website",
            mobile:"Download for mobile",
            android:"Android",
            ios:"IOS",
            manual:"User Manual"
        },
        gr:{
            headtitle:"Υπολογισμός CO2 & Βιοαερίου",
            typeOfService1:"Μεταποίηση",
            typeOfService2:"Εκτροφή ζώων",
            service1:"Παραγωγή Ελαιόλαδου",
            service2:"Τυροκόμιση Γάλακτος",
            service3:"Προιόντα Αλευρόμυλων",
            service4:"Επεξεργασία Κρέατος",
            service5:"Αιγοπροβάτων",
            service6:"Πουλερικών",
            service7:"Χοιρινών",
            service8:"Βοοειδών Γαλακτοπαραγωγής",
            service9:"Βοοειδών Κρεατοπαραγωγής",
            input1:"Εισάγετε αριθμό ζώων",
            input2:"Εισάγετε ποσότητες αποβλήτων",
            input3:"Εισάγετε ημέρες λειτουργίας",
            result1:"Δυναμικό παραγωγής βιοαερίου:",
            result2:"Αποφυγή εκπομπών CO2:",
            result3:"Κόστος κατασκευής:",
            result4:"Κόστος λειτουργίας:",
            previous:"« Προηγούμενο",
            home:"Αρχική",
            visitSite:"Επισκεφθείτε την ιστοσελίδα μας",
            mobile:"Mobile έκδοση εφαρμογής",
            android:"Για Android",
            ios:"Για IOS",
            manual:"Εγχειρίδιο χρήσης"
        }
}

function setLanguage(language) {
        if (language === 'eng') {
            headtitle.textContent = languages.eng.headtitle;
            metapoihsh.value = languages.eng.typeOfService1;
            ektrofi.value = languages.eng.typeOfService2;
            par_el.value = languages.eng.service1
            tyr_gal.value = languages.eng.service2
            pro_ale.value = languages.eng.service3
            epe_kre.value = languages.eng.service4
            aigoprovata.value = languages.eng.service5
            poulerika.value = languages.eng.service6
            xoirina.value = languages.eng.service7
            vooeidi_gal.value = languages.eng.service8
            vooeidi_kreat.value = languages.eng.service9
            numAnimals.placeholder = languages.eng.input1
            posotites.placeholder = languages.eng.input2
            hmeresleit.placeholder = languages.eng.input3
            prevBtn.textContent = languages.eng.previous
            home.textContent = languages.eng.home
            manual.textContent = languages.eng.manual
            mobile.textContent = languages.eng.mobile
            android.textContent = languages.eng.android
            ios.textContent = languages.eng.ios
            visitSite.textContent = languages.eng.visitSite
        }
        if (language === 'gr') {
            headtitle.textContent = languages.gr.headtitle;
            metapoihsh.value = languages.gr.typeOfService1;
            ektrofi.value = languages.gr.typeOfService2;
            par_el.value = languages.gr.service1
            tyr_gal.value = languages.gr.service2
            pro_ale.value = languages.gr.service3
            epe_kre.value = languages.gr.service4
            aigoprovata.value = languages.gr.service5
            poulerika.value = languages.gr.service6
            xoirina.value = languages.gr.service7
            vooeidi_gal.value = languages.gr.service8
            vooeidi_kreat.value = languages.gr.service9
            numAnimals.placeholder = languages.gr.input1
            posotites.placeholder = languages.gr.input2
            hmeresleit.placeholder = languages.gr.input3
            prevBtn.textContent = languages.gr.previous
            home.textContent = languages.gr.home
            manual.textContent = languages.gr.manual  
            mobile.textContent = languages.gr.mobile
            android.textContent = languages.gr.android
            ios.textContent = languages.gr.ios
            visitSite.textContent = languages.gr.visitSite
        }
    }

    if (window.location.hash) {
        setLanguage(window.location.hash.slice(1)); // Set language based on URL hash
    }
    
    for (var i = 0; i < dataReload.length; i++) {
        dataReload[i].onclick = function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            var language = this.getAttribute('href').slice(1); // Get language from href attribute
            
            window.location.hash = language; // Set URL hash
            location.reload(true);
            setLanguage(language);
        };
    }








