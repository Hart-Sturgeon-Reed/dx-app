if Meteor.isClient
  window.screen?.orientation?.lock?('landscape-primary')
  
  btnTxt =
    1 :'Quark'
    2 :'Quak'
    3 :'Queequeg'
    
  lScroll = 0
  paneWidth = 0
  panes = null

  # Init values
  Session.setDefault 'counter', 0
  
  # After rendering
  Template.base.rendered = ->
    panes = $('.panes')
    body = $('body')
    paneWidth = parseInt panes.width()/6
    body.hammer()
  
  # Helpers
  Template.base.helpers
    counter: ->
      Session.get 'counter'
  
  # Events
  Template.layout.events
    'click button': ->
      Session.set('counter', Session.get('counter') + 1)
    'swipeleft': ->
      TweenMax.to('.panes',0.6,{left:lScroll-=paneWidth,ease:Power4.easeOut})
    'swiperight': ->
      TweenMax.to('.panes',0.6,{left:lScroll+=paneWidth,ease:Power4.easeOut})
  
  # Routes
  Router.route '/', ->
    this.layout 'layout'
    this.render 'base', {
      data: ->
        btnTxt: btnTxt[3]
      to: 'content'
    }

  #Server side
if Meteor.isServer
  Meteor.startup(->
    console.log 'quak'
  )