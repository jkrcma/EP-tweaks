// -------------------------------------------------------------------
// markItUp!
// -------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// -------------------------------------------------------------------
// MarkDown tags example
// http://en.wikipedia.org/wiki/Markdown
// http://daringfireball.net/projects/markdown/
// -------------------------------------------------------------------
// Feel free to add more tags
// -------------------------------------------------------------------
mySettings = {
	previewParserPath:	'',
	onShiftEnter: {keepDefault:false, openWith:'\n\n'},
	markupSet: [
		{name:'Tučné', className:'bold', key:'B', openWith:'**', closeWith:'**'},
		{name:'Kurzíva', className:'italic', key:'I', openWith:'_', closeWith:'_'},
//		{name:'Podtržené', className:'underline', key:'U', openWith:'<u>', closeWith:'</u>'},
		{name:'Přeškrtnuté', className:'stroke', key:'S', openWith:'<del>', closeWith:'</del>'},
		{separator:'---------------' },
		{name:'Heading 1', className:'h1', key:'1', openWith:'#### ', placeHolder:'Nadpis...' },
		{name:'Heading 2', className:'h2', key:'2', openWith:'##### ', placeHolder:'Nadpis...' },
		{name:'Heading 3', className:'h3', key:'3', openWith:'###### ', placeHolder:'Nadpis...' },
		{separator:'---------------' },
		{name:'Horní index', className:'super', openWith:'<sup>', closeWith:'</sup>'},
		{name:'Dolní index', className:'sub', openWith:'<sub>', closeWith:'</sub>'},
		{separator:'---------------' },
		{name:'Nečíslovaný seznam', className:'blist', openWith:'- '},
		{name:'Číslovaný seznam', className:'nlist', openWith:function(markItUp) { return markItUp.line+'. '; }},
		{separator:'---------------' },
		{name:'Obrázek', className:'image', key:'P', replaceWith:'![[![Alternative text]!]]([![Url:!:http://]!] "[![Title]!]")'},
		{name:'Odkaz', className:'link', key:'L', openWith:'[', closeWith:']([![Url:!:http://]!] "[![Title]!]")', placeHolder:'Text odkazu...' },
		{separator:'---------------'},
		{name:'Quotes', className:'quote', openWith:'> '},
		{name:'Kód', className:'code', openWith:'    ', closeWith:''},
		{name:'Inline kód', className:'icode', openWith:'`', closeWith:'`'},
		{separator:'---------------'},
		{name:'Preview', className:'preview', call:'preview'}
	]
}

// mIu nameSpace to avoid conflict.
miu = {
	markdownTitle: function(markItUp, char) {
		heading = '';
		n = $.trim(markItUp.selection||markItUp.placeHolder).length;
		for(i = 0; i < n; i++) {
			heading += char;
		}
		return '\n'+heading;
	}
}