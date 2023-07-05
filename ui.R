# INCLUDE SHINY LIBRARY
library(shiny)
# INCLUDE APP FILES
source("patientInformation.R")
source("menu.R")
source("Questions/administration.R")

# DEFINE UI PAGE
ui <- fluidPage(
  
  menu(),
  
  # APP TITLE
  titlePanel
  (
    h1("DOSAGE D'ANTI-INFECTIEUX", align = "center"),
  ),

  sidebarLayout
  (
    position="left",

    # PATIENT INFORMATION PANEL
    sidebarPanel
    (
      titlePanel(h1("INFORMATIONS DU PATIENT", align = "center")),
      includeHTML("Questions/formulaire.html"),
      htmlOutput("patientLastName"),
    ),
    
    # QUESTIONS AND ANALYSIS PANEL
    mainPanel
    (

      titlePanel
      (
        h1("ANALYSE", align = "center")
      ),
      
      #administration(),
    )
  )
)