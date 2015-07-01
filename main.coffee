if Meteor.isClient
  window.screen?.orientation?.lock?('landscape-primary') # Lock the screen to landscape mode on tablet & mobile
      
  # QR scanner
  qrScanner.on "scan", (err, message) ->
    if message?
      # WARNING Remove this before uploading! Just to avoid errors when testing QR codes through pagekite/localhost
      if message is "http://dxs.bz/"
        Router.go '/'
      else
        justPath = message.slice -2
        Router.go justPath
      # Router.go message # WARNING This is what the final function should look like

  # Init values
  Session.setDefault 'theme', 'eth' # This variable sets the theme for the sidebar & navbar reactively
  
  scroll = 0 # Amount .panes div has been scrolled
  pct = # Percent of exhibit item viewed
  paneWidth = 0 # Size of each pane
  panes = null # The div containing all the content panes
  navDots = null # A collection of all the navDot markers in the nav bar
  exhibit = null # An object containing jQuery references and info on the items in the current exhibit
  
  # The badges
  nature = null
  performance = null
  ethnography = null
  fashion = null
  
  # After rendering
  Template.layout.rendered = ->
    panes = $('.panes')
    body = $('body')
    navDots = $('.icon')
    nature = $('#nature')
    performance = $('#performance')
    fashion = $('#fashion')
    ethnography = $('#ethnography')
    updateNav()
    paneWidth = parseInt Math.floor( panes.width()/6 ) # Get the width of one pane
    $(window).resize -> paneWidth = parseInt Math.floor( panes.width()/6 ) # Update it if the window changes size
    body.hammer() # Begin watching touch events
    
  Template.exhibit.rendered = ->
    exhibit = $('.exhibit')
    exhibit.num = $('.exhibit').attr 'num'
    exhibit.theme = $('.exhibit').attr 'theme'
    exhibit.panes = $('.pane')
    exhibit.currentPane = exhibit.panes.get(0)
    console.log exhibit.theme
    Session.set('theme','')
    Session.set('theme',exhibit.theme)
  
  # Helpers
  Template.layout.helpers
    message: -> qrScanner.message()
      
  Template.nav.helpers
    theme: -> Session.get('theme')  
  
  Template.sidebar.helpers
    theme: -> Session.get('theme')
  
  # Events
  Template.main.events
    'tap .card': (event) ->
      num = event.currentTarget.attributes.num.value
      jumpToPane num
      updateExhibit()
      
    'swipeleft': (event) ->
      swipeLeft()
      updateExhibit()
      
    'swiperight': (event) ->
      swipeRight()
      updateExhibit()    
      
  Template.sidebar.events
    'tap .badge': (event) ->
      console.log event.currentTarget.id
  
  # Routes
  Router.route '/', {
    action: ->
      this.layout 'layout'
      this.render 'exhibit1', { #Change this route to the splash page down the line
        to: 'content'
        data: ->
          btnTxt: 'Splash'
      }
    onAfterAction: ->
      jumpToPane(0)
  }
    
  Router.route '/:_id', {
    action: ->
      id = this.params._id
      this.layout 'layout'
      this.render 'exhibit'+id, {
        to: 'content'
        data: ->
          btnTxt: 'Exhibit'+id
      }
    onAfterAction: ->
      jumpToPane(0)
  }
  
  # Animation functions
  swipeLeft = ->
    if scroll-paneWidth > -parseInt(panes.width()-paneWidth) # Are there panes to the right?
      scroll -= paneWidth
      pct += 20
      playAnim()
      updateNav()
    
  swipeRight = ->
    if scroll < 0 # Are there panes to the left?
      scroll += paneWidth
      pct -= 20
      playAnim()
      updateNav()
      
  jumpToPane = (num) ->
    scroll = -paneWidth * num
    pct = num*20
    playAnim()
    updateNav()
    
  playAnim = ->
    TweenMax.to '.panes', 0.6, {left:scroll,ease:Power4.easeOut} # Animate panes div to correct position
    TweenMax.to '.fill', 0.6, width:pct+'%' # Animate nav bar 
  
  # This function pauses any video currently playing, and plays the video the user just navigated to
  updateExhibit = -> # This function won't work on mobile unless it is called from a user input event handler
    exhibit.currentVid.pause() if exhibit.currentVid?
    exhibit.currentPane = exhibit.panes.get((pct/100)*5)
    exhibit.currentVid = $(exhibit.currentPane).find?("video").get?(0)
    #console.log exhibit.currentVid
    exhibit.currentVid.play() if exhibit.currentVid?
  
  # This function updates the nav bar to properly display what pane the user is currently on
  updateNav = ->
    panesViewed = (pct/100) * 5
    if navDots?
      for navDot, index in navDots
        if index == panesViewed
          $(navDot).removeClass 'viewed'
          $(navDot).addClass 'active'
        else if index <= panesViewed
          $(navDot).removeClass 'active'
          $(navDot).addClass 'viewed'
        else 
          $(navDot).removeClass 'viewed'
          $(navDot).removeClass 'active'
    
# Server side
if Meteor.isServer
  Meteor.startup(->
    console.log 'server started'
  )