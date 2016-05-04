$(function () {
	// Слайдер как это работает
	$(".how_it_work_slider").sliderPro({
		width: "100%",
		height: "340px",
		autoplay: false,
		buttons: false,
		thumbnailTouchSwipe: true,
		thumbnailWidth: "60",
		thumbnailHeight: "80"
	});
	var howItWork = new sliderControl(".how_it_work_slider", ".how_it_work_slider .slider-content a");
	howItWork.init();
	// Скролл в навигации
	$("nav a,.anchor").on("click", function (e) {
		e.preventDefault();
		$("body,html").animate({
			'scrollTop': $($(this).attr('href')).offset().top
		})
	});
	// Слайлер с фото
	$(".photo_slider").sliderPro({
		width: '465px',
		height: "349",
		autoplay: false,
		buttons: false,
		visibleSize: '100%',
		forceSize: 'fullWidth',
		slideDistance: 20
	});
	var photo_slider = new sliderControl(".photo_slider", ".photo_header > a");
	photo_slider.init();
	// Карта 2 гис
	var map;
	DG.then(function () {
		map = DG.map('map', {
			center: [53.76160035, 87.17385292],
			zoom: 12,
			fullscreenControl: true,
			scrollWheelZoom: false,
			zoomControl: true
		});
		DG.popup = {
			minWidth: 350
		};
		DG.marker([53.78065468, 87.28023738]).addTo(map).bindLabel("Зорге 9а");
		DG.marker([53.75745862, 87.0877178]).addTo(map).bindLabel("Рудокоповая 22б");
	});
	var validation = true;
	// Валидация формы
	$(".contact form").on("submit", function (e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).find("input,textarea").each(function () {
			var $this = $(this),
				val = $this.val();
			switch ($this.attr("name")) {
				case "name":
					if (val.length < 4) {
						validate($this);
					}
					break;
				case "email":
					if (!val.length || !val.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
						validate($this);
					}
					break;
				case "message":
					if (val.length < 20) {
						validate($this);
					}
					break;
			}
			if(!validation){
				return false;
			}
		});
		if(validation){
			$(this).addClass("hidden").next().removeClass("hidden");
		}
	});
	var validate = function ($this) {
		var form = $this.closest("form");
		$this.next().removeClass("hidden");
		form.find("input[type=submit]").prop("disabled", true);
		$this.on("focus", function () {
			$this.next().addClass("hidden");
			validation = true;
			if (!form.find(".error:visible").length) {
				form.find("input[type=submit]").prop("disabled", false);
			}
		});
		validation = false;
	};
	// fancybox

	$(".fancy").fancybox({
		padding: 0,
		maxWidth: 910,
		maxHeight: 500,
		arrows: false,
		afterShow: function () {
			$(".fancybox-title").append('<a href="#" data-slide_func="prev" class="arrow-rect-color"></a>' +
				'<a href="#" data-slide_func="next" class="arrow-rect-color"></a>');
		}
	});
	var fancySlider = new sliderControl(".fancy",".fancybox-title a","fancy");
	fancySlider.sliderFn = true;
	fancySlider.init();
	// modal window
	$("[data-modal]").on("click",function (e) {
		e.preventDefault();
		$($(this).data("modal")).addClass("open");
	});
	$(".modal").on("click",function (e) {
		if($(e.target).is(".fancybox-close") || $(e.target).is(".modal")){
			e.preventDefault();
			$(this).removeClass("open");
		}
	});
});

var sliderControl = function (slide, link) {
		this.slideContent = slide;
		this.link = link;

	},
	sliderControlObject = {
		sliderFn:"",
		init: function () {
			var $this = this;
			$(document).on("click",this.link, function (e) {
				e.preventDefault();
				if(!$this.sliderFn){
					$($this.slideContent).sliderPro($(this).data("slide_func"))
				}else{
					$.fancybox[$(this).data("slide_func")]()
				}

			})
		}
	};
sliderControl.prototype = sliderControlObject;