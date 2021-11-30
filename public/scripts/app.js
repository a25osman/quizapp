// Client facing scripts here
$(document).ready(function () {
  $(".addquestion").on("click", function () {
    $(".quiz-container").append(`<section class="newquiz">
        <form action="/index" method="POST">
          <label for="question">Question</label>
          <input type="text" />
          <br />
          <input type="radio" name="letsans" />
          <label for="question">Option 1</label>
          <input type="text" />
          <br />
          <input type="radio" name="letsans1" />
          <label for="question">Option 2</label>
          <input type="text" />
          <br />
          <input type="radio" name="letsans1" />
          <label for="question">Option 3</label>
          <input type="text" />
          <br />
          <input type="radio" name="letsans1" />
          <label for="question">Option 4</label>
          <input type="text" />
          <br />
        </form>
      </section>`);
  });
});
