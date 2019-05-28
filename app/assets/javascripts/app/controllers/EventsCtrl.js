'use strict';
var app = angular.module('app02');

app.controller('EventsCtrl', ['$scope', '$q', '$log', 'Event', function($scope, $q, $log, Event) {
	$scope.app = 'Events List';
	
  $scope.getEvents = function() {
    Event.getEvents().then(function(response) {
    $scope.events = response.data.data;
    $scope.events.forEach(function(event) {
      event.push()
    })
    });
  };
  $scope.getEvents();
	
  $scope.addEvent = function(event) {
    Event.addEvent(angular.copy(event)).then(function(response) {
      $scope.events.push(response.data.data);
    });
    //Não posso somente adicionar, pois se eu fizer somente isso, o event fica sem ID e daí não é possível apagá-lo
    //$scope.events.push(angular.copy(event));
    //Então eu recarrego os Events
    delete $scope.event;
	};

  $scope.deleteEvent = function(event) {
    if(window.confirm("Tem certeza que deseja apagar o " + event.name + "?")) {
      Event.deleteEvent(event.id);
      $scope.events = $scope.events.filter(function(event_i) {
        return event != event_i
      })
    }    
  };

  $scope.deleteEvents = function(events) {
    events = events.filter(function(event) {
      return event.selected === true
    });
    if (window.confirm("Tem certeza que deseja apagar todos estes eventos?")) {
      events.forEach(function(event) {
        Event.deleteEvent(event.id);
      })
    events.forEach(function(event) {
      $scope.events = $scope.events.filter(function(event_s) {
        return event_s != event
      });
    });
    }
  }

  $scope.disabledDelete = function(events) {
    return !events.some(function(event) {
        return event.selected == true
      })
  }

  $scope.showEvents = function() {
    Event.getEvents().then(function(response) {
    $scope.events = response.data.data;
    });
  }

  $scope.hideEvents = function() {
    $scope.events = [];
  }

  $scope.showHideButton = function() {
    return $scope.events.length !== 0
  }
  $scope.notShowHideButton = function() {
    return !$scope.showHideButton()
  }
}])
