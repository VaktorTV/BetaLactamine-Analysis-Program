function analysis() {
  event.preventDefault();
  clean();
  
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
  dfg = document.getElementById("dfg").value;
    
  administrationdate = 0;
  prelevementdate = 0;
  cmi = 0;
  fractionLibre = 0;
  concentrationLibre = 0;
  tau = 0;
  deltat = 0;
  cres = 0;
  demivie_theorique = 0;
  demivie_patient = 0;
  
  dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration [residuelle] [a l'equilibre] en XXX doit etre comprise entre 8 et 16 mg/L [Meropeneme] / 40 et 80 mg/L [Cefazoline] / 35 et 80 mg/L [Ceftazidime]. La concentration mesuree est donc inferieure a / superieure a / dans l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
  dfive = "Concentration efficace au vu des resultats de bacteriologie (Bacterie dans nature prelevement du date du prelevement, CMI =  XX mg/L) et selon les recommandations appliquees en reanimation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
  dseven = "Concentration efficace au vu des resultats de bacteriologie ( Bacterie dans nature prelevement du date du prelevement, CMI =  XX mg/L) et selon les recommandations appliquees en reanimation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition. Cependant il y a une degradation de la fonction renale. Un bilan de controle serait souhaitable afin de s'assurer de l'absence d'accumulation du medicament.";
  deight = "Concentration infra-therapeutique au vu des resultats de bacteriologie ( dans du , CMI = mg/L) et selon les recommandations appliquees en reanimation (concentration libre > 4x CMI pendant 100% de l'interdose). Une adaptation de posologie est recommandee (par exemple mg/j) suivie d'un prelevement de controle 24 à 48h apres le changement de dose.";
  dnine = "Devant les resultats de bacteriologie (  dans  du , resistante au XXX), l'efficacite du traitement par XXX ne peut etre assuree.";
  dten = "Concentration indetectable malgre un traitement instaure depuis XXX jours ( XXX g en continu) et une fonction renale normale. Un prelevement de controle est recommande afin d'eliminer un eventuel probleme pre-analytique (erreur d'identite, inversion de tube).";
  deleven = "Ce resultat peut etre explique soit par une reelle sous-exposition soit par une interference pre-analytique (mauvaise conservation du prelevement lors de l'acheminement). Il doit etre confronte au contexte clinique (amelioration des symptomes ?) et controle si necessaire. En cas de reponse clinique insuffisante, une augmentation de la posologie est recommandee (par exemple 850 mg x 4 / j) ainsi qu'un prelevement de controle 48h apres le changement de dose.";
  dtwelve = "Concentration infra-therapeutique coherente avec un arret du traitement depuis le XXX.";
  dfourteen = "Concentration anormalement elevee. Au vu des anteriorites, du bilan renal, de la posologie, et en l'absence d'effets indesirables, un prelevement de controle est recommande afin d'eliminer une eventuelle interference pre-analytique (prelevement au niveau de la perfusion continue d'antibiotique ? ). Au contraire, si le(a) patient(e) presente des effets indesirables, une adaptation de posologie est recommandee (par exemple XXX) suivie d'un prelevement de controle 24 à 48h apres le changement de dose.";
  dsixteen = "Concentration efficace au vu des resultats de bacteriologie ( dans  du , CMI =  mg/L) et selon les recommandations appliquees en reanimation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration traduit une legere surexposition. Une diminution de posologie (par exemple mg) est a discuter en fonction du contexte clinique (en particulier en cas de signes de neurotoxicite). En cas de modification de posologie, un prelevement de controle 24 a 48h apres le changement de dose est recommande.";
  dseventeen = "Concentration superieure aux valeurs recommandees, associee a un risque de neurotoxicite. En l'absence de modification de la fonction renale, une diminution de la posologie (par exemple mg) est recommandee, suivie d'un prelevement de controle 24 a 48h apres le changement de dose.";
  deighteen = "Concentration superieure aux valeurs recommandees, associee a un risque de neurotoxicite. Un arret de la perfusion continue pendant xx h suivie d'une reprise a posologie reduite (par exemple mg) est recommande, associes a un prelevement de controle 24 a 48h apres le changement de dose. Concentration superieure aux valeurs recommandees, associee a un risque accru de neurotoxicite. Un arret de la perfusion continue pendant xx heures est souhaitable, associe a 2 prelevements sanguins : le premier au moment de l'arret de la perfusion de Cefepime et le second avant reprise de la perfusion. Ces prelevements permettront d'estimer la demi-vie d'elimination du Cefepime chez ce patient en vue d'affiner son schema posologique.";
  dtwentyseven = "La concentration mesuree traduit une exposition en Cefepime en adequation avec l'exposition attendue chez les patients dialyses (20-30 mg/L).";
  
  switch (molecule) {
    case "amoxicilline":
      break;
    case "Amoxicilline":
      break;
    case "AMOXICILLINE":
      break;
    case "céfazoline":
      break;
    case "cefazoline":
      break;
    case "Céfazoline":
      break;
    case "Cefazoline":
      break;
    case "CÉFAZOLINE":
      break;
    case "CEFAZOLINE":
      break;
    case "céfépime":
      demivie_theorique = 2;
      cefepime()
      break;
    case "cefepime":
      demivie_theorique = 2;
      cefepime();
      break;
    case "Céfépime":
      demivie_theorique = 2;
      cefepime()
      break;
    case "Cefepime":
      demivie_theorique = 2;
      cefepime()
      break;
    case "CÉFÉPIME":
      demivie_theorique = 2;
      cefepime()
      break;
    case "CEFEPIME":
      demivie_theorique = 2;
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
    case "ceftazidine":
      break;
    case "Ceftazidine":
      break;
    case "CEFTAZIDINE":
      break;
    case "ceftriaxone":
      break;
    case "Ceftriaxone":
      break;
    case "CEFTRIAXONE":
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
      break;
    case "meropeneme":
      break;
    case "Méropénème":
      break;
    case "Meropeneme":
      break;
    case "MÉROPÉNÈME":
      break;
    case "MEROPENEME":
      break;
    case "pipéracilline":
      break;
    case "piperacilline":
      break;
    case "Pipéracilline":
      break;
    case "Piperacilline":
      break;
    case "PIPÉRACILLINE":
      break;
    case "PIPERACILLINE":
      break;
    default:
      alert("Veuillez entrer un nom de molecule correcte !");
      return false;
      break;
  }
  document.getElementById("form").reset();
}

function showOutput()
{
  event.preventDefault();
  document.getElementById("outputMolecule").innerHTML = "TRAITEMENT : " + molecule;
  if (document.getElementById("administrationContinue").checked == true)
  {
    document.getElementById("outputAdministrationMode").innerHTML = "MODE D'ADMINISTRATION : continu";
  }
  else if (document.getElementById("administrationDiscontinue").checked == true)
  {
    document.getElementById("outputAdministrationMode").innerHTML = "MODE D'ADMINISTRATION : discontinu";
  }
  document.getElementById("outputDose").innerHTML = "DOSE : " + dose + " mg " + frequence + " fois par jour";
  document.getElementById("outputAdministrationDate").innerHTML = "DATE D'ADMINISTRATION : " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear;
  document.getElementById("outputAdministrationTime").innerHTML = "HEURE D'ADMINISTRATION : " + administrationtimehour + ":" + administrationtimemin;
  document.getElementById("outputPrelevementDate").innerHTML = "DATE DE PRELEVEMENT : " + prelevementdateday + "/" + prelevementdatemonth + "/" + prelevementdateyear;
  document.getElementById("outputPrelevementTime").innerHTML = "HEURE DE PRELEVEMENT : " + prelevementtimehour + ":" + prelevementtimemin;
  if (document.getElementById("administrationContinue").checked == true)
  {
    document.getElementById("outputConcentration").innerHTML = "CONCENTRATION A L'EQUILIBRE : " + concentration + " mg/L";
  }
  else if (document.getElementById("administrationDiscontinue").checked == true)
  {
    tau = 24/frequence;
    if (document.getElementById("administrationDateDay").value == "" || document.getElementById("administrationDateMonth").value == "" || document.getElementById("administrationDateYear").value == "" || document.getElementById("administrationTimeHour").value == "" || document.getElementById("administrationTimeMin").value == "" || document.getElementById("prelevementDateDay").value == "" || document.getElementById("prelevementDateMonth").value == "" || document.getElementById("prelevementDateYear").value == "" || document.getElementById("prelevementTimeHour").value == "" || document.getElementById("prelevementTimeMin").value == "")
    {
      document.getElementById("outputConcentration").innerHTML = "CONCENTRATION : donnees manquantes, impossible de determiner si la concentration residuelle est vraie ou non";
      document.getElementById("output").innerHTML = "INTERPRETATIONS : Donnees sur la concentration manquante, de ce fait il est difficile d'interpreter les resultats."
    }
    else
    {
      if (deltat < tau)
      {
        if (dfg == 0 || document.getElementById("dfg").value == "")
        {
          document.getElementById("outputConcentration").innerHTML = "CONCENTRATION : donnees manquantes, impossible de determiner si la concentration residuelle est vraie ou non";
          document.getElementById("output").innerHTML = "INTERPRETATIONS : Donnees sur la concentration manquante, de ce fait il est difficile d'interpreter les resultats."
        }
        else
        {
          demivie_patient = demivie_theorique *(120/dfg);
          cres = concentration * Math.exp((-Math.log(2))/(demivie_patient*deltat));
          document.getElementById("outputConcentration").innerHTML = "CONCENTRATION RESIDUELLE CALCULEE/ESTIMEE : " + cres + " mg/L";
        }
      }
      else
      {
        document.getElementById("outputConcentration").innerHTML = "CONCENTRATION RESIDUELLE VRAIE : " + concentration + " mg/L";
      }
    }
  }
  if (document.getElementById("bacteriologyConnue").checked == true)
  {
    document.getElementById("outputBacteriology").innerHTML = "BACTERIOLOGIE : connue";
  }
  else if (document.getElementById("bacteriologyInconnue").checked == true)
  {
    document.getElementById("outputBacteriology").innerHTML = "BACTERIOLOGIE : inconnue";
  }
  if (document.getElementById("resistance").checked == true)
  {
    document.getElementById("outputResistance").innerHTML = "GERME RESISTANT : oui";
  }
  else if (document.getElementById("resistance").checked == false)
  {
    document.getElementById("outputResistance").innerHTML = "GERME RESISTANT : non";
  }
  if (document.getElementById("dialysis").checked == true)
  {
    document.getElementById("outputDialysis").innerHTML = "PATIENT DIALYSE : oui";
  }
  else if (document.getElementById("dialysis").checked == false)
  {
    document.getElementById("outputDialysis").innerHTML = "PATIENT DIALYSE : non";
  }
  if (document.getElementById("renalFunctionNormale").checked == true)
  {
    document.getElementById("outputRenalFunction").innerHTML = "FONCTION RENALE : normale";
  }
  else if (document.getElementById("renalFunctionAnormale").checked == true)
  {
    document.getElementById("outputRenalFunction").innerHTML = "FONCTION RENALE : anormale";
  }
  document.getElementById("outputDFG").innerHTML = "DFG : " + dfg + " L/h";
  if (document.getElementById("incoherence").checked == true)
  {
    document.getElementById("outputIncoherence").innerHTML = "INCOHERENCE AVEC FONCTION RENALE ET ANTERIORITES : oui";
  }
  else if (document.getElementById("incoherence").checked == false)
  {
    document.getElementById("outputIncoherence").innerHTML = "INCOHERENCE AVEC FONCTION RENALE ET ANTERIORITES : non";
  }
}

function clean()
{
  document.getElementById("outputMolecule").innerHTML = "";
  document.getElementById("outputAdministrationMode").innerHTML = "";
  document.getElementById("outputDose").innerHTML = "";
  document.getElementById("outputAdministrationDate").innerHTML = "";
  document.getElementById("outputAdministrationTime").innerHTML = "";
  document.getElementById("outputPrelevementDate").innerHTML = "";
  document.getElementById("outputPrelevementTime").innerHTML = "";
  document.getElementById("outputConcentration").innerHTML = "";
  document.getElementById("outputBacteriology").innerHTML = "";
  document.getElementById("outputResistance").innerHTML = "";
  document.getElementById("outputDialysis").innerHTML = "";
  document.getElementById("outputRenalFunction").innerHTML = "";
  document.getElementById("outputDFG").innerHTML = "";
  document.getElementById("outputIncoherence").innerHTML = "";
  document.getElementById("output").innerHTML = "";
  
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
  dfg = 0;
    
  administrationdate = 0;
  prelevementdate = 0;
  cmi = 0;
  fractionLibre = 0;
  concentrationLibre = 0;
  tau = 0;
  deltat = 0;
  cres = 0;
  demivie_theorique = 0;
  demivie_patient = 0;
}
function clearOutput()
{
  clean();
  document.getElementById("form").reset();
  location.reload();
}

function cefepime()
{
  if (document.getElementById("administrationContinue").checked == true)
  {
    if (document.getElementById("bacteriologyConnue").checked == true)
    {
      cmi = 1;
      fractionLibre = 0.8;
      concentrationLibre = concentration * fractionLibre;
      if (concentrationLibre < 4*cmi)
      {
        if (document.getElementById("incoherence").checked == true)
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : 1. " + dten;
          document.getElementById("output2").innerHTML = "2. " + deleven;
          document.getElementById("output3").innerHTML = "3. " + dtwelve;
          showOutput();
        }
        else if (document.getElementById("incoherence").checked == false)
        {
          if (document.getElementById("resistance").checked == true)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dnine;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
          else if (document.getElementById("resistance").checked == false)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deight;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
        }
      }
      else if (concentration > 35)
      {
        if (document.getElementById("incoherence").checked == true)
        {
          if (document.getElementById("renalFunctionNormale").checked == true)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput;
          }
          else if (document.getElementById("renalFunctionAnormale").checked == true)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
            document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
            document.getElementById("output3").innerHTML = "";
            showOutput;
          }
        }
        else if (document.getElementById("incoherence").checked == false)
        {
          if (document.getElementById("renalFunctionNormale").checked == true)
          {
            if (concentration > 35 && concentration <= 45)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput;
            }
            else if (concentration > 45 && concentration <= 60)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput;
            }
            else if (concentration > 60)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput;
            }
          }
          else if (document.getElementById("renalFunctionAnormale").checked == true)
          {
            if (concentration > 35 && concentration <= 45)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
              document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
              document.getElementById("output3").innerHTML = "";
              showOutput;
            }
            else if (concentration > 45 && concentration <= 60)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
              document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
              document.getElementById("output3").innerHTML = "";
              showOutput;
            }
            else if (concentration > 60)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
              document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
              document.getElementById("output3").innerHTML = "";
              showOutput;
            }
          }
        }
      }
      else
      {
        if (document.getElementById("renalFunctionNormale").checked == true)
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfive;
          document.getElementById("output2").innerHTML = "";
          document.getElementById("output3").innerHTML = "";
          showOutput();
        }
        else if (document.getElementById("renalFunctionAnormale").checked == true)
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseven;
          document.getElementById("output2").innerHTML = "";
          document.getElementById("output3").innerHTML = "";
          showOutput();
        }
      }
    }
    else if (document.getElementById("bacteriologyInconnue").checked == true)
    {
      if (concentration < 5)
      {
        if (document.getElementById("incoherence").checked == true)
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : 1. " + dten;
          document.getElementById("output2").innerHTML = "2. " + deleven;
          document.getElementById("output3").innerHTML = "3. " + dtwelve;
          showOutput();
        }
        else
        {
        document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
        document.getElementById("output2").innerHTML = "";
        document.getElementById("output3").innerHTML = "";
        showOutput();
        }
      }
      else if (concentration > 35)
      {
        if (document.getElementById("incoherence").checked == true)
        {
          if (document.getElementById("renalFunctionNormale").checked == true)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput;
          }
          else if (document.getElementById("renalFunctionAnormale").checked == true)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
            document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
            document.getElementById("output3").innerHTML = "";
            showOutput;
          }
        }
        else if (document.getElementById("incoherence").checked == false)
        {
          if (document.getElementById("renalFunctionNormale").checked == true)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
          else if (document.getElementById("renalFunctionAnormale").checked == true)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
            document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
        }
      }
      else
      {
        document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
        document.getElementById("output2").innerHTML = "";
        document.getElementById("output3").innerHTML = "";
        showOutput();
      }
    }
  }
  else if (document.getElementById("administrationDiscontinue").checked == true)
  {
    deltat = ((prelevementdateday - administrationdateday)*24)+((prelevementdatemonth - administrationdatemonth)*30*24)+((prelevementdateyear - administrationdateyear)*365*24)+(prelevementtimehour - administrationtimehour)+((prelevementtimemin - administrationtimemin)/60);
    tau = 24/frequence;
    if (deltat < tau)
    {
      demivie_theorique = 2;
      demivie_patient = demivie_theorique *(120/dfg);
      cres = concentration * Math.exp((-Math.log(2))/(demivie_patient*deltat));
      if (document.getElementById("dialysis").checked == true)
      {
        if (cres < 20)
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : Concentration infra-therapeutique pour patient dialyse." ;
          document.getElementById("output2").innerHTML = "";
          document.getElementById("output3").innerHTML = "";
          showOutput();
        }
        else if (cres > 30)
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : Concentration supra-therapeutique pour patient dialyse.";
          document.getElementById("output2").innerHTML = "";
          document.getElementById("output3").innerHTML = "";
          showOutput();
        }
        else
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwentyseven;
          document.getElementById("output2").innerHTML = "";
          document.getElementById("output3").innerHTML = "";
          showOutput();
        }
      }
      else if (document.getElementById("dialysis").checked == false)
      {
        if (document.getElementById("bacteriologyConnue").checked == true)
        {
          cmi = 1;
          fractionLibre = 0.8;
          concentrationLibre = cres * fractionLibre;
          if (concentrationLibre < 4*cmi)
          {
            if (document.getElementById("incoherence").checked == true)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : 1. " + dten;
              document.getElementById("output2").innerHTML = "2. " + deleven;
              document.getElementById("output3").innerHTML = "3. " + dtwelve;
              showOutput();
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              if (document.getElementById("resistance").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dnine;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("resistance").checked == false)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deight;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
          }
          if (cres > 20)
          {
            if (document.getElementById("incoherence").checked == true)
            {
              if (document.getElementById("renalFunctionNormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput;
              }
              else if (document.getElementById("renalFunctionAnormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                document.getElementById("output3").innerHTML = "";
                showOutput;
              }
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              if (document.getElementById("renalFunctionNormale").checked == true)
              {
                if (cres > 20 && cres <= 30)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                  document.getElementById("output2").innerHTML = "";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
                else if (cres > 30 && cres <= 60)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                  document.getElementById("output2").innerHTML = "";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
                else if (cres > 60)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                  document.getElementById("output2").innerHTML = "";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
              }
              else if (document.getElementById("renalFunctionAnormale").checked == true)
              {
                if (cres > 20 && cres <= 30)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                  document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
                else if (cres > 30 && cres <= 60)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                  document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
                else if (cres > 60)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                  document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
              }
            }
          }
          else
          {
            if (document.getElementById("renalFunctionNormale").checked == true)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfive;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else if (document.getElementById("renalFunctionAnormale").checked == true)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseven;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
          }
        }
        else if (document.getElementById("bacteriologyInconnue").checked == true)
        {
          if (cres < 5)
          {
            if (document.getElementById("incoherence").checked == true)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : 1. " + dten;
              document.getElementById("output2").innerHTML = "2. " + deleven;
              document.getElementById("output3").innerHTML = "3. " + dtwelve;
              showOutput();
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
          }
          else if (cres > 20)
          {
            if (document.getElementById("incoherence").checked == true)
            {
              if (document.getElementById("renalFunctionNormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput;
              }
              else if (document.getElementById("renalFunctionAnormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                document.getElementById("output3").innerHTML = "";
                showOutput;
              }
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              if (document.getElementById("renalFunctionNormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("renalFunctionAnormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
                document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
          }
          else
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
        }
      }
    }
    else
    {
      if (document.getElementById("dialysis").checked == true)
      {
        if (concentration < 20)
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : Concentration infra-therapeutique pour patient dialyse." ;
          document.getElementById("output2").innerHTML = "";
          document.getElementById("output3").innerHTML = "";
          showOutput();
        }
        else if (concentration > 30)
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : Concentration supra-therapeutique pour patient dialyse.";
          document.getElementById("output2").innerHTML = "";
          document.getElementById("output3").innerHTML = "";
          showOutput();
        }
        else
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwentyseven;
          document.getElementById("output2").innerHTML = "";
          document.getElementById("output3").innerHTML = "";
          showOutput();
        }
      }
      else if (document.getElementById("dialysis").checked == false)
      {
        if (document.getElementById("bacteriologyConnue").checked == true)
        {
          cmi = 1;
          fractionLibre = 0.8;
          concentrationLibre = concentration * fractionLibre;
          if (concentrationLibre < 4*cmi)
          {
            if (document.getElementById("incoherence").checked == true)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : 1. " + dten;
              document.getElementById("output2").innerHTML = "2. " + deleven;
              document.getElementById("output3").innerHTML = "3. " + dtwelve;
              showOutput();
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              if (document.getElementById("resistance").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dnine;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("resistance").checked == false)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deight;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
          }
          if (concentration > 20)
          {
            if (document.getElementById("incoherence").checked == true)
            {
              if (document.getElementById("renalFunctionNormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput;
              }
              else if (document.getElementById("renalFunctionAnormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                document.getElementById("output3").innerHTML = "";
                showOutput;
              }
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              if (document.getElementById("renalFunctionNormale").checked == true)
              {
                if (concentration > 20 && concentration <= 30)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                  document.getElementById("output2").innerHTML = "";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
                else if (concentration > 30 && concentration <= 60)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                  document.getElementById("output2").innerHTML = "";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
                else if (concentration > 60)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                  document.getElementById("output2").innerHTML = "";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
              }
              else if (document.getElementById("renalFunctionAnormale").checked == true)
              {
                if (concentration > 20 && concentration <= 30)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                  document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
                else if (concentration > 30 && concentration <= 60)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                  document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
                else if (concentration > 60)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                  document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput;
                }
              }
            }
          }
          else
          {
            if (document.getElementById("renalFunctionNormale").checked == true)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfive;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else if (document.getElementById("renalFunctionAnormale").checked == true)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseven;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
          }
        }
        else if (document.getElementById("bacteriologyInconnue").checked == true)
        {
          if (concentration < 5)
          {
            if (document.getElementById("incoherence").checked == true)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : 1. " + dten;
              document.getElementById("output2").innerHTML = "2. " + deleven;
              document.getElementById("output3").innerHTML = "3. " + dtwelve;
              showOutput();
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
          }
          else if (concentration > 20)
          {
            if (document.getElementById("incoherence").checked == true)
            {
              if (document.getElementById("renalFunctionNormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput;
              }
              else if (document.getElementById("renalFunctionAnormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                document.getElementById("output3").innerHTML = "";
                showOutput;
              }
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              if (document.getElementById("renalFunctionNormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("renalFunctionAnormale").checked == true)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
                document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
          }
          else
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
        }
      }
    }
  }
}