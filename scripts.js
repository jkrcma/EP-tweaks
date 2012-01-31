// load images
var images = {
	".markItUp .markItUpButton1 a": "markitup/sets/default/images/bold.png",
	".markItUp .markItUpButton2 a": "markitup/sets/default/images/italic.png",
	".markItUp .markItUpButton3 a": "markitup/sets/default/images/stroke.png",
	".markItUp .markItUpButton4 a": "markitup/sets/default/images/list-bullet.png",
	".markItUp .markItUpButton5 a": "markitup/sets/default/images/list-numeric.png",
	".markItUp .markItUpButton6 a": "markitup/sets/default/images/picture.png",
	".markItUp .markItUpButton7 a": "markitup/sets/default/images/link.png",
	".markItUp .markItUpButton8 a": "markitup/sets/default/images/clean.png",
	".markItUp .preview a": "markitup/sets/default/images/preview.png",
	".markItUpContainer": "markitup/skins/markitup/images/bg-container.png",
	".markItUpEditor": "markitup/skins/markitup/images/bg-editor.png",
	".markItUpResizeHandle": "markitup/skins/markitup/images/handle.png",
	".markItUpHeader ul .markItUpDropMenu": "markitup/skins/markitup/images/menu.png",
	".markItUpHeader ul ul .markItUpDropMenu": "markitup/skins/markitup/images/submenu.png",
	".html .markItUpEditor": "markitup/skins/markitup/images/bg-editor-html.png",
	".markdown .markItUpEditor": "markitup/skins/markitup/images/bg-editor-markdown.png",
	".textile .markItUpEditor": "markitup/skins/markitup/images/bg-editor-textile.png",
	".bbcode .markItUpEditor": "markitup/skins/markitup/images/bg-editor-bbcode.png",
	".wiki .markItUpEditor": "markitup/skins/markitup/images/bg-editor-wiki.png",
	".dotclear .markItUpEditor": "markitup/skins/markitup/images/bg-editor-wiki.png",
};

/* MarkItUp editor startup */
$(document).ready(function() {
	mySettings.nameSpace = 'html';
	mySettings.previewTemplatePath = chrome.extension.getURL('markitup/templates/preview.html');
	mySettings.previewInWindow = false;
	
	$('.wiki-edit')
		.css({
			visibility: 'visible',
			display: 'block',
		})
		.markItUp(mySettings);
	
	for (var selector in images) {
		if (!images.hasOwnProperty(selector)) {
			continue;
		}
		$(selector).css('background-image', "url('" + chrome.extension.getURL(images[selector]) + "')");
	}
});

/* MarkItUp editor submit */
$(document).ready(function() {
	$('#issue-form').submit(function(e) {
		// issue description
		$('#cke_issue_description iframe', this).contents()
			.find('body').html($('#issue_description', this).val());
		// note
		$('#cke_notes iframe', this).contents()
			.find('body').html($('#notes', this).val());
	});
	
	$('#news-form').submit(function(e) {
		// news description
		$('#cke_news_description iframe', this).contents()
			.find('body').html($('#news_description', this).val());
	});
	
	$('#document_description').closest('form').submit(function(e) {
		// document description
		$('#cke_document_description iframe', this).contents()
			.find('body').html($('#document_description', this).val());
	});
});

/* New issue watchers */
$(document).ready(function() {
	var watchers = [];
	$('.issue_watchers .issue-watcher-container').each(function(i, o) {
		watchers[$('input:checkbox', o).attr('id')] = $('.issue-watcher-name', o).text();
	});
	
	var container = $('<div id="watchers"><h4>Spolupracovníci:</h4><div class="container"></div></div>').insertAfter('#attributes').find('.container');
	for (i in watchers) {
		container.append($('#' + i));
		container.append(watchers[i] + '<br>');
	}
});
