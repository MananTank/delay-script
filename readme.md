# delay-script ⚡

Delay Loading of Non Critical Scripts

## Features

- Downloads all delayed scripts in parallel
- Execute scripts in order they appear in html
- Supports delaying Inline scripts as well
- tiny 495 bytes

## Setup

- Include delay-script.min.js code in your page
- Set `type="text/delay"` on the scripts you wish to delay
- Call `loadDelayScripts` to load all the delay scripts

### Example

View [Example HTML](/example/index.html)

```html
<script type="text/delay" src="foo.js"></script>
<script type="text/delay" src="bar.js"></script>
...
```

```javascript
// load delay-scripts after load event is fired
window.addEventListener("load", () => {
  loadDelayScripts(() => {
    console.log("done");
  });
});
```

<br/>

### API

```javascript
// loads the delay scripts
loadDelayScripts();

// loads the delay scripts and calls fn when all are delay scripts are loaded and executed
loadDelayScripts(fn);
```
