var searchIsOpen = false;

const algoliaOptions = {
  appId: '6FC0XE3A6K',
  apiKey: 'f191d9d5409527a895b6e87550c2cb58',
  indexName: 'benmerde.com',
  hitsPerPage: 10,
  urlSync: false
};

console.log('yee');

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

const showOnLoad = false;

if(!showOnLoad){
  algoliaOptions.searchFunction = function(helper) {
    var searchResults = $('.bm-Search__results');
    if (helper.state.query === '') {
      searchResults.hide();
      return;
    }
    helper.search();
    searchResults.show();
  }
} else {
    $('.bm-Search').show();
}
const search = instantsearch(algoliaOptions);

// initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Vous cherchez quelque chose ?',
    //poweredBy: true,
    reset: false,
    cssClasses: {
      root: 'bm-Search__box__container',
      input: 'bm-Search__box__input',
    }
  })
);

var hitTemplate =
  '<a href="{{ relpermalink }}" class="bm-List__item bm-List__item--{{{_highlightResult.type.value}}} ">' +
        '<div class="bm-List__title">{{{_highlightResult.title.value}}}</div>' +
        '<div class="bm-List__meta">{{{_highlightResult.area.value}}}<span> | {{ humanDate }}</span></div>' +
  '</a>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    cssClasses: {
      root:'bm-Search__hits',
      empty:'bm-Search__hits--empty'
    },
    templates: {
      empty: 'On a rien trouvé là, rien.',
      item: hitTemplate
    }
  })
);

var hidePaginationWhenNoResults = {
  render: function(data) {
    if (data.results.nbPages < 2) {
      document.querySelector('#pagination').classList.add('hide');
    } else {
      document.querySelector('#pagination').classList.remove('hide');
    }
  }
}

search.addWidget(hidePaginationWhenNoResults)
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root:'bm-Search__pagination__list',
      item:'bm-Pagination__item',
      active: 'bm-Pagination__item--active',
      disabled:'bm-Pagination__item--disabled',
      link:'bm-Pagination__item__link'
    },
    labels: {
      previous: '< Précédent',
      next: 'Suivant >'
    },
    showFirstLast: false
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#areas',
    attributeName: 'area',
    operator: 'or',
    limit: 10,
    autoHideContainer: true,
    sortBy: ['name:asc'],
    cssClasses:{
      root:'bm-Refinement',
      list:'bm-Refinement__list',
      item:'bm-Refinement__item',
      active:'bm-Refinement__item--active',
      count:'bm-Refinement__meta'
    },
    templates: {
      //header: 'Brands',
      //item: '<label><input type="checkbox" /><span>{{value}}</span><span class="bm-Refinement__meta">{{count}}</span></label>'
    }
  })
);

search.start();