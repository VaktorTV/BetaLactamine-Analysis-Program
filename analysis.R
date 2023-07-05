# Analysis

library(shiny)
executeForm <- function()
{
  includeHTML("form.html")
  
  if (!is.null(htmlOutput("patientLastName")))
  {
    next
  }
  else if (!is.null(htmlOutput("patientFirstName")))
  {
    next
  }
  switch
  (
    htmlOutput("molecule"),
    "amoxicilline",
    "Amoxicilline",
    "AMOXICILLINE",
    "céfazoline",
    "cefazoline",
    "Céfazoline",
    "Cefazoline",
    "CÉFAZOLINE",
    "CEFAZOLINE",
    "céfépime",
    "cefepime",
    "Céfépime",
    "Cefepime",
    "CÉFÉPIME",
    "CEFEPIME",
    "céfotaxime",
    "cefotaxime",
    "Céfotaxime",
    "Cefotaxime",
    "CÉFOTAXIME",
    "CEFOTAXIME",
    "ceftazidine",
    "Ceftazidine",
    "CEFTAZIDINE",
    "ceftriaxone",
    "Ceftriaxone",
    "CEFTRIAXONE",
    "cloxacilline",
    "Cloxacilline",
    "CLOXACILLINE",
    "ertapénème",
    "ertapeneme",
    "Ertapénème",
    "Ertapeneme",
    "ERTAPÉNÈME",
    "ERTAPENEME",
    "imipénème",
    "imipeneme",
    "Imipénème",
    "Imipeneme",
    "IMIPÉNÈME",
    "IMIPENEME",
    "méropénème",
    "meropeneme",
    "Méropénème",
    "Meropeneme",
    "MÉROPÉNÈME",
    "MEROPENEME",
    "pipéracilline",
    "piperacilline",
    "Pipéracilline",
    "Piperacilline",
    "PIPÉRACILLINE",
    "PIPERACILLINE"
  )
    
}