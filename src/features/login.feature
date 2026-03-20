Feature: NRL Email OTP Signup


Scenario: User signup with email OTP
  Given I open NRL signup page
  When I enter valid email and submit
  Then I Fetch OTP and Complete signup
