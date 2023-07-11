function cefepime()
{
  if (document.getElementById("administrationContinue").checked == true)
  {
    if (document.getElementById("bacteriologyConnue").checked == true)
    {
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
        if (8*cmi > 35)
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : " + mailtwo;
          document.getElementById("output2").innerHTML = "";
          document.getElementById("output3").innerHTML = "";
          showOutput();
        }
        else
        {
          if (document.getElementById("incoherence").checked == true)
          {
            if (document.getElementById("dfg").value >= 90)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else if (document.getElementById("dfg").value < 90)
            {
              if (document.getElementById("dfg").value < 30)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + mail;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("dfg").value >= 30)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
          }
          else if (document.getElementById("incoherence").checked == false)
          {
            if (document.getElementById("dfg").value >= 90)
            {
              if (concentration > 35 && concentration <= 45)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (concentration > 45 && concentration <= 60)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (concentration > 60)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
            else if (document.getElementById("dfg").value < 90)
            {
              if (document.getElementById("dfg").value < 30)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + mail;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("dfg").value  >= 30)
              {
                if (concentration > 35 && concentration <= 45)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                  document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput();
                }
                else if (concentration > 45 && concentration <= 60)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                  document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput();
                }
                else if (concentration > 60)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                  document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput();
                }
              }
            }
          }
        }
      }
      else if (concentration <= 35 && concentrationLibre >= 4*cmi)
      {
        if (document.getElementById("dfg").value >= 90)
        {
          document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfive;
          document.getElementById("output2").innerHTML = "";
          document.getElementById("output3").innerHTML = "";
          showOutput();
        }
        else if (document.getElementById("dfg").value < 90)
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
          dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration a l'equilibre en Cefepime doit etre comprise entre 5 et 35 mg/L. La concentration mesuree est donc inferieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
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
          if (document.getElementById("dfg").value >= 90)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
          else if (document.getElementById("dfg").value < 90)
          {
            if (document.getElementById("dfg").value < 30)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + mail;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else if (document.getElementById("dfg").value >= 30)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
              document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
          }
        }
        else if (document.getElementById("incoherence").checked == false)
        {
          if (document.getElementById("dfg").value >= 90)
          {
            dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration a l'equilibre en Cefepime doit etre comprise entre 5 et 35 mg/L. La concentration mesuree est donc superieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
          else if (document.getElementById("dfg").value < 90)
          {
            if (document.getElementById("dfg").value < 30)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + mail;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else if (document.getElementById("dfg").value >= 30)
            {
              dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration a l'equilibre en Cefepime doit etre comprise entre 5 et 35 mg/L. La concentration mesuree est donc superieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
              document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
          }
        }
      }
      else
      {
        dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration a l'equilibre en Cefepime doit etre comprise entre 5 et 35 mg/L. La concentration mesuree est donc dans l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
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
    demivie_theorique = 2;
    demivie_patient = demivie_theorique *(120/dfg);
    cres = concentration * Math.exp((-Math.log(2))/(demivie_patient*deltat));
    cres_two = concentration / (Math.exp((-Math.log(2))/(demivie_patient*deltat)));
    if (deltat < tau)
    {
      if (document.getElementById("dialysis").checked == true)
      {
        if (document.getElementById("bacteriologyConnue").checked == true)
        {
          if (cres < 20)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deight;
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
        else if (document.getElementById("bacteriologyInconnue").checked == true)
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
      }
      else if (document.getElementById("dialysis").checked == false)
      {
        if (document.getElementById("bacteriologyConnue").checked == true)
        {
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
            if (4*cmi > 20)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + mailtwo;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else
            {
              if (document.getElementById("incoherence").checked == true)
              {
                if (document.getElementById("dfg").value >= 90)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                  document.getElementById("output2").innerHTML = "";
                  document.getElementById("output3").innerHTML = "";
                  showOutput();
                }
                else if (document.getElementById("dfg").value < 90)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                  document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput();
                }
              }
              else if (document.getElementById("incoherence").checked == false)
              {
                if (document.getElementById("dfg").value >= 90)
                {
                  if (cres > 20 && cres <= 30)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                    document.getElementById("output2").innerHTML = "";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (cres > 30 && cres <= 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                    document.getElementById("output2").innerHTML = "";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (cres > 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                    document.getElementById("output2").innerHTML = "";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                }
                else if (document.getElementById("dfg").value < 90)
                {
                  if (cres > 20 && cres <= 30)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                    document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (cres > 30 && cres <= 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                    document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (cres > 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                    document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                }
              }
            }
          }
          else if (cres <= 20 && concentrationLibre >= 4*cmi)
          {
            if (document.getElementById("dfg").value >= 90)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfive;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else if (document.getElementById("dfg").value < 90)
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
              dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc inferieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
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
              if (document.getElementById("dfg").value >= 90)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("dfg").value < 90)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              if (document.getElementById("dfg").value >= 90)
              {
                dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc superieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("dfg").value < 90)
              {
                dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc superieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
                document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
          }
          else
          {
            dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc dans l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
        }
      }
    }
    else if (deltat > tau)
    {
      if (document.getElementById("dialysis").checked == true)
      {
        if (document.getElementById("bacteriologyConnue").checked == true)
        {
          if (cres_two < 20)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deight;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
          else if (cres_two > 30)
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
        else if (document.getElementById("bacteriologyInconnue").checked == true)
        {
          if (cres_two < 20)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : Concentration infra-therapeutique pour patient dialyse." ;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
          else if (cres_two > 30)
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
      }
      else if (document.getElementById("dialysis").checked == false)
      {
        if (document.getElementById("bacteriologyConnue").checked == true)
        {
          fractionLibre = 0.8;
          concentrationLibre = cres_two * fractionLibre;
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
          if (cres_two > 20)
          {
            if (4*cmi > 20)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + mailtwo;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else
            {
              if (document.getElementById("incoherence").checked == true)
              {
                if (document.getElementById("dfg").value >= 90)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                  document.getElementById("output2").innerHTML = "";
                  document.getElementById("output3").innerHTML = "";
                  showOutput();
                }
                else if (document.getElementById("dfg").value < 90)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                  document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput();
                }
              }
              else if (document.getElementById("incoherence").checked == false)
              {
                if (document.getElementById("dfg").value >= 90)
                {
                  if (cres_two > 20 && cres_two <= 30)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                    document.getElementById("output2").innerHTML = "";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (cres_two > 30 && cres_two <= 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                    document.getElementById("output2").innerHTML = "";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (cres_two > 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                    document.getElementById("output2").innerHTML = "";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                }
                else if (document.getElementById("dfg").value < 90)
                {
                  if (cres_two > 20 && cres_two <= 30)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                    document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (cres_two > 30 && cres_two <= 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                    document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (cres_two > 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                    document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                }
              }
            }
          }
          else if (cres_two <= 20 && concentrationLibre >= 4*cmi)
          {
            if (document.getElementById("dfg").value >= 90)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfive;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else if (document.getElementById("dfg").value < 90)
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
          if (cres_two < 5)
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
              dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc inferieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
          }
          else if (cres_two > 20)
          {
            if (document.getElementById("incoherence").checked == true)
            {
              if (document.getElementById("dfg").value >= 90)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("dfg").value < 90)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              if (document.getElementById("dfg").value >= 90)
              {
                dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc superieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("dfg").value < 90)
              {
                dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc superieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
                document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
          }
          else
          {
            dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc dans l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
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
        if (document.getElementById("bacteriologyConnue").checked == true)
        {
          if (concentration < 20)
          {
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deight;
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
        else if (document.getElementById("bacteriologyInconnue").checked == true)
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
      }
      else if (document.getElementById("dialysis").checked == false)
      {
        if (document.getElementById("bacteriologyConnue").checked == true)
        {
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
            if (4*cmi > 20)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + mailtwo;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else
            {
              if (document.getElementById("incoherence").checked == true)
              {
                if (document.getElementById("dfg").value >= 90)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                  document.getElementById("output2").innerHTML = "";
                  document.getElementById("output3").innerHTML = "";
                  showOutput();
                }
                else if (document.getElementById("dfg").value < 90)
                {
                  document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                  document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                  document.getElementById("output3").innerHTML = "";
                  showOutput();
                }
              }
              else if (document.getElementById("incoherence").checked == false)
              {
                if (document.getElementById("dfg").checked >= 90)
                {
                  if (concentration > 20 && concentration <= 30)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                    document.getElementById("output2").innerHTML = "";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (concentration > 30 && concentration <= 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                    document.getElementById("output2").innerHTML = "";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (concentration > 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                    document.getElementById("output2").innerHTML = "";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                }
                else if (document.getElementById("dfg").value < 90)
                {
                  if (concentration > 20 && concentration <= 30)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dsixteen;
                    document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (concentration > 30 && concentration <= 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dseventeen;
                    document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                  else if (concentration > 60)
                  {
                    document.getElementById("output").innerHTML = "INTERPRETATIONS : " + deighteen;
                    document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                    document.getElementById("output3").innerHTML = "";
                    showOutput();
                  }
                }
              }
            }
          }
          else if (concentration <= 20 && concentrationLibre >= 4*cmi)
          {
            if (document.getElementById("dfg").value >= 90)
            {
              document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfive;
              document.getElementById("output2").innerHTML = "";
              document.getElementById("output3").innerHTML = "";
              showOutput();
            }
            else if (document.getElementById("dfg").value < 90)
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
              dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc inferieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
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
              if (document.getElementById("dfg").value >= 90)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("dfg").value < 90)
              {
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dfourteen;
                document.getElementById("output2").innerHTML = "Attention, il est a noter une alteration de la fonction renale.";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
            else if (document.getElementById("incoherence").checked == false)
            {
              if (document.getElementById("dfg").value >= 90)
              {
                dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc superieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
                document.getElementById("output2").innerHTML = "";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
              else if (document.getElementById("dfg").value < 90)
              {
                dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc superieure a l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
                document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
                document.getElementById("output2").innerHTML = "Une alteration de la fonction renale peut expliquer ce resultat.";
                document.getElementById("output3").innerHTML = "";
                showOutput();
              }
            }
          }
          else
          {
            dtwo = "D'apres les recommandations de la Societe Francaise d'Anesthesie et Reanimation et de la Societe Francaise de Pharmacologie et Therapeutique dans le cadre d'une infection non documentee, la concentration residuelle en Cefepime doit etre comprise entre 5 et 20 mg/L. La concentration mesuree est donc dans l'intervalle therapeutique. A confronter aux resultats de Bacteriologie ou : A confronter au reste du bilan clinico-biologique (Presence d'effets indesirables ? Resultats de Bacteriologie ? Hypoalbuminemie ?)";
            document.getElementById("output").innerHTML = "INTERPRETATIONS : " + dtwo;
            document.getElementById("output2").innerHTML = "";
            document.getElementById("output3").innerHTML = "";
            showOutput();
          }
        }
      }
    }
  }
  clean();
  document.getElementById("myForm").reset();
}