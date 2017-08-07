do ->
  layersNormal = $ '.layersNormal'
  layersProcessed = $ '.layersProcessed'
  interval = setInterval((->
    if layersNormal.is(':hidden')
      layersNormal.fadeIn()
      layersProcessed.fadeOut()
    else
      layersProcessed.fadeIn()
      layersNormal.fadeOut()
    return
  ), 5000)

  # Helpers
  showNext = (el) ->
    nextTo = el.next()
    if nextTo.length is 0
      nextTo = el.siblings(':first')
    setTimeout (->
      el.addClass 'showTooltip'
      el.siblings().removeClass 'showTooltip'
      showNext nextTo
      return
    ), 3000
    return
  showNext $('.currLayerBtn')

  # Width and Height
  whDone = $ '.wh_done'
  whNormal = $ '.wh_normal'

  # Toggle visible
  toggleLayer = (toShow, toHide) ->
    toShow
      .addClass 'show'
      .removeClass 'hide'
    toHide
      .addClass 'hide'
      .removeClass 'show'

  # Width Height text
  whTyped = new Typed '#widthTxtFld',
    typeSpeed: 40
    startDelay: 1000
    loop: true
    backSpeed: 40
    backDelay: 6000
    strings: [ $('#widthTxtFld').data 'write' ]
    onComplete: (self) ->
      $('#whPreview').text($('#whPreview').data('write'))
      toggleLayer whDone, whNormal
      false
    onLastStringBackspaced: (self) ->
      $('#whPreview').text('');
      toggleLayer whNormal, whDone
      false

  # Current Layer Text
  clDone = $ '.cl_done'
  clNormal = $ '.cl_normal'
  clTyped = new Typed '#clTextField',
    typeSpeed: 50
    startDelay: 1000
    loop: true
    backSpeed: 40
    backDelay: 6000
    strings: [ $('#clTextField').data 'write' ]
    onComplete: (self) ->
      $('#clPreview').text($('#clPreview').data('write'))
      toggleLayer clDone, clNormal
      false
    onLastStringBackspaced: (self) ->
      $('#clPreview').text('');
      toggleLayer clNormal, clDone
      false

  # Github stats
  $.get 'https://api.github.com/repos/rodi01/renameit', (data) ->
    $('#forkIt em').text data.forks
    $('#starIt em').text data.stargazers_count
    return

  # Scroll To
  $("a[href*=\\#]").click (e) ->
    e.preventDefault()
    dest = $(this).attr('href')
    $('html,body').animate { scrollTop: $(dest).offset().top }, 'slow'
    return

  return
