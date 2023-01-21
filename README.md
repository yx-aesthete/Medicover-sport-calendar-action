# Medicover Calendar Sync

## Sync your SMS Medicover Sport entry cod conversation with your personal google calendar

This script is designed to work with Google Calendar and Google Drive. It reads the newest SMS backup file in a specified folder, parses the XML data, and creates events on a calendar using the parsed data. The script also reads a specified sheet, which contains a list of gym codes and corresponding gym names, to match the SMS data with the correct gym name and add it to the calendar event. The script also checks for duplicate events and will only create a new event if it does not already exist on the same day. Additionally, there is a function to delete all events on the calendar, which can be useful in cases where the gym codes or names on the sheet have been updated and duplicate events need to be removed.

### SETUP INSTRUCTION
### - on your phone 
1. Download the SMS Backup & Restore App at https://play.google.com/store/apps/details?id=com.riteshsahu.SMSBackupRestore&hl=en_US&gl=US&pli=1
2. In this app, it's required to: 
- schedule routine upload of conversations with number 661000556, where we send codes to gain access to every medicover sport facility 
- only conversations with this number should be selected 
- upload should be made to specific folder on personal Google disc, it could be called for example "sms" - on particular time each day or chosen period for example at 22.50
- schedule regullar upload of conversation with number 661000556 where we are sending codes to get access to every medicover sport facility
- upload should be made to specific folder on personal gooogle disc, it could be called for e.x. "sms"
- on specific time everyday or chosen period for e.x. 22.50
- calls backup is optional and not required
- english language of appliaction is necessary to be set
- it's necessary to set readable date and set it's format to **long**

first backup u can make manually

I provide all my settings on screenshots in folder below, chaotic af but complete, sory
https://drive.google.com/drive/folders/1E1FOkzmjebNeTZPGbD9NEKeNAP4xSggK?usp=share_link

### - on google Script
1. go to https://script.google.com/home
2. add new project <img width="592" alt="image" src="https://user-images.githubusercontent.com/49588850/213845047-b673edec-4aeb-44cb-8bf7-a57ac7a125c4.png">
3. paste code from file https://github.com/KabanEOS/Medicover-sport-calendar-action/blob/main/MedicoverSportActivityTracker.gs
   ** it's necessary to set your backup folder name and your calendar id **
   - ** calendar id ** - it's recommended to create extra sub-calendar dedicated to store gym, etc. data, in calendar settings in section calendar integratin it's showed you calendar id, it ends with "@group.calendar.google.com"
   - ** name of the backup folder ** - is the name entered in mobile app backup sync configuration, after first backup sync it should be visible in you drive
4. add trigger 
<img width="681" alt="image" src="https://user-images.githubusercontent.com/49588850/213845280-5cd6ee29-4b25-4e1c-8a6f-77c160fa74df.png">

set init funtion to be triggered on time base, count in hours, for e.x. 23-00

### voila!
Now u should only associate sport facility codes with thier names in the given file, other case name of your activity will be ugly: "Undefined place activity".
https://docs.google.com/spreadsheets/d/1j0vFtvU5eS63nPkfbntXFXgo8QfLvO7N_uUcOoxWAT8/edit?usp=sharing

### expected result
<img width="514" alt="image" src="https://user-images.githubusercontent.com/49588850/213845704-dc6f3ce8-4511-418e-a51e-67ca7a4fd2e1.png">

