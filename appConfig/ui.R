# INCLUDE SHINY LIBRARY
library(shiny)

# DEFINE UI PAGE
ui <- fluidPage(theme = "form.css", includeScript(path = "form.js"), includeHTML("form.html"))

