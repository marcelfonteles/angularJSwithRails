'use strict';
var app = angular.module('app02');

app.service('Event', ["$http", "$q", "$log", function($http, $q, $log) {
  
  this.getEvent = function(event_id) {
    return $http.get('/api/events/' + event_id)
  }

  this.getEvents = function() {
    return $http.get('/api/events.json')
  }; 

  this.addEvent = function(event) {
    return $http.post('/api/events', event);
  }

  this.deleteEvent = function(event_id) {
    return $http.delete('/api/events/' + event_id)
    //$log.log(event_id);
  }

}])