(function($){
	$(document).ready(function(){
		//page-login
		$('.help-block a').click(function(){
			$('#signin').slideUp(400)
			$('#signup').slideDown(400)
		});
		$('#signup button').click(function(){
			$('#signup').slideUp(400)
			$('#signin').slideDown(400)
		});
		// end page-login


		// navbar-fixed-right
		$('.navbar-fixed-right a[href="#open"]').click(function(e){
			var a = $(this).parents('.tabbable').find('.tab-content')
			
			if(a.hasClass('active')) {
                a.removeClass('active');
                a.find('.tab-pane').removeClass('active')
                $(this).parents('.nav-tabs').children().removeClass('active')
            } else {
                a.addClass('active');
            	a.find('.tab-pane:first').addClass('active')
            	$(this).parent().next().addClass('active')
            }
		});

		$('.navbar-fixed-right a[href^="#tab"]').click(function(){
			$(this).parents('.tabbable').find('.tab-content').addClass('active')
		});
		// end navbar-fixed-right


		// list-menu-right
		$('ul[data-submenu=submenu]').find('a').click(function(e){
            var li = $(this).parent();
            if(li.hasClass('active')) {
                li.removeClass('active');
            } else {
                li.siblings().removeClass('active');
                li.addClass('active');
            } 
        });
		// end list-menu-right


		// tooltip
        $('.tip-top').tooltip({placement: 'top'});
        $('.tip-left').tooltip({placement: 'left'});
        $('.tip-right').tooltip({placement: 'right'});
        $('.tip-bottom').tooltip({placement: 'bottom'});

		$('a[href$="#"]').click(function(e){
			e.preventDefault();
		});
		// end tooltip
	});
	
	// Load corechart plugin
	google.load('visualization', '1', {packages: ['corechart']});

	// Draw the chart
	google.setOnLoadCallback(drawVisualization);

})(jQuery);

function drawVisualization() {
   // Populate the data table.
    var dataTable = google.visualization.arrayToDataTable([
       ['Mon', 20, 28, 38, 45],
       ['Tue', 31, 38, 55, 66],
       ['Wed', 50, 55, 77, 80],
       ['Thu', 77, 77, 66, 50],
       ['Fri', 68, 66, 22, 15]
    // Treat first row as data as well.
    ], true);

    // Draw the chart.
    var chart = new google.visualization.CandlestickChart(document.getElementById('candle-stick-chart'));
    chart.draw(dataTable, {legend:'none', width: '400', height:200});
}
