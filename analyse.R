# Analysis

library(shiny)
executeForm <- function()
{
  includeHTML("Questions/formulaire.html")
  
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
    
  )
}