if Meteor.isClient
  window.screen?.orientation?.lock?('landscape-primary')
      
  # QR scanner
  qrScanner.on "scan", (err, message) ->
    if message?
      #Change this before completion! Just to avoid errors when testing through pagekite
      if message is "http://dxs.bz/"
        Router.go '/'
      else
        justPath = message.slice -2
        Router.go justPath

  # Init values
  scroll = 0 # Amount .panes div has been scrolled
  pct = # Percent of exhibit item viewed
  paneWidth = 0 # Size of each pane
  panes = null # The div containing all the content panes
  cards = null # A collection of all the card markers in the nav bar
  
  # After rendering
  Template.layout.rendered = ->
    panes = $('.panes')
    body = $('body')
    cards = $('.icon')
    updateCards()
    paneWidth = parseInt panes.width()/6
    body.hammer()
  
  # Helpers
  Template.layout.helpers
    message: ->
      qrScanner.message()
  
  # Events
  Template.main.events
    'tap .card': (event) ->
      num = event.currentTarget.attributes.num.value
      jumpToPane num
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
        btnTxt: 'Splash'
    }
    
  Router.route '/:_id', {
    action: ->
      resetScroll()
      id = this.params._id
      this.layout 'layout'
      this.render 'exhibit'+id, {
        data: ->
          btnTxt: 'Exhibit'+id
        to: 'content'
      }
  }
  
  # Animation functions
  swipeLeft = ->
    if scroll-paneWidth > -parseInt(panes.width()-paneWidth)
      scroll -= paneWidth
      TweenMax.to '.panes',0.6,{left:scroll,ease:Power4.easeOut}
      pct += 20
      TweenMax.to '.fill', 0.6, width:pct+'%'
      console.log scroll
      updateCards()
    
  swipeRight = ->
    if scroll < 0
      scroll += paneWidth
      TweenMax.to '.panes',0.6,{left:scroll,ease:Power4.easeOut}
      pct -= 20
      TweenMax.to '.fill', 0.6, width:pct+'%'
      updateCards()
      
  jumpToPane = (num) ->
    scroll = -paneWidth * num
    TweenMax.to '.panes',0.6,{left:scroll,ease:Power4.easeOut}
    pct = num*20
    TweenMax.to '.fill', 0.6, width:pct+'%'
    updateCards()
    
  resetScroll = ->
    scroll = 0
    TweenMax.to '.panes',0.6,{left:scroll,ease:Power4.easeOut}
    pct = 0
    TweenMax.to '.fill', 0.6, width:pct+'%'
    console.log('reset')
    updateCards()
      
  updateCards = ->
    cardsFilled = (pct/100) * 5
    if cards?
      for card, index in cards
        if index == cardsFilled
          $(card).removeClass 'viewed'
          $(card).addClass 'active'
        else if index <= cardsFilled
          $(card).removeClass 'active'
          $(card).addClass 'viewed'
        else 
          $(card).removeClass 'viewed'
          $(card).removeClass 'active'
    
#Server side
if Meteor.isServer
  Meteor.startup(->
    console.log 'server started'
  )