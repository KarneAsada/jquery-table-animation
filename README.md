# jQuery Table Cell Loading Animation

A simple jQuery plugin that animates a table row to look like a loading bar by changing the background color of each cell in order and then reversing direction.

This is an attempt to solve the common situation where ajax actions are taking place on a table row and we need a way to provide feedback to the user without being obtrusive.  It's simple and sends the message to the user that something is loading.

## Usage

    $("tr#id").tableLoadingAnimation();
    $("tr#id").tableLoadingAnimation({color: "red"});
    $("tr#id").tableLoadingAnimation("start");
  
## Parameters

    color: color of cell [#1FF]
    interval: milliseconds between frames [100]

## Demo

http://wondergreat.com/demos/jquery-table-animation.html