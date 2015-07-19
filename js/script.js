var examples  = {
	lorem: 'Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.',
	kafka: 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.',
	pangram: 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs!'
};

var clozeTest = new Ractive({
	el: '#clozeTest',
	template: '#template-clozeTest',

	data: {
		input: 'Add your own text here..'
	}

});

clozeTest.on('eg-lorem', function() {
	clozeTest.set('input', examples.lorem);
});

clozeTest.on('eg-kafka', function() {
	clozeTest.set('input', examples.kafka);
});

clozeTest.on('eg-pangram', function() {
	clozeTest.set('input', examples.pangram);
});


//Randomise plugin
(function($) {
	$.fn.randomize = function(childElem) {
		return this.each(function() {
			var $this = $(this);
			var elems = $this.children(childElem);

			elems.sort(function() { return (Math.round(Math.random())-0.5); });

			$this.remove(childElem);

			for(var i=0; i < elems.length; i++){
				$this.append(elems[i]);
			}
		});
	}
})(jQuery);

$(function() {
	//Textarea move to result box
	$('textarea').bind('keyup',function() {
		$('#result_content').text($('textarea').val());
		$('#result_content')
			.html('<span>'+$('#result_content')
				.html().replace(/( |"|\(|\)|\[|\]|'|:|;|\?|\!|\/|\/\/ |, |\.)/g,'</span>$1<span>').replace(/\n/g,'</span><br /><br /><span>')+'</span>')
	});

	//Increment number
	var number = 0;
	function incrementNumber () {
		number += 1;
	}

	//Click spans in result box
	$('body').on('click', '#result_content span', function(){
		var
			thisTxt = $(this).text(),
			inputWidth = $(this).width()
		;
		if ( $(this).children().size() > 0 ) {
			//Need to match word, add a success message (tick maybe) & then replace input with correct text that is highlighted.
		} else {
			incrementNumber();
			$(this).attr({id: 'item' + number})
				.addClass('selected')
				.clone()
				.text($(this).text() + ' ')
				.appendTo('#keyword_content')
			;

			$(this).html('<input type="text" placeholder="?"/>')
				.find('input')
				.addClass('test-input')
				.attr({name: thisTxt})
				.css('width', inputWidth)
				.data('text', thisTxt)
			;
		}
	});
	//Move words back to result box
	$('body').on('click','#keyword_content span', function() {
		var thisClass = $(this).attr('id');
		var thatClass = 'span#' + thisClass;
		//alert(thatClass)
		var thisTxt = $(this).text();
		//alert(thisTxt)
		$('#result_content').find(thatClass).replaceWith('<span>' + thisTxt + '</span>');
		$(this).fadeOut('slow').remove();
	});

	//Randomise
	$('#keywords button').click(function() {
		$('#keyword_content').randomize("#keyword_content span");
	});
	//Select text
	/*
$('button#select').on('click',function() {
		$('#result_content').select();
	});
*/

	$('body').on('keyup', '#result_content input[type=text]', inputCheck);

	function inputCheck() {
		console.log('inputCheck');

		if ( this.value === this.name ) {
			$(this).addClass('success');
			$(this).parent().addClass('success').text(this.name);
			$(this).remove();
		} else {
			$(this).addClass('error');
		}
	}

});

// To do:
// 1. Enter a url or paste in your own text.
// 2.
