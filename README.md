# lab4-arinehouse

## What I Did
I made a blog! It interacts with the redux store and pull in the changes from there, and it routes to different pages pretty gracefully. Looking forward to some secure backend so that Tyler Burnam and Jason don't try to hack me again.

## What Worked / What Didn't Work
On input validation, I thought to myself, "Hmm, there's no way to manipulate the styling without directly poking the DOM." Well that was my bad, and it was a big headache refactoring everything to do something as simple as just change a class to affect the color of the box shadow. Oh well, it works now, and it's all react-friendly, don't worry.

## Extra Credit Attempted
I went for the input validation, in two separate spots. In the new-post component, if you don't fill in every field, you'll get an error and the input fields will have their box shadows change color to red if you haven't filled it in. If you correct one but not all, only the unfilled ones will stay red.

In the edit-post area, if you accidentally create a title or content or whatever as just whitespace (which would normally cause the div to disappear and forever make you unable to edit it), a button pops up telling you to add back that component. This time, though, you can be done with the post editing, and leave the field blank. That button to fix the error will still be there when you get back!
