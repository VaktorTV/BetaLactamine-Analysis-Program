// ##### VARIABLES DEFINITION #####
function getInputForm()
{
  //Input Form Variables
  myForm = document.getElementById("myForm");
  molecule = document.getElementById("molecule").value;
  dose = document.getElementById("dose").value;
  frequence = document.getElementById("frequence").value;
  administrationdateday = document.getElementById("administrationDateDay").value;
  administrationdatemonth = document.getElementById("administrationDateMonth").value;
  administrationdateyear = document.getElementById("administrationDateYear").value;
  administrationtimehour = document.getElementById("administrationTimeHour").value;
  administrationtimemin = document.getElementById("administrationTimeMin").value;
  prelevementdateday = document.getElementById("prelevementDateDay").value;
  prelevementdatemonth = document.getElementById("prelevementDateMonth").value;
  prelevementdateyear = document.getElementById("prelevementDateYear").value;
  prelevementtimehour = document.getElementById("prelevementTimeHour").value;
  prelevementtimemin = document.getElementById("prelevementTimeMin").value;
  concentration = document.getElementById("concentration").value;
  bactery = document.getElementById("bactery").value;
  cmi = document.getElementById("cmi").value;
  dfg = document.getElementById("dfg").value;
  albumine = document.getElementById("albumine").value;
  //Calculated Variables
  deltat = ((prelevementdateday - administrationdateday)*24)+((prelevementdatemonth - administrationdatemonth)*30*24)+((prelevementdateyear - administrationdateyear)*365*24)+(prelevementtimehour - administrationtimehour)+((prelevementtimemin - administrationtimemin)/60);
  temps = (prelevementdateday - administrationdateday)+((prelevementdatemonth - administrationdatemonth)*30)+((prelevementdateyear - administrationdateyear)*365)+((prelevementtimehour - administrationtimehour)/24)+(((prelevementtimemin - administrationtimemin)/60)/24);
  fractionLibre = 0;
  concentrationTotale = 0;
  concentrationLibre = 0;
  demivie_theorique = 0;
  demivie_patient = demivie_theorique*(120/dfg);
  cres = concentration * (Math.exp((-Math.log(2))/(demivie_patient*deltat)));
  //Conditional Variables
  if (document.getElementById("administrationContinue").checked == true)
  {
    administrationmode = "continue";
  }
  else if (document.getElementById("administrationDiscontinue").checked == true)
  {
    administrationmode = "discontinue";
  }
  if (document.getElementById("dialysis").checked == true)
  {
    dialysis = "oui";
    tau = (24*7)/frequence;
  }
  else if (document.getElementById("dialysis").checked == false)
  {
    dialysis = "non";
    tau = 24/frequence;
  }
  if (document.getElementById("bacteriologyConnue").checked == true)
  {
    bacteriology = "connue";
  }
  else if (document.getElementById("bacteriologyInconnue").checked == true)
  {
    bacteriology = "inconnue";
  }
  if (document.getElementById("resistance").checked == true)
  {
    resistance = "resistant";
  }
  else if (document.getElementById("resistance").checked == false)
  {
    resistance = "sensible";
  }
  if (document.getElementById("incoherence").checked == true)
  {
    incoherence = "incoherent";
  }
  else if (document.getElementById("incoherence").checked == false)
  {
    incoherence = "coherent";
  }
  //Output Variables
  outputmolecule = document.getElementById("outputMolecule");
  outputadministrationmode = document.getElementById("outputAdministrationMode");
  outputdialysis = document.getElementById("outputDialysis");
  outputdose = document.getElementById("outputDose");
  outputadministrationdate = document.getElementById("outputAdministrationDate");
  outputadministrationtime = document.getElementById("outputAdministrationTime");
  outputprelevementdate = document.getElementById("outputPrelevementDate");
  outputprelevementtime = document.getElementById("outputPrelevementTime");
  outputconcentration = document.getElementById("outputConcentration");
  outputconcentrationlibre = document.getElementById("outputConcentrationLibre");
  outputbacteriology = document.getElementById("outputBacteriology");
  outputbactery = document.getElementById("outputBactery");
  outputcmi = document.getElementById("outputCMI");
  outputresistance = document.getElementById("outputResistance");
  outputrenalfunction = document.getElementById("outputRenalFunction");
  outputdfg = document.getElementById("outputDFG");
  outputalbumine = document.getElementById("outputAlbumine");
  outputincoherence = document.getElementById("outputIncoherence");
  output = document.getElementById("output");
  output2 = document.getElementById("output2");
  output3 = document.getElementById("output3");
}

// ##### FORM CLEAR #####
function clearForm()
{
  molecule = "";
  dose = 0;
  frequence = 0;
  administrationdateday = 0;
  administrationdatemonth = 0;
  administrationdateyear = 0;
  administrationtimehour = 0;
  administrationtimemin = 0;
  prelevementdateday = 0;
  prelevementdatemonth = 0;
  prelevementdateyear = 0;
  prelevementtimehour = 0;
  prelevementtimemin = 0;
  concentration = 0;
  bactery = "";
  cmi = 0;
  dfg = 0;
  albumine = 0;
  deltat = 0;
  temps = 0;
  fractionLibre = 0;
  concentrationTotale = 0;
  concentrationLibre = 0;
  demivie_theorique = 0;
  demivie_patient = 0;
  cres = 0;
  administrationmode = "";
  dialysis = "";
  tau = 0;
  bacteriology = "";
  resistance = "";
  incoherence = "";
  event.preventDefault();
  myForm.reset();
  location.reload();
}

// ##### OUTPUT CLEAR #####
function clearOutput()
{
  outputmolecule.innerHTML = "";
  outputadministrationmode.innerHTML = "";
  outputdialysis.innerHTML = "";
  outputdose.innerHTML = "";
  outputadministrationdate.innerHTML = "";
  outputadministrationtime.innerHTML = "";
  outputprelevementdate.innerHTML = "";
  outputprelevementtime.innerHTML = "";
  outputconcentration.innerHTML = "";
  outputconcentrationlibre.innerHTML = "";
  outputbacteriology.innerHTML = "";
  outputbactery.innerHTML = "";
  outputcmi.innerHTML = "";
  outputresistance.innerHTML = "";
  outputrenalfunction.innerHTML = "";
  outputdfg.innerHTML = "";
  outputalbumine.innerHTML = "";
  outputincoherence.innerHTML = "";
  output.innerHTML = "";
  output2.innerHTML = "";
  output3.innerHTML = "";
}

// ##### FORM INTERACTIVITY #####
function interactiveForm()
{
  //ALBUMINE DISPLAY
  if (document.getElementById("molecule").value == "céfazoline" || document.getElementById("molecule").value == "cefazoline" || document.getElementById("molecule").value == "Céfazoline" || document.getElementById("molecule").value == "Cefazoline" || document.getElementById("molecule").value == "CÉFAZOLINE" || document.getElementById("molecule").value == "CEFAZOLINE")
  {
    document.getElementsByClassName("albumine")[0].style.display = "block";
  }
  else
  {
    document.getElementsByClassName("albumine")[0].style.display = "none";
  }
  //ADMINISTRATION DATE DISPLAY
  if (document.getElementById("administrationContinue").checked == true)
  {
    document.getElementsByClassName("administrationDate")[0].style.display = "none";
  }
  else if (document.getElementById("administrationDiscontinue").checked == true)
  {
    document.getElementsByClassName("administrationDate")[0].style.display = "block";
  }
  //DIALYSIS DOSE UPDATE
  if (document.getElementById("dialysis").checked == true)
  {
    document.getElementsByClassName("frequence")[0].innerHTML = "fois par semaine";
  }
  else if (document.getElementById("dialysis").checked == false)
  {
    document.getElementsByClassName("frequence")[0].innerHTML = "fois par jour";
  }
  //BACTERY DISPLAY
  if (document.getElementById("bacteriologyConnue").checked == true)
  {
    document.getElementsByClassName("bacteriologyInformation")[0].style.display = "block";
  }
  else if (document.getElementById("bacteriologyInconnue").checked == true)
  {
    document.getElementsByClassName("bacteriologyInformation")[0].style.display = "none";
  }
}

// ##### SUBMIT FORM #####
function submit()
{
  getInputForm();
  clearOutput();
  analysis(molecule);
  clearForm();
}

// ##### FORM ANALYSIS #####
function analysis(molecule)
{
  switch (molecule)
  {
    case "amoxicilline":
      break;
    case "Amoxicilline":
      break;
    case "AMOXICILLINE":
      break;
    case "céfazoline":
      cefazoline();
      break;
    case "cefazoline":
      cefazoline();
      break;
    case "Céfazoline":
      cefazoline();
      break;
    case "Cefazoline":
      cefazoline();
      break;
    case "CÉFAZOLINE":
      cefazoline();
      break;
    case "CEFAZOLINE":
      cefazoline();
      break;
    case "céfépime":
      cefepime()
      break;
    case "cefepime":
      cefepime();
      break;
    case "Céfépime":
      cefepime()
      break;
    case "Cefepime":
      cefepime()
      break;
    case "CÉFÉPIME":
      cefepime()
      break;
    case "CEFEPIME":
      cefepime()
      break;
    case "céfotaxime":
      break;
    case "cefotaxime":
      break;
    case "Céfotaxime":
      break;
    case "Cefotaxime":
      break;
    case "CÉFOTAXIME":
      break;
    case "CEFOTAXIME":
      break;
    case "ceftazidime":
      demivie_theorique = 2;
      break;
    case "Ceftazidime":
      demivie_theorique = 2;
      break;
    case "CEFTAZIDIME":
      demivie_theorique = 2;
      break;
    case "ceftriaxone":
      demivie_theorique = 7.5;
      break;
    case "Ceftriaxone":
      demivie_theorique = 7.5;
      break;
    case "CEFTRIAXONE":
      demivie_theorique = 7.5;
      break;
    case "cloxacilline":
      break;
    case "Cloxacilline":
      break;
    case "CLOXACILLINE":
      break;
    case "ertapénème":
      break;
    case "ertapeneme":
      break;
    case "Ertapénème":
      break;
    case "Ertapeneme":
      break;
    case "ERTAPÉNÈME":
      break;
    case "ERTAPENEME":
      break;
    case "imipénème":
      break;
    case "imipeneme":
      break;
    case "Imipénème":
      break;
    case "Imipeneme":
      break;
    case "IMIPÉNÈME":
      break;
    case "IMIPENEME":
      break;
    case "méropénème":
      demivie_theorique = 1;
      break;
    case "meropeneme":
      demivie_theorique = 1;
      break;
    case "Méropénème":
      demivie_theorique = 1;
      break;
    case "Meropeneme":
      demivie_theorique = 1;
      break;
    case "MÉROPÉNÈME":
      demivie_theorique = 1;
      break;
    case "MEROPENEME":
      demivie_theorique = 1;
      break;
    case "pipéracilline":
      demivie_theorique = 1;
      break;
    case "piperacilline":
      demivie_theorique = 1;
      break;
    case "Pipéracilline":
      demivie_theorique = 1;
      break;
    case "Piperacilline":
      demivie_theorique = 1;
      break;
    case "PIPÉRACILLINE":
      demivie_theorique = 1;
      break;
    case "PIPERACILLINE":
      demivie_theorique = 1;
      break;
    default:
      alert("Veuillez entrer un nom de molecule correcte !");
      return false;
      break;
  }
}

// ##### MOLECULE FUNCTIONS #####

//Cefepime
function cefepime(administrationmode, dialysis, dose, frequence, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmi, resistance, dfg, incoherence)
{
  demivie_theorique = 2;
  fractionLibre = 0.8;
  // CONTINU CONNU DIALYSE RESISTANT INCOHERENT
  switch(administrationmode == "continue" && bacteriology == "connue" && dialysis == "oui" && resistance == "resistant" && incoherence == "incoherent")
  {
    alert("ERREUR : Un patient dialyse ne peut pas etre administre en continu !");
    event.preventDefault();
    location.reload();
  }
  // CONTINU CONNU DIALYSE RESISTANT COHERENT
  switch(administrationmode == "continue" && bacteriology == "connue" && dialysis == "oui" && resistance == "resistant" && incoherence == "coherent")
  {
    alert("ERREUR : Un patient dialyse ne peut pas etre administre en continu !");
    event.preventDefault();
    location.reload();
  }
  // CONTINU CONNU DIALYSE SENSIBLE INCOHERENT
  switch(administrationmode == "continue" && bacteriology == "connue" && dialysis == "oui" && resistance == "sensible" && incoherence == "incoherent")
  {
    alert("ERREUR : Un patient dialyse ne peut pas etre administre en continu !");
    event.preventDefault();
    location.reload();
  }
  // CONTINU CONNU DIALYSE SENSIBLE COHERENT
  switch(administrationmode == "continue" && bacteriology == "connue" && dialysis == "oui" && resistance == "sensible" && incoherence == "coherent")
  {
    alert("ERREUR : Un patient dialyse ne peut pas etre administre en continu !");
    event.preventDefault();
    location.reload();
  }
  // CONTINU CONNU NON-DIALYSE RESISTANT INCOHERENT
  switch(administrationmode == "continue" && bacteriology == "connue" && dialysis == "non" && resistance == "resistant" && incoherence == "incoherent")
  {
    concentrationLibre = concentration * fractionLibre;
    if (concentrationLibre < 4*cmi)
    {
      showOutput(" 1. " + incoherenceInt1  + incoherenceInt2 + incoherenceInt3, "2. " + resistanceInt,  "3. " + infraInt);
    }
    else
    {
      showOutput("Erreurs de donnees !", "", "");
    }
  }
  // CONTINU CONNU NON-DIALYSE RESISTANT COHERENT
  switch(administrationmode == "continue" && bacteriology == "connue" && dialysis == "non" && resistance == "resistant" && incoherence == "coherent")
  {
    concentrationLibre = concentration * fractionLibre;
    if (concentrationLibre < 4*cmi)
    {
      showOutput(" 1. " + resistanceInt, "2. " + infraInt, "");
    }
    else
    {
      showOutput("Erreurs de donnees !", "", "");
    }
  }
  // CONTINU CONNU NON-DIALYSE SENSIBLE INCOHERENT
  switch(administrationmode == "continue" && bacteriology == "connue" && dialysis == "non" && resistance == "sensible" && incoherence == "incoherent")
  {
    concentrationLibre = concentration * fractionLibre;
    if (concentrationLibre < 4*cmi)
    {
      showOutput(" 1. " + incoherenceInt1 + incoherenceInt2 + incoherenceInt3, "2. " + infraInt, "");
    }
    else if (concentration > 35)
    {
      if (8*cmi > 35)
      {
        if (dfg < 90)
        {
          if (dfg < 30)
          {
            showOutput(" 1. " + incoherenceSupraInt, " 2. " + highCmiInt, "3. " + highToxInt);
          }
          else
          {
            showOutput(" 1. " + incoherenceSupraInt, " 2. " + highCmiInt, "3. " + renalFuncInt);
          }
        }
        else
        {
          showOutput(" 1. " + incoherenceSupraInt, " 2. " + highCmiInt, "");
        }
      }
      else
      {
        if (concentration <= 45)
        {
          if (dfg < 90)
          {
            if (dfg < 30)
            {
              showOutput(" 1. " + incoherenceSupraInt, " 2. " + supra3545Int, "3. " + highToxInt);
            }
            else
            {
              showOutput(" 1. " + incoherenceSupraInt, " 2. " + supra3545Int, "3. " + renalFuncInt);
            }
          }
          else
          {
            showOutput(" 1. " + incoherenceSupraInt, " 2. " + supra3545Int, "");
          }
        }
        else if (concentration > 45 && concentration <= 60)
        {
          if (dfg < 90)
          {
            if (dfg < 30)
            {
              showOutput(" 1. " + incoherenceSupraInt, " 2. " + supra4560Int, "3. " + highToxInt);
            }
            else
            {
              showOutput(" 1. " + incoherenceSupraInt, " 2. " + supra4560Int, "3. " + renalFuncInt);
            }
          }
          else
          {
            showOutput(" 1. " + incoherenceSupraInt, " 2. " + supra4560Int, "");
          }
        }
        else
        {
          if (dfg < 90)
          {
            if (dfg < 30)
            {
              showOutput(" 1. " + incoherenceSupraInt, " 2. " + supra60Int, "3. " + highToxInt);
            }
            else
            {
              showOutput(" 1. " + incoherenceSupraInt, " 2. " + supra60Int, "3. " + renalFuncInt);
            }
          }
          else
          {
            showOutput(" 1. " + incoherenceSupraInt, " 2. " + supra60Int, "");
          }
        }
      }
    }
    else
    {
      showOutput("Erreurs de donnees !", "", "");
    }
  }
  // CONTINU CONNU NON-DIALYSE SENSIBLE COHERENT
  switch(administrationmode == "continue" && bacteriology == "connue" && dialysis == "non" && resistance == "sensible" && incoherence == "coherent")
  {
    concentrationLibre = concentration * fractionLibre;
    if (concentrationLibre < 4*cmi)
    {
      showOutput(" 1. " + infraInt, "", "");
    }
    else if (concentration > 35)
    {
      if (8*cmi > 35)
      {
        if (dfg < 90)
        {
          if (dfg < 30)
          {
            showOutput(" 1. " + highCmiInt, "2. " + highToxInt, "");
          }
          else
          {
            showOutput(" 1. " + highCmiInt, "2. " + renalFuncInt, "");
          }
        }
        else
        {
          showOutput(" 1. " + highCmiInt, "", "");
        }
      }
      else
      {
        if (concentration <= 45)
        {
          if (dfg < 90)
          {
            if (dfg < 30)
            {
              showOutput(" 1. " + supra3545Int, "2. " + highToxInt, "");
            }
            else
            {
              showOutput(" 1. " + supra3545Int, "2. " + renalFuncInt, "");
            }
          }
          else
          {
            showOutput(" 1. " + supra3545Int, "", "");
          }
        }
        else if (concentration > 45 && concentration <= 60)
        {
          if (dfg < 90)
          {
            if (dfg < 30)
            {
              showOutput(" 1. " + supra4560Int, "2. " + highToxInt, "");
            }
            else
            {
              showOutput(" 1. " + supra4560Int, "2. " + renalFuncInt, "");
            }
          }
          else
          {
            showOutput(" 1. " + supra4560Int, "", "");
          }
        }
        else
        {
          if (dfg < 90)
          {
            if (dfg < 30)
            {
              showOutput(" 1. " + supra60Int, "2. " + highToxInt, "");
            }
            else
            {
              showOutput(" 1. " + supra60Int, "2. " + renalFuncInt, "");
            }
          }
          else
          {
            showOutput(" 1. " + supra60Int, "", "");
          }
        }
      }
    }
    else if (concentration >= 4*cmi && concentration <= 35)
    {
      if (document.getElementById("dfg").value >= 90)
      {
        showOutput(" 1. : " + efficaceInt, "", "");
      }
      else if (document.getElementById("dfg").value < 90)
      {
        showOutput(" 1. : " + efficaceInt, renalFuncInt, "");
      }
    }
  }
  // CONTINU INCONNU DIALYSE RESISTANT INCOHERENT
  switch(administrationmode == "continue" && bacteriology == "inconnue" && dialysis == "oui" && resistance == "resistant" && incoherence == "incoherent")
  {
    alert("ERREUR : Un patient dialyse ne peut pas etre administre en continu !");
    event.preventDefault();
    location.reload();
  }
  // CONTINU INCONNU DIALYSE RESISTANT COHERENT
  switch(administrationmode == "continue" && bacteriology == "inconnue" && dialysis == "oui" && resistance == "resistant" && incoherence == "coherent")
  {
    alert("ERREUR : Un patient dialyse ne peut pas etre administre en continu !");
    event.preventDefault();
    location.reload();
  }
  // CONTINU INCONNU DIALYSE SENSIBLE INCOHERENT
  switch(administrationmode == "continue" && bacteriology == "inconnue" && dialysis == "oui" && resistance == "sensible" && incoherence == "incoherent")
  {
    alert("ERREUR : Un patient dialyse ne peut pas etre administre en continu !");
    event.preventDefault();
    location.reload();
  }
  // CONTINU INCONNU DIALYSE SENSIBLE COHERENT
  switch(administrationmode == "continue" && bacteriology == "inconnue" && dialysis == "oui" && resistance == "sensible" && incoherence == "coherent")
  {
    alert("ERREUR : Un patient dialyse ne peut pas etre administre en continu !");
    event.preventDefault();
    location.reload();
  }
  // CONTINU INCONNU NON-DIALYSE RESISTANT INCOHERENT
  switch(administrationmode == "continue" && bacteriology == "inconnue" && dialysis == "non" && resistance == "resistant" && incoherence == "incoherent")
  {
    if (concentration < 5)
    {
      showOutput(" 1. " + incoherenceInt1  + incoherenceInt2 + incoherenceInt3, "2. " + resistanceInt,  "3. " + infraInconnuInt);
    }
    else
    {
      showOutput("Erreurs de donnees !", "", "");
    }
  }
  // CONTINU INCONNU NON-DIALYSE RESISTANT COHERENT
  switch(administrationmode == "continue" && bacteriology == "inconnue" && dialysis == "non" && resistance == "resistant" && incoherence == "coherent")
  {
    if (concentration < 5)
    {
      showOutput(" 1. " + resistanceInt, "2. " + infraInconnuInt, "");
    }
    else
    {
      showOutput("Erreurs de donnees !", "", "");
    }
  }
  // CONTINU INCONNU NON-DIALYSE SENSIBLE INCOHERENT
  switch(administrationmode == "continue" && bacteriology == "inconnue" && dialysis == "non" && resistance == "sensible" && incoherence == "incoherent")
  {
    if (concentration < 5)
    {
      showOutput(" 1. " + incoherenceInt1 + incoherenceInt2 + incoherenceInt3, "2. " + infraInconnuInt, "");
    }
    else if (concentration > 35)
    {
      if (dfg < 90)
      {
        if (dfg < 30)
        {
          showOutput(" 1. " + incoherenceSupraInt, " 2. " + supraInconnuInt, "3. " + highToxInt);
        }
        else
        {
          showOutput(" 1. " + incoherenceSupraInt, " 2. " + supraInconnuInt, "3. " + renalFuncInt);
        }
      }
      else
      {
        showOutput(" 1. " + incoherenceSupraInt, " 2. " + supraInconnuInt, "");
      }
    }
    else
    {
      showOutput("Erreurs de donnees !", "", "");
    }
  }
  // CONTINU INCONNU NON-DIALYSE SENSIBLE COHERENT
  switch(administrationmode == "continue" && bacteriology == "inconnue" && dialysis == "non" && resistance == "sensible" && incoherence == "coherent")
  {
    if (concentration < 5)
    {
      showOutput(" 1. " + infraInconnuInt, "", "");
    }
    else if (concentration > 35)
    {
      if (dfg < 90)
      {
        if (dfg < 30)
        {
          showOutput(" 1. " + supraInconnuInt, "2. " + highToxInt, "");
        }
        else
        {
          showOutput(" 1. " + supraInconnuInt, "2. " + renalFuncInt, "");
        }
      }
      else
      {
        showOutput(" 1. " + supraInconnuInt, "", "");
      }
    }
    else if (concentration >= 5 && concentration <= 35)
    {
      if (document.getElementById("dfg").value >= 90)
      {
        showOutput(" 1. : " + efficaceInconnuInt, "", "");
      }
      else if (document.getElementById("dfg").value < 90)
      {
        showOutput(" 1. : " + efficaceInconnuInt, renalFuncInt, "");
      }
    }
  }
  // DISCONTINU CONNU DIALYSE RESISTANT INCOHERENT 
  switch(administrationmode == "discontinue" && bacteriology == "connue" && dialysis == "oui" && resistance == "resistant" && incoherence == "incoherent")
  {
    
  }
  // DISCONTINU CONNU DIALYSE RESISTANT COHERENT
  switch(administrationmode == "discontinue" && bacteriology == "connue" && dialysis == "oui" && resistance == "resistant" && incoherence == "coherent")
  {
    
  }
  // DISCONTINU CONNU DIALYSE SENSIBLE INCOHERENT
  switch(administrationmode == "discontinue" && bacteriology == "connue" && dialysis == "oui" && resistance == "sensible" && incoherence == "incoherent")
  {
    
  }
  // DISCONTINU CONNU DIALYSE SENSIBLE COHERENT
  switch(administrationmode == "discontinue" && bacteriology == "connue" && dialysis == "oui" && resistance == "sensible" && incoherence == "coherent")
  {
    
  }
  // DISCONTINU CONNU NON-DIALYSE RESISTANT INCOHERENT
  switch(administrationmode == "discontinue" && bacteriology == "connue" && dialysis == "non" && resistance == "resistant" && incoherence == "incoherent")
  {
    
  }
  // DISCONTINU CONNU NON-DIALYSE RESISTANT COHERENT
  switch(administrationmode == "discontinue" && bacteriology == "connue" && dialysis == "non" && resistance == "resistant" && incoherence == "coherent")
  {
    
  }
  // DISCONTINU CONNU NON-DIALYSE SENSIBLE INCOHERENT
  switch(administrationmode == "discontinue" && bacteriology == "connue" && dialysis == "non" && resistance == "sensible" && incoherence == "incoherent")
  {
    
  }
  // DISCONTINU CONNU NON-DIALYSE SENSIBLE COHERENT
  switch(administrationmode == "discontinue" && bacteriology == "connue" && dialysis == "non" && resistance == "sensible" && incoherence == "coherent")
  {
    
  }
  // DISCONTINU INCONNU DIALYSE RESISTANT INCOHERENT 
  switch(administrationmode == "discontinue" && bacteriology == "inconnue" && dialysis == "oui" && resistance == "resistant" && incoherence == "incoherent")
  {
    
  }
  // DISCONTINU INCONNU DIALYSE RESISTANT COHERENT
  switch(administrationmode == "discontinue" && bacteriology == "inconnue" && dialysis == "oui" && resistance == "resistant" && incoherence == "coherent")
  {
    
  }
  // DISCONTINU INCONNU DIALYSE SENSIBLE INCOHERENT
  switch(administrationmode == "discontinue" && bacteriology == "inconnue" && dialysis == "oui" && resistance == "sensible" && incoherence == "incoherent")
  {
    
  }
  // DISCONTINU INCONNU DIALYSE SENSIBLE COHERENT
  switch(administrationmode == "discontinue" && bacteriology == "inconnue" && dialysis == "oui" && resistance == "sensible" && incoherence == "coherent")
  {
    
  }
  // DISCONTINU INCONNU NON-DIALYSE RESISTANT INCOHERENT
  switch(administrationmode == "discontinue" && bacteriology == "inconnue" && dialysis == "non" && resistance == "resistant" && incoherence == "incoherent")
  {
    
  }
  // DISCONTINU INCONNU NON-DIALYSE RESISTANT COHERENT
  switch(administrationmode == "discontinue" && bacteriology == "inconnue" && dialysis == "non" && resistance == "resistant" && incoherence == "coherent")
  {
    
  }
  // DISCONTINU INCONNU NON-DIALYSE SENSIBLE INCOHERENT
  switch(administrationmode == "discontinue" && bacteriology == "inconnue" && dialysis == "non" && resistance == "sensible" && incoherence == "incoherent")
  {
    
  }
  // DISCONTINU INCONNU NON-DIALYSE SENSIBLE COHERENT
  switch(administrationmode == "discontinue" && bacteriology == "inconnue" && dialysis == "non" && resistance == "sensible" && incoherence == "coherent")
  {
    
  }
}

//Cefazoline
function cefazoline(administrationmode, dialysis, dose, frequence, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmi, resistance, dfg, albumine, incoherence)
{
  demivie_theorique = 1.66;
  fractionLibre = 0.2;
}