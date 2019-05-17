import sketch from "sketch"

export function isCompatible() {
  return sketch.version.sketch >= 51
}

function buildAlert() {
  const alert = NSAlert.alloc().init()
  // set up alert basics
  alert.setMessageText("Incompatible Sketch version")
  alert.setInformativeText(
    "The latest version of Rename It requires Sketch 51 and up. An older version can " +
      "be downloaded bellow:"
  )

  const downloadButton = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 0, 0))
  downloadButton.setTitle("Dowload Version 3.8.7")
  downloadButton.setBezelStyle(NSRoundedBezelStyle)
  downloadButton.sizeToFit()
  downloadButton.setCOSJSTargetFunction(() => {
    NSWorkspace.sharedWorkspace().openURL(
      NSURL.URLWithString(
        "https://github.com/rodi01/RenameIt/releases/download/v3.8.7/Rename-It.sketchplug" +
          "in.zip"
      )
    )
  })
  alert.setAccessoryView(downloadButton)
  alert.addButtonWithTitle("OK")
  alert.runModal()
}

export function showAlert() {
  if (!isCompatible()) {
    buildAlert()
  }
}
