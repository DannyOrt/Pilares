$(document).ready( function() {

	$('#add-phone-button, #change-profile-photo').click( function( event ) {
		event.preventDefault();
	});

	var readyStateCheckInterval = setInterval( function() {
		resizeImg();
	    if (document.readyState === "complete") {
	        clearInterval( readyStateCheckInterval );
	        resizeImg();
	    }
	}, 500);


	if ( $('#main-carousel').length > 0 ) {
		// Carousel de imagenes
		$('#main-carousel-indicator').find('span').remove();

		$('#main-carousel').find('.carousel_element').each( function( index ) {
			$(this).attr('data-idposition', index);
			// Agregando los puntos indicadores dinamicamente
			$('#main-carousel-indicator').append('<span class="point circle"></span>');
		});

		var initMainCarousel = setInterval( function() {
			moveCarousel( true, '#main-carousel', '#main-carousel-indicator' );
		}, 5000);

		$('#main-carousel-indicator').find('span').click( function () {
			clearInterval( initMainCarousel );
			moveCarousel( false, '#main-carousel', '#main-carousel-indicator', $('#main-carousel-indicator span').index( $(this) ) );
		});
	}

});

// Funcion para mover el carousel de imagenes
function moveCarousel( status, carousel_id, indicator_selector, position ) {
	var selector = $(carousel_id);
	var items = selector.find('.carousel_element');
	var indicator = $(indicator_selector);

	var positioner = parseInt( items.eq(1).attr('data-idposition') );

	if ( status ) {

		selector.animate({
			'left': '-100%',
		}, 1200, function() {
			items.eq(0).insertAfter( items.eq(items.length - 1) );
			selector.css('left', '0');
		});

		indicator.find('i.indicator').animate({
			'left': indicator.find('span').eq(positioner).position().left,
		}, 1200);
	} else {
		var initialBlock =  parseInt( items.eq(0).attr('data-idposition') );

		if ( initialBlock !== 0 ) {
			selector.find('.carousel_element').sort( function(a, b) {
	    		return +a.getAttribute('data-idposition') - +b.getAttribute('data-idposition');
			}).appendTo(selector);

			selector.css({
				'left': - parseInt( selector.find('.carousel_element[data-idposition="' + initialBlock + '"]').position().left )
			});
		}

		selector.animate({
			'left': - parseInt( selector.find('.carousel_element[data-idposition="' + position + '"]').position().left ),
		}, 1200);

		indicator.find('i.indicator').animate({
			'left': indicator.find('span').eq(position).position().left,
		}, 1200);
	}

}

function showMenu( status ) {
	var selector = $('#menu');
	if ( status ) {
		selector.animate({
			'left': '0',
		});
	} else {
		selector.animate({
			'left': -selector.width(),
		});
	}
}

function showCart( status ) {
	var selector = $('#cart-mini-list');
	if ( status ) {
		selector.animate({
			'right': '0',
		});
	} else {
		selector.animate({
			'right': -selector.width(),
		});
	}
}

function showSearchBar( status ) {
	var selector = $('#search-bar');
	if ( status ) {
		selector.fadeIn();
	} else {
		selector.fadeOut();
	}
}

function showPopup( status, pop_up_id ) {
	var selector = $(pop_up_id);
	if ( status ) {
		$('.pop_up_container').css('z-index', '98');
		selector.fadeIn().css('z-index', '99');
	} else {
		selector.fadeOut( function() {
			selector.removeAttr('style');
		});
	}
}

function resizeImg() {
	$('img[adjustable], video[adjustable]').each( function() {

		var imgWidth = parseFloat( $(this).get(0).naturalWidth );
		var imgHeight = parseFloat( $(this).get(0).naturalHeight );
		var width = parseFloat( $(this).parent().css('width') );
		var height = parseFloat( $(this).parent().css('height') );
		var parentProp = width / height;
		var imgProp = imgWidth / imgHeight;

		if ( imgProp > parentProp ) {
			$(this).removeClass('w_100').addClass('h_100');
		} else{
			$(this).removeClass('h_100').addClass('w_100');
		}
	});
}

function previewPhoto( input, img_selector ) {
	if ( input.files.length > 0 ) {
	    var reader = new FileReader();

	    reader.onload = function ( event ) {
	        jQuery(img_selector).attr('src', event.target.result);
	    }
	    reader.readAsDataURL( input.files[0] );
	}
}

function triggerClick( selector ) {
	jQuery(selector).click();
}