if Meteor.isClient
  window.screen?.orientation?.lock?('landscape-primary')
  
  btnTxt =
    1 :'Quark'
    2 :'Quak'
    3 :'Queequeg'
    
  scroll = 0 # Amount .panes div has been scrolled
  paneWidth = 0 # Size of each pane
  panes = null # The div containing all the content panes
  cards = null # A collection of all the card markers in the nav bar
  
  # Animation functions
  swipeLeft = ->
    if scroll-paneWidth > -parseInt(panes.width()-paneWidth)
      TweenMax.to('.panes',0.6,{left:scroll-=paneWidth,ease:Power4.easeOut})
      Session.set('pct', Session.get('pct') + 20)
      setCards()
    
  swipeRight = ->
    if scroll < 0
      TweenMax.to('.panes',0.6,{left:scroll+=paneWidth,ease:Power4.easeOut})
      Session.set('pct', Session.get('pct') - 20)
      setCards()
      
  setCards = ->
    pct = Session.get('pct')
    cardsFilled = (pct/100) * 5
    console.log cardsFilled
    for card, index in cards
      if index == cardsFilled
        if $(card).hasClass 'viewed' 
          $(card).removeClass 'viewed'
        $(card).addClass 'active'
      else if index <= cardsFilled
        if $(card).hasClass 'active' 
          $(card).removeClass 'active'
        $(card).addClass 'viewed'
      else 
        if $(card).hasClass 'viewed' 
          $(card).removeClass 'viewed'
        if $(card).hasClass 'active' 
          $(card).removeClass 'active'
      
      
  # QR scanner
  qrScanner.on "scan", (err, message) ->
    if message?
      Router.go(message)

  # Init values
  Session.setDefault 'counter', 0
  Session.setDefault 'pct', 0
  
  # After rendering
  Template.layout.rendered = ->
    panes = $('.panes')
    body = $('body')
    cards = $('.icon')
    setCards()
    paneWidth = parseInt panes.width()/6
    body.hammer()
  
  # Helpers
  Template.layout.helpers
    message: ->
      qrScanner.message()
      
  Template.nav.helpers
    pctComplete: ->
      pct = Session.get('pct') + '%'
      TweenMax.to '.fill', 0.6, width:pct
  
  # Events
  Template.main.events
    'click button': ->
      Session.set('counter', Session.get('counter') + 1)
    'swipeleft': ->
      swipeLeft()
    'swiperight': ->
      swipeRight()
  
  # Routes
  Router.route '/', ->
    this.layout 'layout'
    this.render 'exhibit1', {
      to: 'content'
      data: ->
        btnTxt: btnTxt[1]
        counter: -> Session.get 'counter'
    }
    
  Router.route '/:_id', ->
    id = this.params._id
    console.log(id)
    this.layout 'layout'
    this.render 'exhibit'+id, {
      data: ->
        btnTxt: btnTxt[1],
        counter: -> Session.get 'counter'
      to: 'content'
    }
    
#Server side
if Meteor.isServer
  Meteor.startup(->
    console.log 'server started'
  )