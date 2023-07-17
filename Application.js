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
  cmin = 0;
  cmax = 0;
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
  
  //Interpretation Variables
  interpretation1 = "1. Concentration ind\351tectable malgr\351 un traitement instaur\351 depuis " + temps + " jours (" + dose + " mg en administration " + administrationmode + ") et une fonction r\351nale normale. Un pr\351l\350vement de contr\364le est recommand\351 afin d'\351liminer un \351ventuel probl\350me pr\351-analytique (erreur d'identit\351, inversion de tube).\n\n2. Ce r\351sultat peut \352tre expliqu\351 soit par une r\351elle sous-exposition soit par une interf\351rence pr\351-analytique (mauvaise conservation du pr\351l\350vement lors de l'acheminement). Il doit \352tre confront\351 au contexte clinique (am\351lioration des sympt\364mes ?) et contr\364le si n\351cessaire. En cas de r\351ponse clinique insuffisante, une augmentation de la posologie est recommand\351e (par exemple [XX] mg x" + frequence + " / j) ainsi qu'un pr\351l\350vement de contr\364le 48h apr\350s le changement de dose. \n\n3. Concentration infra-th\351rapeutique coh\351rente avec un arr\352t du traitement depuis le [XX]/[XX] (date arr\352t traitement).";
  interpretation2 = "Devant les r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", r\351sistante au " + molecule + "), l'efficacit\351 du traitement par " + molecule + " ne peut \352tre assur\351e.";
  interpretation3 = "Concentration infra-th\351rapeutique au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Une adaptation de posologie est recommand\351e (par exemple [XX] mg/j) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
  interpretation4 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans l'h\351moculture du " + administrationdateday +"/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint propos\351 \340 " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration traduit une l\351g\350re surexposition. Toutefois, le seuil d'efficacit\351 cible (Concentration libre > 4xCMI soit Concentration totale > 40 mg/l) est sup\351rieur au seuil de toxicit\351 (35 mg/l). Une diminution de posologie ou un changement d'antibiotique sont \340 discuter.";
  interpretation5 = "Concentration anormalement \351lev\351e. Au vu des ant\351riorit\351s, du bilan r\351nal, de la posologie, et en l'absence d'effets ind\351sirables, un pr\351l\350vement de contr\364le est recommand\351 afin d'\351liminer une \351ventuelle interf\351rence pr\351-analytique (pr\351l\350vement au niveau de la perfusion " + administrationmode + " d'antibiotique ? ). Au contraire, si le(a) patient(e) pr\351sente des effets ind\351sirables, une adaptation de posologie est recommand\351e (par exemple XX mg) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
  interpretation6 = "Concentration sup\351rieure aux valeurs recommand\351es, associ\351e \340 un risque de neurotoxicit\351. Un arr\352t de la perfusion " + administrationmode + " pendant [XX] h suivie d'une reprise \340 posologie r\351duite (par exemple [XX] mg en perfusion " + administrationmode + ") est recommand\351, associ\351s \340 un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
  interpretation7 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + "  mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration traduit une l\351g\350re surexposition. Une diminution de posologie (par exemple [XX] mg) est \340 discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicit\351). En cas de modification de posologie, un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose est recommand\351.";
  interpretation8 = "Concentration sup\351rieure aux valeurs recommand\351es, associ\351e \340 un risque de neurotoxicit\351. En l'absence de modification de la fonction r\351nale, une diminution de la posologie (par exemple [XX] mg) est recommand\351e, suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
  interpretation9 = "1. Concentration sup\351rieure aux valeurs recommand\351es, associ\351e \340 un risque de neurotoxicit\351. Un arr\352t de la perfusion " + administrationmode + " pendant [XX] h suivie d'une reprise \340 posologie r\351duite (par exemple [XX] mg) est recommand\351, associ\351s \340 un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose. \n\n2. Concentration sup\351rieure aux valeurs recommand\351es, associ\351e \340 un risque accru de neurotoxicit\351. Un arr\352t de la perfusion " + administrationmode + " pendant [XX] heures est souhaitable, associ\351 \340 2 pr\351l\350vements sanguins : le premier au moment de l'arr\352t de la perfusion de " + molecule + " et le second avant reprise de la perfusion. Ces pr\351l\350vements permettront d'estimer la demi-vie d'\351limination du " + molecule + " chez ce patient en vue d'affiner son sch\351ma posologique.";
  interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
  interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
  interpretation12 = "";
   interpretation13 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + "  mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs cette concentration est sup\351rieure aux valeurs recommand\351es, pouvant \352tre \340 l'origine d'une toxicit\351 (neurotoxicit\351 principalement). Une adaptation de posologie est recommand\351e (par exemple [XX] mg x" + frequence + " / j) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
   interpretation14 = "La concentration mesur\351e traduit une exposition en " + molecule + " en ad\351quation avec l'exposition attendue chez les patients dialys\351s (20-30 mg/L).";
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
  cmin = 0;
  cmax = 0;
  event.preventDefault();
  myForm.reset();
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
}

// ##### CLEAR ALL #####
function clearAll()
{
  clearOutput();
  clearForm();
  location.reload();
}

function showOutput(interpretation)
{
  outputmolecule.innerHTML = "TRAITEMENT : " + molecule;
  outputadministrationmode.innerHTML = "MODE D'ADMINISTRATION : " + administrationmode;
  outputdialysis.innerHTML = "PATIENT DIALYSE : " + dialysis;
  if (dialysis == "oui")
  {
    outputdose.innerHTML = "DOSE : " + dose + " mg " + frequence + " fois par semaine";
  }
  else
  {
    outputdose.innerHTML = "DOSE : " + dose + " mg " + frequence + " fois par jour";
  }
  if (administrationmode == "discontinue")
  {
    outputadministrationdate.innerHTML = "DATE D'ADMINISTRATION : " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear;
    outputadministrationtime.innerHTML = "HEURE D'ADMINISTRATION : " + administrationtimehour + ":" + administrationtimemin;
  }
  outputprelevementdate.innerHTML = "DATE DE PRELEVEMENT : " + prelevementdateday + "/" + prelevementdatemonth + "/" + prelevementdateyear;
  outputprelevementtime.innerHTML = "HEURE DE PRELEVEMENT : " + prelevementtimehour + ":" + prelevementtimemin;
  if (administrationmode == "continue")
  {
    outputconcentration.innerHTML = "CONCENTRATION A L'EQUILIBRE : " + concentration + " mg/L";
  }
  else if (administrationmode == "discontinue")
  {
    if (administrationdateday == "" || administrationdatemonth == "" || administrationdateyear == "" || administrationtimehour == "" || administrationtimemin == "" || prelevementdateday == "" || prelevementdatemonth == "" || prelevementdateyear == "" || prelevementtimehour == "" || prelevementtimemin == "")
    {
      outputconcentration.innerHTML = "CONCENTRATION : donnees manquantes, impossible de determiner si la concentration residuelle est vraie ou non";
      outputconcentration.innerHTML = "INTERPRETATIONS : Donnees sur la concentration manquante, de ce fait il est difficile d'interpreter les resultats.";
    }
    else
    {
      if (dfg == 0 || dfg == "")
      {
        outputconcentration.innerHTML = "CONCENTRATION : donnees manquantes, impossible de determiner si la concentration residuelle est vraie ou non";
        outputconcentration.innerHTML = "INTERPRETATIONS : Donnees sur la concentration manquante, de ce fait il est difficile d'interpreter les resultats.";
      }
      else
      {
        if (deltat < tau)
        {
        outputconcentration.innerHTML = "CONCENTRATION RESIDUELLE CALCULEE/ESTIMEE : " + cres + " mg/L";
        }
        else
        {
          outputconcentration.innerHTML = "CONCENTRATION RESIDUELLE VRAIE : " + concentration + " mg/L";
        }
      }
    }
  }
  if (concentrationLibre != 0 || concentrationLibre != "")
  {
     outputconcentrationlibre.innerHTML = "CONCENTRATION LIBRE : " + concentrationLibre + " mg/L";
  }
  else if (concentrationLibre == 0 || concentrationLibre == "")
  {
    outputconcentrationlibre.innerHTML = "";
  }
  if (bacteriology == "connue")
  {
    outputbacteriology.innerHTML = "BACTERIOLOGIE : connue";
    outputbactery.innerHTML = "BACTERIE : " + bactery;
    outputcmi.innerHTML = "CMI : " + cmi + " mg/L";
    if (resistance == "resistant")
    {
      outputresistance.innerHTML = "GERME RESISTANT";
    }
    else
    {
      outputresistance.innerHTML = "GERME SENSIBLE";
    }
  }
  else if (bacteriology == "inconnue")
  {
    outputbacteriology.innerHTML = "BACTERIOLOGIE : inconnue";
    outputbactery.innerHTML = "";
    outputcmi.innerHTML = "";
    outputresistance.innerHTML = "";
  }
  if (dfg >= 90)
  {
    outputrenalfunction.innerHTML = "FONCTION RENALE : normale";
  }
  else if (dfg >= 60 && dfg < 90)
  {
    outputrenalfunction.innerHTML = "FONCTION RENALE : insuffisance renale legere";
  }
  else if (dfg >= 30 && dfg < 60)
  {
    outputrenalfunction.innerHTML = "FONCTION RENALE : insuffisance renale moderee";
  }
  else if (dfg >= 15 && dfg < 30)
  {
    outputrenalfunction.innerHTML = "FONCTION RENALE : insuffisance renale severe";
  }
  else if (dfg < 15)
  {
    outputrenalfunction.innerHTML = "FONCTION RENALE : insuffisance renale terminale";
  }
  outputdfg.innerHTML = "DFG : " + dfg + " L/h";
  if (molecule == "cefazoline" || molecule == "céfazoline" || molecule == "Cefazoline" || molecule == "Céfazoline" || molecule == "CEFAZOLINE" || molecule == "CÉFAZOLINE")
  {
    outputalbumine.innerHTML = "Albuminemie : " + albumine + " g/L";
  }
  else
  {
    outputalbumine.innerHTML = "";
  }
  if (incoherence == "incoherent")
  {
    outputincoherence.innerHTML = "INCOHERENCE AVEC FONCTION RENALE ET ANTERIORITES : oui";
  }
  else
  {
    outputincoherence.innerHTML = "INCOHERENCE AVEC FONCTION RENALE ET ANTERIORITES : non";
  }
  output.innerHTML = "INTERPRETATIONS : " + interpretation;
}

// ##### FORM INTERACTIVITY #####
function interactiveForm()
{
  //ALBUMINE DISPLAY
  if (document.getElementById("molecule").value == "c\351fazoline" || document.getElementById("molecule").value == "cefazoline" || document.getElementById("molecule").value == "C\351fazoline" || document.getElementById("molecule").value == "Cefazoline" || document.getElementById("molecule").value == "C\311FAZOLINE" || document.getElementById("molecule").value == "CEFAZOLINE")
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
function submitForm()
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
    case "c\351fazoline":
      cefazoline();
      break;
    case "cefazoline":
      cefazoline();
      break;
    case "C\351fazoline":
      cefazoline();
      break;
    case "Cefazoline":
      cefazoline();
      break;
    case "C\311FAZOLINE":
      cefazoline();
      break;
    case "CEFAZOLINE":
      cefazoline();
      break;
    case "c\351f\351pime":
      cefepime(administrationmode, dialysis, dose, frequence, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmi, resistance, dfg, incoherence);
      break;
    case "cefepime":
      cefepime(administrationmode, dialysis, dose, frequence, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmi, resistance, dfg, incoherence);
      break;
    case "C\351f\351pime":
      cefepime(administrationmode, dialysis, dose, frequence, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmi, resistance, dfg, incoherence);
      break;
    case "Cefepime":
      cefepime(administrationmode, dialysis, dose, frequence, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmi, resistance, dfg, incoherence);
      break;
    case "C\311F\311PIME":
      cefepime(administrationmode, dialysis, dose, frequence, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmi, resistance, dfg, incoherence);
      break;
    case "CEFEPIME":
      cefepime(administrationmode, dialysis, dose, frequence, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmi, resistance, dfg, incoherence);
      break;
    case "c\351fotaxime":
      break;
    case "cefotaxime":
      break;
    case "C\351fotaxime":
      break;
    case "Cefotaxime":
      break;
    case "C\311FOTAXIME":
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
    case "ertap\351n\350me":
      break;
    case "ertapeneme":
      break;
    case "Ertap\351n\350me":
      break;
    case "Ertapeneme":
      break;
    case "ERTAP\311N\310ME":
      break;
    case "ERTAPENEME":
      break;
    case "imip\351n\350me":
      break;
    case "imipeneme":
      break;
    case "Imip\351n\350me":
      break;
    case "Imipeneme":
      break;
    case "IMIP\311N\310ME":
      break;
    case "IMIPENEME":
      break;
    case "m\351rop\351n\350me":
      demivie_theorique = 1;
      break;
    case "meropeneme":
      demivie_theorique = 1;
      break;
    case "M\351rop\351n\350me":
      demivie_theorique = 1;
      break;
    case "Meropeneme":
      demivie_theorique = 1;
      break;
    case "M\311ROP\311N\310ME":
      demivie_theorique = 1;
      break;
    case "MEROPENEME":
      demivie_theorique = 1;
      break;
    case "pip\351racilline":
      demivie_theorique = 1;
      break;
    case "piperacilline":
      demivie_theorique = 1;
      break;
    case "Pip\351racilline":
      demivie_theorique = 1;
      break;
    case "Piperacilline":
      demivie_theorique = 1;
      break;
    case "PIP\311RACILLINE":
      demivie_theorique = 1;
      break;
    case "PIPERACILLINE":
      demivie_theorique = 1;
      break;
    default:
      alert("Veuillez entrer un nom de mol\351cule correcte !");
      return false;
      break;
  }
  return molecule;
}

// ##### MOLECULE FUNCTIONS #####

//Cefepime
function cefepime(administrationmode, dialysis, dose, frequence, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmi, resistance, dfg, incoherence)
{
  fractionLibre = 0.8;
  cmin = 5;
  cmax = 35;
  if (administrationmode == "continue")
  {
    if (bacteriology == "connue")
    {
      concentrationLibre = concentration * fractionLibre;
      if (concentrationLibre < 4*cmi)
      {
        if (incoherence == "incoherent")
        {
          showOutput(interpretation1);
        }
        else if (incoherence == "coherent")
        {
          if (resistance == "resistant")
          {
            showOutput(interpretation2);
          }
          else if (resistance == "sensible")
          {
            showOutput(interpretation3);
          }
        }
      }
      else if (concentration > 35)
      {
        if (8*cmi > 35)
        {
          showOutput(interpretation4);
        }
        else
        {
          if (incoherence == "incoherent")
          {
            if (dfg >= 90)
            {
              showOutput(interpretation5);
            }
            else if (dfg < 90)
            {
              if (dfg < 30)
              {
                showOutput(interpretation6);
              }
              else if (dfg >= 30)
              {
                showOutput(interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
              }
            }
          }
          else if (incoherence == "coherent")
          {
            if (dfg >= 90)
            {
              if (concentration > 35 && concentration <= 45)
              {
                showOutput(interpretation7);
              }
              else if (concentration > 45 && concentration <= 60)
              {
                showOutput(interpretation8);
              }
              else if (concentration > 60)
              {
                showOutput(interpretation9);
              }
            }
            else if (dfg < 90)
            {
              if (dfg < 30)
              {
                showOutput(interpretation6);
              }
              else if (dfg  >= 30)
              {
                if (concentration > 35 && concentration <= 45)
                {
                  showOutput(interpretation7 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
                }
                else if (concentration > 45 && concentration <= 60)
                {
                  showOutput(interpretation8 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
                }
                else if (concentration > 60)
                {
                  showOutput(interpretation9 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
                }
              }
            }
          }
        }
      }
      else if (concentration <= 35 && concentrationLibre >= 4*cmi)
      {
        if (dfg >= 90)
        {
          showOutput(interpretation10);
        }
        else if (dfg < 90)
        {
          showOutput(interpretation11);
        }
      }
    }
    else if (bacteriology == "inconnue")
    {
      if (concentration < 5)
      {
        if (incoherence == "incoherent")
        {
          showOutput(interpretation1);
        }
        else
        {
          interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
          showOutput(interpretation12);
        }
      }
      else if (concentration > 35)
      {
        if (incoherence == "incoherent")
        {
          if (dfg >= 90)
          {
            showOutput(interpretation5);
          }
          else if (dfg < 90)
          {
            if (dfg < 30)
            {
              showOutput(interpretation6);
            }
            else if (dfg >= 30)
            {
              showOutput(interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
            }
          }
        }
        else if (incoherence == "coherent")
        {
          if (dfg >= 90)
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
            showOutput(interpretation12);
          }
          else if (dfg < 90)
          {
            if (dfg < 30)
            {
              showOutput(interpretation6);
            }
            else if (dfg >= 30)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation12 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
            }
          }
        }
      }
      else
      {
        if (dfg < 90)
        {
          interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
          showOutput(interpretation12 + "Attention il est \340 noter une alt\351ration de la fonction r\351nale.");
        }
        else if (dfg >= 90)
        {
          interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
          showOutput(interpretation12);
        }
      }
    }
  }
  else if (administrationmode == "discontinue")
  {
    demivie_theorique = 2;
    demivie_patient = demivie_theorique*(120/dfg);
    deltat = ((prelevementdateday - administrationdateday)*24)+((prelevementdatemonth - administrationdatemonth)*30*24)+((prelevementdateyear - administrationdateyear)*365*24)+(prelevementtimehour - administrationtimehour)+((prelevementtimemin - administrationtimemin)/60);
    cres = concentration * (Math.exp((-Math.log(2))/(demivie_patient*deltat)));
    if (dialysis == "oui")
    {
      tau = (7*24)/frequence;
    }
    else if (dialysis == "non")
    {
      tau = 24/frequence;
    }
    if (deltat < tau)
    {
      if (dialysis == "oui")
      {
        if (bacteriology == "connue")
        {
          if (cres < 20)
          {
            showOutput(interpretation3);
          }
          else if (cres > 30)
          {
            showOutput(interpretation13);
          }
          else
          {
            showOutput(interpretation14);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 20)
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
            showOutput(interpretation12);
          }
          else if (cres > 30)
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
            showOutput(interpretation12);
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation12 + "\n\n" + interpretation14);
          }
        }
      }
      else if (dialysis == "non")
      {
        if (bacteriology == "connue")
        {
          concentrationLibre = cres * fractionLibre;
          if (concentrationLibre < 4*cmi)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation3);
              }
            }
          }
          if (cres > 20)
          {
            if (4*cmi > 20)
            {
              showOutput(interpretation4);
            }
            else
            {
              if (incoherence == "incoherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation5);
                }
                else if (dfg < 90)
                {
                  showOutput(interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                }
              }
              else if (incoherence == "coherent")
              {
                if (dfg >= 90)
                {
                  if (cres > 20 && cres <= 30)
                  {
                    showOutput(interpretation7);
                  }
                  else if (cres > 30 && cres <= 60)
                  {
                    showOutput(interpretation8);
                  }
                  else if (cres > 60)
                  {
                    showOutput(interpretation9);
                  }
                }
                else if (dfg < 90)
                {
                  if (cres > 20 && cres <= 30)
                  {
                    showOutput(interpretation7 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                  else if (cres > 30 && cres <= 60)
                  {
                    showOutput(interpretation8 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                  else if (cres > 60)
                  {
                    showOutput(interpretation9 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
            }
          }
          else if (cres <= 20 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              showOutput(interpretation10);
            }
            else if (dfg < 90)
            {
              showOutput(interpretation11);
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 5)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation12);
            }
          }
          else if (cres > 20)
          {
            if (incoherence == "incoherent")
            {
              if (dfg >= 90)
              {
                showOutput(interpretation5);
              }
              else if (dfg < 90)
              {
                showOutput(interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
              }
            }
            else if (incoherence == "coherent")
            {
              if (dfg >= 90)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12);
              }
              else if (dfg < 90)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12 + " Une alteration de la fonction r\351nale peut expliquer ce r\351sultat.");
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation12 + "Attention il est \340 noter une alt\351ration de la fonction r\351nale.");
            }
            else if (dfg >= 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation12);
            }
          }
        }
      }
    }
    else
    {
      if (dialysis == "oui")
      {
        if (bacteriology == "connue")
        {
          if (concentration < 20)
          {
            showOutput(interpretation3);
          }
          else if (concentration > 30)
          {
            showOutput(interpretation13);
          }
          else
          {
            showOutput(interpretation14);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 20)
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
            showOutput(interpretation12);
          }
          else if (concentration > 30)
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
            showOutput(interpretation12);
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation12 + "\n\n" + interpretation14);
          }
        }
      }
      else if (dialysis == "non")
      {
        if (bacteriology == "connue")
        {
          concentrationLibre = concentration * fractionLibre;
          if (concentrationLibre < 4*cmi)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation3);
              }
            }
          }
          if (concentration > 20)
          {
            if (4*cmi > 20)
            {
              showOutput(interpretation4);
            }
            else
            {
              if (incoherence == "incoherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation5);
                }
                else if (dfg < 90)
                {
                  showOutput(interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                }
              }
              else if (incoherence == "coherent")
              {
                if (dfg >= 90)
                {
                  if (concentration > 20 && concentration <= 30)
                  {
                    showOutput(interpretation7);
                  }
                  else if (concentration > 30 && concentration <= 60)
                  {
                    showOutput(interpretation8);
                  }
                  else if (concentration > 60)
                  {
                    showOutput(interpretation9);
                  }
                }
                else if (dfg < 90)
                {
                  if (concentration > 20 && concentration <= 30)
                  {
                    showOutput(interpretation7 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                  else if (concentration > 30 && concentration <= 60)
                  {
                    showOutput(interpretation8 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                  else if (concentration > 60)
                  {
                    showOutput(interpretation9 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
            }
          }
          else if (concentration <= 20 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              showOutput(interpretation10);
            }
            else if (dfg < 90)
            {
              showOutput(interpretation11);
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 5)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation12);
            }
          }
          else if (concentration > 20)
          {
            if (incoherence == "incoherent")
            {
              if (dfg >= 90)
              {
                showOutput(interpretation5);
              }
              else if (dfg < 90)
              {
                showOutput(interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
              }
            }
            else if (incoherence == "coherent")
            {
              if (dfg >= 90)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12);
              }
              else if (dfg < 90)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12 + " Une alt\351ration de la fonction r\351nale peut expliquer ce r\351sultat.");
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation12 + "Attention il est \340 noter une alt\351ration de la fonction r\351nale.");
            }
            else if (dfg >= 90)
            {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation12);
            }
          }
        }
      }
    }
  }
}

//Cefazoline
function cefazoline(administrationmode, dialysis, dose, frequence, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmi, resistance, dfg, albumine, incoherence)
{
  demivie_theorique = 1.66;
  fractionLibre = 0.2;
}