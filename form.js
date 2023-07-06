function analysis() {
  event.preventDefault();
  
  patientlastname = document.getElementById("patientLastName").value;
  patientfirstname = document.getElementById("patientFirstName").value;
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
  resistance = document.getElementById("resistance").checked;
  dialysis = document.getElementById("dialysis").checked;
  dfg = document.getElementById("dfg").value;
  incoherence = document.getElementById("incoherence").checked;
    
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
    
  dfive = "GERME CONNU + CMI CONNUE : Concentration efficace au vu des résultats de bactériologie ( Bactérie dans nature prélèvement du date du prélèvement, CMI =  XX mg/L) et selon les recommandations appliquées en réanimation (concentration libre > 4x CMI pendant 100% de l'interdose). Par ailleurs, cette concentration ne traduit pas de surexposition.";
  
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
}

function showOutput()
{
  document.getElementById("outputName").innerHTML = "NOM : " + patientlastname + " " + patientfirstname;
  document.getElementById("outputMolecule").innerHTML = "TRAITEMENT : " + molecule;
  if (document.getElementById("administrationContinue").checked == true)
  {
    document.getElementById("outputAdministrationMode").innerHTML = "MODE D'ADMINISTRATION : CONTINU";
  }
  else if (document.getElementById("administrationDiscontinue").checked == true)
  {
    document.getElementById("outputAdministrationMode").innerHTML = "MODE D'ADMINISTRATION : DISCONTINU";
  }
  document.getElementById("outputDose").innerHTML = "DOSE : " + dose + " mg " + frequence + " fois par jour";
  document.getElementById("outputAdministrationDate").innerHTML = "DATE D'ADMINISTRATION : " + administrationdateday + "/" + administrationdatemonth + "/" + administrationdateyear;
  document.getElementById("outputAdministrationTime").innerHTML = "HEURE D'ADMINISTRATION : " + administrationtimehour + ":" + administrationtimemin;
  document.getElementById("outputPrelevementDate").innerHTML = "DATE DE PRELEVEMENT : " + prelevementdateday + "/" + prelevementdatemonth + "/" + prelevementdateyear;
  document.getElementById("outputPrelevementTime").innerHTML = "HEURE DE PRELEVEMENT : " + prelevementtimehour + ":" + prelevementtimemin;
  if (document.getElementById("administrationContinue").checked == true)
  {
    document.getElementById("outputConcentration").innerHTML = "CONCENTRATION A L'EQUILIBRE : " + concentration;
  }
  else if (document.getElementById("administrationDiscontinue").checked == true)
  {
    administrationdate = (administrationdateday*24*60)+(administrationdatemonth*30*24*60)+(administrationdateyear*365*24*60)+(administrationtimehour*60)+(administrationtimemin);
    prelevementdate = (prelevementdateday*24*60)+(prelevementdatemonth*30*24*60)+(prelevementdateyear*365*24*60)+(prelevementtimehour*60)+(prelevementtimemin);
    deltat = (prelevementdate - administrationdate)/60;
    tau = 24/frequence;
    if (deltat < tau)
    {
      demivie_theorique = 2;
      demivie_patient = demivie_theorique *(120/dfg);
      cres = concentration * Math.exp((-Math.log(2))/(demivie_patient*deltat));
      document.getElementById("outputConcentration").innerHTML = "CONCENTRATION RESIDUELLE CALCULEE/ESTIMEE : " + cres;
    }
    else
    {
      document.getElementById("outputConcentration").innerHTML = "CONCENTRATION RESIDUELLE VRAIE : " + concentration;
    }
  }

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
        showOutput();
        document.write("CONCENTRATION INFRA-THÉRAPEUTIQUE");
      }
      else if (concentration > 35)
      {
        showOutput();
        document.write ("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
      }
      else
      {
        showOutput();
        document.getElementById("output").innerHTML = dfive;
      }
    }
    else if (document.getElementById("bacteriologyInconnue").checked == true)
    {
      if (concentration < 5)
      {
        document.write("CONCENTRATION INFRA-THÉRAPEUTIQUE");
      }
      else if (concentration > 35)
      {
        document.write("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
      }
      else
      {
        document.write("CONCENTRATION THÉRAPEUTIQUE");
      }
    }
  }
  else if (document.getElementById("administrationDiscontinue").checked == true)
  {
    administrationdate = (administrationdateday*24*60)+(administrationdatemonth*30*24*60)+(administrationdateyear*365*24*60)+(administrationtimehour*60)+(administrationtimemin);
    prelevementdate = (prelevementdateday*24*60)+(prelevementdatemonth*30*24*60)+(prelevementdateyear*365*24*60)+(prelevementtimehour*60)+(prelevementtimemin);
    deltat = (prelevementdate - administrationdate)/60;
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
          document.write("CONCENTRATION INFRA-THÉRAPEUTIQUE");
        }
        else if (cres > 30)
        {
          document.write("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
        }
        else
        {
          document.write("CONCENTRATION THÉRAPEUTIQUE");
        }
      }
      else if (document.getElementById("dialysis").checked == false)
      {
        if (document.getElementById("bacteriologyConnue").checked == true)
        {
          cmi = 1;
          fractionLibre = 0.8;
          concentrationLibre = cres * fractionLibre;
          if (concentrationLibre < 4*CMI)
          {
            document.write("CONCENTRATION INFRA-THÉRAPEUTIQUE");
          }
          else if (cres > 20)
          {
            document.write("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
          }
        }
        else if (document.getElementById("bacteriologyInconnue").checked == true)
        {
          if (cres < 5)
          {
            document.write("CONCENTRATION INFRA-THÉRAPEUTIQUE");
          }
          else if (cres > 20)
          {
            document.write("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
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
          document.write("CONCENTRATION INFRA-THÉRAPEUTIQUE");
        }
        else if (concentration > 30)
        {
          document.write("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
        }
        else
        {
          document.write("CONCENTRATION THÉRAPEUTIQUE");
        }
      }
      else if (document.getElementById("dialysis").checked == false)
      {
        if (document.getElementById("bacteriologyConnue").checked == true)
        {
          cmi = 1;
          fractionLibre = 0.8;
          concentrationLibre = concentration * fractionLibre;
          if (concentrationLibre < 4*CMI)
          {
            document.write("CONCENTRATION INFRA-THÉRAPEUTIQUE");
          }
          else if (concentration > 20)
          {
            document.write("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
          }
        }
        else if (document.getElementById("bacteriologyInconnue").checked == true)
        {
          if (concentration < 5)
          {
            document.write("CONCENTRATION INFRA-THÉRAPEUTIQUE");
          }
          else if (concentration > 20)
          {
            document.write("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
          }
        }
      }
    }
  }
}