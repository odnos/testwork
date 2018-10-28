
var levO = $(".levels--1").outerHeight();
var levT = $(".levels--3").outerHeight();
var levSum = levO + levT
$(".knowledge__leftside").outerHeight(levSum);
$(".knowledge__rightside").outerHeight(levO);

$(window).resize(function() {
  var levO = $(".levels--1").outerHeight();
  var levT = $(".levels--3").outerHeight();
  var levSum = levO + levT
$(".knowledge__leftside").outerHeight(levSum);
$(".knowledge__rightside").outerHeight(levO);
});
$('[data-fancybox]').fancybox({
  // Options will go here
    smallBtn: false,
    lang: "ru",
    i18n: {
      ru: {
        CLOSE: "Закрыть",
      }
    }
});



// $('.form__la--m1 input[type="checkbox"]:checked+.form__sp--m1:after ').click(function(e){
//     e.stopImmediatePropagation();
// });


