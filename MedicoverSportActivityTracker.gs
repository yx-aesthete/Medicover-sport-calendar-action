// to be set individually
var backup_folder_name = "sms"; // Change this to the name of your backup folder
var calendarId = "74blunkhhpfkislg74snasu2so@group.calendar.google.com"; // Change this to the ID of your calendar

// to be set globally
var shared_gym_list_url = "https://docs.google.com/spreadsheets/d/1j0vFtvU5eS63nPkfbntXFXgo8QfLvO7N_uUcOoxWAT8/edit#gid=0" // add code of your sport facility and name to be displayed in calendar


function getNewestSMSFile() {
  var folderName = backup_folder_name;
  var folder = DriveApp.getFoldersByName(folderName).next();
  var files = folder.getFiles();
  var newestFile;
  var newestTime = 0;
  
  while (files.hasNext()) {
    var file = files.next();
    if (file.getName().indexOf(".xml") !== -1) {
      var fileTime = file.getLastUpdated().getTime();
      if (fileTime > newestTime) {
        newestTime = fileTime;
        newestFile = file;
      }
    }
  }
  
  var xmlData = newestFile.getBlob().getDataAsString();

  createCalendarEvents(xmlData);
  getGymInformationFromSheet();
}

function getGymInformationFromSheet() {

  var sheetName = "Arkusz1";
  var spreadsheet = SpreadsheetApp.openByUrl(shared_gym_list_url);
  var sheet = spreadsheet.getSheetByName(sheetName);

  var data = sheet.getDataRange().getValues();
  var gymInformation = [];
  for (var i = 0; i < data.length; i++) {
    gymInformation.push({
      code: data[i][0],
      gymName: data[i][1]
    });
  }
  // console.log(gymInformation);
  return gymInformation;
}

function createCalendarEvents(xmlData) {
  var xml = XmlService.parse(xmlData);
    
  var root = xml.getRootElement();
  var smses = root.getChildren("sms");

  var calendar = CalendarApp.getCalendarById(calendarId);

  var gymInformation = getGymInformationFromSheet();
  
  for (var i = 0; i < smses.length; i++) {
    var sms = smses[i];
    var address = sms.getAttribute("address").getValue().toString();
    var date = sms.getAttribute("readable_date").getValue();

    var dateTime = new Date(date);

    var body = sms.getAttribute("body").getValue();

    // Look up gym name from array using address
    var gym = gymInformation.find(gym => gym.code === body);
    var eventName = gym ? gym.gymName : "Undefined place activity";

    // Check if event already exists
    var startOfDay = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
    var endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
    var events = calendar.getEvents(startOfDay, endOfDay);
    var eventExists = false;

    for (var j = 0; j < events.length; j++) {
      if (events[j].getTitle() === eventName) {
      eventExists = true;
      break;
      }
    }
    
    if (!eventExists) {
      calendar.createEvent(eventName, dateTime, dateTime);
    }
  }
}

function init(){
  getNewestSMSFile();
}

