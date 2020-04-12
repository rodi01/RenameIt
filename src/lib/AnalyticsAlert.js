import UI from "sketch/ui"

export function firstRun() {
  return true
}

function buildAlert() {
  // const alert = NSAlert.alloc().init()
  // set up alert basics
  // alert.setMessageText("Analytics")
  // alert.setInformativeText(
    // "Rename It uses Google Analytics to help improve its product by automatically sending diagnotics and usage data.\n You can disable analytics by pressing disagree."
  // )

  // const agreeBtn = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 0, 0))
  // agreeBtn.setTitle("Agree")
  // agreeBtn.setBezelStyle(NSRoundedBezelStyle)
  // agreeBtn.sizeToFit()
  // downloadButton.setCOSJSTargetFunction(() => {
  //   NSWorkspace.sharedWorkspace().openURL(
  //     NSURL.URLWithString(
  //       "https://github.com/rodi01/RenameIt/releases/download/v3.8.7/Rename-It.sketchplug" +
  //         "in.zip"
  //     )
  //   )
  // })
  // alert.setAccessoryView(agreeBtn)
  // alert.addButtonWithTitle("Agree")

  // const disagreeBtn = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 0, 0))
  // disagreeBtn.setTitle("Disagree")
  // disagreeBtn.setBezelStyle(NSRoundedBezelStyle)
  // disagreeBtn.sizeToFit()
  // alert.setAccessoryView(disagreeBtn)
  // alert.addButtonWithTitle("Disagree")


  // alert.runModal()

  UI.getInputFromUser(
    "What's your favorite design tool?",
    {
      type: UI.INPUT_TYPE.selection,
      possibleValues: ['Sketch', 'Paper'],
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      }
    }
  )
}

export function analyticsAlert() {
      buildAlert()
}
