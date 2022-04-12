Feature: Home
As a guest user, I should be able to explore the home page of stockbit

Scenario: A guest user want to get stockbit app from google playstore
    Given I visit stockbit landing page
    When I click the Playstore download button
    Then A new tab would open with stockbit's url playstore on it