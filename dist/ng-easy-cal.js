/*
    NgEasyCal (v 0.0.1) was created by TechWarriorz.com on November 14, 2015.
    Lead Developer: Rick Dawson
*/
(function(){
    angular.module('ngEasyCal', []);
    
    angular.module('ngEasyCal').directive('easyCalendar', [ function(){
        return {
            restrict: "EA",
            scope: {
                ezEvents: "=",
                ezEventColors: "=",
                ezEventTextColor: "@",
                ezWidth: "@",
                ezHeight: "@",
				ezFont: "@",
                ezBorderColor: "@",
                ezHeaderBackgroundColor: "@",
                ezHeaderTextColor: "@",
				ezPopoverActivateOn: "@",
                ezPopoverWidth: "@",
                ezPopoverHeight: "@",
                ezPopoverBackgroundColor: "@",
                ezPopoverTextColor: "@",
                ezPopoverBorder: "@"
            },
			templateUrl: "dist/ng-easy-template.html", //Set this to the path of your ng-easy-template.html
            link: function(scope, elem, attrs){
              //Variables
            
              var defaultDate = moment(),
                  defaultEventColors = ["#AA3939",
                                        "#D46A6A", 
                                        "#5F5293", 
                                        "#E36700", 
                                        "#B60067"];
              scope.calendarDays = [];
			  scope.ezWidth = scope.ezWidth || 400;
			  scope.ezHeight = scope.ezHeight || 400;
              scope.dateHeight = (scope.ezHeight / 5) + "px";
              scope.dateWidth =  (scope.ezWidth / 7 -2)  + "px";
              scope.currentDate = defaultDate.format('MMMM YYYY');
              scope.defaultEventTextColor = scope.ezEventTextColor || "#FFF";
              scope.defaultBorderColor = scope.ezBorderColor || "1px solid #000";
              scope.defaultHeaderBackgroundColor = scope.ezHeaderBackgroundColor || "red";
              scope.defaultHeaderTextColor = scope.ezHeaderTextColor || "white";
              scope.defaultPopoverWidth = scope.ezPopoverWidth || 200;
              scope.defaultPopoverHeight = scope.ezPopoverHeight || 200;
			  scope.defaultPopoverBackgroundColor = scope.ezPopoverBackgroundColor || "#FFF";
			  scope.defaultPopoverTextColor = scope.ezPopoverTextColor || "#000";
			  scope.defaultPopoverBorder = scope.ezPopoverBorder || "1px solid #000";
              scope.eventListHeight = ((scope.ezHeight / 6));
                
                //The popover
                scope.popover = {
                    show: false,
                    event: undefined
                }
				
                //This Sets Up The Calendar
              function constructCalendar(selectedDate){
                scope.calendarDays = [];
                  //Setting up the array
                var endOfMonth = angular.copy(defaultDate);
                  endOfMonth = endOfMonth.endOf('month').format('DD');
                var currentDate = angular.copy(defaultDate);
				var currentDisplayDate = angular.copy(defaultDate);
				  currentDisplayDate = currentDisplayDate.format('mmmm yyyy');
                  currentDate = currentDate.startOf('month');
                  //Building The Array
                for (var i = 0; i < endOfMonth; i++){
                    var day = {
                        date: moment(currentDate), //date of the calendar
                        dayOfWeek: moment(currentDate).format('dddd'),
                        dateNumber: moment(currentDate).format('DD'),
                        events: [] //empty array for events to occur
                    }
                    
                    if (day.date.isSame(moment(), 'day')){
                        day.isToday = true;
                    }
                    scope.calendarDays.push(day)
                    currentDate = currentDate.add(1, 'days');
                }
                  scope.headingDays = ["Sunday" ,"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                  console.log(scope.headingDays);
                  //Adding Events
                  addInactiveDates();
                  populateEvents();
                  assignColors(); 
              };
                function addInactiveDates(){
                    var startDayName = scope.calendarDays[0].dayOfWeek;
                    var startDayDate = angular.copy(scope.calendarDays[0].date)
                        startDayDate = moment(startDayDate).subtract(1, 'days');
					
					var lastDayIndex = scope.calendarDays.length - 1;
					var lastDayName = scope.calendarDays[lastDayIndex].dayOfWeek;
					var lastDayDate = angular.copy(scope.calendarDays[lastDayIndex].date);
						
					
					
                    var addDayCount = 0;
					var addDayLastCount = 0;
					
                    if (startDayName !== "Sunday"){
                        if (startDayName === "Monday"){
                            addDayCount = 1;
                        } else if (startDayName === "Tuesday"){
                            addDayCount = 2;
                        } else if (startDayName === "Wednesday"){
                            addDayCount = 3;
                        } else if (startDayName === "Thursday"){
                            addDayCount = 4;
                        } else if (startDayName === "Friday"){
                            addDayCount = 5;
                        } else {
                            addDayCount = 6;
                        }
                        
                        for(var i = 0; i < addDayCount; i++){
                            var day = {
                                date: moment(startDayDate), //date of the calendar
                                dayOfWeek: moment(startDayDate).format('dddd'),
                                dateNumber: moment(startDayDate).format('DD'),
                                previousMonth: true,
                                events: [] //empty array for events to occur
                            }
                            
                            scope.calendarDays.unshift(day);
                            startDayDate = startDayDate.subtract(1, 'days');
                        }
                        
                    }
					
					if (lastDayName !== 'Saturday'){
						  if (lastDayName === "Monday"){
                            addDayLastCount = 5;
                        } else if (lastDayName === "Tuesday"){
                             addDayLastCount = 4;
                        } else if (lastDayName === "Wednesday"){
                             addDayLastCount = 3;
                        } else if (lastDayName === "Thursday"){
                             addDayLastCount = 2;
                        } else if (lastDayName === "Friday"){
                             addDayLastCount = 1;
                        } else {
                             addDayLastCount = 6;
                        }
					}
					
					    for(var i = 0; i < addDayLastCount; i++){
							lastDayDate = lastDayDate.add(1, 'days');
                            var day = {
                                date: moment(lastDayDate), //date of the calendar
                                dayOfWeek: moment(lastDayDate).format('dddd'),
                                dateNumber: moment(lastDayDate).format('DD'),
                                nextMonth: true,
                                events: [] //empty array for events to occur
                            }
                            
                            scope.calendarDays.push(day);
                            
                        }
                }
                function populateEvents(){
                    for (var i = 0, iLen = scope.ezEvents.length; i < iLen; i++){
                        var eventStart = moment(scope.ezEvents[i].startDate),
                            eventEnd   = moment(scope.ezEvents[i].endDate),
                            eventDayCount = 0,
                            event = scope.ezEvents[i];
                        for (var j = 0, jLen = scope.calendarDays.length; j < jLen; j++){
                            var calendarDate = scope.calendarDays[j].date;
                            if (eventStart.isSame(calendarDate, 'day') ||
                                eventEnd.isSame(calendarDate, 'day')||
                                (calendarDate.isBefore(eventEnd, 'day') && calendarDate.isAfter(eventStart, 'day'))){
                                var cleanEvent = {
                                    startDate: eventStart,
                                    endDate: eventEnd,
                                    title: event.title,
                                    description: event.description,
                                    image: event.image,
                                    formattedStart: eventStart.format('hha')
                                };
                                
                                if (eventDayCount > 0){
                                    cleanEvent.multiDay = true;
                                }
                                
                                
                                scope.calendarDays[j].events.push(cleanEvent);
                                eventDayCount++;
                            }
                        }
                    }
                };
                
                function assignColors(){
                    for(var i = 0, len = scope.calendarDays.length; i < len; i++){
                         var colorCount = 0,
                             colorArray = scope.ezEventColors || defaultEventColors;
                        if (scope.calendarDays[i].events.length > 0){
                            for (var j = 0, jlen = scope.calendarDays[i].events.length; j < jlen; j++){
                                scope.calendarDays[i].events[j].backgroundColor = colorArray[colorCount];
                                
                                //Increment the count accordingly
                                if (j + 1 === colorArray.length){
                                    colorCount = 0;
                                } else {
                                    colorCount++;
                                }
                            }
                        }
                    }
                };
                
                
              
              scope.monthForward= function(){
                defaultDate = defaultDate.add(1, 'months');
                scope.currentDate = defaultDate.format('MMMM YYYY');
                constructCalendar();
              }
              
              scope.monthBackward = function(){
                defaultDate = defaultDate.subtract(1, 'months');
                  scope.currentDate = defaultDate.format('MMMM YYYY');
                constructCalendar();
              }
              
              scope.showPopoverClick = function (event, mouse) {
				  if (scope.ezPopoverActivateOn === 'none' || scope.ezPopoverActivateOn === 'hover') {
				  	return
				  }
                  scope.popover.event = event;
                  scope.popover.show = true;
				  scope.xPopPosition = mouse.clientX - 100;
				  scope.yPopPosition = mouse.clientY + 20;
              }
			  
			    scope.showPopoverHover = function (event, mouse) {
					 if (scope.ezPopoverActivateOn === 'none' || 
						 scope.ezPopoverActivateOn === 'click' || 
						 scope.ezPopoverActivateOn === undefined) {
				  	return
				  }
                  scope.popover.event = event;
                  scope.popover.show = true;
				  scope.xPopPosition = mouse.clientX;
				  scope.yPopPosition = mouse.clientY;
              }
			  
			  scope.changeMonth = function(day){
			  	if (day.nextMonth){
					scope.monthForward();
					scope.hidePopover();
				}
				  
				if (day.previousMonth){
					scope.monthBackward();
					scope.hidePopover();
				}
			  }
              
              scope.hidePopoverHover = function () {
				  if(scope.ezPopoverActivateOn !== 'hover'){ return; };
                 scope.popover.show = false;
                 scope.popover.event = undefined;
              }
			  
			  scope.hidePopover = function () {
			  	scope.popover.show = false;
				scope.popover.event = undefined;
			  } 
			  
			  scope.formatDate = function (date) {
				  if (!date){ return;}
			  	return moment(date).format('MM/DD') + ' at ' + moment(date).format('hha');
			  }
                //init
                constructCalendar();
                scope.$watchCollection('ezEvents', function(){
                    constructCalendar();
                });		
            }
        };
    }]);
}());