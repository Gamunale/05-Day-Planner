
var currentDayEl = $("#currentDay").text(moment().format("dddd, MMMM Do"));



var startDay = 9;
var endDay = 17;



function loadRow(rowid) {
  return localStorage.getItem(rowid);
}


function saveRow(rowid, content) {
  if (content === null) {
    
    localStorage.removeItem(rowid);
  } else {
    
    localStorage.setItem(rowid, content);
  }
}



var curHour = moment().format("HH");

for (i = startDay; i <= endDay; i++) {
  iHour = moment(i, "HH").format("HH");

  var rowEl = $("<div class='row hour-" + i + "'></div>");
  
  var hourEl = $(
    "<div class='hour-" +
      i +
      " col-sm-1 hour py-3 text-right'>" +
      moment(i, "HH").format("hh a") +
      "</div>"
  );
  var timeBlockEl = $("<div class='hour-"+i+" col-sm-9 time-block'>");
  var curVal = loadRow("hour-" + i)
  var dispEl = $("<div class='hour-"+i+"'>")
    .addClass("inputvis")
    .addClass("t-display")
  var pEl = $("<p>")
    .text(curVal);
  dispEl.append(pEl)
  if (iHour < curHour) {
   
    timeBlockEl.addClass("past");
  } else if (iHour === curHour) {
    timeBlockEl.addClass("present");
  } else {
    timeBlockEl.addClass("future");
  }
  var inputDiv = $("<div class='hour-" + i + " inputvis t-edit'></div>").attr(
    "style",
    "display:none"
  );
  var inputArea = $("<textarea/>")
    .attr("style", "width:100%")
    .addClass("hour-" + i)
    .addClass("input" + i)
    .val(curVal);
  inputDiv.append(inputArea);
  timeBlockEl.append(dispEl,inputDiv);

  var saveBtnEl = $(
    "<div class='hour-" + i + " saveBtn py-4 col-sm-2 text-center'>Save</div>"
  );
  rowEl.append(hourEl, timeBlockEl, saveBtnEl);
  $(".container").append(rowEl);
}


$(".time-block").on("click", function(event) {
  event.preventDefault();
  var el = this.className;
  arr = el.split(" ");
  curHours = arr[0];
  $("." + curHours + ".inputvis").toggle();
  if ($("." + curHours + ".inputvis").css("visibility") != "hidden") {
    $("." + curHours + ".inputvis")
      .find("textarea")
      .focus();
  }
});


$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var el = this.className;
    arr = el.split(" ");
    curHours = arr[0];
    var txtArea = $(
        "textarea." + curHours
    ).val();
    saveRow(curHours, txtArea);
    $("." + curHours + ".inputvis.t-display"
      ).text(txtArea);
    $("." + curHours + ".inputvis"
      ).toggle();
    });