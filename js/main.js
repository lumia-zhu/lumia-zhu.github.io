/**
 * ===================================================================
 * Academic Personal Page - Main JavaScript
 * Based on Kards template by Styleshout
 * ===================================================================
 */

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Page Ready (页面加载完成)
	------------------------------------------------------ */


	/*----------------------------------------------------- */
	/* Navigation Menu (移动端菜单切换)
	------------------------------------------------------- */
	var toggleButton = $('.menu-toggle'),
		nav = $('.main-navigation');

	// 点击汉堡菜单按钮
	toggleButton.on('click', function(e) {
		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		toggleButton.attr('aria-expanded', toggleButton.hasClass('is-clicked'));
		nav.stop(true, true).slideToggle();
	});

	// 点击导航链接后关闭菜单（移动端）
	nav.find('li a').on("click", function() {
		// 仅在移动端（菜单按钮可见时）关闭菜单
		if (toggleButton.is(':visible')) {
			toggleButton.removeClass('is-clicked').attr('aria-expanded', 'false');
			nav.stop(true, true).hide();
		}
	});


	/* Highlight the homepage section without changing other pages' navigation. */
	var experience = document.querySelector('#experience.home-experience');
	if (experience) {
		var homeLink = nav.find('a[href="#top"]');
		var experienceLink = nav.find('a[href="#experience"]');
		var framePending = false;

		function updateSectionNavigation() {
			framePending = false;
			var bounds = experience.getBoundingClientRect();
			var offset = parseFloat(window.getComputedStyle(experience).scrollMarginTop) || 100;
			// Match viewport coordinates when the page uses CSS zoom.
			offset *= bounds.height / experience.offsetHeight;
			var inExperience = bounds.top <= offset + 4 && bounds.bottom > offset;
			homeLink.parent().toggleClass('current', !inExperience);
			experienceLink.parent().toggleClass('current', inExperience);
			homeLink.add(experienceLink).removeAttr('aria-current');
			(inExperience ? experienceLink : homeLink).attr('aria-current', 'location');
		}

		function scheduleSectionNavigation() {
			if (!framePending) {
				framePending = true;
				window.requestAnimationFrame(updateSectionNavigation);
			}
		}

		window.addEventListener('scroll', scheduleSectionNavigation, { passive: true });
		window.addEventListener('resize', scheduleSectionNavigation);
		window.addEventListener('hashchange', scheduleSectionNavigation);
		window.addEventListener('pageshow', scheduleSectionNavigation);
		window.addEventListener('load', function() {
			// Align deep links after images have settled, keeping the fixed header clear.
			if (window.location.hash === '#experience') {
				experience.scrollIntoView({ behavior: 'instant', block: 'start' });
			}
			updateSectionNavigation();
		});
		updateSectionNavigation();
	}


	/*----------------------------------------------------- */
	/* Back to top (回到顶部按钮)
	------------------------------------------------------- */
	var pxShow = 300;
	var fadeInTime = 400;
	var fadeOutTime = 400;
	var scrollSpeed = 300;

	jQuery(window).scroll(function() {
		if (jQuery(window).scrollTop() >= pxShow) {
			jQuery("#go-top").fadeIn(fadeInTime);
		} else {
			jQuery("#go-top").fadeOut(fadeOutTime);
		}
	});

	/* 平滑滚动到顶部 */
	$('#go-top a').on('click', function(e) {
		e.preventDefault();
		$('html, body').stop().animate({
			'scrollTop': 0
		}, 800, 'swing');
	});


	/*----------------------------------------------------- */
	/* Publication Image Lightbox（论文图片点击放大）
	------------------------------------------------------- */
	var $lightbox    = $('#lightbox');
	var $lightboxImg = $('#lightbox-img');

	// 点击任意 .pub-thumb 或 .sel-pub-thumb 内的图片 → 打开弹窗
	$(document).on('click', '.pub-thumb img, .sel-pub-thumb .figure-preview', function() {
		var $image = $(this).is('img') ? $(this) : $(this).find('img');
		var src = $image.attr('src');
		var alt = $image.attr('alt');
		$lightboxImg.attr('src', src).attr('alt', alt);
		$lightbox.addClass('is-open');
		$('body').css('overflow', 'hidden'); // 禁止背景滚动
	});

	// 点击遮罩层或关闭按钮 → 关闭弹窗
	$('#lightbox-close, #lightbox').on('click', function(e) {
		// 点关闭按钮，或点击遮罩（不是图片本身）时关闭
		if (e.target === this || $(e.target).is('#lightbox-close')) {
			$lightbox.removeClass('is-open');
			$('body').css('overflow', '');
			// 动画结束后清空 src，避免闪烁
			setTimeout(function() {
				if (!$lightbox.hasClass('is-open')) {
					$lightboxImg.attr('src', '');
				}
			}, 300);
		}
	});

	// 按 ESC 键关闭弹窗
	$(document).on('keydown', function(e) {
		if (e.key === 'Escape' && $lightbox.hasClass('is-open')) {
			$lightbox.removeClass('is-open');
			$('body').css('overflow', '');
		}
	});


	/*----------------------------------------------------- */
	/* Smooth Scrolling (页面内平滑滚动)
	------------------------------------------------------- */
	$('.smoothscroll').on('click', function(e) {
		e.preventDefault();

		var target = this.hash,
			$target = $(target);

		if ($target.length) {
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 800, 'swing', function() {
				window.location.hash = target;
			});
		}
	});

})(jQuery);
