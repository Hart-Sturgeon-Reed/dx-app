if Meteor.isClient
  window.screen?.orientation?.lock?('landscape-primary') # Lock the screen to landscape mode on tablet & 
  
  Meteor.subscribe 'users' # Subscribe to the users collection
  Meteor.subscribe 'scores'

  # Init 'global' values
  Session.setDefault 'theme', '' # This variable sets the theme for the sidebar & navbar reactively
  # Possible values: 'eth', 'per', 'nat', or 'fas'
  Session.setDefault 'clr', 0 # This variable is used to reset the cache on the exhibit tablets
  # If you click on the qr scanner section 7 times, it will clear localstorage
  
  Session.setDefault 'scanQR', true
  
  # For game:
  Session.setDefault 'tenth', 0
  Session.setDefault 'sec', 0
  Session.setDefault 'min', 0
  Session.setDefault 'score', 0
  Session.setDefault 'stamina', 100
  Session.setDefault 'progress', 0
  Session.setDefault 'raceStarted', false
  Session.setDefault 'raceStarting', false
  Session.setDefault 'cd', 3
  
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
    #viewExhibit exhibit.num
    Session.set('theme','')
    Session.set('theme',exhibit.theme)
    
  Template.scoreDisplay.rendered = ->
    $('.scoreboard').addClass 'active'
  
  # Helpers
  Template.layout.helpers
    message: -> qrScanner.message()
      
  Template.nav.helpers
    theme: -> Session.get('theme')  
    
  Template.scores.helpers
    scores: -> Scores.find({}, {sort: {score: -1}}).map((score, index)->
      score.rank = index + 1
      return score
    )
  Template.scoreDisplay.helpers
    scores: -> Scores.find({}, {sort: {score: -1}}).map((score, index)->
      score.rank = index + 1
      return score
    )
  
  Template.sidebar.helpers
    theme: -> Session.get('theme')
    scanQR: -> Session.get('scanQR')
    user: ->
      id = Session.get('userID')
      console.log id
      if id?
        return Users.findOne(Session.get('userID'))
      else
        console.log 'No id found, creating a new user'
        newUser();
    ethViews: ->
      if this.exhibits?
        ex = this.exhibits
        return ex.one + ex.two + ex.three + ex.four
      else return 0
    fasViews: ->
      if this.exhibits?
        ex = this.exhibits
        return ex.five + ex.six + ex.seven + ex.eight
      else return 0
    natViews: ->
      if this.exhibits?
        ex = this.exhibits
        return ex.nine + ex.ten + ex.eleven + ex.twelve
      else return 0
    perViews: ->
      if this.exhibits?
        ex = this.exhibits
        return ex.thirteen + ex.fourteen + ex.fifteen + ex.sixteen
      else return 0
  
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
      if $(event.target).hasClass 'view4'
        console.log 'starting game'
        Session.set 'scanQR', false
        Router.go('/game')
      else console.dir event.target
    'tap .qr': -> # Tapping the QR scanner [used for debugging functions]
      Session.set('clr', Session.get('clr') + 1)
      if Session.get('clr') > 3
        Session.clearPersistent()
        console.log 'Clearing localStorage'
        
  Template.scores.events
    'touchstart .scoreboard': ->
      console.log 'going back to app'
      Router.go('/1')
        
  # Routes
  Router.route '/', { # Splash page
    loadingTemplate: 'loader'
    action: ->
      this.layout 'layout'
      this.render 'splash', {
        to: 'splash'
      }
      this.render 'empty', {
        to: 'game'
      }
    onAfterAction: ->
      jumpToPane(0)
      Session.set 'scanQR', true
  }
  
  Router.route '/scores', {
    action: ->
      this.render 'scoreDisplay'
  }
  
  Router.route '/game', {
    action: ->
      this.render 'game'
  }
  
  Router.route '/topFour', {
    action: ->
      this.render 'topFourScores'
  }
  
  Router.route '/individualScores', {
    action: ->
      this.render 'individualScores'
  }
    
  Router.route '/:_id', { # Exhibit pages
    loadingTemplate: 'loader'
    action: ->
      id = this.params._id
      this.layout 'layout'
      this.render 'exhibit'+id, {
        to: 'content'
      }
      this.render 'empty', {
        to: 'splash'
      }
      this.render 'empty', {
        to: 'game'
      }
    onAfterAction: ->
      jumpToPane(0)
      Session.set('scanQR', true)
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
    viewExhibit exhibit.num if exhibit.num?
    
  
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
  
  # This function saves an exhibit view to the user object in the collection
  viewExhibit = (exNum) ->
    id = Session.get('userID')
    user = Users.findOne id
    if user?.exhibits?
      ex = user.exhibits # Get the user's exhibits
      ex[exNum] = 1 # Record that they viewed the current exhibit
      response = Users.update Session.get('userID'), { $set: {exhibits: ex }} # Update collection
      console.log "Updated exhibit views on exhibit #{exNum} for user #{id}"
      console.log "Response: #{response}"
      #updateBadges()
    else console.log 'Error updating exhibits, no valid user found for id: '+id
        
  newUser = -> # This function adds a new user
    user = {
      name: 'Anon' # Track name for highscore table
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
      badges:
        per: false
        fas: false
        nat: false
        eth: false
    }
    if exhibit?.num?
      user.exhibits[exhibit.num] = 1
    # Insert it into the collection
    id = Users.insert(user)
    Session.setPersistent 'userID', id # Store the userID to localstorage 
    console.log 'New user has id: ' + id
          
  # QR scanner
  qrScanner.on "scan", (err, message) ->
    if message?
      if message.indexOf('dxs.bz/') != -1
        console.log message + ': scanned'
        Router.go message
      else
        console.log message + ' is not a valid path'
