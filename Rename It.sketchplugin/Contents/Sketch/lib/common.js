//
// Rename It
// by Rodrigo Soares
// http://github.com/rodi01/RenameIt
//

RI.extend({
  init: function(context, command) {
    this.doc = context.document;
    this.data = {};
    this.hashData(context.selection);
    this.extend(context);
    this.pluginRoot = this.scriptPath
      .stringByDeletingLastPathComponent()
      .stringByDeletingLastPathComponent()
      .stringByDeletingLastPathComponent();
    this.pluginSketch = this.pluginRoot + "/Contents/Sketch/lib";
    this.resources = this.pluginRoot + '/Contents/Resources';
    coscript.setShouldKeepAround(false);
    if (command && command == "init") {
      return false;
    }
    this.window = this.document.window();
    if (this.data.selectionCount > 0)
    {
      if (command == "renameIt") {
        this.data.windowTitle = "Rename Selected Layers"
          this.renamePanel();
      }
      if (command == "findAndReplace") {
          this.data.windowTitle = "Find & Replace"
          this.findReplacePanel();
      }
      if (command == "renameArtboard") {
        var aBoards = [NSMutableArray new]
        context.selection.some(function (el) {
          while (el && !RI.isArtboard(el)) {
            el = el.parentGroup();
 		       }
           if(el)
            [aBoards addObject:el]
        });
        if (aBoards.length <= 0)
          return;

        var orderedSet = [NSOrderedSet orderedSetWithArray:aBoards];
        this.hashData([orderedSet array]);
        this.data.windowTitle = "Rename Selected Artboards"
        this.renamePanel();
    }
    } else {
      // No layer selected
      this.doc.showMessage("Rename it: You need to select at least one layer or artboard");
    }
  }
});

// Data
RI.extend({
  hashData: function(selection) {
    this.data.selectionCount = selection.count();
    this.data.selection = [];
    // Layers
    for (var i=0; i < this.data.selectionCount; i++) {
      var layer = selection[i],
          name  = [layer name],
          frame = [layer frame],
          width = [frame width],
          height = [frame height];

      this.data.selection[i] = {}
      this.data.selection[i].layer = layer
      this.data.selection[i].name = "" + name
      this.data.selection[i].idx = i
      this.data.selection[i].width = width
      this.data.selection[i].height = height
    }
  }
});

// UI
RI.extend({
  RIPanel: function(options) {
    var self = this,
      options = this.extend(options, {
        url: this.resources + "/panel/renameUI.html",
        width: 418,
        height: 405,
        hiddenClose: false,
        data: {},
        callback: function(data) {
          return data;
        }
      }),
      result = false;
    options.url = encodeURI("file://" + options.url);

    var frame = NSMakeRect(0, 0, options.width, (options.height + 32)),
      titleBgColor = [NSColor colorWithCalibratedWhite: 1 alpha: 1],
      contentBgColor = [NSColor colorWithCalibratedWhite: 0.973 alpha: 1];

    if (options.identifier) {
      var threadDictionary = NSThread.mainThread().threadDictionary();
      if (threadDictionary[options.identifier]) {
        return false;
      }
    }

    var Panel = [[NSPanel alloc] init]
    [Panel setFrame:NSMakeRect(0, 0, options.width, options.height) display:true]
    [Panel setBackgroundColor:contentBgColor]
    [Panel setTitlebarAppearsTransparent:true]
    [Panel setMovableByWindowBackground:true]
    [[Panel standardWindowButton:NSWindowCloseButton] setHidden:false]
    [[Panel standardWindowButton:NSWindowMiniaturizeButton] setHidden:true]
    [[Panel standardWindowButton:NSWindowZoomButton] setHidden:true]


    var uiView = [[NSView alloc] initWithFrame:NSMakeRect(0, 0, options.width, options.height)]
      uiView.setWantsLayer(true)
      [[Panel contentView] addSubview:uiView]

    var webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, options.width, options.height)),
      windowObject = webView.windowScriptObject();

    var delegate = new MochaJSDelegate({
      "webView:didFinishLoadForFrame:": (function(webView, webFrame) {
        var RIAction = [
            "function RIAction(hash, data) {",
              "if(data){ window.RIData = encodeURI(JSON.stringify(data)); }",
              "window.location.hash = hash;",
            "};"
          ].join(""),
          DOMReady = [
              "$(",
                  "function(){",
                      "initView(" + JSON.stringify(options.data) + ")",
                  "}",
              ");"
          ].join("");
        windowObject.evaluateWebScript(RIAction);
        windowObject.evaluateWebScript(DOMReady);
      }),
      "webView:didChangeLocationWithinPageForFrame:": (function(webView, webFrame) {
        var request = NSURL.URLWithString(webView.mainFrameURL()).fragment();
        if (request == "submit") {
          var data = JSON.parse(decodeURI(windowObject.valueForKey("RIData")));
          // Close
          Panel.orderOut(nil);
          NSApp.stopModal();

          options.callback(data);
          result = true;
        }
        if (request == "closePanel") {
          windowObject.evaluateWebScript("window.location.hash = 'close';");
        }
        if (request == 'onWindowDidBlur') {
          RI.addFirstMouseAcceptor(webView, uiView);
        }
        if (request == "close") {
            Panel.orderOut(nil);
            NSApp.stopModal();
        }
        if (request == "focus") {
          var point = Panel.currentEvent().locationInWindow(),
            y = NSHeight(Panel.frame()) - point.y - 32;
          windowObject.evaluateWebScript("lookupItemInput(" + point.x + ", " + y + ")");
        }
        windowObject.evaluateWebScript("window.location.hash = '';");
      })
    });

    var contentView = Panel.contentView();
    contentView.setWantsLayer(true);
    contentView.layer().setFrame(contentView.frame());
    contentView.layer().setMasksToBounds(true);

    webView.setBackgroundColor(contentBgColor);
    webView.setFrameLoadDelegate_(delegate.getClassInstance());
    webView.setMainFrameURL_(options.url);

    uiView.addSubview(webView);

    var closeButton = Panel.standardWindowButton(NSWindowCloseButton);
    closeButton.setCOSJSTargetFunction(function (sender) {
      var request = NSURL.URLWithString(webView.mainFrameURL()).fragment();
      if (options.identifier) {
        threadDictionary.removeObjectForKey(options.identifier);
      }
      self.wantsStop = true;
        Panel.orderOut(nil);
        NSApp.stopModal();
    });
    closeButton.setAction("callAction:");

    var titlebarView = contentView.superview().titlebarViewController().view(),
      titlebarContainerView = titlebarView.superview();

    var smallTitle = [[NSTextField alloc] initWithFrame:NSMakeRect((options.width-200)/2, 1, 200, 23)]
    smallTitle.setEditable(false)
    smallTitle.setAlignment(NSCenterTextAlignment);
    smallTitle.setBordered(false)
    var fontManager = [NSFontManager sharedFontManager];
    var boldItalic = [fontManager fontWithFamily:@"San Francisco Display"
                                          traits:NSUnboldFontMask
                                          weight:5
                                            size:15];
    [smallTitle setFont: boldItalic]
    [smallTitle setTextColor:[NSColor colorWithCalibratedRed: 0.416 green: 0.455 blue: 0.502 alpha: 1]]
    [smallTitle setDrawsBackground:false]
    [smallTitle setStringValue:options.data.windowTitle]
    [titlebarView addSubview:smallTitle]

    NSApp.runModalForWindow(Panel);
    return result;
  },
  renamePanel: function() {
    var self = this;
    return self.RIPanel({
      width: 480,
      height: 410,
      data: this.data,
      callback: function(data) {
        for (var i = 0; i < self.data.selectionCount; i++) {
          var currentData = self.data.selection[i];
          currentData.layer.name = RI.rename(currentData.name, i, currentData.width, currentData.height, self.data.selectionCount, data.name, parseInt(data.sequence));
        }
        var totalSelectedStr = (self.data.selectionCount>1) ? (self.data.selectionCount + " Layers") : (self.data.selectionCount + " Layer");
        var doc = self.doc
        [doc showMessage: "Rename it: Updated " + totalSelectedStr ];
      }
    });
  }
});

RI.extend({
  findReplacePanel: function(){
    var self = this;
    return self.RIPanel({
      width: 418,
      height: 285,
      data: this.data,
      url: this.resources + "/panel/find_replace.html",
      callback: function(data) {
        for (var i = 0; i < self.data.selectionCount; i++) {
          var currentData = self.data.selection[i];
          currentData.layer.name = RI.replaceText(currentData.name, data.find, data.replace, data.caseSensitive);
        }
        var totalSelectedStr = (self.data.selectionCount>1) ? (self.data.selectionCount + " Layers") : (self.data.selectionCount + " Layer");
        var doc = self.doc
        [doc showMessage: "Rename it: Updated " + totalSelectedStr ];
      }
    });
  }
});
