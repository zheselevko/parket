(function($){
	
	var plugin = {};
	
	var defaults = { 
		method: 'click',
		box: null,
		button: null,
		button_close: '.close',
		effect: null,
		anim_speed: 300,
		auto_close: null,
		delay: 150,
		onShow: function(){},
		onHide: function(){}
	};
	
	$.fn.toShowHide = function(options){
		
		if(this.length == 0) return this;
		
		if(this.length > 1){
			this.each(function(){$(this).toShowHide(options)});
			return this;
		}
		
		var tooltip = {};
		
		var element = this;
		plugin.element = this;
		
		var init = function(){
			
			tooltip.settings = $.extend({}, defaults, options);
			
			tooltip.box = element.find(tooltip.settings.box);
			tooltip.button = element.find(tooltip.settings.button);
			tooltip.buttonClose = element.find(tooltip.settings.close_button);
			
			tooltip.rand = Math.floor(Math.random()*(999-100+1))+100;
			tooltip.intID = null;
			tooltip.intervalID;
			
			if(tooltip.settings.method == 'click'){
				
				tooltip.button.on('click', function(e){
			    	
			    	if(tooltip.box.css('display') !== 'block'){
				    	
				    	if(tooltip.settings.effect == 'slide'){
				    		tooltip.box.slideDown(tooltip.settings.anim_speed, function(){
				    			tooltip.settings.onShow(element);
				    		});
				    	} else if(tooltip.settings.effect == 'fade'){
				    		tooltip.box.fadeIn(tooltip.settings.anim_speed, function(){
				    			tooltip.settings.onShow(element);
				    		});
				    	} else {
				    		tooltip.box.show();
				    		tooltip.settings.onShow(element);
				    	}
				    	
			        	if(tooltip.settings.auto_close) {
			        		tooltip.intID = window.setInterval(function(){close()},tooltip.settings.auto_close);
			        	}
			    	}
					
					tooltip.firstClick = true;
			        $(document).bind('click.'+tooltip.rand, function(e){
			        	if(tooltip.firstClick == false && ($(e.target).closest(tooltip.box).length == 0 || $(e.target).closest(tooltip.button).length == 1 || $(e.target).closest(tooltip.buttonClose).length == 1)) {
							close();
			            }
			            tooltip.firstClick = false;
			        });
			        
			        e.preventDefault();
			    });
				
			} else {
				
				element.hover(function(){
					if(tooltip.box.length == 1) {
			    		tooltip.intervalID = setTimeout(function(){
			    			if(tooltip.settings.effect == 'slide'){
					    		tooltip.box.slideDown(tooltip.settings.anim_speed, function(){
					    			tooltip.settings.onShow(element);
					    		});
			    			} else if(tooltip.settings.effect == 'fade'){
					    		tooltip.box.fadeIn(tooltip.settings.anim_speed, function(){
					    			tooltip.settings.onShow(element);
					    		});
			    			} else {
			    				tooltip.box.show();
			    				tooltip.settings.onShow(element);
			    			}
						}, tooltip.settings.delay);
					}
			    }, function(){
					if(tooltip.box.length == 1) {
						if(tooltip.settings.effect == 'slide'){
				    		tooltip.box.slideUp(tooltip.settings.anim_speed, function(){
				    			tooltip.settings.onHide(element);
				    		});
						} else if(tooltip.settings.effect == 'fade'){
				    		tooltip.box.fadeOut(tooltip.settings.anim_speed, function(){
				    			tooltip.settings.onHide(element);
				    		});
						} else {
							tooltip.box.hide();
							tooltip.settings.onHide(element);
						}
						clearInterval(tooltip.intervalID);
					}
			    });
				
			}
		};
		
		var close = function(){
			
			if(tooltip.settings.effect == 'slide'){
	    		tooltip.box.slideUp(tooltip.settings.anim_speed, function(){
	    			tooltip.settings.onHide(element);
	    		});
	    	} else if(tooltip.settings.effect == 'fade'){
	    		tooltip.box.fadeOut(tooltip.settings.anim_speed, function(){
	    			tooltip.settings.onHide(element);
	    		});
	    	} else {
	        	tooltip.box.hide();
	        	tooltip.settings.onHide(element);
	    	}
	    	
	    	$(document).unbind('click.'+tooltip.rand);
	    	
			if(tooltip.intID) {
				window.clearInterval(tooltip.intID);
			}
		};
		
		init();
		
		return this;
	}
	
})(jQuery);