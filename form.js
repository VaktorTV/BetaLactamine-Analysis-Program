  var patientlastname = document.getElementById("patientLastName").value;
  var patientfirstname = document.getElementById("patientFirstName").value;
  var molecule = document.getElementById("molecule").value;
  var administrationmode = document.getElementById("administration_mode").value;
  var dose = document.getElementById("dose").value;
  var frequence = document.getElementById("frequence").value;
  var administrationdate = document.getElementById("administrationDate").value;
  var administrationtime = document.getElementById("administrationTime").value;
  var prelevementdate = document.getElementById("prelevementDate").value;
  var prelevementtime = document.getElementById("prelevementTime").value;
  var concentration = document.getElementById("concentration").value;
  var bacteriology = document.getElementById("bacteriology").value;
  var resistance = document.getElementById("resistance").value;
  var dialysis = document.getElementById("dialysis").value;
  var renalfunction = document.getElementById("renal_function").value;
  var dfg = document.getElementById("dfg").value;
  var incoherence = document.getElementById("incoherence").value;
  
  var cmi = 0;
  var fractionLibre = 0;
  var concentrationLibre = 0;
  var cres = 0;
  var demivie_theorique = 0;
  var demivie_patient = 0;

function analysis(form) {
  
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
    alert("Veuillez entrer un nom de molécule correcte !");
    return false;
    break;
}
  }
}

function cefepime()
{
  if (administrationmode == "Continue")
  {
    if (bacteriology == "Connue")
    {
      cmi = 1;
      fractionLibre = 0.8;
      concentrationLibre = concentration * fractionLibre;
      if (concentrationLibre < 4*cmi)
      {
        document.write("CONCENTRATION INFRA-THÉRAPEUTIQUE");
      }
      else if (concentration > 8*cmi)
      {
      document.write("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
       }
      else if (concentration > 35)
      {
      document.write ("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
      }
      else
      {
        document.write("CONCENTRATION THÉRAPEUTIQUE");
      }
    }
    else if (bacteriology =="Inconnue")
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
  else if (administrationmode == "Discontinue")
  {
    if ()
    {
      if (dialysis.checked == true)
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
      else if (dialysis.checked == false)
      {
        if (bacteriology == "CONNUE")
        {
          cmi = 1;
          fractionLibre = 0.8;
          concentrationLibre = concentration * fractionLibre;
          if (concentrationLibre < 4*CMI)
          {
            document.write("CONCENTRATION INFRA-THÉRAPEUTIQUE");
          }
          else if (concentrationLibre > 8*CMI)
          {
            document.write("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
          }
          else if (concentration > 20)
          {
            document.write("CONCENTRATION SUPRA-THÉRAPEUTIQUE");
          }
        }
        else if (bacteriology == "INCONNUE")
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
