

$('.header-search').click(function(){
  $('.bm-Search').addClass('animating').slideToggle(200, function(){
    $(this).removeClass('animating')
    $('.header-search').toggleClass('is-active')
    if(searchIsOpen){
      search.helper.setQuery('').search();
      $('.bm-Search__box__input').val('')
      searchIsOpen = false;
    } else {
      searchIsOpen = true
    }
  })
})
