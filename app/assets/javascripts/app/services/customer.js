'use strict';

var app = angular.module('app02');

app.service('Customer', ["$http","$log", function($http, $log) {
  
  this.addCustomer = function(customer) {
    return $http.post('/api/customers', customer);
  }

  this.getCustomers = function() {
    return $http.get('/api/customers');
  };

  this.deleteCustomer = function(customer_id) {
    return $http.delete('/api/customers/' + customer_id);
  };

  this.showCustomer = function(customer_id) {
    return $http.get('/api/customers/' + customer_id);
  }
  
  this.getCustomerLoans = function(customer_id) {
    return $http.get('/api/loans/' + customer_id);
  }

  this.deleteLoan = function(loan_id) {
    return $http.delete('/api/loans/' + loan_id) ;
  }
}])