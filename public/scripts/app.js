// Client facing scripts here
$(document).ready(function () {
  $(".addquestion").prepend(`<section class="newquiz">
        <form action="">
          <label for="QuizTitle">Quiz Title:</label>
          <input type="text" />
          <br />
          <label for="question">Question</label>
          <input type="text" />
          <br />
          <label for="question">Option 1</label>
          <input type="text" />
          <br />
          <label for="question">Option 2</label>
          <input type="text" />
          <br />
          <label for="question">Option 3</label>
          <input type="text" />
          <br />
          <label for="question">Option 4</label>
          <input type="text" />
          <br />
        </form>
      </section>`);
});
