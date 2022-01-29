/**
 * load delay scripts
 * @param {() => any | undefined} done
 */
function loadDelayScripts(done) {
	const delayScripts = /** @type {NodeListOf<HTMLScriptElement>}*/ (
		document.querySelectorAll('script[type="text/delay"]')
	);

	/**
	 * replace delayScript with actual script
	 * @param {HTMLScriptElement} delayScript
	 * @param {boolean} hasSrc
	 * @param {boolean} isLast
	 * @returns
	 */
	function replaceScript(delayScript, hasSrc, isLast) {
		delayScript.removeAttribute('type');

		/**
		 * New script needs to be created because FireFox
		 * does not allow executing existing delay script tag
		 * just by removing the type attribute and appending to body
		 */
		const script = document.createElement('script');

		if (hasSrc) {
			script.src = delayScript.src;
		} else {
			script.textContent = delayScript.textContent;
		}

		// copy all attributes from delayed script to newly created script tag
		for (const attribute of delayScript.attributes) {
			script.setAttribute(attribute.name, attribute.value);
		}

		// must not load asynchronously, load them now!
		script.async = false;

		// replace the script with newly created script
		delayScript.replaceWith(script);

		if (isLast && done) {
			if (hasSrc) {
				script.addEventListener('load', done);
			} else {
				done();
			}
		}

		return script;
	}

	let prevSrcScript;

	delayScripts.forEach((delayScript, i) => {
		const hasSrc = delayScript.hasAttribute('src');
		const isLast = i === delayScripts.length - 1;

		if (hasSrc) {
			prevSrcScript = replaceScript(delayScript, hasSrc, isLast);
		} else if (prevSrcScript) {
			// execute the inline delay-script after the delay-script before it has loaded and executed
			prevSrcScript.addEventListener('load', () => replaceScript(delayScript, hasSrc, isLast));
		} else {
			// if no script with src before it
			// load it right now
			replaceScript(delayScript, hasSrc, isLast);
		}
	});
}
