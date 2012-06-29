// load images
var images = {
	".markItUp .bold a": "markitup/sets/default/images/bold.png",
	".markItUp .italic a": "markitup/sets/default/images/italic.png",
	".markItUp .underline a": "markitup/sets/default/images/underline.png",
	".markItUp .stroke a": "markitup/sets/default/images/stroke.png",
	".markItUp .h1 a": "markitup/sets/default/images/heading1.png",
	".markItUp .h2 a": "markitup/sets/default/images/heading2.png",
	".markItUp .super a": "markitup/sets/default/images/superscript.png",
	".markItUp .sub a": "markitup/sets/default/images/subscript.png",
	".markItUp .blist a": "markitup/sets/default/images/list-bullet.png",
	".markItUp .nlist a": "markitup/sets/default/images/list-numeric.png",
	".markItUp .image a": "markitup/sets/default/images/picture.png",
	".markItUp .link a": "markitup/sets/default/images/link.png",
	".markItUp .code a": "markitup/sets/default/images/code-block.png",
	".markItUp .icode a": "markitup/sets/default/images/code-inline.png",
	".markItUp .clean a": "markitup/sets/default/images/clean.png",
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

var Editor = function($origin, $settings) {
	this.origin = $($origin);
	this.replacement = this.origin.clone();
	
	this.origin.attr({
		disabled: true,
		name: '_' + this.origin.attr('name'),
		class: 'ept-hidden'
	});
	this.replacement.attr('id', 'ept_' + this.replacement.attr('id'));
	this.replacement.insertBefore(this.origin);
	this.editor = this.replacement.markItUp($settings);

	for (var selector in images) {
		if (!images.hasOwnProperty(selector)) {
			continue;
		}
		$(selector).css('background-image', "url('" + chrome.extension.getURL(images[selector]) + "')");
	}
}

/* MarkItUp editor startup */
$(document).ready(function() {
	mySettings.previewTemplatePath = chrome.extension.getURL('markitup/templates/preview.html');
	
	mySettings.previewParser = function(data) { return data; };

	// clone textarea, fuck up with CKE
	$('.wiki-edit').each(function(i, o) {
		new Editor(o, mySettings);
	});

	// comment quote handler
	$('#history div.has-notes .contextual a:first-child').click(function(e) {
		e.preventDefault();

		setTimeout(function() {
			$('#ept_notes').val($('#notes').val().replace(/\n>/g, "\n&amp;"));
		}, 500)
	});

	// comment editing textarea
	$('#history div.has-notes .contextual a + a').click(function(e) {
		var $this = $(this);
		e.preventDefault();

		setTimeout(function() {
			new Editor($this.closest('.journal').find('textarea'), mySettings);
		}, 1000);
	});
});

/* New issue watchers */
$(document).ready(function() {
	var watchers = [];
	var $watcherContainer = $('#issue-form_issue_others_static_fields .issue-watcher-container');
	
	if ($watcherContainer.length == 0) {
		// to prevent inserting an empty <div> after #attributes
		return;
	}
	
	$watcherContainer.each(function(i, o) {
		watchers[$('input:checkbox', o).attr('id')] = $('.issue-watcher-name', o).text();
	});
	
	var container = $('<div id="ept_watchers"><h4>Spolupracovníci:</h4><div class="ept_container"></div></div>').insertAfter('#attributes').find('.ept_container');
	for (i in watchers) {
		container.append($('#' + i));
		container.append(watchers[i] + '<br>');
	}
});

/* Status: Hotovo - means 100 % of completion */
var doneRatioOriginalValue = 0;

$(document).ready(function() {
	const STATUS_HOTOVO = 6;
	var statusIdSelect = $('#issue_status_id');
	var doneRatioSelect = $('#issue_done_ratio');

	// if default value is already 100 %, shut this functionality down
	if (doneRatioSelect.val() == 100) {
		return;
	}
	
	doneRatioSelect.change(function() {
		var value = $(this).val();
		
		if (value == 100) {
			statusIdSelect.val(STATUS_HOTOVO);
			// visual enhance
			$(this).css('outline', '5px auto #F36');
		} else {
			doneRatioOriginalValue = value;
			$(this).css('outline', 'none');
		}
	}).change();
	
	statusIdSelect.change(function() {
		doneRatioSelect.val($(this).val() == STATUS_HOTOVO
			? 100 : doneRatioOriginalValue);
		doneRatioSelect.change();
	});
});
