// ##### VARIABLES DEFINITION #####
function getInputForm()
{
  //Input Form Variables
  myForm = document.getElementById("myForm");
  molecule = document.getElementById("molecule").value;
  dose = document.getElementById("dose").value;
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
  if (document.getElementById("adulteIV").checked == true)
  {
    demivie_theorique = 0.66;
  }
  else if (document.getElementById("adulteIM").checked == true)
  {
    demivie_theorique = 1.33;
  }
  else if (document.getElementById("enfant").checked == true)
  {
    demivie_theorique = 1;
  }
  else if (document.getElementById("nouveaune").checked == true)
  {
    demivie_theorique = 2;
  }
  else if (document.getElementById("premature").checked == true)
  {
    demivie_theorique = 3.5;
  }
  if (document.getElementById("administrationContinue").checked == true)
  {
    administrationmode = "continue";
    frequence = 1;
  }
  else if (document.getElementById("administrationDiscontinue").checked == true)
  {
    administrationmode = "discontinue";
    frequence = document.getElementById("frequence").value;
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
    document.getElementById("cmiConnu").checked = true; //prevent Form to not get submitted if bacteriology unknown
  }
  if (document.getElementById("resistance").checked == true)
  {
    resistance = "resistant";
  }
  else if (document.getElementById("resistance").checked == false)
  {
    resistance = "sensible";
  }
  if (document.getElementById("cmiConnu").checked == true)
  {
    cmimode = "cmi";
  }
  else if (document.getElementById("cmiInconnu").checked == true)
  {
    cmimode = "breakpoint";
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
  if (dialysis == "oui")
  {
    interpretation1 = "1. Concentration ind\351tectable malgr\351 un traitement instaur\351 depuis " + temps + " jours (" + dose + " mg en administration " + administrationmode + ") et une fonction r\351nale normale. Un pr\351l\350vement de contr\364le est recommand\351 afin d'\351liminer un \351ventuel probl\350me pr\351-analytique (erreur d'identit\351, inversion de tube).<br><br>2. Ce r\351sultat peut \352tre expliqu\351 soit par une r\351elle sous-exposition soit par une interf\351rence pr\351-analytique (mauvaise conservation du pr\351l\350vement lors de l'acheminement). Il doit \352tre confront\351 au contexte clinique (am\351lioration des sympt\364mes ?) et contr\364le si n\351cessaire. En cas de r\351ponse clinique insuffisante, une augmentation de la posologie est recommand\351e (par exemple [XX] mg x" + frequence + " / semaine) ainsi qu'un pr\351l\350vement de contr\364le 48h apr\350s le changement de dose. <br><br>3. Concentration infra-th\351rapeutique coh\351rente avec un arr\352t du traitement depuis le [XX]/[XX] (date arr\352t traitement).";
    if (cmimode == "cmi")
    {
      interpretation3 = "Concentration infra-th\351rapeutique au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Une adaptation de posologie est recommand\351e (par exemple [XX] mg/semaine) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
      interpretation7 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + "  mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration traduit une l\351g\350re surexposition. Une diminution de posologie (par exemple [XX] mg) est \340 discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicit\351). En cas de modification de posologie, un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose est recommand\351.";
      interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
      interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
      interpretation13 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + "  mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs cette concentration est sup\351rieure aux valeurs recommand\351es, pouvant \352tre \340 l'origine d'une toxicit\351 (neurotoxicit\351 principalement). Une adaptation de posologie est recommand\351e (par exemple [XX] mg x" + frequence + " / semaine) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
    }
    else if (cmimode == "breakpoint")
    {
      interpretation3 = "Concentration infra-th\351rapeutique au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Une adaptation de posologie est recommand\351e (par exemple [XX] mg/semaine) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
      interpretation7 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration traduit une l\351g\350re surexposition. Une diminution de posologie (par exemple [XX] mg) est \340 discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicit\351). En cas de modification de posologie, un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose est recommand\351.";
      interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
      interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
      interpretation13 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs cette concentration est sup\351rieure aux valeurs recommand\351es, pouvant \352tre \340 l'origine d'une toxicit\351 (neurotoxicit\351 principalement). Une adaptation de posologie est recommand\351e (par exemple [XX] mg x" + frequence + " / semaine) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
    }
  }
  else if (dialysis == "non")
  {
    interpretation1 = "1. Concentration ind\351tectable malgr\351 un traitement instaur\351 depuis " + temps + " jours (" + dose + " mg en administration " + administrationmode + ") et une fonction r\351nale normale. Un pr\351l\350vement de contr\364le est recommand\351 afin d'\351liminer un \351ventuel probl\350me pr\351-analytique (erreur d'identit\351, inversion de tube).<br><br>2. Ce r\351sultat peut \352tre expliqu\351 soit par une r\351elle sous-exposition soit par une interf\351rence pr\351-analytique (mauvaise conservation du pr\351l\350vement lors de l'acheminement). Il doit \352tre confront\351 au contexte clinique (am\351lioration des sympt\364mes ?) et contr\364le si n\351cessaire. En cas de r\351ponse clinique insuffisante, une augmentation de la posologie est recommand\351e (par exemple [XX] mg x" + frequence + " / j) ainsi qu'un pr\351l\350vement de contr\364le 48h apr\350s le changement de dose. <br><br>3. Concentration infra-th\351rapeutique coh\351rente avec un arr\352t du traitement depuis le [XX]/[XX] (date arr\352t traitement).";
    if (cmimode == "cmi")
    {
      interpretation3 = "Concentration infra-th\351rapeutique au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Une adaptation de posologie est recommand\351e (par exemple [XX] mg/j) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
      interpretation7 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + "  mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration traduit une l\351g\350re surexposition. Une diminution de posologie (par exemple [XX] mg) est \340 discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicit\351). En cas de modification de posologie, un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose est recommand\351.";
      interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
      interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
      interpretation13 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + "  mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs cette concentration est sup\351rieure aux valeurs recommand\351es, pouvant \352tre \340 l'origine d'une toxicit\351 (neurotoxicit\351 principalement). Une adaptation de posologie est recommand\351e (par exemple [XX] mg x" + frequence + " / j) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
    }
    else if (cmimode == "breakpoint")
    {
      interpretation3 = "Concentration infra-th\351rapeutique au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Une adaptation de posologie est recommand\351e (par exemple [XX] mg/j) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
      interpretation7 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration traduit une l\351g\350re surexposition. Une diminution de posologie (par exemple [XX] mg) est \340 discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicit\351). En cas de modification de posologie, un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose est recommand\351.";
      interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
      interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
      interpretation13 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs cette concentration est sup\351rieure aux valeurs recommand\351es, pouvant \352tre \340 l'origine d'une toxicit\351 (neurotoxicit\351 principalement). Une adaptation de posologie est recommand\351e (par exemple [XX] mg x" + frequence + " / j) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
    }
  }
  interpretation2 = "Devant les r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", r\351sistante au " + molecule + "), l'efficacit\351 du traitement par " + molecule + " ne peut \352tre assur\351e.";
  interpretation4 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans l'h\351moculture du " + administrationdateday +"/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint propos\351 \340 " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration traduit une l\351g\350re surexposition. Toutefois, le seuil d'efficacit\351 cible (Concentration libre > 4xCMI soit Concentration totale > 40 mg/l) est sup\351rieur au seuil de toxicit\351 (35 mg/l). Une diminution de posologie ou un changement d'antibiotique sont \340 discuter.";
  interpretation5 = "Concentration anormalement \351lev\351e. Au vu des ant\351riorit\351s, du bilan r\351nal, de la posologie, et en l'absence d'effets ind\351sirables, un pr\351l\350vement de contr\364le est recommand\351 afin d'\351liminer une \351ventuelle interf\351rence pr\351-analytique (pr\351l\350vement au niveau de la perfusion " + administrationmode + " d'antibiotique ? ). Au contraire, si le(a) patient(e) pr\351sente des effets ind\351sirables, une adaptation de posologie est recommand\351e (par exemple XX mg) suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
  interpretation6 = "Concentration sup\351rieure aux valeurs recommand\351es, associ\351e \340 un risque de neurotoxicit\351. Un arr\352t de la perfusion " + administrationmode + " pendant [XX] h suivie d'une reprise \340 posologie r\351duite (par exemple [XX] mg en perfusion " + administrationmode + ") est recommand\351, associ\351s \340 un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
  interpretation8 = "Concentration sup\351rieure aux valeurs recommand\351es, associ\351e \340 un risque de neurotoxicit\351. En l'absence de modification de la fonction r\351nale, une diminution de la posologie (par exemple [XX] mg) est recommand\351e, suivie d'un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose.";
  interpretation9 = "1. Concentration sup\351rieure aux valeurs recommand\351es, associ\351e \340 un risque de neurotoxicit\351. Un arr\352t de la perfusion " + administrationmode + " pendant [XX] h suivie d'une reprise \340 posologie r\351duite (par exemple [XX] mg) est recommand\351, associ\351s \340 un pr\351l\350vement de contr\364le 24 \340 48h apr\350s le changement de dose. <br><br>2. Concentration sup\351rieure aux valeurs recommand\351es, associ\351e \340 un risque accru de neurotoxicit\351. Un arr\352t de la perfusion " + administrationmode + " pendant [XX] heures est souhaitable, associ\351 \340 2 pr\351l\350vements sanguins : le premier au moment de l'arr\352t de la perfusion de " + molecule + " et le second avant reprise de la perfusion. Ces pr\351l\350vements permettront d'estimer la demi-vie d'\351limination du " + molecule + " chez ce patient en vue d'affiner son sch\351ma posologique.";
   interpretation14 = "La concentration mesur\351e traduit une exposition en " + molecule + " en ad\351quation avec l'exposition attendue chez les patients dialys\351s (20-30 mg/L).";
   interpretation15 = "En raison de l'hypoalbumin\351mie s\351v\350re, il n'est pas possible d'interpr\351ter la concentration en l'\351tat. En effet, en cas d'hypoalbumin\351mie, la concentration totale (i.e., concentration mesur\351e au Laboratoire) diminue alors que la concentration libre (i.e., concentration pharmacologiquement active) n'est pas impact\351e (Gandia et al. Antibiotics, 2023).";
   interpretation16 = "N\351anmoins, le risque de surexposition ne peut \352tre \351limin\351. \311 confronter avec le contexte clinique (signes de neurotoxicit\351 ?)";
  if (bacteriology == "connue")
  {
    interpretation18 = "La concentration mesur\351e  est largement inf\351rieure aux valeurs retrouv\351es dans les bilans ant\351rieurs pour un m\352me sch\351ma posologique, sugg\351rant soit une forte diminution de l'albumin\351mie soit une reprise de la fonction r\351nale (informations non renseign\351es sur le bon de demande).  L'interpr\351tation du r\351sultat n\351cessite de disposer de ces informations ainsi que des r\351sultats de Bact\351riologie (ou tout du moins de l'indication).";
  }
  else if (bacteriology == "inconnue")
  {
    interpretation18 = "La concentration mesur\351e  est largement inf\351rieure aux valeurs retrouv\351es dans les bilans ant\351rieurs pour un m\352me sch\351ma posologique, sugg\351rant soit une forte diminution de l'albumin\351mie soit une reprise de la fonction r\351nale (informations non renseign\351es sur le bon de demande). L'interpr\351tation du r\351sultat n\351cessite de disposer de ces informations.";
  }
  interpretation20 = "Concentration sup\351rieure aux concentrations habituellement cibl\351es (cible < XX mg/l), n'am\351liorant pas l'efficacit\351 th\351rapeutique et pouvant exposer \340 un risque accru de toxicit\351. Une diminution de la posologie (par exemple XX mg/j) est \340 discuter en fonction du contexte clinique.";
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
  cmimode = "";
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
  interpretation1 = "";
  interpretation2 = "";
  interpretation3 = "";
  interpretation4 = "";
  interpretation5 = "";
  interpretation6 = "";
  interpretation7 = "";
  interpretation8 = "";
  interpretation9 = "";
  interpretation10 = "";
  interpretation11 = "";
  interpretation12 = "";
  interpretation13 = "";
  interpretation14 = "";
  interpretation15 = "";
  interpretation16 = "";
  interpretation17 = "";
  interpretation18 = "";
  interpretation19 = "";
  interpretation20 = "";
  interpretation21 = "";
  myForm.reset();
}

// ##### CLEAN FORM #####
function cleanForm()
{
  document.getElementsByClassName("albumine")[0].style.display = "none";
  document.getElementsByClassName("administrationDate")[0].style.display = "none";
  document.getElementsByClassName("frequence")[0].innerHTML = "";
  document.getElementsByClassName("cmiDisplay")[0].innerHTML = "Seuil :";
  document.getElementsByClassName("bacteriologyInformation")[0].style.display = "none";
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
  cleanForm();
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
    if (administrationmode == "continue")
    {
      outputdose.innerHTML = "DOSE : " + dose + " mg en continu";
    }
    else if (administrationmode == "discontinue")
    {
      outputdose.innerHTML = "DOSE : " + dose + " mg " + frequence + " fois par jour";
    }
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
    }
    else
    {
      if (dfg == 0 || dfg == "")
      {
        outputconcentration.innerHTML = "CONCENTRATION : donnees manquantes, impossible de determiner si la concentration residuelle est vraie ou non";
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
    if (cmimode == "cmi")
    {
      outputcmi.innerHTML = "CMI : " + cmi + " mg/L";
    }
    else if (cmimode == "breakpoint")
    {
      outputcmi.innerHTML = "Breakpoint : " + cmi + " mg/L";
    }
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
  if (molecule == "cefazoline" || molecule == "c\351fazoline" || molecule == "Cefazoline" || molecule == "C\351fazoline" || molecule == "CEFAZOLINE" || molecule == "C\351FAZOLINE")
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
  //CEFOTAXIME DEMIVIE DISPLAY
  if (document.getElementById("molecule").value == "cefotaxime" || document.getElementById("molecule").value == "c\351fotaxime" || document.getElementById("molecule").value == "Cefotaxime" || document.getElementById("molecule").value == "C\351fotaxime" || document.getElementById("molecule").value == "CEFOTAXIME" || document.getElementById("molecule").value == "C\351FOTAXIME")
  {
    document.getElementsByClassName("demivie")[0].style.display = "block";
  }
  else
  {
    document.getElementsByClassName("demivie")[0].style.display = "none";
  }
  //ADMINISTRATION DATE DISPLAY
  if (document.getElementById("administrationContinue").checked == true)
  {
    document.getElementsByClassName("administrationDate")[0].style.display = "none";
    document.getElementById("frequence").style.display = "none";
    document.getElementsByClassName("frequence")[0].innerHTML = "en continu";
    if (document.getElementById("dialysis").checked == true)
    {
      alert("Un patient dialys\351 ne peut pas \352tre administr\351 en continu !");
      document.getElementById("dialysis").checked = false;
    }
  }
  else if (document.getElementById("administrationDiscontinue").checked == true)
  {
    document.getElementsByClassName("administrationDate")[0].style.display = "block";
    document.getElementById("frequence").style.display = "inline-block";
    document.getElementsByClassName("frequence")[0].innerHTML = "fois par jour";
    document.getElementsByClassName("frequence")[0].style.display = "inline-block";
  }
  //DIALYSIS DOSE UPDATE
  if (document.getElementById("dialysis").checked == true)
  {
    document.getElementsByClassName("frequence")[0].innerHTML = "fois par semaine";
    if (document.getElementById("administrationContinue").checked == true)
    {
      alert("Un patient dialys\351 ne peut pas \352tre administr\351 en continu !");
      document.getElementById("dialysis").checked = false;
    }
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
  //CMI BREAKPOINT CHANGE
  if (document.getElementById("cmiConnu").checked == true)
  {
    document.getElementsByClassName("cmiDisplay")[0].innerHTML = "CMI :";
  }
  else if (document.getElementById("cmiInconnu").checked == true)
  {
    document.getElementsByClassName("cmiDisplay")[0].innerHTML = "Breakpoint :";
  }
}

// ##### SUBMIT FORM #####
function submitForm()
{
  getInputForm();
  clearOutput();
  analysis(molecule);
  cleanForm();
  clearForm();
}

// ##### FORM ANALYSIS #####
function analysis(molecule)
{
  switch (molecule)
  {
    case "amoxicilline":
    case "Amoxicilline":
    case "AMOXICILLINE":
      amoxicilline(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, incoherence);
      break;
    case "c\351fazoline":
    case "cefazoline":
    case "C\351fazoline":
    case "Cefazoline":
    case "C\311FAZOLINE":
    case "CEFAZOLINE":
      cefazoline(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, albumine, incoherence);
      break;
    case "c\351f\351pime":
    case "cefepime":
    case "C\351f\351pime":
    case "Cefepime":
    case "C\311F\311PIME":
    case "CEFEPIME":
      cefepime(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, incoherence);
      break;
    case "c\351fotaxime":
    case "cefotaxime":
    case "C\351fotaxime":
    case "Cefotaxime":
    case "C\311FOTAXIME":
    case "CEFOTAXIME":
      cefotaxime(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, demivie_theorique, incoherence);
      break;
    case "ceftazidime":
    case "Ceftazidime":
    case "CEFTAZIDIME":
      ceftazidime(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, incoherence);
      break;
    case "ceftriaxone":
    case "Ceftriaxone":
    case "CEFTRIAXONE":
      demivie_theorique = 7.5;
      break;
    case "cloxacilline":
    case "Cloxacilline":
    case "CLOXACILLINE":
      break;
    case "ertap\351n\350me":
    case "ertapeneme":
    case "Ertap\351n\350me":
    case "Ertapeneme":
    case "ERTAP\311N\310ME":
    case "ERTAPENEME":
      break;
    case "imip\351n\350me":
    case "imipeneme":
    case "Imip\351n\350me":
    case "Imipeneme":
    case "IMIP\311N\310ME":
    case "IMIPENEME":
      break;
    case "m\351rop\351n\350me":
    case "meropeneme":
    case "M\351rop\351n\350me":
    case "Meropeneme":
    case "M\311ROP\311N\310ME":
    case "MEROPENEME":
      meropeneme(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, incoherence);
      break;
    case "pip\351racilline":
    case "piperacilline":
    case "Pip\351racilline":
    case "Piperacilline":
    case "PIP\311RACILLINE":
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
function cefepime(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, incoherence)
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
        if (4*cmi > 35)
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
                  showOutput(interpretation7 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                }
                else if (concentration > 45 && concentration <= 60)
                {
                  showOutput(interpretation8 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                }
                else if (concentration > 60)
                {
                  showOutput(interpretation9 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
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
          if (cmimode == "cmi")
          {
            showOutput(interpretation10);
          }
          else if (cmimode == "breakpoint")
          {
            interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
            showOutput(interpretation10);
          }
        }
        else if (dfg < 90)
        {
          if (cmimode == "cmi")
          {
            showOutput(interpretation11);
          }
          else if (cmimode == "breakpoint")
          {
            interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
            showOutput(interpretation11);
          }
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
            showOutput(interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
          }
        }
        else if (incoherence == "coherent")
        {
          if (dfg >= 90)
          {
            if (concentration <= 45)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation12);
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
              if (concentration <= 45)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
              }
              else if (concentration > 45 && concentration <= 60)
              {
                showOutput(interpretation8 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
              }
              else if (concentration > 60)
              {
                showOutput(interpretation9 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
              }
            }
          }
        }
      }
      else
      {
        if (dfg < 90)
        {
          interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
          showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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
    if (deltat < tau)
    {
      interpretation17 = "La concentration r\351siduelle estim\351e, selon les param\350tres pharmacocin\351tiques issus de la litt\351rature (demi-vie moyenne = " + demivie_theorique + "h) et selon le DFG du patient, est d'environ " + cres + " mg/L.";
      if (dialysis == "oui")
      {
        if (bacteriology == "connue")
        {
          if (cres < 20)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation3);
              }
            }
          }
          else if (cres > 30)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation5);
            }
            else if (incoherence == "coherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation13);
            }
          }
          else
          {
            showOutput(interpretation17 + "<br><br>" + interpretation14 + "<br><br>" + interpretation10);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 20)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else if (cres > 30)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation5);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation14 + "<br><br>" + interpretation10);
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
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation3);
              }
            }
          }
          if (cres > 20)
          {
            if (4*cmi > 20)
            {
              showOutput(interpretation17 + "<br><br>" + interpretation4);
            }
            else
            {
              if (incoherence == "incoherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5);
                }
                else if (dfg < 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                }
              }
              else if (incoherence == "coherent")
              {
                if (dfg >= 90)
                {
                  if (cres > 20 && cres <= 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation7);
                  }
                  else if (cres > 30 && cres <= 60)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation8);
                  }
                  else if (cres > 60)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation9);
                  }
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    if (cres > 20 && cres <= 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation7 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                    else if (cres > 30 && cres <= 60)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation8 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                    else if (cres > 60)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation9 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
              }
            }
          }
          else if (cres <= 20 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation10);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                showOutput(interpretation17 + "<br><br>" + interpretation10);
              }
            }
            else if (dfg < 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation11);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation17 + "<br><br>" + interpretation11);
              }
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 5)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else if (cres > 20)
          {
            if (incoherence == "incoherent")
            {
              if (dfg >= 90)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5);
              }
              else if (dfg < 90)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
              }
            }
            else if (incoherence == "coherent")
            {
              if (cres <= 30)
              {
                if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation17 + "<br><br>" + interpretation12);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                    showOutput(interpretation17 + "<br><br>" + interpretation12 + " Une alteration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
              else if (cres > 30 && cres <= 60)
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation8);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation8 + " Une alteration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
              else if (cres > 60)
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation9);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation9 + " Une alteration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation17 + "<br><br>" + interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
            }
            else if (dfg >= 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
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
          else if (concentration > 30)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation5);
            }
            else if (incoherence == "coherent")
            {
              showOutput(interpretation13);
            }
          }
          else
          {
            showOutput(interpretation14 + "<br><br>" + interpretation10);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 20)
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
          else if (concentration > 30)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation5);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation12);
            }
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation12 + "<br><br>" + interpretation14 + "<br><br>" + interpretation10);
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
                  if (dfg < 30)
                  {
                    showOutput(interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    if (concentration > 20 && concentration <= 30)
                    {
                      showOutput(interpretation7 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                    else if (concentration > 30 && concentration <= 60)
                    {
                      showOutput(interpretation8 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                    else if (concentration > 60)
                    {
                      showOutput(interpretation9 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
              }
            }
          }
          else if (concentration <= 20 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation10);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                showOutput(interpretation10);
              }
            }
            else if (dfg < 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation11);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation11);
              }
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
              if (concentration <= 30)
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
                    showOutput(interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                  }
                }
              }
              else if (concentration > 30 && concentration <= 60)
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation8);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    showOutput(interpretation8 + " Une alteration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
              else if (concentration > 60)
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation9);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    showOutput(interpretation9 + " Une alteration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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
function cefazoline(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, albumine, incoherence)
{
  fractionLibre = 0.2;
  cmin = 40;
  cmax = 80;
  if (albumine == 0 || albumine == "" || dfg == 0 || dfg == "")
  {
    if (concentration < 40)
    {
      showOutput(interpretation18);
    }
    else
    {
      showOutput("Interpr\351tation difficile, donn\351es manquantes (albumine et/ou dfg).")
    }
  }
  else
  {
    if (administrationmode == "continue")
    {
      if (bacteriology == "connue")
      {
        if (concentration <= 80)
        {
          if (albumine < 25)
          {
            if (cmimode == "cmi")
            {
              interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose).";
              interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
            }
            else if (cmimode == "breakpoint")
            {
              interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose).";
              interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
            }
            concentrationTotale = 40/albumine*concentration;
            concentrationLibre = concentrationTotale * fractionLibre;
            if (concentrationLibre < 4*cmi)
            {
              if (incoherence == "incoherent")
              {
                showOutput(interpretation15 + "<br><br>" + interpretation1);
              }
              else if (incoherence == "coherent")
              {
                if (resistance == "resistant")
                {
                  showOutput(interpretation15 + "<br><br>" + interpretation2);
                }
                else if (resistance == "sensible")
                {
                  showOutput(interpretation15 + "<br><br>" + interpretation3);
                }
              }
            }
            else if (concentrationLibre > 8*cmi)
            {
              if (incoherence == "incoherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation15 + "<br><br>" + interpretation5);
                }
                else if (dfg < 90)
                {
                  showOutput(interpretation15 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                }
              }
              else if (incoherence == "coherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation15 + "<br><br>" + interpretation13);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation15 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    showOutput(interpretation15 + "<br><br>" + interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                  }
                }
              }
            }
            else if (concentrationLibre >= 4*cmi && concentrationLibre <= 8*cmi)
            {
              if (dfg >= 90)
              {
                showOutput(interpretation15 + "<br><br>" + interpretation10 + "<br><br>" + interpration16);
              }
              else if (dfg < 90)
              {
                showOutput(interpretation15 + "<br><br>" + interpretation11 + "<br><br>" + interpration16);
              }
            }
          }
          else
          {
            concentrationLibre = concentration * fractionLibre;
            interpretation21 = "D'apr\350s les donn\351es de pharmacocin\351tique (liaison aux prot\351ines plasmatiques de " + 100*(1-fractionLibre) + "%), la concentration libre en " + molecule + " chez ce patient  est estim\351e \340 environ " + concentrationLibre + " mg/L.";
            if (concentrationLibre < 4*cmi)
            {
              if (incoherence == "incoherent")
              {
                showOutput(interpretation21 + "<br><br>" + interpretation1);
              }
              else if (incoherence == "coherent")
              {
                if (resistance == "resistant")
                {
                  showOutput(interpretation21 + "<br><br>" + interpretation2);
                }
                else if (resistance == "sensible")
                {
                  showOutput(interpretation21 + "<br><br>" + interpretation3);
                }
              }
            }
            else if (concentrationLibre > 8*cmi)
            {
              if (incoherence == "incoherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation21 + "<br><br>" + interpretation5);
                }
                else if (dfg < 90)
                {
                  showOutput(interpretation21 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                }
              }
              else if (incoherence == "coherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation21 + "<br><br>" + interpretation13);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation21 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    showOutput(interpretation21 + "<br><br>" + interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                  }
                }
              }
            }
            else if (concentrationLibre >= 4*cmi && concentrationLibre <= 8*cmi)
            {
              if (dfg >= 90)
              {
                if (cmimode == "cmi")
                {
                  showOutput(interpretation21 + "<br><br>" + interpretation10);
                }
                else if (cmimode == "breakpoint")
                {
                  interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                  showOutput(interpretation21 + "<br><br>" + interpretation10);
                }
              }
              else if (dfg < 90)
              {
                if (cmimode == "cmi")
                {
                  showOutput(interpretation21 + "<br><br>" + interpretation11);
                }
                else if (cmimode == "breakpoint")
                {
                  interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                  showOutput(interpretation21 + "<br><br>" + interpretation11);
                }
              }
            }
          }
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
            if (concentration <= 110)
            {
              if (dfg >= 90)
              {
                showOutput(interpretation13);
              }
              else if (dfg < 90)
              {
                if (dfg < 30)
                {
                  showOutput(interpretation6);
                }
                else if (dfg >= 30)
                {
                  showOutput(interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                }
              }
            }
            else if (concentration > 110)
            {
              showOutput(interpretation6);
            }
          }
        }
      }
      else if (bacteriology == "inconnue")
      {
        if (albumine < 25)
        {
          if (concentration < 40)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation15 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation15 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation15 + "<br><br>" + interpretation12);
              }
            }
          }
          else if (concentration > 80)
          {
            if (incoherence == "incoherent")
            {
              if (dfg >= 90)
              {
                showOutput(interpretation15 + "<br><br>" + interpretation5);
              }
              else if (dfg < 90)
              {
                showOutput(interpretation15 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une al\351ration de la fonction r\351nale.");
              }
            }
            else if (incoherence == "coherent")
            {
              if (concentration <= 110)
              {
                if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation15 + "<br><br>" + interpretation12);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation15 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                    showOutput(interpretation15 + "<br><br>" + interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                  }
                }
              }
              else if (concentration > 110)
              {
                showOutput(interpretation15 + "<br><br>" + interpretation6);
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "En tenant compte de l'hypoalbumin\351mie, la concentration serait donc efficace d'apr\350s les recommandations de la Soci\351t\351 Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e (cible : concentration sup\351rieure \340" + cmin + " mg/L). En revanche cette concentration pourrait traduire une surexposition. Une diminution de posologie (par exemple [XX] mg x [XX]/j) est \340 discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicit\351). Au vu de l'insuffisance r\351nale de ce patient, un suivi r\351gulier des concentrations r\351siduelles serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
              showOutput(interpretation15 + "<br><br>" + interpretation12);
            }
            else if (dfg >= 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.)";
              showOutput(interpretation15 + "<br><br>" + interpretation12 + "<br><br>" + interpretation16);
            }
          }
        }
        else
        {
          if (concentration < 40)
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
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12);
              }
            }
          }
          else if (concentration > 80)
          {
            if (incoherence == "incoherent")
            {
              if (dfg >= 90)
              {
                showOutput(interpretation5);
              }
              else if (dfg < 90)
              {
                showOutput(interpretation5 + " Attention, il est \340 noter une al\351ration de la fonction r\351nale.");
              }
            }
            else if (incoherence == "coherent")
            {
              if (concentration <= 110)
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
                    showOutput(interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                  }
                }
              }
              else if (concentration > 110)
              {
                showOutput(interpretation6);
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.)";
              showOutput(interpretation12 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
            }
            else if (dfg >= 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.)";
              showOutput(interpretation12);
            }
          }
        }
      }
    }
    else if (administrationmode == "discontinue")
    {
      interpretation19 = "La concentration mesur\351e traduit une exposition en " + molecule + " en ad\351quation avec l'exposition attendue chez les patients dialys\351s (" + cmin + "-" + cmax + " mg/L).";
      demivie_theorique = 1.66;
      deltat = ((prelevementdateday - administrationdateday)*24)+((prelevementdatemonth - administrationdatemonth)*30*24)+((prelevementdateyear - administrationdateyear)*365*24)+(prelevementtimehour - administrationtimehour)+((prelevementtimemin - administrationtimemin)/60);
      demivie_patient = demivie_theorique *(120/dfg);
      cres = concentration * (Math.exp((-Math.log(2))/(demivie_patient*deltat)));
      if (deltat < tau)
      {
        interpretation17 = "La concentration r\351siduelle estim\351e, selon les param\350tres pharmacocin\351tiques issus de la litt\351rature (demi-vie moyenne = " + demivie_theorique + "h) et selon le DFG du patient, est d'environ " + cres + " mg/L.";
        if (dialysis == "oui")
        {
          if (bacteriology == "connue")
          {
            if (cres < 40)
            {
              if (incoherence == "incoherent")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation1);
              }
              else if (incoherence == "coherent")
              {
                if (resistance == "resistant")
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation2);
                }
                else if (resistance == "sensible")
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation3);
                }
              }
            }
            else if (cres > 80)
            {
              if (incoherence == "incoherent")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5);
              }
              else if (incoherence == "coherent")
              {
                if (cres <= 110)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation13);
                }
                else if (cres > 110)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation6);
                }
              }
            }
            else
            {
              showOutput(interpretation17 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
            }
          }
          else if (bacteriology == "inconnue")
          {
            if (albumine < 25)
            {
              if (cres < 40)
              {
                if (incoherence == "incoherent")
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation1);
                }
                else if (incoherence == "coherent")
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation12);
                }
              }
              else if (cres > 80)
              {
                if (incoherence == "incoherent")
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation5);
                }
                else if (incoherence == "coherent")
                {
                  if (cres <= 110)
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                      showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation12);
                  }
                  else if (cres > 110)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation6);
                  }
                }
              }
              else
              {
                interpretation12 = "En tenant compte de l'hypoalbumin\351mie, la concentration serait donc efficace d'apr\350s les recommandations de la Soci\351t\351 Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e (cible : concentration sup\351rieure \340" + cmin + " mg/L). En revanche cette concentration pourrait traduire une surexposition. Une diminution de posologie (par exemple [XX] mg x [XX]/j) est \340 discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicit\351). Au vu de l'insuffisance r\351nale de ce patient, un suivi r\351gulier des concentrations r\351siduelles serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                  showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
              }
            }
            else
            {
              if (cres < 40)
              {
                if (incoherence == "incoherent")
                {
                  showOutput(interpretation1);
                }
                else if (incoherence == "coherent")
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation17 + "<br><br>" + interpretation12);
                }
              }
              else if (cres > 80)
              {
                if (incoherence == "incoherent")
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5);
                }
                else if (incoherence == "coherent")
                {
                  if (cres <= 110)
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                      showOutput(interpretation17 + "<br><br>" + interpretation12);
                  }
                  else if (cres > 110)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation6);
                  }
                }
              }
              else
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.)";
                  showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
              }
            }
          }
        }
        else if (dialysis == "non")
        {
          if (bacteriology == "connue")
          {
            if (cres <= 80)
            {
              if (albumine < 25)
              {
                if (cmimode == "cmi")
                {
                  interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose).";
                }
                else if (cmimode == "breakpoint")
                {
                  interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose).";
                }
                concentrationTotale = 40/albumine*cres;
                concentrationLibre = concentrationTotale * fractionLibre;
                if (concentrationLibre < 4*cmi)
                {
                  if (incoherence == "incoherent")
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation1);
                  }
                  else if (incoherence == "coherent")
                  {
                    if (resistance == "resistant")
                    {
                     showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation2); 
                    }
                    else if (resistance == "sensible")
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation3);
                    }
                  }
                }
                else if (concentrationLibre > 8*cmi)
                {
                  if (incoherence == "incoherent")
                  {
                    if (dfg < 90)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                    }
                    else if (dfg >= 90)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation5);
                    }
                  }
                  else if (incoherence == "coherent")
                  {
                    if (dfg < 90)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                    if (dfg >= 90)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation13);
                    }
                  }
                }
                else if (concentrationLibre >= 4*cmi && concentrationLibre <= 8*cmi)
                {
                  if (dfg < 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation10 + "<br><br>" + interpretation16 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                  }
                  if (dfg >= 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation10 + "<br><br>" + interpretation16);
                  }
                }
              }
              else
              {
                concentrationLibre = cres * fractionLibre;
                interpretation21 = "D'apr\350s les donn\351es de pharmacocin\351tique (liaison aux prot\351ines plasmatiques de " + 100*(1-fractionLibre) + "%), la concentration libre en " + molecule + " chez ce patient  est estim\351e \340 environ " + concentrationLibre + " mg/L.";
                if (concentrationLibre < 4*cmi)
                {
                  if (incoherence == "incoherent")
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation1);
                  }
                  else if (incoherence == "coherent")
                  {
                    if (resistance == "resistant")
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation2);
                    }
                    else if (resistance == "sensible")
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation3);
                    }
                  }
                }
                else if (concentrationLibre > 8*cmi)
                {
                  if (incoherence == "incoherent")
                  {
                    if (dfg < 90)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                    }
                    else if (dfg >= 90)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation5);
                    }
                  }
                  else if (incoherence == "coherent")
                  {
                    if (dfg < 90)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                    else if (dfg >= 90)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation13);
                    }
                  }
                }
                else if (concentrationLibre >= 4*cmi && concentrationLibre <= 8*cmi)
                {
                  if (dfg < 90)
                  {
                    if (cmimode == "cmi")
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation10 + " Attention, il est \340 noter une al\351ration de la fonction r\351nale.");
                    }
                    else if (cmimode == "breakpoint")
                    {
                      interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                      showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation10 + " Attention, il est \340 noter une al\351ration de la fonction r\351nale.");
                    }
                  }
                  else if (dfg >= 90)
                  {
                    if (cmimode == "cmi")
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation10);
                    }
                    else if (cmimode == "breakpoint")
                    {
                      interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                      showOutput(interpretation17 + "<br><br>" + interpretation21 + "<br><br>" + interpretation10);
                    }
                  }
                }
              }
            }
            else if (cres > 80)
            {
              if (incoherence == "incoherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5);
                }
                else if (dfg < 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                }
              }
              else if (incoherence == "coherent")
              {
                if (cres <= 110)
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation13);
                  }
                  else if (dfg < 90)
                  {
                    if (dfg < 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation6);
                    }
                    else if (dfg >= 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
                else if (cres > 110)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation6);
                }
              }
            }
          }
          else if (bacteriology == "inconnue")
          {
            if (albumine < 25)
            {
              if (cres < 40)
              {
                if (incoherence == "incoherent")
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation1);
                }
                else if (incoherence == "coherent")
                {
                  if (resistance == "resistant")
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation2);
                  }
                  else if (resistance == "sensible")
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                    showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation12);
                  }
                }
              }
              else if (cres > 80)
              {
                if (incoherence == "incoherent")
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation5);
                  }
                  else if (dfg < 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                  }
                }
                else if (incoherence == "coherent")
                {
                  if (cres <= 110)
                  {
                    if (dfg >= 90)
                    {
                      interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                      showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation12);
                    }
                    else if (dfg < 90)
                    {
                      if (dfg < 30)
                      {
                        showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation6);
                      }
                      else if (dfg >= 30)
                      {
                       interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                        showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                      }
                    }
                  }
                  else if (cres > 110)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation6);
                  }
                }
              }
              else
              {
                if (dfg < 90)
                {
                  interpretation12 = "En tenant compte de l'hypoalbumin\351mie, la concentration serait donc efficace d'apr\350s les recommandations de la Soci\351t\351 Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e (cible : concentration sup\351rieure \340" + cmin + " mg/L). En revanche cette concentration pourrait traduire une surexposition. Une diminution de posologie (par exemple [XX] mg x [XX]/j) est \340 discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicit\351). Au vu de l'insuffisance r\351nale de ce patient, un suivi r\351gulier des concentrations r\351siduelles serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                  showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation12);
                }
                else if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
                  showOutput(interpretation17 + "<br><br>" + interpretation15 + "<br><br>" + interpretation12 + "<br><br>" + interpretation16);
                }
              }
            }
            else
            {
              if (cres < 40)
              {
                if (incoherence == "incoherent")
                {
                  showOutput(interpretation1);
                }
                else if (incoherence == "coherent")
                {
                  if (resistance == "resistant")
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation2);
                  }
                  else if (resistance == "sensible")
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                    showOutput(interpretation17 + "<br><br>" + interpretation12);
                  }
                }
              }
              else if (cres > 80)
              {
                if (incoherence == "incoherent")
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation5);
                  }
                  else if (dfg < 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                  }
                }
                else if (incoherence == "coherent")
                {
                  if (cres <= 110)
                  {
                    if (dfg >= 90)
                    {
                      interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                      showOutput(interpretation17 + "<br><br>" + interpretation12);
                    }
                    else if (dfg < 90)
                    {
                      if (dfg < 30)
                      {
                        showOutput(interpretation17 + "<br><br>" + interpretation6);
                      }
                      else if (dfg >= 30)
                      {
                       interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                        showOutput(interpretation17 + "<br><br>" + interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                      }
                    }
                  }
                  else if (cres > 110)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation6);
                  }
                }
              }
              else
              {
                if (dfg < 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
                  showOutput(interpretation17 + "<br><br>" + interpretation12);
                }
                else if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
                  showOutput(interpretation17 + "<br><br>" + interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
                }
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
            if (concentration < 40)
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
            else if (concentration > 80)
            {
              if (incoherence == "incoherent")
              {
                showOutput(interpretation5);
              }
              else if (incoherence == "coherent")
              {
                if (concentration <= 110)
                {
                  showOutput(interpretation13);
                }
                else if (concentration > 110)
                {
                  showOutput(interpretation6);
                }
              }
            }
            else
            {
              showOutput(interpretation19 + "<br><br>" + interpretation10);
            }
          }
          else if (bacteriology == "inconnue")
          {
            if (albumine < 25)
            {
              if (concentration < 40)
              {
                if (incoherence == "incoherent")
                {
                  showOutput(interpretation15 + "<br><br>" + interpretation1);
                }
                else if (incoherence == "coherent")
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation15 + "<br><br>" + interpretation12);
                }
              }
              else if (concentration > 80)
              {
                if (incoherence == "incoherent")
                {
                  showOutput(interpretation15 + "<br><br>" + interpretation5);
                }
                else if (incoherence == "coherent")
                {
                  if (concentration <= 110)
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                    showOutput(interpretation15 + "<br><br>" + interpretation12);
                  }
                  else if (concentration > 110)
                  {
                    showOutput(interpretation15 + "<br><br>" + interpretation6);
                  }
                }
              }
              else
              {
                interpretation12 = "En tenant compte de l'hypoalbumin\351mie, la concentration serait donc efficace d'apr\350s les recommandations de la Soci\351t\351 Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e (cible : concentration sup\351rieure \340" + cmin + " mg/L). En revanche cette concentration pourrait traduire une surexposition. Une diminution de posologie (par exemple [XX] mg x [XX]/j) est \340 discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicit\351). Au vu de l'insuffisance r\351nale de ce patient, un suivi r\351gulier des concentrations r\351siduelles serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation15 + "<br><br>" + interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
              }
            }
            else
            {
              if (concentration < 40)
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
              else if (concentration > 80)
              {
                if (incoherence == "incoherent")
                {
                  showOutput(interpretation5);
                }
                else if (incoherence == "coherent")
                {
                  if (concentration <= 110)
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                    showOutput(interpretation12);
                  }
                  else if (concentration > 110)
                  {
                    showOutput(interpretation6);
                  }
                }
              }
              else
              {
                showOutput(interpretation19 + "<br><br>" + interpretation10);
              }
            }
          }
        }
        else if (dialysis == "non")
        {
          if (bacteriology == "connue")
          {
            if (concentration <= 80)
            {
              if (albumine < 25)
              {
                if (cmimode == "cmi")
                {
                  interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", CMI = " + cmi + " mg/L) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose).";
                }
                else if (cmimode == "breakpoint")
                {
                  interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose).";
                }
                concentrationTotale = 40/albumine*concentration;
                concentrationLibre = concentrationTotale * fractionLibre;
                if (concentrationLibre < 4*cmi)
                {
                  if (incoherence == "incoherent")
                  {
                   showOutput(interpretation15 + "<br><br>" + interpretation1);
                  }
                  else if (incoherence == "coherent")
                  {
                    if (resistance == "resistant")
                    {
                      showOutput(interpretation15 + "<br><br>" + interpretation2);
                    }
                    else if (resistance == "sensible")
                    {
                      showOutput(interpretation15 + "<br><br>" + interpretation3);
                    }
                  }
                }
                else if (concentrationLibre > 8*cmi)
                {
                  if (incoherence == "incoherent")
                  {
                    if (dfg < 90)
                    {
                      showOutput(interpretation15 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                    }
                    else if (dfg >= 90)
                    {
                      showOutput(interpretation15 + "<br><br>" + interpretation5);
                    }
                  }
                  else if (incoherence == "coherent")
                  {
                    if (dfg < 90)
                    {
                      showOutput(interpretation15 + "<br><br>" + interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                    else if (dfg >= 90)
                    {
                      showOutput(interpretation15 + "<br><br>" + interpretation13);
                    }
                  }
                }
                else if (concentrationLibre >= 4*cmi && concentrationLibre <= 8*cmi)
                {
                  if (dfg < 90)
                  {
                    showOutput(interpretation15 + "<br><br>" + interpretation10 + "<br><br>" + interpretation16 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                  }
                  else if (dfg >= 90)
                  {
                    showOutput(interpretation15 + "<br><br>" + interpretation10 + "<br><br>" + interpretation16);
                  }
                }
              }
              else
              {
                concentrationLibre = concentration * fractionLibre;
                interpretation21 = "D'apr\350s les donn\351es de pharmacocin\351tique (liaison aux prot\351ines plasmatiques de " + 100*(1-fractionLibre) + "%), la concentration libre en " + molecule + " chez ce patient  est estim\351e \340 environ " + concentrationLibre + " mg/L.";
                if (concentrationLibre < 4*cmi)
                {
                  if (incoherence == "incoherent")
                  {
                   showOutput(interpretation21 + "<br><br>" + interpretation1);
                  }
                  else if (incoherence == "coherent")
                  {
                    if (resistance == "resistant")
                    {
                      showOutput(interpretation21 + "<br><br>" + interpretation2);
                    }
                    else if (resistance == "sensible")
                    {
                      showOutput(interpretation21 + "<br><br>" + interpretation3);
                    }
                  }
                }
                else if (concentrationLibre > 8*cmi)
                {
                  if (incoherence == "incoherent")
                  {
                    if (dfg < 90)
                    {
                      showOutput(interpretation21 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                    }
                    else if (dfg >= 90)
                    {
                      showOutput(interpretation21 + "<br><br>" + interpretation5);
                    }
                  }
                  else if (incoherence == "coherent")
                  {
                    if (dfg < 90)
                    {
                      showOutput(interpretation21 + "<br><br>" + interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                    else if (dfg >= 90)
                    {
                      showOutput(interpretation21 + "<br><br>" + interpretation13);
                    }
                  }
                }
                else if (concentrationLibre >= 4*cmi && concentrationLibre <= 8*cmi)
                {
                  if (dfg < 90)
                  {
                    if (cmimode == "cmi")
                    {
                      showOutput(interpretation21 + "<br><br>" + interpretation10 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                    }
                    else if (cmimode == "breakpoint")
                    {
                      interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose).";
                      showOutput(interpretation21 + "<br><br>" + interpretation10 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                    }
                  }
                  else if (dfg >= 90)
                  {
                    if (cmimode == "cmi")
                    {
                      showOutput(interpretation21 + "<br><br>" + interpretation10);
                    }
                    else if (cmimode == "breakpoint")
                    {
                      interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose).";
                      showOutput(interpretation21 + "<br><br>" + interpretation10);
                    }
                  }
                }
              }
            }
            else if (concentration > 80)
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
                if (concentration <= 110)
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation13);
                  }
                  else if (dfg < 90)
                  {
                    if (dfg < 30)
                    {
                      showOutput(interpretation6);
                    }
                    else if (dfg >= 30)
                    {
                      showOutput(interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
                else if (concentration > 110)
                {
                  showOutput(interpretation6);
                }
              }
            }
          }
          else if (bacteriology == "inconnue")
          {
            if (albumine < 25)
            {
              if (concentration < 40)
              {
                if (incoherence == "incoherent")
                {
                  showOutput(interpretation15 + "<br><br>" + interpretation1);
                }
                else if (incoherence == "coherent")
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation15 + "<br><br>" + interpretation12);
                }
              }
              else if (concentration > 80)
              {
                if (incoherence == "incoherent")
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation15 + "<br><br>" + interpretation5);
                  }
                  else if (dfg < 90)
                  {
                    showOutput(interpretation15 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                  }
                }
                else if (incoherence == "coherent")
                {
                  if (concentration <= 110)
                  {
                    if (dfg >= 90)
                    {
                      interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                      showOutput(interpretation15 + "<br><br>" + interpretation12);
                    }
                    else if (dfg < 90)
                    {
                      if (dfg < 30)
                      {
                        showOutput(interpretation15 + "<br><br>" + interpretation6);
                      }
                      else if (dfg >= 30)
                      {
                        interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                        showOutput(interpretation15 + "<br><br>" + interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                      }
                    }
                  }
                  else if (concentration > 110)
                  {
                    showOutput(interpretation15 + "<br><br>" + interpretation6);
                  }
                }
              }
              else
              {
                if (dfg < 90)
                {
                  interpretation12 = "En tenant compte de l'hypoalbumin\351mie, la concentration serait donc efficace d'apr\350s les recommandations de la Soci\351t\351 Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e (cible : concentration sup\351rieure \340" + cmin + " mg/L). En revanche cette concentration pourrait traduire une surexposition. Une diminution de posologie (par exemple [XX] mg x [XX]/j) est \340 discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicit\351). Au vu de l'insuffisance r\351nale de ce patient, un suivi r\351gulier des concentrations r\351siduelles serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                  showOutput(interpretation15 + "<br><br>" + interpretation12);
                }
                else if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
                  showOutput(interpretation15 + "<br><br>" + interpretation12 + "<br><br>" + interpretation16);
                }
              }
            }
            else
            {
              if (concentration < 40)
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
              else if (concentration > 80)
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
                  if (concentration <= 110)
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
                        showOutput(interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                      }
                    }
                  }
                  else if (concentration > 110)
                  {
                    showOutput(interpretation6);
                  }
                }
              }
              else
              {
                if (dfg < 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
                  showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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
  }
}

//Amoxicilline
function amoxicilline(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, incoherence)
{
  fractionLibre = 0.8;
  cmin = 40;
  cmax = 80;
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
      else if (concentration > 80)
      {
        if (4*cmi > 80)
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
            if (concentration > 110)
            {
              showOutput(interpretation6);
            }
            else if (concentration <= 110)
            {
              if (dfg >= 90)
              {
                showOutput(interpretation13);
              }
              else if (dfg < 90)
              {
                if (dfg < 30)
                {
                  showOutput(interpretation6);
                }
                else if (dfg  >= 30)
                {
                  showOutput(interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                }
              }
            }
          }
        }
      }
      else if (concentration <= 80 && concentrationLibre >= 4*cmi)
      {
        if (dfg >= 90)
        {
          if (cmimode == "cmi")
          {
            showOutput(interpretation10);
          }
          else if (cmimode == "breakpoint")
          {
            interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
            showOutput(interpretation10);
          }
        }
        else if (dfg < 90)
        {
          if (cmimode == "cmi")
          {
            showOutput(interpretation11);
          }
          else if (cmimode == "breakpoint")
          {
            interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
            showOutput(interpretation11);
          }
        }
      }
    }
    else if (bacteriology == "inconnue")
    {
      if (concentration < 40)
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
      else if (concentration > 80)
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
          if (concentration > 110)
          {
            showOutput(interpretation6);
          }
          else if (concentration <= 110)
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
              else if (dfg  >= 30)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
              }
            }
          }
        }
      }
      else
      {
        if (dfg < 90)
        {
          interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
          showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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
    demivie_theorique = 1;
    demivie_patient = demivie_theorique*(120/dfg);
    deltat = ((prelevementdateday - administrationdateday)*24)+((prelevementdatemonth - administrationdatemonth)*30*24)+((prelevementdateyear - administrationdateyear)*365*24)+(prelevementtimehour - administrationtimehour)+((prelevementtimemin - administrationtimemin)/60);
    cres = concentration * (Math.exp((-Math.log(2))/(demivie_patient*deltat)));
    if (deltat < tau)
    {
      interpretation17 = "La concentration r\351siduelle estim\351e, selon les param\350tres pharmacocin\351tiques issus de la litt\351rature (demi-vie moyenne = " + demivie_theorique + "h) et selon le DFG du patient, est d'environ " + cres + " mg/L.";
      if (dialysis == "oui")
      {
        if (bacteriology == "connue")
        {
          if (cres < 40)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation3);
              }
            }
          }
          else if (cres > 80)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (cres > 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
              else if (cres <= 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation13);
              }
            }
          }
          else
          {
            showOutput(interpretation17 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 40)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else if (cres > 80)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (cres > 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
              else if (cres <= 110)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation17 + "<br><br>" + interpretation12);
              }
            }
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
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
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation3);
              }
            }
          }
          if (cres > 80)
          {
            if (4*cmi > 80)
            {
              showOutput(interpretation17 + "<br><br>" + interpretation4);
            }
            else
            {
              if (incoherence == "incoherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5);
                }
                else if (dfg < 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                }
              }
              else if (incoherence == "coherent")
              {
                if (cres > 110)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation6);
                }
                else if (cres <= 110)
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation13);
                  }
                  else if (dfg < 90)
                  {
                    if (dfg < 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation6);
                    }
                    else if (dfg >= 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
              }
            }
          }
          else if (cres <= 80 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation10);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                showOutput(interpretation17 + "<br><br>" + interpretation10);
              }
            }
            else if (dfg < 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation11);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation17 + "<br><br>" + interpretation11);
              }
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 40)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else if (cres > 80)
          {
            if (incoherence == "incoherent")
            {
              if (dfg >= 90)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5);
              }
              else if (dfg < 90)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
              }
            }
            else if (incoherence == "coherent")
            {
              if (cres > 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
              else if (cres <= 110)
              {
                if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation17 + "<br><br>" + interpretation12);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                    showOutput(interpretation17 + "<br><br>" + interpretation12 + " Une alteration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation17 + "<br><br>" + interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
            }
            else if (dfg >= 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
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
          if (concentration < 40)
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
          else if (concentration > 80)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (concentration > 110)
              {
                showOutput(interpretation6);
              }
              else if (concentration <= 110)
              {
                showOutput(interpretation13);
              }
            }
          }
          else
          {
            showOutput(interpretation19 + "<br><br>" + interpretation10);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 40)
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
          else if (concentration > 80)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (concentration > 110)
              {
                showOutput(interpretation6);
              }
              else if (concentration <= 110)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12);
              }
            }
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
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
          if (concentration > 80)
          {
            if (4*cmi > 80)
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
                if (concentration > 110)
                {
                  showOutput(interpretation6);
                }
                else if (concentration <= 110)
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation13);
                  }
                  else if (dfg < 90)
                  {
                    if (dfg < 30)
                    {
                      showOutput(interpretation6);
                    }
                    else if (dfg >= 30)
                    {
                      showOutput(interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
              }
            }
          }
          else if (concentration <= 80 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation10);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                showOutput(interpretation10);
              }
            }
            else if (dfg < 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation11);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation11);
              }
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 40)
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
          else if (concentration > 80)
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
              if (concentration > 110)
              {
                showOutput(interpretation6);
              }
              else if (concentration <= 110)
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
                    showOutput(interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                  }
                }
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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

//Cefotaxime
function cefotaxime(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, demivie_theorique, incoherence)
{
  fractionLibre = 0.8;
  cmin = 25;
  cmax = 60;
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
      else if (concentration > 60)
      {
        if (4*cmi > 60)
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
            if (concentration > 110)
            {
              showOutput(interpretation6);
            }
            else if (concentration <= 110)
            {
              if (dfg >= 90)
              {
                showOutput(interpretation13);
              }
              else if (dfg < 90)
              {
                if (dfg < 30)
                {
                  showOutput(interpretation6);
                }
                else if (dfg  >= 30)
                {
                  showOutput(interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                }
              }
            }
          }
        }
      }
      else if (concentration <= 60 && concentrationLibre >= 4*cmi)
      {
        if (dfg >= 90)
        {
          if (cmimode == "cmi")
          {
            showOutput(interpretation10);
          }
          else if (cmimode == "breakpoint")
          {
            interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
            showOutput(interpretation10);
          }
        }
        else if (dfg < 90)
        {
          if (cmimode == "cmi")
          {
            showOutput(interpretation11);
          }
          else if (cmimode == "breakpoint")
          {
            interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
            showOutput(interpretation11);
          }
        }
      }
    }
    else if (bacteriology == "inconnue")
    {
      if (concentration < 25)
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
      else if (concentration > 60)
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
          if (concentration > 110)
          {
            showOutput(interpretation6);
          }
          else if (concentration <= 110)
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
              else if (dfg  >= 30)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
              }
            }
          }
        }
      }
      else
      {
        if (dfg < 90)
        {
          interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
          showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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
    demivie_patient = demivie_theorique*(120/dfg);
    deltat = ((prelevementdateday - administrationdateday)*24)+((prelevementdatemonth - administrationdatemonth)*30*24)+((prelevementdateyear - administrationdateyear)*365*24)+(prelevementtimehour - administrationtimehour)+((prelevementtimemin - administrationtimemin)/60);
    cres = concentration * (Math.exp((-Math.log(2))/(demivie_patient*deltat)));
    if (deltat < tau)
    {
      interpretation17 = "La concentration r\351siduelle estim\351e, selon les param\350tres pharmacocin\351tiques issus de la litt\351rature (demi-vie moyenne = " + demivie_theorique + "h) et selon le DFG du patient, est d'environ " + cres + " mg/L.";
      if (dialysis == "oui")
      {
        if (bacteriology == "connue")
        {
          if (cres < 25)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation3);
              }
            }
          }
          else if (cres > 60)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (cres > 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
              else if (cres <= 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation13);
              }
            }
          }
          else
          {
            showOutput(interpretation17 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 25)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else if (cres > 60)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (cres > 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
              else if (cres <= 110)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation17 + "<br><br>" + interpretation12);
              }
            }
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
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
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation3);
              }
            }
          }
          if (cres > 60)
          {
            if (4*cmi > 60)
            {
              showOutput(interpretation17 + "<br><br>" + interpretation4);
            }
            else
            {
              if (incoherence == "incoherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5);
                }
                else if (dfg < 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                }
              }
              else if (incoherence == "coherent")
              {
                if (cres > 110)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation6);
                }
                else if (cres <= 110)
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation13);
                  }
                  else if (dfg < 90)
                  {
                    if (dfg < 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation6);
                    }
                    else if (dfg >= 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
              }
            }
          }
          else if (cres <= 60 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation10);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                showOutput(interpretation17 + "<br><br>" + interpretation10);
              }
            }
            else if (dfg < 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation11);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation17 + "<br><br>" + interpretation11);
              }
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 25)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else if (cres > 60)
          {
            if (incoherence == "incoherent")
            {
              if (dfg >= 90)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5);
              }
              else if (dfg < 90)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
              }
            }
            else if (incoherence == "coherent")
            {
              if (cres > 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
              else if (cres <= 110)
              {
                if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation17 + "<br><br>" + interpretation12);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                    showOutput(interpretation17 + "<br><br>" + interpretation12 + " Une alteration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation17 + "<br><br>" + interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
            }
            else if (dfg >= 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
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
          if (concentration < 25)
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
          else if (concentration > 60)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (concentration > 110)
              {
                showOutput(interpretation6);
              }
              else if (concentration <= 110)
              {
                showOutput(interpretation13);
              }
            }
          }
          else
          {
            showOutput(interpretation19 + "<br><br>" + interpretation10);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 25)
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
          else if (concentration > 60)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (concentration > 110)
              {
                showOutput(interpretation6);
              }
              else if (concentration <= 110)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12);
              }
            }
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
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
          if (concentration > 60)
          {
            if (4*cmi > 60)
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
                if (concentration > 110)
                {
                  showOutput(interpretation6);
                }
                else if (concentration <= 110)
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation13);
                  }
                  else if (dfg < 90)
                  {
                    if (dfg < 30)
                    {
                      showOutput(interpretation6);
                    }
                    else if (dfg >= 30)
                    {
                      showOutput(interpretation13 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
              }
            }
          }
          else if (concentration <= 60 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation10);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                showOutput(interpretation10);
              }
            }
            else if (dfg < 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation11);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation11);
              }
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 25)
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
          else if (concentration > 60)
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
              if (concentration > 110)
              {
                showOutput(interpretation6);
              }
              else if (concentration <= 110)
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
                    showOutput(interpretation12 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                  }
                }
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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

//Ceftazidime
function ceftazidime(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, incoherence)
{
  fractionLibre = 0.9;
  cmin = 35;
  cmax = 80;
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
      else if (concentration > 80)
      {
        if (4*cmi > 80)
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
            if (concentration <= 110)
            {
              if (dfg >= 90)
              {
                showOutput(interpretation13 + "<br><br>" + interpretation20);
              }
              else if (dfg < 90)
              {
                if (dfg < 30)
                {
                  showOutput(interpretation6);
                }
                else if (dfg  >= 30)
                {
                  showOutput(interpretation13 + "<br><br>" + interpretation20 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                }
              }
            }
            else if (concentration > 110)
            {
              showOutput(interpretation6);
            }
          }
        }
      }
      else if (concentration <= 80 && concentrationLibre >= 4*cmi)
      {
        if (dfg >= 90)
        {
          if (cmimode == "cmi")
          {
            showOutput(interpretation10);
          }
          else if (cmimode == "breakpoint")
          {
            interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
            showOutput(interpretation10);
          }
        }
        else if (dfg < 90)
        {
          if (cmimode == "cmi")
          {
            showOutput(interpretation11);
          }
          else if (cmimode == "breakpoint")
          {
            interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
            showOutput(interpretation11);
          }
        }
      }
    }
    else if (bacteriology == "inconnue")
    {
      if (concentration < 35)
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
      else if (concentration > 80)
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
          if (concentration <= 110)
          {
            if (dfg >= 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation12 + "<br><br>" + interpretation20);
            }
            else if (dfg < 90)
            {
              if (dfg < 30)
              {
                showOutput(interpretation6);
              }
              else if (dfg  >= 30)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12 + "<br><br>" + interpretation20 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
              }
            }
          }
          else if (concentration > 110)
          {
            showOutput(interpretation6);
          }
        }
      }
      else
      {
        if (dfg < 90)
        {
          interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
          showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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
    if (deltat < tau)
    {
      interpretation17 = "La concentration r\351siduelle estim\351e, selon les param\350tres pharmacocin\351tiques issus de la litt\351rature (demi-vie moyenne = " + demivie_theorique + "h) et selon le DFG du patient, est d'environ " + cres + " mg/L.";
      if (dialysis == "oui")
      {
        if (bacteriology == "connue")
        {
          if (cres < 35)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation3);
              }
            }
          }
          else if (cres > 80)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (cres <= 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation13 + "<br><br>" + interpretation20);
              }
              else if (cres > 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
            }
          }
          else
          {
            showOutput(interpretation17 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 35)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else if (cres > 80)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (cres <= 110)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation20);
              }
              else if (cres > 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
            }
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
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
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation3);
              }
            }
          }
          if (cres > 80)
          {
            if (4*cmi > 80)
            {
              showOutput(interpretation17 + "<br><br>" + interpretation4);
            }
            else
            {
              if (incoherence == "incoherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5);
                }
                else if (dfg < 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                }
              }
              else if (incoherence == "coherent")
              {
                if (cres <= 110)
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation13 + "<br><br>" + interpretation20);
                  }
                  else if (dfg < 90)
                  {
                    if (dfg < 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation6);
                    }
                    else if (dfg >= 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation13 + "<br><br>" + interpretation20 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
                else if (cres > 110)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation6)
                }
              }
            }
          }
          else if (cres <= 80 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation10);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                showOutput(interpretation17 + "<br><br>" + interpretation10);
              }
            }
            else if (dfg < 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation11);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation17 + "<br><br>" + interpretation11);
              }
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 35)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else if (cres > 80)
          {
            if (incoherence == "incoherent")
            {
              if (dfg >= 90)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5);
              }
              else if (dfg < 90)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
              }
            }
            else if (incoherence == "coherent")
            {
              if (cres <= 110)
              {
                if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation20);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                    showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation20 + " Une alteration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
              else if (cres > 110)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation17 + "<br><br>" + interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
            }
            else if (dfg >= 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
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
          if (concentration < 35)
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
          else if (concentration > 80)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (concentration <= 110)
              {
                showOutput(interpretation13 + "<br><br>" + interpretation20);
              }
              else if (concentration > 110)
              {
                showOutput(interpretation6);
              }
            }
          }
          else
          {
            showOutput(interpretation19 + "<br><br>" + interpretation10);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 35)
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
          else if (concentration > 80)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (concentration <= 110)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12 + "<br><br>" + interpretation20);
              }
              else if (concentration > 110)
              {
                showOutput(interpretation6);
              }
            }
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
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
          if (concentration > 80)
          {
            if (4*cmi > 80)
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
                if (concentration <= 110)
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation13 + "<br><br>" + interpretation20);
                  }
                  else if (dfg < 90)
                  {
                    if (dfg < 30)
                    {
                      showOutput(interpretation6);
                    }
                    else if (dfg >= 30)
                    {
                      showOutput(interpretation13 + "<br><br>" + interpretation20 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
                else if (concentration > 110)
                {
                  showOutput(interpretation6);
                }
              }
            }
          }
          else if (concentration <= 80 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation10);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                showOutput(interpretation10);
              }
            }
            else if (dfg < 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation11);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation11);
              }
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 35)
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
          else if (concentration > 80)
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
              if (concentration <= 110)
              {
                if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation12 + "<br><br>" + interpretation20);
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
                    showOutput(interpretation12 + "<br><br>" + interpretation20 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                  }
                }
              }
              else if (concentration > 110)
              {
                showOutput(interpretation6);
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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

//Meropeneme
function meropeneme(administrationmode, dialysis, tau, administrationdateday, administrationdatemonth, administrationdateyear, administrationtimehour, administrationtimemin, prelevementdateday, prelevementdatemonth, prelevementdateyear, prelevementtimehour, prelevementtimemin, concentration, bacteriology, bactery, cmimode, cmi, resistance, dfg, incoherence)
{
  fractionLibre = 1;
  cmin = 8;
  cmax = 16;
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
      else if (concentration > 16)
      {
        if (4*cmi > 16)
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
            if (concentration <= 50)
            {
              if (dfg >= 90)
              {
                showOutput(interpretation13 + "<br><br>" + interpretation20);
              }
              else if (dfg < 90)
              {
                if (dfg < 30)
                {
                  showOutput(interpretation6);
                }
                else if (dfg  >= 30)
                {
                  showOutput(interpretation13 + "<br><br>" + interpretation20 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                }
              }
            }
            else if (concentration > 50)
            {
              showOutput(interpretation6);
            }
          }
        }
      }
      else if (concentration <= 16 && concentrationLibre >= 4*cmi)
      {
        if (dfg >= 90)
        {
          if (cmimode == "cmi")
          {
            showOutput(interpretation10);
          }
          else if (cmimode == "breakpoint")
          {
            interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
            showOutput(interpretation10);
          }
        }
        else if (dfg < 90)
        {
          if (cmimode == "cmi")
          {
            showOutput(interpretation11);
          }
          else if (cmimode == "breakpoint")
          {
            interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
            showOutput(interpretation11);
          }
        }
      }
    }
    else if (bacteriology == "inconnue")
    {
      if (concentration < 8)
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
      else if (concentration > 16)
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
          if (concentration <= 50)
          {
            if (dfg >= 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation12 + "<br><br>" + interpretation20);
            }
            else if (dfg < 90)
            {
              if (dfg < 30)
              {
                showOutput(interpretation6);
              }
              else if (dfg  >= 30)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12 + "<br><br>" + interpretation20 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
              }
            }
          }
          else if (concentration > 50)
          {
            showOutput(interpretation6);
          }
        }
      }
      else
      {
        if (dfg < 90)
        {
          interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
          showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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
    demivie_theorique = 1;
    demivie_patient = demivie_theorique*(120/dfg);
    deltat = ((prelevementdateday - administrationdateday)*24)+((prelevementdatemonth - administrationdatemonth)*30*24)+((prelevementdateyear - administrationdateyear)*365*24)+(prelevementtimehour - administrationtimehour)+((prelevementtimemin - administrationtimemin)/60);
    cres = concentration * (Math.exp((-Math.log(2))/(demivie_patient*deltat)));
    if (deltat < tau)
    {
      interpretation17 = "La concentration r\351siduelle estim\351e, selon les param\350tres pharmacocin\351tiques issus de la litt\351rature (demi-vie moyenne = " + demivie_theorique + "h) et selon le DFG du patient, est d'environ " + cres + " mg/L.";
      if (dialysis == "oui")
      {
        if (bacteriology == "connue")
        {
          if (cres < 8)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation3);
              }
            }
          }
          else if (cres > 16)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (cres <= 50)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation13 + "<br><br>" + interpretation20);
              }
              else if (cres > 50)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
            }
          }
          else
          {
            showOutput(interpretation17 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 8)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else if (cres > 16)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (cres <= 50)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation20);
              }
              else if (cres > 50)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
            }
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
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
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              if (resistance == "resistant")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation2);
              }
              else if (resistance == "sensible")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation3);
              }
            }
          }
          if (cres > 16)
          {
            if (4*cmi > 16)
            {
              showOutput(interpretation17 + "<br><br>" + interpretation4);
            }
            else
            {
              if (incoherence == "incoherent")
              {
                if (dfg >= 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5);
                }
                else if (dfg < 90)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
                }
              }
              else if (incoherence == "coherent")
              {
                if (cres <= 50)
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation13 + "<br><br>" + interpretation20);
                  }
                  else if (dfg < 90)
                  {
                    if (dfg < 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation6);
                    }
                    else if (dfg >= 30)
                    {
                      showOutput(interpretation17 + "<br><br>" + interpretation13 + "<br><br>" + interpretation20 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
                else if (cres > 50)
                {
                  showOutput(interpretation17 + "<br><br>" + interpretation6)
                }
              }
            }
          }
          else if (cres <= 16 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation10);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                showOutput(interpretation17 + "<br><br>" + interpretation10);
              }
            }
            else if (dfg < 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation17 + "<br><br>" + interpretation11);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation17 + "<br><br>" + interpretation11);
              }
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (cres < 8)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation17 + "<br><br>" + interpretation1);
            }
            else if (incoherence == "coherent")
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc inf\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
            }
          }
          else if (cres > 16)
          {
            if (incoherence == "incoherent")
            {
              if (dfg >= 90)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5);
              }
              else if (dfg < 90)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation5 + " Attention, il est \340 noter une alt\351ration de la fonction r\351nale.");
              }
            }
            else if (incoherence == "coherent")
            {
              if (cres <= 50)
              {
                if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation20);
                }
                else if (dfg < 90)
                {
                  if (dfg < 30)
                  {
                    showOutput(interpretation17 + "<br><br>" + interpretation6);
                  }
                  else if (dfg >= 30)
                  {
                    interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                    showOutput(interpretation17 + "<br><br>" + interpretation12 + "<br><br>" + interpretation20 + " Une alteration de la fonction r\351nale peut expliquer ce r\351sultat.");
                  }
                }
              }
              else if (cres > 50)
              {
                showOutput(interpretation17 + "<br><br>" + interpretation6);
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation17 + "<br><br>" + interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
            }
            else if (dfg >= 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation17 + "<br><br>" + interpretation12);
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
          if (concentration < 8)
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
          else if (concentration > 16)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (concentration <= 50)
              {
                showOutput(interpretation13 + "<br><br>" + interpretation20);
              }
              else if (concentration > 50)
              {
                showOutput(interpretation6);
              }
            }
          }
          else
          {
            showOutput(interpretation19 + "<br><br>" + interpretation10);
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 8)
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
          else if (concentration > 16)
          {
            if (incoherence == "incoherent")
            {
              showOutput(interpretation5);
            }
            else if (incoherence == "coherent")
            {
              if (concentration <= 50)
              {
                interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                showOutput(interpretation12 + "<br><br>" + interpretation20);
              }
              else if (concentration > 50)
              {
                showOutput(interpretation6);
              }
            }
          }
          else
          {
            interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
            showOutput(interpretation12 + "<br><br>" + interpretation19 + "<br><br>" + interpretation10);
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
          if (concentration > 16)
          {
            if (4*cmi > 16)
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
                if (concentration <= 50)
                {
                  if (dfg >= 90)
                  {
                    showOutput(interpretation13 + "<br><br>" + interpretation20);
                  }
                  else if (dfg < 90)
                  {
                    if (dfg < 30)
                    {
                      showOutput(interpretation6);
                    }
                    else if (dfg >= 30)
                    {
                      showOutput(interpretation13 + "<br><br>" + interpretation20 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                    }
                  }
                }
                else if (concentration > 50)
                {
                  showOutput(interpretation6);
                }
              }
            }
          }
          else if (concentration <= 16 && concentrationLibre >= 4*cmi)
          {
            if (dfg >= 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation10);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation10 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
                showOutput(interpretation10);
              }
            }
            else if (dfg < 90)
            {
              if (cmimode == "cmi")
              {
                showOutput(interpretation11);
              }
              else if (cmimode == "breakpoint")
              {
                interpretation11 = "Concentration efficace au vu des r\351sultats de bact\351riologie (" + bactery + " dans pr\351l\350vement du " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear + " \340 " + administrationtimehour + ":" + administrationtimemin + ", breakpoint = " + cmi + " mg/L d'apr\350s les donn\351es de l'EUCAST en l'absence de la CMI de la souche) et selon les recommandations appliqu\351es en r\351animation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.";
                showOutput(interpretation11);
              }
            }
          }
        }
        else if (bacteriology == "inconnue")
        {
          if (concentration < 8)
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
          else if (concentration > 16)
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
              if (concentration <= 50)
              {
                if (dfg >= 90)
                {
                  interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc sup\351rieure \340 l'intervalle th\351rapeutique. \300 confronter aux r\351sultats de Bact\351riologie ou : \300 confronter au reste du bilan clinico-biologique (Pr\351sence d'effets ind\351sirables ? R\351sultats de Bact\351riologie ? Hypoalbumin\351mie ?)";
                  showOutput(interpretation12 + "<br><br>" + interpretation20);
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
                    showOutput(interpretation12 + "<br><br>" + interpretation20 + " En outre, une alt\351ration de la fonction r\351nale peut en partie expliquer ce r\351sultat.");
                  }
                }
              }
              else if (concentration > 50)
              {
                showOutput(interpretation6);
              }
            }
          }
          else
          {
            if (dfg < 90)
            {
              interpretation12 = "D'apr\350s les recommandations de la Soci\351te Fran\347aise d'Anesth\351sie et R\351animation et de la Soci\351t\351 Fran\347aise de Pharmacologie et Th\351rapeutique dans le cadre d'une infection non document\351e, la concentration \340 l'\351quilibre en " + molecule + " doit \352tre comprise entre " + cmin + " et " + cmax + " mg/L. La concentration mesur\351e est donc dans l'intervalle th\351rapeutique.";
              showOutput(interpretation12 + " Cependant il y a une d\351gradation de la fonction r\351nale. Un bilan de contr\364le serait souhaitable afin de s'assurer de l'absence d'accumulation du m\351dicament.");
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