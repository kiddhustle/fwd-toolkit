const CSS_CARD_MQ = '.scorecard2'
const debounce = function (func, wait, immediate) {
	let timeout;
	return function() {
		const context = this
    const args = arguments
		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const onScroll = function (cards, e) {
	cards.forEach((el) => {
		// const header = el.querySelector('.scorecard__header')
		// console.log(`el.offsetTop: ${el.offsetTop}`)
		// console.log(`window.pageYOffset: ${window.pageYOffset}`)
		const mqStr = el.getAttribute('data-sticky-mq')
		const colNum = el.getAttribute('data-columns')
		// const colWidth = ((1 / colNum) * 100) + '%'
		const colWidth = ((1 / colNum) * el.offsetWidth) + 'px'

		if (!mqStr) {
			return
		}

		const mq = window.matchMedia(mqStr)
		const aHeaderCells = [].slice.call(el.querySelectorAll('.scorecard2__headercell'))

		if( mq.matches && el.offsetTop <= window.pageYOffset && (el.offsetTop + el.offsetHeight)  >= window.pageYOffset ) {
			el.classList.add('sticky')
			aHeaderCells.forEach((cell) => cell.style.width = colWidth)
		} else {
			el.classList.remove('sticky')
			aHeaderCells.forEach((cell) => cell.style.width = 'auto')
		}
	})
}
const main = function (e) {
  console.log('ready')
  const cards = [].slice.call(document.querySelectorAll(CSS_CARD_MQ))
  // addEventListeners
  window.addEventListener('scroll', debounce( onScroll.bind(window, cards), 20 ))
}
document.addEventListener('DOMContentLoaded', main)
