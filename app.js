const CSS_TBL_MQ = '.fwdtable'
const CSS_TBL_MQ_HEADER = '.fwdtable__header'
const CSS_TBL_MQ_HEADERCELL = '.fwdtable__headercell'
const DEBOUNCE_DELAY = 20
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
		const isSticky = parseInt((el.getAttribute('data-sticky')))
		const colNum = el.getAttribute('data-columns')
		// const colWidth = ((1 / colNum) * 100) + '%'
		const colWidth = ((1 / colNum) * el.offsetWidth)
		// const colWidth = el.querySelector('tbody td').offsetWidth

		const tHead = el.querySelector(CSS_TBL_MQ_HEADER)
		// console.log(`tHead: ${tHead}`)
		// console.log(tHead)

		if (!mqStr) {
			return
		}

		const mq = window.matchMedia(mqStr)
		const aHeaderCells = [].slice.call(el.querySelectorAll(CSS_TBL_MQ_HEADERCELL))

		if( mq.matches && el.offsetTop <= window.pageYOffset && (el.offsetTop + el.offsetHeight)  >= window.pageYOffset ) {
			// no need to re-apply styles
			if (isSticky) {
				return
			}
			// el.classList.add('sticky')
			el.setAttribute('data-sticky', 1)
			tHead.style.width = (colNum * colWidth) + 'px'
			aHeaderCells.forEach((cell) => cell.style.width = colWidth + 'px')
		} else {
			// no need to re-apply styles
			if (!isSticky) {
				return
			}
			// el.classList.remove('sticky')
			el.setAttribute('data-sticky', 0)
			tHead.style.width = 'auto'
			aHeaderCells.forEach((cell) => cell.style.width = 'auto')
		}
	})
}
const main = function (e) {
  console.log('ready')
  const cards = [].slice.call(document.querySelectorAll(CSS_TBL_MQ))
  // addEventListeners
  // window.addEventListener('scroll', debounce( onScroll.bind(window, cards), DEBOUNCE_DELAY ))
	window.addEventListener('scroll', onScroll.bind(window, cards))
}
document.addEventListener('DOMContentLoaded', main)
