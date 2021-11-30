// Client facing scripts here
$(document).ready(function () {
  $(".addquestion").on("click", function () {
    $(".quiz-container").append(`<section class="newquiz">
        <form id="myform" action="/" method="POST">
          <label for="question">Question</label>
          <input type="text" name="question" />
          <br />
          <input type="radio" name="letsans1" />  
          <label for="question">Option 1</label>
          <input type="text" name="firstanswer" />
          <br />
          <input type="radio" name="letsans2" />   
          <label for="question">Option 2</label>
          <input type="text" name="secondanswer" />
          <br />
          <input type="radio" name="letsans3" />  
          <label for="question">Option 3</label>
          <input type="text" name="thirdanswer" />
          <br />
          <input type="radio" name="letsans4" />   
          <label for="question">Option 4</label>
          <input type="text" name="fourthanswer" />
          <br />
        </form>
      </section>`);
  });
});
