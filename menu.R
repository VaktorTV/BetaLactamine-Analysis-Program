library(shiny)

# Menu
menu <- function()
{
  navbarPage(title = "DOSAGE D'ANTI-INFECTIEUX", tabPanel("Analyse"), tabPanel ("Informations"))
}