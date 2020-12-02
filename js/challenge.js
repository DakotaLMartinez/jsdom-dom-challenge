/*
* A Counter that increases by 1 each second
* Plus and Minus buttons that increment or decrement the counter
* A 'like' button (❤️) that adds a 'like' for the number that is currently displayed by the timer
* A comment box that adds comments when submitted

1. As a user, I should see the timer increment every second once the page has loaded.
2. As a user, I can manually increment and decrement the counter using the plus and minus buttons.
3. As a user, I can 'like' an individual number of the counter. I should see count of the number of 'likes' associated with that number.
4. As a user, I can pause the counter, which should 

  * pause the counter
  * disable all buttons except the pause button
  * the pause button should then show the text "resume."

  When 'resume' is clicked, it should restart the counter and re-enable the buttons.
5. As a user, I can leave comments on my gameplay, such as: "Wow, what a fun game this is."
*/

/*
## Data
counter (integer) 
likesCounter (object with keys of numbers and values of how many likes they have) {1: 2, 2: 0, 3: 3}
comments (array of strings)
## Display (what pieces of html will house our data?)
h1#counter => counter
ul.likes => likesCounter
<li>1: 1</li>
div#list => comments
## Behavior (Events)
DOMContentLoaded => attach Listeners, start counter
click on plus
click on minus
click on heart
click on pause
click on resume
submit comment form 

## Update Data
incrementCounter()
decrementCounter()
increaseLikes() // needs number when we click on like
pause()
resume()
addComment()
## Display New Data by DOM Manipulation
when we click on plus we call incrementCounter() and update the counter h1 innerText
when we click on minus we call decrementCounter() and update the counter h1 innerText
when we click on heart we call increaseLikes(number) and update our list of likes (ul.likes)
when we click on pause we call pause(), disable all of the buttons (except pause) and relabel the button as resume
when we click on resume we call resume(), reenable all of the buttons and relabel the button pause
when we submit the add comment form, we call addComment() and append the comment to div#list
*/

class Counter {
  constructor() {
    this.count = 0;
    this.likesCount = {};
    this.counterH1 = document.querySelector('h1#counter')
    this.likesList = document.querySelector('ul.likes')
    this.minusButton = document.querySelector('#minus')
    this.plusButton = document.querySelector('#plus')
    this.heartButton = document.querySelector('#heart')
    this.pauseButton = document.querySelector('#pause')
    this.interval = setInterval(() => this.incrementCounter(), 1000);
  }

  incrementCounter() {
    this.counterH1.innerHTML = this.count += 1; 
  }

  decrementCounter() {
    this.counterH1.innerHTML = this.count -= 1; 
  }

  increaseLikes() {
    // we need this method to also create/update an li tag displaying the number of likes that this.count has. 
    if(this.likesCount[this.count]) {
      // if we've already liked this number, then add a like to the stored number of likes. Find the li displaying that number and update it
      let newLikeCount = this.likesCount[this.count] += 1
      this.likesList.querySelector(`#num${this.count}`).innerText = `Number ${this.count} has ${newLikeCount} likes`
      return newLikeCount;

    } else {
      // if we haven't liked this number yet, then say we've liked it 1 time. Add an li to ul.likes containing the number and the like count.
      this.likesCount[this.count] = 1
      let newLike = document.createElement('li');
      newLike.id = `num${this.count}`;
      newLike.innerText = `Number ${this.count} has 1 like`;
      this.likesList.appendChild(newLike);
      return 1;
    }
  } 

  pause() {
    clearInterval(this.interval);
    this.minusButton.disabled = true;
    this.plusButton.disabled = true;
    this.heartButton.disabled = true;
    this.pauseButton.innerText = 'resume';
    this.pauseButton.id = 'resume';
  }

  resume() {
    this.interval = setInterval(() => this.incrementCounter(), 1000);
    this.minusButton.disabled = false;
    this.plusButton.disabled = false;
    this.heartButton.disabled = false;
    this.pauseButton.innerText = 'pause';
    this.pauseButton.id = 'pause';
  }
}

class CommentsList {
  constructor() {
    this.comments = [];
    this.list = document.querySelector('#list')
    this.commentInput = document.querySelector('#comment-input')
  }

  addComment() {
    let comment = this.commentInput.value
    this.comments.push(comment);
    let p = document.createElement('p');
    p.innerText = comment;
    this.list.appendChild(p);
    this.commentInput.value = "";
  }
}
// functional version of JS class:
// function Counter() {
//   this.counter = 0;
//   this.likesCounter = {};
// }

// Counter.prototype.start = function() {
//   this.interval = setInterval(this.incrementCounter, 1000)
// }

document.addEventListener('DOMContentLoaded', function(event){
  Counter.started = new Counter();
  CommentsList.active = new CommentsList();
  attachListeners();
})

function attachListeners() {
  /*
  click on plus
  click on minus
  click on heart
  click on pause
  click on resume
  */
  document.addEventListener('click', function(event){
    let target = event.target;
    if(target.matches('#plus')) {
      Counter.started.incrementCounter();
    } else if(target.matches('#minus')) {
      Counter.started.decrementCounter();
    } else if(target.matches('#heart')) {
      Counter.started.increaseLikes();
    } else if(target.matches('#pause')) {
      Counter.started.pause();
    } else if(target.matches('#resume')) {
      Counter.started.resume();
    }
  })

  document.addEventListener('submit', function(event) {
    let target = event.target;
    if(event.target.matches('#comment-form')){ 
      event.preventDefault();
      CommentsList.active.addComment()
    }
  })
}