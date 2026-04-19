/**
 * ===================================================================
 * HTML Includes (轻量 HTML 片段注入)
 *
 * 用法：
 *   在页面里放 <div data-include="inc/footer.html"></div>，
 *   本脚本会用 fetch 把对应 HTML 文件注入到该位置。
 *
 * 目的：
 *   消除 index/publications/experience/blog/blog-post 里重复的页脚，
 *   以后只需要改 inc/footer.html 一处。
 *
 * 注意：
 *   - 需通过 HTTP 打开（本地直接双击 file:// 会因浏览器安全策略失败）
 *   - 失败会在控制台报错，但不会影响其它页面内容
 * ===================================================================
 */
(function() {
	"use strict";

	var nodes = document.querySelectorAll('[data-include]');
	if (!nodes.length) return;

	nodes.forEach(function(node) {
		var src = node.getAttribute('data-include');
		if (!src) return;

		fetch(src, { cache: 'no-cache' })
			.then(function(res) {
				if (!res.ok) throw new Error('HTTP ' + res.status + ' - ' + src);
				return res.text();
			})
			.then(function(html) {
				// 用一个临时节点解析，支持多个根元素
				var wrapper = document.createElement('div');
				wrapper.innerHTML = html;

				// 用实际内容替换占位符
				var parent = node.parentNode;
				while (wrapper.firstChild) {
					parent.insertBefore(wrapper.firstChild, node);
				}
				parent.removeChild(node);
			})
			.catch(function(err) {
				console.error('[includes] 加载失败:', err);
			});
	});
})();
