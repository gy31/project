jQuery(document).ready(function() {
	// Header Scroll
	jQuery(window).on('scroll', function() {
		var scroll = jQuery(window).scrollTop();

		if (scroll >= 50) {
			jQuery('.header').addClass('fixed');
		} else {
			jQuery('.header').removeClass('fixed');
		}
	});

	
	// Page Scroll
	var sections = jQuery('section')
		nav = jQuery('nav[role="navigation"]');

	jQuery(window).on('scroll', function () {
	  	var cur_pos = jQuery(this).scrollTop();
	  	sections.each(function() {
	    	var top = jQuery(this).offset().top - 76
	        	bottom = top + jQuery(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+jQuery(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});
	nav.find('a').on('click', function () {
	  	var jQueryel = jQuery(this)
	    	id = jQueryel.attr('href');
		jQuery('html, body').animate({
			scrollTop: jQuery(id).offset().top - 75
		}, 500);
	  return false;
	});

	// Mobile Navigation
	jQuery('.nav-toggle').on('click', function() {
		jQuery(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});	
	nav.find('a').on('click', function() {
		jQuery('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});
});