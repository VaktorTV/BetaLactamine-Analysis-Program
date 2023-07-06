# INCLUDE SHINY LIBRARY
library(shiny)
# INCLUDE APP FILES
source("menu.R")

# DEFINE UI PAGE
ui <- fluidPage(
  
  menu(),
  
  # APP TITLE
  titlePanel
  (h1("DOSAGE D'ANTI-INFECTIEUX", align = "center")),

  sidebarLayout
  (
    position="left",

    # PATIENT INFORMATION PANEL
    sidebarPanel
    (
      titlePanel(h1("INFORMATIONS DU PATIENT", align = "center")),
      includeHTML("form.html"),
      tags$script(src="form.js"),
    ),
    
    # QUESTIONS AND ANALYSIS PANEL
    mainPanel
    (
      titlePanel(h1("ANALYSE", align = "center")),
      includeHTML("output.html"),
    )
  )
)