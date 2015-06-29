if Meteor.isClient
  window.screen?.orientation?.lock?('landscape-primary')
  
  btnTxt =
    1 :'Quark'
    2 :'Quak'
    3 :'Queequeg'
    
  lScroll = 0
  paneWidth = 0
  panes = null
  
  # Animation functions
  swipeLeft = ->
    if lScroll-paneWidth > -parseInt(panes.width()-paneWidth)
      TweenMax.to('.panes',0.6,{left:lScroll-=paneWidth,ease:Power4.easeOut})
    
  swipeRight = ->
    if lScroll < 0
      TweenMax.to('.panes',0.6,{left:lScroll+=paneWidth,ease:Power4.easeOut})

  # Init values
  Session.setDefault 'counter', 0
  
  # After rendering
  Template.main.rendered = ->
    panes = $('.panes')
    body = $('body')
    paneWidth = parseInt panes.width()/6
    body.hammer()
  
  # Helpers
  Template.main.helpers
    counter: ->
      Session.get 'counter'
  
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
      data: ->
        btnTxt: btnTxt[1]
      to: 'content'
    }
  Router.route '/:_id', ->
    id = this.params._id
    console.log(id)
    this.layout 'layout'
    this.render 'exhibit'+id, {
      data: ->
        btnTxt: btnTxt[1]
      to: 'content'
    }
    
#Server side
if Meteor.isServer
  Meteor.startup(->
    console.log 'quak'
  )