Users = new Mongo.Collection 'users'

if Meteor.isClient
  window.screen?.orientation?.lock?('landscape-primary') # Lock the screen to landscape mode on tablet & 
  
  Meteor.subscribe 'users' # Subscribe to the users collection

  # Init 'global' values
  Session.setDefault 'theme', '' # This variable sets the theme for the sidebar & navbar reactively
  # Possible values: 'eth', 'per', 'nat', or 'fas'
  
  user = null
  newUser = false
  userID = null
  
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
  
  # On first loading the page, check to see if this user is new
  userID = localStorage.getItem('userID')
  if userID?
    # If they are returning, get their user document
    console.log 'User id is: '+userID
    user = Users.findOne({_id:userID})
    console.dir user
  unless user? # Otherwise create an empty one
    console.log 'Generating new user'
    newUser = true
    # Insert it into the collection
    user = {
      name: 'none' # Track name for highscore table
      exhibits: # Track exhibit views
        one: 0
        two: 0
        three: 0
        four: 0
        five: 0
        six: 0
        seven: 0
        eight: 0
        nine: 0
        ten: 0
        eleven: 0
        twelve: 0
        thirteen: 0
        fourteen: 0
        fifteen: 0
        sixteen: 0
      scores: # Track user highscores
        total: 0
        mountain: 0
        forest: 0
        city: 0
        downtown: 0
    }
    id = Users.insert(user)
    localStorage.setItem('userID', id) # Store the userID to localstorage 
    console.log 'New user has id: ' + id
  
  # After rendering templates
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
    #console.log exhibit.theme
    viewExhibit exhibit.num
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
    'tap .card': (event) -> # On pressing a segment of the nav bar
      num = event.currentTarget.attributes.num.value
      jumpToPane num
      updateExhibit()
      
    'swipeleft': (event) -> # On swiping left
      swipeLeft()
      updateExhibit()
      
    'swiperight': (event) -> # On swiping right
      swipeRight()
      updateExhibit()    
      
  Template.sidebar.events
    'tap .badge': (event) -> # Tapping on a zone badge
      console.log event.currentTarget.id
    'tap .qr': -> # Tapping the QR scanner [used for debugging functions]
      Session.clearPersistent()
      console.log 'Clearing localStorage'
  
  # Routes
  Router.route '/', { # Splash page
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
    
  Router.route '/:_id', { # Exhibit pages
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
      
  jumpToPane = (num) -> # Go to a specific pane
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
  
  viewExhibit = (exNum) ->
    if user?.exhibits?
      ex = user.exhibits # Get the user's exhibits
      ex[exNum] = 1 # Record that they viewed the current exhibit
      #response = Users.update { _id: userID }, { $set: {exhibits: ex }} # Update collection
      #user = Users.findOne({_id:userID}) # Get the updated user object
          
  # QR scanner
  qrScanner.on "scan", (err, message) ->
    if message?
      #console.log message + ': scanned'
      Router.go message
    
# Server side
if Meteor.isServer
  Meteor.startup(->
    console.log 'server started'
    Meteor.publish 'users', -> Users.find {}
  )
