let token = "0f145a30a224d4f9438db3e9dc781ee686c1e279"

function accession(array) {
  let divide = arguments.length > 1 ? arguments[1] : ", ";
  return array.filter(function(n){return n}).join(divide);
}

const showSuggestion = (suggestion) => {
  console.log(suggestion);
  let data = suggestion.data;
  if (!data)
    return;

  if (data.name) {
    $("#nameShort").val(data.name.short_with_opf || "");
    $("#nameFull").val(data.name.full_with_opf || "");
  }
    
  $("#innKpp").val(accession([data.inn, data.kpp], " / "));
  
  if (data.address) {
    let address = "";
    if (data.address.data.qc === "0") {
      address = accession([data.address.data.postal_code, data.address.value]);
    } else {
      address = data.address.data.source;
    }
    $("#address").val(address);
  }
}

$("#party").suggestions({
  token: token,
  type: "PARTY",
  count: 5,
  onSelect: showSuggestion
});