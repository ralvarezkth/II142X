class Content {
  constructor() {
    this.content = {
      swedish: {
        panel: {
          greeting: "Hej",
          helpButton: "Hjälp",
          watchButton: "Övervaka",
          unwatchButton: "Pausa"
        },
        help: {
          abort: "aktiv | klicka för att pausa, dubbelklicka för att avbryta hjälpen",
          paused: "pausad | klicka för att fortsätta, dubbelklicka för att avbryta hjälpen",
          slides: [
          "Det är möjligt att välja språk med hjälp av listan till höger.",
          "På samma sätt kan aktuell tentasal konfigureras, detta måste göras.",
          "Efter att en tentasal har valts kommer ett rutnät av \"sittplatser\" att tillgängliggöras. Klicka på ett säte för att lägga till en student och fyll i usb-stickans unika ID i textrutan.",
          "Tryck på ENTER för att spara ändringarna, eller tryck på ESC eller klicka med musen utanför boxarna för att avbryta.",
          "Vid avbrytande återgår sätet till tillgängligt, vid sparande markeras sätet som grönt som om studentens system var online.",
          "När alla studenter har lagts till, klicka på Övervaka knappen.",
          "Efter att Övervaka knappen har klickats kommer denna webbklient att aktivt övervaka studenternas systems närvaro.",
          "En grön ruta betyder att det system studenten måste använda befinner sig online.",
          "En grön ruta med en röd inramning betyder att studentens system kan vara offline, men ofta har det naturliga anledningar och kan helt enkelt innebära en falsk varning.",
          "En röd ruta betyder att studentens system sannolikt är offline, detta bör i de flesta fall betraktas som misstänksamt såvida det inte förkommer grava nätverksproblem eller dylikt, men då kommer troligtvis ett större antal boxar vara rödmarkerade.",
          "När en student har slutfört sin tentamen kan en box klickas och frasen \"done\" (utan citattecken) kan skrivas in och sparas genom att trycka ENTER. Då avslutas övervakningen för systemet med det specifika ID.",
          "OBS: det bör nämnas att detta verktyg är menat som ett hjälpverktyg för tentavakter att upptäcka möjligt fusk, i detta fallet då främst att studenter skulle kunna boota upp sitt eget OS med full internetåtkomst."]
        },
        grid: {
          available: "Tillgänglig"
        }
      },
      english: {
        panel: {
          greeting: "Hello",
          helpButton: "Help",
          watchButton: "Watch",
          unwatchButton: "Pause"
        },
        help: {
          abort: "running | click to pause, double click to abort help",
          paused: "paused | click to resume, double click to abort help",
          slides: [
            "It's possible to choose preferred language on the right in the dropdown list.",
            "Similarly, classroom for exam can be configured in the dropdown list beneath the language settings, this must be done.",
            "After setting a classroom, an appropriate grid of \"seats\" will show up. Click a seat to add a student to it. In the text field that shows up, type in the unique ID of the usb-stick.",
            "Press the ENTER key to save the changes, or press either the ESC key or a mouse key anywhere in the main window to cancel.",
            "If cancelled, the box in the grid will appear untouched as available, if saved the box will be marked green as if the student's system was online.",
            "Once all students have been added to the grid, click the Watch button.",
            "Upon clicking the Watch button, this client will actively listen for suspicious abscence of the configured usb-sticks.",
            "A green box means the system the student is supposed to be using is online.",
            "A green box with a red border means that the system of the student could be offline, but it would many times have natural reasons and just be a false warning.",
            "A red box means that the system of the student is likely offline, this should in most cases be deemed suspicious, unless there are serious network issues, but then all boxes would turn red.",
            "Upon a student finishing the exam, the phrase \"done\" (without quotations) may simply be typed in and submit by pressing enter to stop watching that ID.",
            "NOTE: finally it should be said, this tool is simply meant as a helper tool for the exam guards to help notice potential cheating, i.e. the student booting its own OS with full internet access."]
        },
        grid: {
          available: "Available"
        }
      }
    }
  }

  get(language) {
    return !language ? this.content : (language == 1 ? this.content.swedish : this.content.english);
  }
}

export const content = new Content();