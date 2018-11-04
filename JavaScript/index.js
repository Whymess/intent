(function() {
  $("#clearForm").click(e => {
    e.preventDefault();
    if (confirm("Want to clear?")) {
      $(".airport-input").val("");
      $("#saveForm").attr("disabled", false);
      $(".error").empty();
      $(".airport-inputs").removeClass("airport-inputs-error");
    }
  });

  $("input").keyup(() => {
    var disabled = $("#saveForm").attr("disabled");
    if (disabled === undefined) return false;
    $(".airport-inputs").removeClass("airport-inputs-error");
    $("#saveForm").attr("disabled", false);
    $(".error").empty();
  });

  $("#saveForm").click(e => {
    e.preventDefault();
    var originValue = $("#origin-input").val();
    var destinationValue = $("#destination-input").val();
    checkIfAirportIsListed(destinationValue, originValue);
  });
})();

function checkIfAirportIsListed(destinationValue, originValue) {
  var upCasedestination = destinationValue.toUpperCase();
  var upCaseOrign = originValue.toUpperCase();

  if (
    IntentMedia.Airports.airport_exists(upCasedestination) &&
    IntentMedia.Airports.airport_exists(upCaseOrign)
  ) {
    CalcuatedValues(upCasedestination, upCaseOrign);
  } else {
    renderErrorMessage();
  }
}

function renderErrorMessage() {
  $(".error").append(
    `Unable to calculate. Please re-enter proper airport codes. `
  );
  $(".directions").empty();
  $("#saveForm").attr("disabled", true);
  $(".airport-inputs").addClass("airport-inputs-error");
}

function CalcuatedValues(capairPortCode, upCaseOrign) {
  var value = IntentMedia.Distances.distance_between_airports(
    capairPortCode,
    upCaseOrign
  );
  if (value === 0 || value === -1) {
    renderErrorMessage();
  } else {
    renderUI(value);
  }
}

function renderUI(value) {
  var UiText = $(".directions").text();
  if (UiText.length > 0) {
    $(".directions").empty();
    $(".directions").append(`You have to drive ${value} miles`);
  } else {
    $(".directions").append(`You have to drive ${value} miles`);
  }
}
