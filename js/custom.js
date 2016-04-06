

// var jq = jQuery.noConflict();
$(document).ready(function(){

	/* For opening link on new window for mobile devices and new tab in browsers */
	$(document).on('click', 'a[target="_system"],a[target="_blank"]', function (e) {
                                 
            e.preventDefault();
            var url = $(this).attr('href'), strTarget = $(this).attr('target');
            //alert(strTarget + " current 45" + ' url '+ url);
            window.open(url, strTarget);
    });

	//Pretty Custom handeling 
	var bindableElements =  '.jsPrettyOptionWrap a';
	var checkboxFlag = false;

	$(document).on('click',bindableElements, function(e){

		var me = $(this), nodeName = e.target.nodeName;
		var prettyOptionWrapObj = me.parents('.jsPrettyOptionWrap');
		//console.log(e);		console.log(nodeName);

		var curAElement = me.parents('.jsPrettyOptionWrap').find('a'),
			curInputElement = me.parents('.jsPrettyOptionWrap').find('input');
			curInputElementName = me.parents('.jsPrettyOptionWrap').find('input').attr('name');
			curInputSelectedVal = me.parents('.jsPrettyOptionWrap').find('input').attr('value');


		//console.log('Name:  '+curInputElementName + '  Value:  	'+curInputSelectedVal);		
		
		
		if(prettyOptionWrapObj.data('optionType') == 'checkbox'){

			//console.log(curAElement.siblings('a'));
			//&& curAElement.siblings('a').hasClass('checked')
			//console.log('option checkbox');
			//console.log(curInputElement);

			if(curAElement.hasClass('checked')){			
				curAElement.removeClass('checked');
				curInputElement.prop('checked',false).attr('checked',false);	//jQuery 1.9+, attr for properties will not work,	
				
				//console.log('setting false');
			}
			else{
				curAElement.addClass('checked');
				curInputElement.prop('checked',true).attr('checked',true);	 	//jQuery 1.9+, attr for properties will not work,	
				
				//console.log('setting true');

				//Adding class to parent element to handle question answered count
				curAElement.parents('.jsPrettyWrapper').addClass('yesAnswered')
			}	

		}
		else if(prettyOptionWrapObj.data('optionType') == 'radio'){

			//console.log('option radio');

			$('input[name="'+curInputElementName+'"]').each(function(idx, ele){
				$(ele).parent('.jsPrettyOptionWrap').find('a').removeClass('checked');
				$(ele).prop('checked',false).attr('checked',false);
			});

			curAElement.addClass('checked');
			curInputElement.prop('checked',true).attr('checked',true);	

		}
	});
	
	$(document).on('click', '.jsPrettyOptionWrap label', function(e){
		$(this).siblings('a').trigger('click');
	});
	
	
	//Binding Popover on doucment for also to work on dynamic elements
	$(document).popover({
    	html: true,
    	container: 'body',
    	trigger: 'focus',
    	selector: '[data-toggle="popover"]'
    });  

	//Hide Popover on outside click
	 $('body').on('click touchstart', function (e) {
	    //did not click a popover toggle or popover
	    if ($(e.target).data('toggle') !== 'popover'
	    	&& $(e.target).parents('[data-toggle="popover"]').length === 0
	        && $(e.target).parents('.popover.in').length === 0) { 
	        $('[data-toggle="popover"]').popover('hide');
	    }
	});

	//Toggle navbar-fixed-top height for smaller devices on navbar-toggle button click
	var toggleFlag = false;
	$('.navbar-toggle').on('click',function(){
		
		var me = $(this);
		if(toggleFlag === false){
			me.parents('.navbar-fixed-top').css({height: '100%'});	
			//me.parents('.navbar-fixed-top').find('.navbar-collapse.in').css({maxheight: 'auto', height: 'auto'});
			
			toggleFlag = true;
		}
		else{
			me.parents('.navbar-fixed-top').css({height: 'auto'});		
			
			toggleFlag = false;
		}
		
	});

	//On navbar-nav ul anchor element clicked
	$(document).on('click', '.navbar-nav a, a.navbar-brand', function(e){		
		var me = $(this);
		
		e.preventDefault();

		$('.navbar-collapse').removeClass('in');
		me.parents('.navbar-fixed-top').css({height: 'auto'});	
		toggleFlag = false;
		//console.log('logo or menu item fired');
	});
		
	/* Check to show back to top conditionaly */
	$(document).scroll(function (e) {
		var me = $(this);
		if(me.scrollTop() == 0){
			$('#backToTop').fadeOut(300);
		}else{
			$('#backToTop').fadeIn('slow');
		}

		/* Hide any popup on scroll */
		$('[data-toggle="popover"]').popover('hide');
	    
	});

	/* Back to Top functionality check */
	$('#backToTop').click(
		function (e) {
			$('html, body').animate({scrollTop: '0px'}, 500);
		}
	);


	//See more and see less 
	$(document).on('click', '.jsSMLink', function(){
		
		var me = $(this), dataSM = me.data('sm'), 
			smContent = me.siblings('.jsSMContent');

		smContent.toggleClass('hide-more show-more');

		if(dataSM == 'more'){
			//smContent.removeClass('hide').addClass('show');
			me.data('sm', 'less');
			me.text('Zie minder');
		}else{
			//smContent.removeClass('show').addClass('hide');
			me.data('sm', 'more');
			me.text('Bekijk meer');
		}
	});

	//Whenever modal is shown callback of show to align model in center of screen

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });
    
});
	
/* Center bootstrap modal */
function centerModal() {
    $(this).css('display', 'block');
    var $dialog  = $(this).find(".modal-dialog"),
    offset       = ($(window).height() - $dialog.height()) / 2,
    bottomMargin = parseInt($dialog.css('marginBottom'), 10);

    // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
    if(offset < bottomMargin) offset = bottomMargin;
    $dialog.css("margin-top", offset);
}

//Initialize clickSuck for IOS devices
//clickSuck.init();