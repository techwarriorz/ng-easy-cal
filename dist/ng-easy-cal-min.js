!function(){angular.module("ngEasyCal",[]),angular.module("ngEasyCal").directive("easyCalendar",[function(){return{restrict:"EA",scope:{ezEvents:"=",ezEventColors:"=",ezEventTextColor:"@",ezWidth:"@",ezHeight:"@",ezFont:"@",ezBorderColor:"@",ezHeaderBackgroundColor:"@",ezHeaderTextColor:"@",ezPopoverActivateOn:"@",ezPopoverWidth:"@",ezPopoverHeight:"@",ezPopoverBackgroundColor:"@",ezPopoverTextColor:"@",ezPopoverBorder:"@"},templateUrl:"ng-easy-cal/ng-easy-template.html",link:function(e,o,a){function t(o){e.calendarDays=[];var a=angular.copy(i);a=a.endOf("month").format("DD");var t=angular.copy(i),v=angular.copy(i);v=v.format("mmmm yyyy"),t=t.startOf("month");for(var s=0;a>s;s++){var l={date:moment(t),dayOfWeek:moment(t).format("dddd"),dateNumber:moment(t).format("DD"),events:[]};l.date.isSame(moment(),"day")&&(l.isToday=!0),e.calendarDays.push(l),t=t.add(1,"days")}e.headingDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],console.log(e.headingDays),r(),n(),d()}function r(){var o=e.calendarDays[0].dayOfWeek,a=angular.copy(e.calendarDays[0].date);a=moment(a).subtract(1,"days");var t=e.calendarDays.length-1,r=e.calendarDays[t].dayOfWeek,n=angular.copy(e.calendarDays[t].date),d=0,i=0;if("Sunday"!==o){d="Monday"===o?1:"Tuesday"===o?2:"Wednesday"===o?3:"Thursday"===o?4:"Friday"===o?5:6;for(var v=0;d>v;v++){var s={date:moment(a),dayOfWeek:moment(a).format("dddd"),dateNumber:moment(a).format("DD"),previousMonth:!0,events:[]};e.calendarDays.unshift(s),a=a.subtract(1,"days")}}"Saturday"!==r&&(i="Monday"===r?5:"Tuesday"===r?4:"Wednesday"===r?3:"Thursday"===r?2:"Friday"===r?1:6);for(var v=0;i>v;v++){n=n.add(1,"days");var s={date:moment(n),dayOfWeek:moment(n).format("dddd"),dateNumber:moment(n).format("DD"),nextMonth:!0,events:[]};e.calendarDays.push(s)}}function n(){for(var o=0,a=e.ezEvents.length;a>o;o++)for(var t=moment(e.ezEvents[o].startDate),r=moment(e.ezEvents[o].endDate),n=0,d=e.ezEvents[o],i=0,v=e.calendarDays.length;v>i;i++){var s=e.calendarDays[i].date;if(t.isSame(s,"day")||r.isSame(s,"day")||s.isBefore(r,"day")&&s.isAfter(t,"day")){var l={startDate:t,endDate:r,title:d.title,description:d.description,image:d.image,formattedStart:t.format("hha")};n>0&&(l.multiDay=!0),e.calendarDays[i].events.push(l),n++}}}function d(){for(var o=0,a=e.calendarDays.length;a>o;o++){var t=0,r=e.ezEventColors||v;if(e.calendarDays[o].events.length>0)for(var n=0,d=e.calendarDays[o].events.length;d>n;n++)e.calendarDays[o].events[n].backgroundColor=r[t],n+1===r.length?t=0:t++}}var i=moment(),v=["#AA3939","#D46A6A","#5F5293","#E36700","#B60067"];e.calendarDays=[],e.ezWidth=e.ezWidth||400,e.ezHeight=e.ezHeight||400,e.dateHeight=e.ezHeight/5+"px",e.dateWidth=e.ezWidth/7-2+"px",e.currentDate=i.format("MMMM YYYY"),e.defaultEventTextColor=e.ezEventTextColor||"#FFF",e.defaultBorderColor=e.ezBorderColor||"1px solid #000",e.defaultHeaderBackgroundColor=e.ezHeaderBackgroundColor||"red",e.defaultHeaderTextColor=e.ezHeaderTextColor||"white",e.defaultPopoverWidth=e.ezPopoverWidth||200,e.defaultPopoverHeight=e.ezPopoverHeight||200,e.defaultPopoverBackgroundColor=e.ezPopoverBackgroundColor||"#FFF",e.defaultPopoverTextColor=e.ezPopoverTextColor||"#000",e.defaultPopoverBorder=e.ezPopoverBorder||"1px solid #000",e.eventListHeight=e.ezHeight/6,e.popover={show:!1,event:void 0},e.monthForward=function(){i=i.add(1,"months"),e.currentDate=i.format("MMMM YYYY"),t()},e.monthBackward=function(){i=i.subtract(1,"months"),e.currentDate=i.format("MMMM YYYY"),t()},e.showPopoverClick=function(o,a){"none"!==e.ezPopoverActivateOn&&"hover"!==e.ezPopoverActivateOn&&(e.popover.event=o,e.popover.show=!0,e.xPopPosition=a.clientX-100,e.yPopPosition=a.clientY+20)},e.showPopoverHover=function(o,a){"none"!==e.ezPopoverActivateOn&&"click"!==e.ezPopoverActivateOn&&void 0!==e.ezPopoverActivateOn&&(e.popover.event=o,e.popover.show=!0,e.xPopPosition=a.clientX,e.yPopPosition=a.clientY)},e.changeMonth=function(o){o.nextMonth&&(e.monthForward(),e.hidePopover()),o.previousMonth&&(e.monthBackward(),e.hidePopover())},e.hidePopoverHover=function(){"hover"===e.ezPopoverActivateOn&&(e.popover.show=!1,e.popover.event=void 0)},e.hidePopover=function(){e.popover.show=!1,e.popover.event=void 0},e.formatDate=function(e){return e?moment(e).format("MM/DD")+" at "+moment(e).format("hha"):void 0},t(),e.$watchCollection("ezEvents",function(){t()})}}}])}();