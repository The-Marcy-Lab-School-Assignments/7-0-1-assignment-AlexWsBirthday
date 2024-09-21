// import React from "react"
// import { useState, useEffect } from "react"

function GifContainer({ gifs }) {
    return (
        <div className="gif-container">
            <ul>
                {gifs.map((gif) => (
                    // unique id to separate gifs from one another
                    <li key={gif.id}>
                        {/* gif source to render the gif */}
                        <img src={gif.images.fixed_height.url} />
                    </li>
                ))}
            </ul>
        </div>
    )
}


//thank you chat i didn't know that JSX needed to be returned using () instead of {}. Leaving this here to take note of in my database later

/* CHATTY
Your `GifContainer` component has a small issue in how you're using the `map` function. The return statement inside the map callback is missing. In JavaScript, if you use curly braces `{}` in an arrow function, you need to explicitly return the JSX. Otherwise, it will not render anything.

Here’s the corrected version of your `GifContainer`:

```javascript
function GifContainer({ gifs }) {
    return (
        <div className="gif-container">
            <ul>
                {gifs.map((gif) => (
                    <li key={gif.id}>
                        <img src={gif.images.fixed_height.url} alt={gif.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GifContainer;
```

### Changes Made:
1. **Removed Curly Braces**: Changed the map callback to use parentheses `()` instead of curly braces `{}` so that it implicitly returns the JSX.
2. **Added `alt` Attribute**: It’s good practice to include an `alt` attribute in your `img` tag for accessibility.

With these changes, your `GifContainer` should correctly render the GIFs! Make sure to check again if you’re still having any issues.
 */



export default GifContainer
