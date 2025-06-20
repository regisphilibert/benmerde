

document.addEventListener('DOMContentLoaded', (event) => {
    let bmSearch = new PagefindUI({
      element: "#search-box",
      autofocus: true,
      showImages: true,
      showEmptyFilters: false,
      translations: {
        placeholder: "Vous cherchez quelque chose?",
      },
      openFilters: window.innerWidth > 768 ? ['Pays', 'Quoi'] : undefined,
      processResult: function (result) {
        //console.log(result)
      }
    });
    var searchIsOpen = false;
    $('.header-search').click(function(){
      $('.bm-Search').addClass('animating').slideToggle(200, function(){
        $(this).removeClass('animating')
        $('.header-search').toggleClass('is-active')
        if(searchIsOpen){
          searchIsOpen = false;
        } else {
          searchIsOpen = true
        }
        console.log({searchIsOpen})
      })
    })
});
