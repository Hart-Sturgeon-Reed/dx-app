if Meteor.isClient
  # Init values
  Session.setDefault 'counter', 0
  
  # Helpers
  Template.base.helpers
    counter: ->
      Session.get 'counter'
  
  # Events
  Template.base.events
    'click button': ->
      Session.set('counter', Session.get('counter') + 1)
  
  # Routes
  Router.route '/', ->
      this.render 'main'

  #Server side
if Meteor.isServer
  Meteor.startup(->
    console.log 'quak'
  )