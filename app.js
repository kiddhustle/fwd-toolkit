
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

const onScroll = function (cardHeads, e) {
	cardHeads.forEach((el) => {
		// const header = el.querySelector('.scorecard__header')
		// console.log(`el.offsetTop: ${el.offsetTop}`)
		// console.log(`window.pageYOffset: ${window.pageYOffset}`)
		// if (t) {
		//   window.clearTimeout(t)
		// }
		// window
		if( el.offsetTop <= window.pageYOffset && (el.offsetTop + el.offsetHeight)  >= window.pageYOffset ) {
			el.classList.add('sticky')
		} else {
			el.classList.remove('sticky')
		}
	})
}
const main = function (e) {
  console.log('ready')
  const cardHeads = [].slice.call(document.querySelectorAll('.scorecard'))
  let t
  // addEventListeners
  window.addEventListener('scroll', debounce( onScroll.bind(window, cardHeads), 20 ))
}
document.addEventListener('DOMContentLoaded', main)
