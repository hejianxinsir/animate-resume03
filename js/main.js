
var markDown =`
# 介绍
- 作品
- 联系方式
- 经历

# 介绍
- 作品
- 联系方式
- 经历

# 介绍
- 作品
- 联系方式
- 经历

# 介绍
- 作品
- 联系方式
- 经历

# 介绍
- 作品
- 联系方式
- 经历

# 介绍
- 作品
- 联系方式
- 经历

# 介绍
- 作品
- 联系方式
- 经历

# 介绍
- 作品
- 联系方式
- 经历

# 介绍
- 作品
- 联系方式
- 经历
`

var css1 =`
/*各位好，我就开门见山，直接用代码来介绍了
  凑字数念首诗吧：

  唧唧复唧唧
  木兰当户织
  不闻机杼声
  惟闻女叹息

  问女何所思
  问女何所忆
  女亦无所思
  女亦无所忆
*/

/* 首先消除默认样式 */

*{ margin: 0; padding: 0;}
*{ box-sizing: border-box;}

/* 接着做个卡片放左边 */

#leftCode{
	width: 49%;
	height: 95vh;
	background: rgba(0,0,0,0.1);

	position: fixed;
	left: 0;
	margin: 7px 0 0 9px;
	overflow: hidden;
}

/* 把代码放中间呗 */
#leftCode{ text-align:center;}

/* 然后我念个咒语把代码高亮 
*/

.token.selector{ color: #690;}
.token.property{ color: #905;}
.token.function{ color: #DD4A68;}

/* 添加呼吸效果 */
#leftCode{
	animation: breath 2.8s infinite alternate-reverse;
}

/* 现在往右边添加卡片 */

#markdownPaper{
	color: white;
	width: 49%;
	height: 95vh;

	position: fixed;
	right: 7px;
	margin: 7px 4px 0 0;
	padding-left: 35px;

	overflow: auto;
	background: pink;
	
	//background: no-repeat url('https://w.wallhaven.cc/full/nk/wallhaven-nk91o7.jpg');
}
.content{
	font-size: 14px;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
`

var css2 =`/* 现在用 marked.js 库把 markdown 转成 HTML  */`

var css3 =`以上，感谢观看。`



writeLeftCode('',css1,()=>{
	createPaper(()=>{
		writeMarkDown(markDown, ()=>{
			console.log('1')
			writeLeftCode(css1,css2,()=>{
				console.log('2')
				convertMarkdownToHTML(()=>{
					console.log('3')
					writeLeftCode(css1 + css2,css3,()=>{
						alert('Completed')
					})
				})
			})
		})
	})
})


function writeLeftCode(prefix, css, fn){
	var domCode = document.querySelector('#leftCode')
	var styleCode = document.querySelector('#styleCode')
	var n = 0
	var id = setInterval( ()=>{
	  n += 1
	  domCode.innerHTML =  Prism.highlight(prefix + css.slice(0,n), Prism.languages.css, 'css')
	  styleCode.innerHTML = prefix + css.slice(0,n)
	  domCode.scrollTop = domCode.scrollHeight
	  if(n >= css.length){
	  	window.clearInterval(id)
	  	fn.call()
	  }
	},20)
}

function createPaper(fn){
	var paper = document.createElement('div')
	paper.id = 'markdownPaper'
	var content = document.createElement('pre')
	content.className = 'content'
	paper.appendChild(content)
	document.body.appendChild(paper)
	fn.call()
}

function writeMarkDown(md, fn){
	var domContent = document.querySelector('#markdownPaper > .content')
	var n = 0
	var id = setInterval(()=>{
		n += 1
		domContent.innerHTML = markDown.slice(0,n)
		domContent.scrollTop = domContent.scrollHeight
		if(n >= md.length){
			window.clearInterval(id)
			fn.call()
		}
	},20)
}

function convertMarkdownToHTML(fn){
	var domContent = document.querySelector('#markdownPaper > .content')
	var div = document.querySelector('div')
	div.className = 'html markdownBody'
	div.innerHTML = marked(markDown)
	domContent.replaceWith(div)
	fn.call()
}










