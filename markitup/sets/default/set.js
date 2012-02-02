// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2011 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
// Html tags
// http://en.wikipedia.org/wiki/html
// ----------------------------------------------------------------------------
// Basic set. Feel free to add more tags
// ----------------------------------------------------------------------------
var mySettings = {
	nameSpace: 'html',
	previewInWindow: false,
	onShiftEnter: { keepDefault: false, replaceWith:'<br />\n' },
	onCtrlEnter: { keepDefault: false, openWith: '\n<p>', closeWith:'</p>' },
	onTab: { keepDefault: false, replaceWith: '    ' },
	markupSet: [
		{
			name: 'Tučné',
			className: 'bold',
			key: 'B',
			openWith: '(!(<strong>|!|<b>)!)',
			closeWith:'(!(</strong>|!|</b>)!)'
		},
		{
			name: 'Kurzíva',
			className: 'italic',
			key: 'I',
			openWith: '(!(<em>|!|<i>)!)',
			closeWith: '(!(</em>|!|</i>)!)'
		},
		{
			name: 'Podtržené',
			className: 'underline',
			key: 'U',
			openWith: '(!(<del>|!|<u>)!)',
			closeWith: '(!(</del>|!|</u>)!)'
		},
		{
			name: 'Přeškrtnuté',
			className: 'stroke',
			key: 'S',
			openWith: '<del>',
			closeWith: '</del>'
		},
		{
			separator: '---------------'
		},
		{
			name: 'Nadpis první úrovně',
			className: 'h1',
			openWith: '<h2>',
			closeWith: '</h2>'
		},
		{
			name: 'Nadpis druhé úrovně',
			className: 'h2',
			openWith: '<h3>',
			closeWith: '</h3>'
		},
		{
			name: 'Horní index',
			className: 'super',
			openWith: '<sup>',
			closeWith: '</sup>'
		},
		{
			name: 'Dolní index',
			className: 'sub',
			openWith: '<sub>',
			closeWith: '</sub>'
		},
		{
			separator: '---------------'
		},
		{
			name: 'Nečíslovaný seznam',
			className: 'blist',
			openWith: '    <li>',
			closeWith: '</li>',
			multiline: true,
			openBlockWith: '<ul>\n',
			closeBlockWith: '\n</ul>'
		},
		{
			name: 'Číslovaný seznam',
			className: 'nlist',
			openWith: '    <li>',
			closeWith: '</li>',
			multiline: true,
			openBlockWith: '<ol>\n',
			closeBlockWith: '\n</ol>'
		},
		{
			separator: '---------------'
		},
		{
			name: 'Obrázek',
			className: 'image',
			key: 'P',
			replaceWith: '<img src="[![Source:!:http://]!]" alt="[![Alternative text]!]" />'
		},
		{
			name: 'Odkaz',
			className: 'link',
			key: 'L',
			openWith: '<a href="[![Link:!:http://]!]"(!( title="[![Title]!]")!)>', closeWith: '</a>',
			placeHolder: 'Text odkazu'
		},
		{
			separator: '---------------'
		},
		{
			name: 'Kód',
			className: 'code',
			multiline: true,
			openBlockWith: '<pre style="font-family: monospace">',
			closeBlockWith: '</pre>'
		},
		{
			name: 'Inline kód',
			className: 'icode',
			openWith: '<code style="font-family: monospace">',
			closeWith: '</code>'
		},
		{
			separator: '---------------'
		},
		{
			name: 'Vyčistit',
			className: 'clean',
			replaceWith: function(markitup) {
				return markitup.selection.replace(/<(.*?)>/g, "")
			}
		},
		{
			name: 'Náhled',
			className: 'preview',
			call: 'preview'
		}
	]
}
