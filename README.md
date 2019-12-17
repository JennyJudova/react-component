# React FIle Download Component

This component displays a list of files which can be downloaded.

---

## Getting started

Use the clone button to download the game source code. In the terminal enter the following commands:

To install all the packages listed in the package.json:

`$ npm i`

Run the app in your localhost:

`$ npm run serve`

Check the console for any issues and if there are check the package.json for any dependencies missing.

file.json - stores the data

---

## Built with

1. HTML5
2. SCSS
3. JavaScript
   1. ECMAScript6
   2. React.js
4. Github

Linter - AirBnb linter with Prettier

---

## Challange 1

Three requirements look at the Select All checkbox:
1 - The select-all checkbox should be in an unselected state if no items are selected.
2 - The select-all checkbox should be in a selected state if all items are selected.
3 - The select-all checkbox should be in an indeterminate state if some but not all.

The second and the third requirement were easy to meet, however, the first requirement proved to be tricky.
It was straightforward to change the checkbox to an indeterminate state by using getElementById

`document.getElementById('checkAll').indeterminate = true;`

After a few rounds of manual testing, I realised that if you tick a few checkboxes and then untick all of them the checkbox stays in an indeterminate position.

### Narrowing down the problem

1 - React can be asynchronous, although hooks allow controlling this a lot better than setting state. I started by refactoring the code and moving the 'if' statement into the correctTickCheck function. I also console logged to check if the 'if' statement was met (it was).

This first step informed me that the 'if' statement is working correctly and that the problem is with going from `indeterminate = true` to `checked = false`.

2 - Following from the first step I focused on the line:

`document.getElementById('checkAll').checked = false;`

As other checkboxes in the component were controlled through hooks, Check All was also refactored to be controlled via a hook.

`const [allCheck, setAllCheck] = useState(false);`

To check that the hook works I replaced

`document.getElementById('checkAll').indeterminate = true;`

with

`document.getElementById('checkAll').checked = true;`

The function worked as expected which lead me to believe that the problem lies with 'indeterminate'. It seemed that 'indeterminate' introduced a third state into the boolean 'checked'

3 - The third attempt focused on how 'indeterminate' works.

I started by checking what happends if 'true' is changed to 'false'

From

`document.getElementById('checkAll').indeterminate = true;`

To

`document.getElementById('checkAll').indeterminate = false;`

False created a checkbox in a selected state.

Esentially `document.getElementById('checkAll').indeterminate = false;` is equal to `document.getElementById('checkAll').checked = true;`

on learning this the first if statement in correctTickCheck was changed to :

```
    if (selectedUpdated === 0) {
      document.getElementById('checkAll').indeterminate = false;
      const allCheckUpdate = false;
      setAllCheck(allCheckUpdate);
    }
```

And the function works as expected in its current form.

---

## User Experience Challange

One of the requirements for this component is

- 'Only the files that have a status of "available" are currently able to be downloaded.'

There were a few ways of achieving this:

Option 1 - Not allowing users to tick checkboxes that have a 'Scheduled' status.

Option 2 - Allowing users to tick the checkboxes that have a 'Scheduled' status then giving them a warning message and unchecking the boxes.

Option 3 - Allowing the users to tick the checkboxes, and only after they clicked the Download Selected button would they be told which files can and can't be downloaded.

The challenge here was not technical but based around what experience I want the user to have. As there was no time for in-depth user research I looked back on my experience of using products that should work similarly.

Option 1 - Was out of the running, because I as a user get annoyed when a website does not allow me to click on something that looks like it should be clicked.

Option 2 - This was originally my first choice, however, on further examination I thought that a user clicking on checkboxes does not imply an intent to download the files.
Also if someone accidentally clicked they would receive an alert pop up which can get annoying. This lead me to think that I should minimise the number of times a user gets alert pop-ups.

Option 3 - After discarding Option 2 Option 3 was a clear choice, as it allowed users to click away on the checkboxes without receiving pop-up alerts.
The pop-up is triggered only by pressing the 'Download Selected' button. Once the button is pressed it tells the user which devices will be downloaded. As well as which devices will not be downloaded and why.

---

## Further steps

- Adding tests for the component.

I look forward to all feedback to make this component better.
