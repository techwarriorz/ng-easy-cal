# Ng-Easy-Cal (Developed By TechWarriorz.com)
AngularJS Calendar (No JQuery Required!)

#Version 0.0.1: A New Hope
ngEasyCal was developed to give AngularJS Developers a simple way of adding calendars/events to their web applications. If you find a way to improve this project... please share the toys :)

#Getting Started
You will need to include the ngEasyCal CSS/JS files along with Moment.JS: No JQuey Necessary :) 

```
  <link href="dist/ng-easy-cal.css" rel="stylesheet"/>
  <script src="dist/ng-easy-cal-min.js"> </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"> </script>
```

NEXT you will need to declare the ngEasyCal module as a dependency within your application.

``` angular.module('TestApp', ['ngEasyCal']) ```

Now customizing plugins can typically be nightmares.... massive nightmares... so we have added one additional step for setup, in order to give you guys the power to make custom changes from the HTML DOM as opposed to a stringified html div in a javascript file... you are welcome :) 

For the next step all you have to do is switch the location of the 'templateUrl' property within whichever .js file you decide to use (whether minified or uncompressed).

``` templateUrl: "pathToTemplate/ng-easy-template.html" ```

Now, that we have our template wired into the application... let's go into the fun stuff... how to get the calendar onto the page! There are two conventions to add this to the HTML Dom.

``` <div easy-calendar> </div> ```

OR

``` <easy-calendar> </easy-calendar> ```


So we have an ultra cool calendar on our page now... let's go into how to get events on the dom!

HTML

``` 
<easy-calendar ez-events="events"> </easy-calendar> 
```

JAVASCRIPT
```  
  angular.controller('TestController', ['$scope', function($scope){
    //We will need to construct an array of objects, whether it is 1 event or 1,000... it must be passed in through an array
    
    $scope.events = [
      {
         startDate: "Sun Nov 01 2015 00:00:00 GMT-0700 (PDT)", //Start Date of the event
         endDate: "Sun Nov 07 2015 13:00:00 GMT-0700 (PDT)", //End Date of the Event
         title: "Test Event", //Title of the event
         description: "Test Event is a test of all tests", // The Description of your event
	  image: "http://techwarriorz.com/v2/wp-content/uploads/2014/03/logo-e1394897255145.png" //You can also include an image that will appear on the popover
      }
    ]
  }])
```

#Added Customization

We wanted to build this in a way, where you could customize just about everything from the dom! Let's see what we can do and the attributes behind them.

```
   ez-events="events" // we just explained that :) 
   
   ez-width="400" // To adjust the width of the calendar... just pass in the pixel width.
   
   ez-height="400"// Same for height
   
   ez-font="impact"// Want to give the calendar a custom font? Pass it in through the dom :)
   
   ez-border-color="black" //The color that you want the border to be
   
   ez-header-background-color="rgba(0, 0, 0, 0.4)" //header... background color
   
   ez-header-text-color="white" //header... text color
   
   ez-event-colors="eventColors" // you'll need to pass in an array of colors from your controller... 
   could look like this ['blue', '#FFF', 'rgba(0,0,0, 0.2)'] you can have as many or as few as you want! It just needs to be an array!
   
   ez-event-text-color="#FFF" //No need to pass in a variable... this just needs one color, that will be used for the text of all of your events... could be in "blue", "rgb(0,0,0)", or "#000" format :) see... we made this simple as hell!
   
   //Now for the popover
   
   ez-popover-activate-on="click" // There are three options for popover activation "hover", "click", or "none"
   
   ez-popover-width="200" //The width you would like popover to be
  
   ez-popover-height="200" //The Height you would like popoever to be
   
   ez-popover-background-color="#fff" // Background-Color of the popover
   
   ez-popover-text-color="black" // Color that you want the text to be
   
   ez-popover-border="1px solid black" // one liner of the border that you want.

```

Since we tossed you guys some code, please be sure to toss us a follow on GitHub and also throw us a follow on twitter- http://twitter.com/techwarriorz

