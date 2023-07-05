function analysis (form) {
  var patientlastname = form.patient_last_name.value;
  var patientfirstname = form.patient_first_name.value;
  var molecule = form.molecule.value;
  var administrationmode = form.administration_mode.value;
  var administrationdate = form.administration_date.value;
  var administrationtime = form.administration_time.value;
  var prelevementdate = form.prelevement_date.value;
  var prelevementtime = form.prelevement_time.value;
  var bacteriology = form.bacteriology.value;
  var resistance = form.resistance.value;
  var dialysis = form.dialysis.value;
  var renalfunction = form.renal_function.value;
  var incoherence = form.incoherence.value;
  
  if (patientlastname == "")
  {
    alert("Veuillez entrer le nom du patient.");
    return false;
  }
}