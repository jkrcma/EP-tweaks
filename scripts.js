var markdownParser = function(data) {
	var markDown = Markdown.getSanitizingConverter();
	return markDown.makeHtml(data);
};

var Editor = function($origin, $settings) {
	this.origin = $($origin);
	var editorArea = this.editorArea = this.origin.clone();
	var htmlArea = this.htmlArea = this.origin.clone();

	this.origin.attr({
		disabled: true,
		name: '_' + this.origin.attr('name'),
		'class': 'ept-hidden'
	});

	this.editorArea.attr({
		id: 'ept_' + this.editorArea.attr('id'),
		name: 'editor_' + this.origin.attr('name')
	});
	this.editorArea.insertBefore(this.origin);

	this.htmlArea.attr({
		readonly: true,
		id: 'ept_html_' + this.htmlArea.attr('id')
	});
	this.htmlArea.removeClass('wiki-edit');
	this.htmlArea.css({ display: 'none' });
	this.htmlArea.insertBefore(this.origin);

	this.editorArea.change(function() {
		var pureHtml = markdownParser(editorArea.val());
		// add some styles because EP has some stupid CSS reset
		pureHtml = pureHtml.replace(/<(pre|code)>/ig, '<$1 style="font-family: monospace;">');

		htmlArea.val(pureHtml);
	});

	this.editor = this.editorArea.markItUp($settings);
};

/* MarkItUp editor startup */
$(document).ready(function() {
	mySettings.previewTemplatePath = chrome.extension.getURL('markitup/templates/preview.html');

	mySettings.previewParser = markdownParser;

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
