# Include Shiny library
if(!require('shiny')) {
  install.packages('shiny')
  library('shiny')
}
# App Files
source("server.R")
source("ui.R")

# Run the app
shinyApp(ui = ui, server = server)